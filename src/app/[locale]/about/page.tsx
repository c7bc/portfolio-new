import {makePage,makeMetadata} from '@/lib/portfolio-pages';
export {generateLocales as generateStaticParams} from '@/lib/portfolio-pages';
export const generateMetadata=makeMetadata('about');
export default makePage('about');
