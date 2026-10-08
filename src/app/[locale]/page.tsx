import { notFound } from 'next/navigation';
import Portfolio from '@/components/Portfolio';
import type { Metadata } from 'next';
export function generateStaticParams(){return [{locale:'pt'},{locale:'en'}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='en'?'Full Stack Developer':'Desenvolvedor Full Stack',description:locale==='en'?'Daniel Neri builds products with React, TypeScript and Go. Explore selected projects and engineering case studies.':'Daniel Neri desenvolve produtos com React, TypeScript e Go. Conheça os projetos e estudos de engenharia.',alternates:{canonical:`/${locale}`,languages:{'pt-BR':'/pt',en:'/en','x-default':'/pt'}}}}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=='pt'&&locale!=='en')notFound();return <Portfolio locale={locale}/>}
