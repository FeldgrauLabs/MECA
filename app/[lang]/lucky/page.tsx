'use client';

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const maxEmoticons = 60_000; // FIXME: This should be based on the db row counts
  const random = Math.floor(Math.random() * maxEmoticons) + 1;

  // 8-digit id format (padded with zeros)
  const formatted = random.toString().padStart(8, '0');

  router.replace(`/emoticons/${formatted}`)
}