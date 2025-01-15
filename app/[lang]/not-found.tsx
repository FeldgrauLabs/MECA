import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-8'>
      <div className='text-7xl'>(º﹃ º )</div>
      <h1>404 - Page Not Found</h1>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}