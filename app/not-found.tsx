import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800">Baa-d News! 🐑</h2>
        <div className="my-4 flex justify-center">
          <div className="relative h-[19.2rem] w-[19.2rem]">
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
          Sorry, this page isn't ready yet.
          <br />
          We're working hard to bring you great content. Please check back soon!
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
