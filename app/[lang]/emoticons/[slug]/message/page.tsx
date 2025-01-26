import { SpeechQRPane } from "@/components/SpeechQRPane";
import { getEmoticon } from "@/libs/emoticons";
import { MessageEditForm } from "./MessageEditForm";

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({
  params,
  searchParams
}: Props) {
  const slug = (await params).slug;

  const emoticon = await getEmoticon(slug);

  if (!emoticon) {
    return <div>Emoticon not found</div>
  }

  const speech = (await searchParams).text;
  const isEditing = !!(await searchParams).edit;

  return (
    <div className="max-w-xl m-auto py-12 px-4 sm:px-0 h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-6 h-full justify-center">
        <div className="flex justify-end w-full">
          <div className="flex w-1/2">
            <div className="p-4 rounded-xl rounded-bl-none bg-purple-500 text-white max-w-1/2">
              <p>{speech ?? '<You message will appear here>'}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-4xl">{emoticon.display}</p>
        </div>
        {isEditing && (
          <MessageEditForm />
        )}
      </div>
      {!isEditing && (
        <SpeechQRPane />
      )}
    </div>
  )
}