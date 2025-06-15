import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="fixed top-4 left-4 z-50 flex items-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <div className="relative w-full h-full">
          <Image 
            src="/images/Bright lambs trqse halo no text + background.png?v=2" 
            alt="Bright Lambs Logo" 
            width={96}
            height={96}
            className="object-cover absolute top-1"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
