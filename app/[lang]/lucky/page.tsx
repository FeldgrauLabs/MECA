import { redirect } from "next/navigation";

export default async function Page() {
  const maxEmoticons = 60_000; // FIXME: This should be based on the db row counts

  const random = Math.floor(Math.random() * maxEmoticons) + 1;

  // 8-digit id format (padded with zeros)
  const formatted = random.toString().padStart(8, '0');

  return redirect(`/emoticons/${formatted}`);
}