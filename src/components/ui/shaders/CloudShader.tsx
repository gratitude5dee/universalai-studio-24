
import React, { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CloudShaderProps {
  className?: string;
}

const CloudShader: React.FC<CloudShaderProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  // Fragment shader source code - creates animated clouds
  const fragmentShader = useMemo(() => `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    // Function to create a noise pattern
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    // Cloud function
    float clouds(vec2 uv, float time) {
      float speed = 0.02;
      float scale = 0.8;
      
      // Multilayered noise for cloud formation
      float noise1 = snoise(vec2(uv.x * scale + time * speed, uv.y * scale)) * 0.5 + 0.5;
      float noise2 = snoise(vec2(uv.x * scale * 2.0 + time * speed * 1.5, uv.y * scale * 2.0)) * 0.25 + 0.25;
      float noise3 = snoise(vec2(uv.x * scale * 4.0 + time * speed * 2.0, uv.y * scale * 4.0)) * 0.125 + 0.125;
      
      return noise1 + noise2 + noise3;
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float time = u_time * 0.05;
      
      // Blue gradient background
      vec3 bg = mix(
        vec3(0.05, 0.05, 0.15),  // Dark blue
        vec3(0.1, 0.2, 0.4),     // Medium blue
        uv.y
      );
      
      // Create cloud formations
      float cloud = clouds(uv, time);
      cloud = smoothstep(0.4, 1.0, cloud);
      
      // Cloud colors
      vec3 cloudColor1 = vec3(0.6, 0.7, 0.9);  // Light blue
      vec3 cloudColor2 = vec3(0.3, 0.4, 0.6);  // Medium blue
      vec3 cloudColor = mix(cloudColor2, cloudColor1, cloud);
      
      // Mouse interaction - subtle glow near mouse position
      vec2 mouse = u_mouse / u_resolution;
      float mouseDist = distance(uv, mouse);
      float mouseGlow = smoothstep(0.3, 0.0, mouseDist) * 0.15;
      cloudColor += vec3(0.2, 0.4, 0.7) * mouseGlow;
      
      // Mix background with clouds
      vec3 finalColor = mix(bg, cloudColor, cloud * 0.7);
      
      // Add a subtle vignette
      float vignette = 1.0 - smoothstep(0.5, 1.5, length((uv - 0.5) * 1.8));
      finalColor *= vignette;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `, []);

  // Vertex shader - a simple passthrough shader
  const vertexShader = useMemo(() => `
    attribute vec2 position;
    
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `, []);

  // Initialize WebGL and run the shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize canvas to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Initialize mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position on move
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = canvas.height - event.clientY; // Flip Y for WebGL coordinates
    };

    // Set up event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Create shader program
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create shader program');
      return;
    }

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      console.error('Failed to create shaders');
      return;
    }

    gl.shaderSource(vs, vertexShader);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(vs);
    gl.compileShader(fs);

    // Check for compilation errors
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vs));
      return;
    }
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fs));
      return;
    }

    // Link program
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up a rectangle covering the entire canvas
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
       1.0,  1.0,
      -1.0,  1.0
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionAttrib = gl.getAttribLocation(program, 'position');
    const timeUniform = gl.getUniformLocation(program, 'u_time');
    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniform = gl.getUniformLocation(program, 'u_mouse');

    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    // Animation loop
    const animate = (timestamp: number) => {
      // Set uniforms
      gl.uniform1f(timeUniform, (Date.now() - startTimeRef.current) / 1000.0);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, mouseX, mouseY);
      
      // Clear and draw
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      
      // Request next frame
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup on component unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
    };
  }, [fragmentShader, vertexShader]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
};

export default CloudShader;
