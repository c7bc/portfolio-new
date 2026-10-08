import type { Metadata } from 'next';
import './portfolio.css';
export const metadata: Metadata = {
 metadataBase: new URL('https://danielneri.pro'),
 title: { default: 'Daniel Neri — Full Stack Developer', template: '%s | Daniel Neri' },
 description: 'React, TypeScript e Go. Projetos, experiência e desenvolvimento de produtos por Daniel Neri.',
 openGraph: { type:'website', title:'Daniel Neri — Full Stack Developer', images:[{url:'/media/social.jpg',width:1200,height:630}] },
 twitter:{card:'summary_large_image',images:['/media/social.jpg']},
 icons:{icon:[{url:'/icon.svg',type:'image/svg+xml'},{url:'/favicon.ico',sizes:'any'}],apple:'/apple-icon.png'},
 robots:{index:true,follow:true}
};
export default async function Layout({children,params}:{children:React.ReactNode,params:Promise<{locale?:string}>}) {const {locale}=await params; return <html lang={locale==='en'?'en':'pt-BR'}><body>{children}</body></html>; }
