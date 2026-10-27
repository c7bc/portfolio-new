import Image from 'next/image';
import type {Locale,Project} from './project-data';

export default function ProductArtwork({project,background,locale}:{project:Project;background:string;locale:Locale}){
 return <span className={`product-artwork artwork-${project.id}`} role="img" aria-label={`${project.name} — ${locale==='pt'?'arte de apresentação':'product artwork'}`}>
  <Image className="product-artwork-background" src={background} alt="" fill sizes="(max-width:700px) 88vw, 36vw"/>
  <Image className="product-artwork-logo" src={project.logo} alt="" width={220} height={220} sizes="(max-width:700px) 100px, 150px"/>
  <span className="product-artwork-name" aria-hidden="true">{project.id==='zapyflow'?'ZapyFlow':project.name}</span>
 </span>;
}
