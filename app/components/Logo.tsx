import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="fixed left-4 top-4 z-50 flex items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <div className="relative h-full w-full">
          <Image
            src="/images/Bright lambs trqse halo no text + background v2.png"
            alt="Bright Lambs Logo"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
