import Image from "next/image";
import Link from "next/link";

// Supply public/brand/logo-icon.png (or .svg), then set this to its public URL.
const LOGO_ICON_SRC: string | null = null;

export function BrandLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="Dodzel Engineering Limited - Home" className="flex shrink-0 justify-self-start items-center gap-3 min-[1100px]:max-xl:gap-1 whitespace-nowrap font-heading text-white">
      <span data-header-icon className="grid size-[var(--header-icon-size,2.25rem)] min-[1100px]:max-xl:size-9 shrink-0 place-items-center overflow-hidden bg-brand" aria-hidden="true">
        {LOGO_ICON_SRC ? <Image src={LOGO_ICON_SRC} alt="" width={44} height={44} preload className="size-full object-contain" /> : <span className="-mt-1 text-[2.5rem] font-bold leading-none">d</span>}
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="font-heading text-[1.375rem] font-bold leading-none tracking-[0.04em]">DODZEL</span>
        <span className="hidden font-heading text-[0.6875rem] font-medium leading-none tracking-[0.2em] text-white/70 min-[1100px]:block">ENGINEERING LIMITED</span>
      </span>
    </Link>
  );
}
