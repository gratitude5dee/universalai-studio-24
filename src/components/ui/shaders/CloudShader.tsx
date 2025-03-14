
import React, { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebGLSetup } from '@/hooks/useWebGLSetup';

interface CloudShaderProps {
  className?: string;
}

const CloudShader: React.FC<CloudShaderProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  // Fragment shader source code - creates animated clouds
  const fragmentShaderSource = useMemo(() => `
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
  const vertexShaderSource = useMemo(() => `
    attribute vec2 position;
    
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `, []);

  // Use the custom hook for WebGL setup
  useWebGLSetup({
    canvasRef,
    vertexShaderSource,
    fragmentShaderSource,
    startTimeRef
  });

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
};

export default CloudShader;
