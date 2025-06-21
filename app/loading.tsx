export default function Loading() {
  // This is the fallback loading UI that Next.js will render during page transitions.
  // It's styled to be theme-aware from the first frame, preventing any flash.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative h-1 w-full max-w-md overflow-hidden rounded-full">
        <div
          className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          style={{
            backgroundSize: '200% 100%',
            animation: 'gradient-animation 2s ease infinite',
          }}
        />
      </div>
    </div>
  );
}
