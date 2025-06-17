import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="max-w-2xl w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-gray-800">Baa-d News!</h2>
        <div className="flex justify-center my-4">
          <div className="relative w-[19.2rem] h-[19.2rem]">
            <Image
              src="/Bad_construction_sheep.jpg"
              alt="Sheep in a hard hat"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Sorry, this page isn't ready yet.<br />
          We're working hard to bring you great content. Please check back soon!
        </p>
        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
