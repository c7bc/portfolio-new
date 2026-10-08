/** @type {import('next').NextConfig} */
const config={async redirects(){return [
{source:'/about',destination:'/pt#sobre',permanent:true},
{source:'/work/:path*',destination:'/pt#projetos',permanent:true},
{source:'/blog/:path*',destination:'/pt',permanent:true},
{source:'/gallery',destination:'/pt#projetos',permanent:true},
]}};export default config;
