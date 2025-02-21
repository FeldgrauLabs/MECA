import { Emoticon } from "@/components/Emoticon";
import { getEmoticons, getUserFavEmoticonIds } from "@/libs/emoticons";
import { LocaleDict } from "../dictionaries";
import { addOp, removeOp } from "./[slug]/page";
import { Loader2Icon } from "lucide-react";

interface Props {
  currentPage: number;
  filtered: boolean;
  query: string | undefined;
  userId: string | null;

  dict: LocaleDict;
}

export async function Emoticons({ currentPage, query, filtered, userId, dict }: Props) {
  const emoticons = await getEmoticons({ pageNumber: currentPage, pageSize: 24, query, userId: filtered ? userId : null });
  const userFavEmoticonIds = await getUserFavEmoticonIds(userId);

  if (emoticons.length === 0) {
    return <div>No emoticons found</div>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {emoticons.map((emoticon) => (
        <Emoticon
          key={emoticon.id}
          emoticon={emoticon}
          dict={dict}
          withActions
          isFav={userFavEmoticonIds.includes(emoticon.id)}
          addOp={addOp}
          removeOp={removeOp}
        />
      ))}
    </div>
  )
}

export const EmoticonsSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {[...Array(24)].map((_, idx) => (
      <div
        key={idx}
        className={`bg-white h-64 rounded-3xl text-black flex flex-col items-center justify-center border-purple-500`}
      >
        <Loader2Icon className="text-purple-200 animate-spin h-8 w-8" />
      </div>
    ))}
  </div>
)