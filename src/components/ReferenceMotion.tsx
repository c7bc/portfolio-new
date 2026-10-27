'use client';
import {useEffect,useRef,type ReactNode} from 'react';

export function RevealLines({lines,as:Tag='h2',className=''}:{lines:{text:string;italic?:boolean}[];as?:'h1'|'h2'|'h3';className?:string}){
 const ref=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){node.classList.add('rv-visible');observer.disconnect();}},{threshold:.15});observer.observe(node);return()=>observer.disconnect();},[]);
 return <Tag className={`rv-lines ${className}`} ref={ref}>{lines.map((line,i)=><span className="rv-line-mask" key={line.text}><span style={{'--line-order':i} as React.CSSProperties}>{line.italic?<em>{line.text}</em>:line.text}</span></span>)}</Tag>;
}
export function ScrollWords({text,className='',icons=false}:{text:string;className?:string;icons?:boolean}){
 const ref=useRef<HTMLParagraphElement>(null);
 useEffect(()=>{
  const node=ref.current;if(!node)return;const words=[...node.querySelectorAll<HTMLElement>('.scroll-word')];const reduced=matchMedia('(prefers-reduced-motion: reduce)');let raf=0;
  const update=()=>{raf=0;const r=node.getBoundingClientRect();const progress=reduced.matches?1:Math.max(0,Math.min(1,(innerHeight*.88-r.top)/(r.height+innerHeight*.2)));words.forEach((word,i)=>{const value=Math.max(0,Math.min(1,(progress-i/words.length)*words.length/2));word.style.opacity=String(.13+.87*value);word.style.setProperty('--word-p',String(value));});};
  const queue=()=>{if(!raf)raf=requestAnimationFrame(update);};addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',queue);update();return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',queue);removeEventListener('resize',queue);reduced.removeEventListener('change',queue);};
 },[text,icons]);
 const words=text.split(' ');
 return <p ref={ref} className={`scroll-words ${className}`}>{words.map((word,i)=><span key={i}><span className={`scroll-word ${i===12||i===38?'word-underlined':''}`}>{word}</span>{icons&&(i===9||i===27||i===48)?<span className="inline-glyph" aria-hidden="true">{i===9?'◈':i===27?'✣':'✳'}</span>:' '}</span>)}</p>;
}
export function ScrollQuote({children}:{children:ReactNode}){const ref=useRef<HTMLElement>(null);useEffect(()=>{const el=ref.current;if(!el)return;let raf=0;const update=()=>{raf=0;const r=el.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));el.style.setProperty('--quote-p',String(p));};const q=()=>{if(!raf)raf=requestAnimationFrame(update);};addEventListener('scroll',q,{passive:true});update();return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',q);};},[]);return <section ref={ref} className="reference-quote">{children}</section>;}
export function ReferenceCursor({label='View case ↗'}:{label?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(matchMedia('(pointer:coarse)').matches)return;const el=ref.current;if(!el)return;let frame=0,x=-100,y=-100,cx=-100,cy=-100,active=false;const move=(e:PointerEvent)=>{x=e.clientX;y=e.clientY;active=true;el.style.opacity='1';};const hover=(e:PointerEvent)=>{const target=e.target instanceof Element?e.target:null;const link=target?.closest('a,button,summary');el.dataset.hover=link?'true':'false';el.dataset.case=target?.closest('[data-case-link]')?'true':'false';};const leave=()=>{active=false;el.style.opacity='0';};const tick=()=>{if(active){cx+=(x-cx)*.3;cy+=(y-cy)*.3;el.style.transform=`translate3d(${cx}px,${cy}px,0)`;}frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);addEventListener('pointermove',move,{passive:true});addEventListener('pointerover',hover,{passive:true});document.addEventListener('mouseleave',leave);document.documentElement.classList.add('reference-cursor-enabled');return()=>{cancelAnimationFrame(frame);removeEventListener('pointermove',move);removeEventListener('pointerover',hover);document.removeEventListener('mouseleave',leave);document.documentElement.classList.remove('reference-cursor-enabled');};},[]);
 return <div ref={ref} className="reference-cursor" aria-hidden="true"><span>+</span><small>{label}</small></div>;
}
