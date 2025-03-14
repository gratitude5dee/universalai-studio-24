
import { useEffect, RefObject, MutableRefObject } from 'react';

interface WebGLSetupProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  vertexShaderSource: string;
  fragmentShaderSource: string;
  startTimeRef: MutableRefObject<number>;
}

export const useWebGLSetup = ({
  canvasRef,
  vertexShaderSource,
  fragmentShaderSource,
  startTimeRef
}: WebGLSetupProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Initialize mouse position and animation frame request
    let mouseX = 0;
    let mouseY = 0;
    let requestId: number;

    // Setup functions
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compilation error: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const createProgram = (vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) {
        console.error('Failed to create shader program');
        return null;
      }
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Shader program linking error: ${gl.getProgramInfoLog(program)}`);
        return null;
      }
      
      return program;
    };

    const setupBuffers = (program: WebGLProgram) => {
      // Create vertices for a rectangle covering the entire canvas
      const vertices = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
         1.0,  1.0,
        -1.0,  1.0
      ]);
      
      const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

      // Create and bind vertex buffer
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      // Create and bind index buffer
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

      // Get attribute location
      const positionAttrib = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionAttrib);
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

      return { vertexBuffer, indexBuffer };
    };

    // Initialize WebGL
    setupCanvas();

    // Create shaders
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    // Create shader program
    const program = createProgram(vertexShader, fragmentShader);
    if (!program) {
      return;
    }

    gl.useProgram(program);

    // Setup buffers
    const { vertexBuffer, indexBuffer } = setupBuffers(program);

    // Get uniform locations
    const timeUniform = gl.getUniformLocation(program, 'u_time');
    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniform = gl.getUniformLocation(program, 'u_mouse');

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY; // Flip Y for WebGL coordinates
    };

    const handleResize = () => {
      setupCanvas();
    };

    // Animation loop
    const animate = () => {
      // Set uniforms
      gl.uniform1f(timeUniform, (Date.now() - startTimeRef.current) / 1000.0);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, mouseX, mouseY);
      
      // Clear and draw
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      
      // Request next frame
      requestId = requestAnimationFrame(animate);
    };

    // Register event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Start animation loop
    requestId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [canvasRef, fragmentShaderSource, vertexShaderSource, startTimeRef]);
};
