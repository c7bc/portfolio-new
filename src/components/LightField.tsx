'use client';
import {useEffect, useRef} from 'react';

const vertex = 'attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}';
const fragment = `precision mediump float;
uniform vec2 resolution; uniform float time; uniform vec2 pointer;
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float t=time*.13;
 float bend=.024*sin(uv.y*6.+t)+.018*sin(uv.y*12.-t*.7);
 float x=uv.x+bend+(pointer.x-.5)*.009;
 float ribs=pow(.5+.5*sin(x*162.+sin(uv.y*5.+t)*.6),2.2);
 float narrow=pow(.5+.5*sin(x*162.+.9),18.);
 float light=exp(-pow((uv.x-(.58+.13*sin(t)))*2.7,2.)-pow((uv.y-.51)*1.3,2.));
 float wave=.5+.5*sin(uv.x*6.-uv.y*3.+t);
 vec3 ink=vec3(.090,.098,.086); vec3 lime=vec3(.827,.937,.439);
 vec3 col=mix(ink*.72,lime,(.11+ribs*.55+narrow*.25)*light*(.55+wave*.45));
 col+=lime*pow(light,6.)*.25*(1.-ribs);
 float vignette=smoothstep(.82,.15,length((uv-vec2(.52,.54))*vec2(.9,1.)));
 col*=.4+.6*vignette;
 col=mix(ink*.57,col,smoothstep(0.,.24,uv.y));
 float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
 gl_FragColor=vec4(col+(grain-.5)*.018,1.);
}`;

export default function LightField({paused=false}:{paused?:boolean}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
  const shaders:WebGLShader[]=[];
  function shader(type:number,code:string){const s=gl!.createShader(type)!;shaders.push(s);gl!.shaderSource(s,code);gl!.compileShader(s);return s;}
  const p=gl.createProgram()!;gl.attachShader(p,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(p);return;}
  gl.useProgram(p);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(p,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const res=gl.getUniformLocation(p,'resolution'),time=gl.getUniformLocation(p,'time'),pointer=gl.getUniformLocation(p,'pointer');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=-100,active=true,px=.5,py=.5;
  const resize=()=>{const dpr=Math.min(window.devicePixelRatio,1.35);canvas.width=Math.round(canvas.clientWidth*dpr);canvas.height=Math.round(canvas.clientHeight*dpr);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(res,canvas.width,canvas.height);};
  const draw=(now:number)=>{frame=requestAnimationFrame(draw);if(!active||document.hidden||now-last<40)return;last=now;gl.uniform1f(time,reduced.matches||paused?3:now/1000);gl.uniform2f(pointer,paused?.5:px,paused?.5:py);gl.drawArrays(gl.TRIANGLES,0,6);};
  const move=(e:PointerEvent)=>{px=e.clientX/window.innerWidth;py=e.clientY/window.innerHeight;};
  const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;});observer.observe(canvas);
  const ro=new ResizeObserver(resize);ro.observe(canvas);resize();frame=requestAnimationFrame(draw);window.addEventListener('pointermove',move,{passive:true});
  return()=>{cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();window.removeEventListener('pointermove',move);gl.deleteBuffer(buffer);gl.deleteProgram(p);shaders.forEach(s=>gl.deleteShader(s));};
 },[paused]);
 return <canvas ref={ref} className="light-field" aria-hidden="true"/>;
}
