import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="fixed top-4 left-4 z-50 flex items-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <div className="relative w-full h-full">
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
