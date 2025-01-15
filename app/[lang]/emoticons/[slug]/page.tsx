import { Emoticon } from "@/components/Emoticon";
import { getEmoticon } from "@/libs/emoticons"
import { Buttons } from "./actions";
import { getDictionary, SupportedLang } from "../../dictionaries";

interface Props {
  params: Promise<{ slug: string, lang: SupportedLang }>
}

export default async function Page({
  params,
}: Props) {
  const slug = (await params).slug;

  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const emoticon = await getEmoticon(slug);

  if (!emoticon) {
    return <div>Emoticon not found</div>
  }

  return (
    <div className="max-w-xl m-auto py-12 px-4 sm:px-0">
      <Emoticon emoticon={emoticon} fixedTextSize='text-2xl' dict={dict} />
      <Buttons emoticon={emoticon} dict={dict} />
    </div>
  )
}