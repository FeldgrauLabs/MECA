import { Emoticon } from "@/components/Emoticon";
import { getEmoticon } from "@/libs/emoticons"
import { Buttons } from "./actions";

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({
  params,
}: Props) {
  const slug = (await params).slug

  const emoticon = await getEmoticon(slug);

  if (!emoticon) {
    return <div>Emoticon not found</div>
  }

  return (
    <div className="max-w-xl m-auto py-12">
      <Emoticon emoticon={emoticon} fixedTextSize='text-2xl' />
      <Buttons emoticon={emoticon} />
    </div>
  )
}