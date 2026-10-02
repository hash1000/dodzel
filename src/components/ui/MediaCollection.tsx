import { mediaCollections } from "@/content/media";
import { MediaFrame } from "./MediaFrame";
export function MediaCollection({ slot }: {slot:string}) {
 const slots=mediaCollections[slot];if(!slots?.length)return null;
 return <section className="mt-10 border-t border-line pt-8"><h2 className="mb-3 text-2xl">Illustrative capability media</h2><p className="mb-6 text-sm text-muted">Stock imagery for context. These are not photographs of Dodzel projects.</p><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{slots.map(name=><div key={name} className="media-hover"><MediaFrame slot={name} video className="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div>)}</div></section>;
}
