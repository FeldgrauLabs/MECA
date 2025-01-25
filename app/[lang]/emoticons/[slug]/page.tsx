import { Emoticon } from "@/components/Emoticon";
import { getEmoticon, getUserFavEmoticonIds, removeEmoticonFromDefaultCollection, saveEmoticonToDefaultCollection } from "@/libs/emoticons"
import { Buttons } from "./actions";
import { getDictionary, SupportedLang } from "../../dictionaries";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { QRPane } from "@/components/QRPane";

export const addOp = async (userId: string, emoticonId: string) => {
  "use server"
  await saveEmoticonToDefaultCollection(userId, emoticonId);

  revalidatePath('/');

  return true;
}

export const removeOp = async (userId: string, emoticonId: string) => {
  "use server"
  await removeEmoticonFromDefaultCollection(userId, emoticonId);

  revalidatePath('/');

  return true;
}

interface Props {
  params: Promise<{ slug: string, lang: SupportedLang }>
}

export default async function Page({
  params,
}: Props) {
  const slug = (await params).slug;

  const { userId } = await auth()
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const emoticon = await getEmoticon(slug);
  const savedEmoticonIds = await getUserFavEmoticonIds(userId);

  const isFav = savedEmoticonIds.includes(slug);

  if (!emoticon) {
    return <div>Emoticon not found</div>
  }

  return (
    <div className="max-w-xl m-auto py-12 px-4 sm:px-0">
      <Emoticon emoticon={emoticon} fixedTextSize='text-2xl' dict={dict} isFav={isFav} addOp={addOp} removeOp={removeOp} />
      <Buttons emoticon={emoticon} dict={dict} isFav={isFav} addOp={addOp} removeOp={removeOp} />
      <QRPane emoticon={emoticon} />
    </div>
  )
}