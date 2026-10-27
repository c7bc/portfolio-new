import {makePage,makeMetadata} from '@/lib/portfolio-pages';
export {generateLocales as generateStaticParams} from '@/lib/portfolio-pages';
export const generateMetadata=makeMetadata('work');
export default makePage('work');
