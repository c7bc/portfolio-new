import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import PortfolioPage,{type PageKind} from '@/components/SitePages';
import {projects,type Locale} from '@/components/project-data';
type Params={params:Promise<{locale:string;project?:string}>};
const titles={work:{pt:'Projetos selecionados',en:'Selected work'},about:{pt:'Sobre mim',en:'About me'},services:{pt:'Engenharia e atuação',en:'Engineering'},experience:{pt:'Trajetória',en:'Experience'},contact:{pt:'Vamos conversar',en:'Let’s talk'}};
export function generateLocales(){return [{locale:'pt'},{locale:'en'}];}
function localeOf(value:string):Locale{if(value!=='pt'&&value!=='en')notFound();return value;}
export function makeMetadata(kind:keyof typeof titles){return async({params}:Params):Promise<Metadata>=>{const {locale:raw}=await params;const locale=localeOf(raw);return {title:titles[kind][locale],description:locale==='pt'?'Daniel Neri — desenvolvimento Full Stack, produtos e engenharia de software.':'Daniel Neri — Full Stack development, products and software engineering.',alternates:{canonical:`/${locale}/${kind}`,languages:{'pt-BR':`/pt/${kind}`,en:`/en/${kind}`}}};};}
export function makePage(kind:PageKind){return async function Page({params}:Params){const {locale:raw}=await params;const locale=localeOf(raw);return <PortfolioPage locale={locale} kind={kind}/>;};}
export function generateProjects(){return ['pt','en'].flatMap(locale=>projects.map(p=>({locale,project:p.id})));}
export async function projectMetadata({params}:Params):Promise<Metadata>{const {locale:raw,project:id}=await params;const locale=localeOf(raw);const p=projects.find(item=>item.id===id);if(!p)notFound();return {title:`${p.name} — ${locale==='pt'?'Estudo de engenharia':'Engineering case study'}`,description:p.description[locale],alternates:{canonical:`/${locale}/work/${p.id}`,languages:{'pt-BR':`/pt/work/${p.id}`,en:`/en/work/${p.id}`}}};}
export async function ProjectPage({params}:Params){const {locale:raw,project:id}=await params;const locale=localeOf(raw);if(!projects.some(p=>p.id===id))notFound();return <PortfolioPage locale={locale} kind="project" projectId={id}/>;}
