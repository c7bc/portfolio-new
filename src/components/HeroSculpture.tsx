'use client';

import { useEffect, useRef, useState } from 'react';
import type { Vector3 } from 'three';

/** Procedural ribbon; no external model, remote tracking, or iframe. */
export default function HeroSculpture() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let stopped = false;
    let cleanup = () => {};
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    async function mount() {
      try {
        const [T, { RoomEnvironment }] = await Promise.all([
          import('three'), import('three/addons/environments/RoomEnvironment.js'),
        ]);
        if (stopped || !node) return;
        const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.82;
        node.appendChild(renderer.domElement);
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(0, 0, 11);
        const room = new RoomEnvironment();
        const pmrem = new T.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        room.dispose(); pmrem.dispose();
        class RibbonPath extends T.Curve<Vector3> {
          constructor() { super(); }
          getPoint(t: number, target = new T.Vector3()) {
            const u = t * Math.PI * 2;
            const r = 1.62 + 0.55 * Math.cos(3 * u);
            return target.set(r * Math.cos(2 * u), r * Math.sin(2 * u), 0.75 * Math.sin(3 * u));
          }
        }
        const shape = new T.Shape();
        shape.moveTo(-0.37, -0.045); shape.lineTo(0.37, -0.045);
        shape.lineTo(0.37, 0.045); shape.lineTo(-0.37, 0.045); shape.closePath();
        const geometry = new T.ExtrudeGeometry(shape, { steps: 500, bevelEnabled: false, extrudePath: new RibbonPath() });
        geometry.computeVertexNormals();
        const metal = new T.MeshPhysicalMaterial({ color: '#b7bdb1', metalness: 1, roughness: 0.2, clearcoat: 0.35, clearcoatRoughness: 0.18, side: T.DoubleSide, envMapIntensity: 0.65 });
        const sculpture = new T.Group();
        sculpture.add(new T.Mesh(geometry, metal));
        sculpture.rotation.set(0.75, -0.48, -0.38);
        scene.add(sculpture);
        const green = new T.PointLight('#d3ff64', 150, 15, 2);
        green.position.set(-2, -1, 3); scene.add(green);
        const ivory = new T.DirectionalLight('#fff7e6', 1.2);
        ivory.position.set(3, 4, 6); scene.add(ivory);
        const rim = new T.PointLight('#d3ef70', 180, 15, 2);
        rim.position.set(2, 2, -1); scene.add(rim);
        const resize = () => {
          const w = node.clientWidth, h = node.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(node); resize();
        const pointer = new T.Vector2();
        const hero = node.closest('.hero');
        const move = (event: Event) => {
          if (reduced.matches) return;
          const e = event as PointerEvent; const rect = hero?.getBoundingClientRect();
          if (rect) pointer.set((e.clientX - rect.left) / rect.width - 0.5, (e.clientY - rect.top) / rect.height - 0.5);
        };
        const leave = () => pointer.set(0, 0);
        hero?.addEventListener('pointermove', move); hero?.addEventListener('pointerleave', leave);
        let visible = true;
        const visibility = new IntersectionObserver(es => { visible = es[0].isIntersecting; });
        visibility.observe(node);
        let last = 0;
        const render = (time: number) => {
          if (document.hidden || !visible || time - last < 32) return;
          last = time;
          if (!reduced.matches) {
            sculpture.rotation.y += ((-0.48 + Math.sin(time * 0.00017) * 0.33 + pointer.x * 0.5) - sculpture.rotation.y) * 0.045;
            sculpture.rotation.x += ((0.75 + pointer.y * 0.25) - sculpture.rotation.x) * 0.045;
            sculpture.position.y = Math.sin(time * 0.00055) * 0.09;
          }
          renderer.render(scene, camera);
        };
        renderer.render(scene, camera);
        renderer.setAnimationLoop(render); setReady(true);
        cleanup = () => {
          renderer.setAnimationLoop(null); resizeObserver.disconnect(); visibility.disconnect();
          hero?.removeEventListener('pointermove', move); hero?.removeEventListener('pointerleave', leave);
          geometry.dispose(); metal.dispose(); environment.dispose(); renderer.dispose();
          renderer.domElement.remove();
        };
      } catch { /* Keep the generated artwork visible when WebGL is unavailable. */ }
    }
    mount();
    return () => { stopped = true; cleanup(); };
  }, []);
  return <div ref={host} className={`hero-webgl ${ready ? 'ready' : ''}`} aria-hidden="true" />;
}
