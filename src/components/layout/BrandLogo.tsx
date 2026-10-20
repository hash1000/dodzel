import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Dodzel Engineering Limited - Home"
      className="flex shrink-0 items-center justify-self-start"
    >
      <Image
        src="/assets/images/dodzel-logo.png"
        alt="Dodzel Engineering Limited"
        width={240}
        height={80}
        priority
        className="h-14 w-auto object-contain min-[1100px]:h-16"
      />
    </Link>
  );
}