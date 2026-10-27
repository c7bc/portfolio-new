import type {MetadataRoute} from 'next';
import {projects} from '@/components/project-data';
export default function sitemap():MetadataRoute.Sitemap{
 const routes=['','/work','/services','/experience','/about','/contact',...projects.map(p=>'/work/'+p.id)];
 return routes.flatMap(route=>['pt','en'].map(locale=>({url:`https://danielneri.pro/${locale}${route}`,lastModified:new Date('2026-10-27'),changeFrequency:'monthly' as const,priority:route===''?1:route.startsWith('/work/')?.8:.9,alternates:{languages:{'pt-BR':`https://danielneri.pro/pt${route}`,en:`https://danielneri.pro/en${route}`}}})));
}
