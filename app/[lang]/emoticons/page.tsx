import { Emoticon } from '@/components/Emoticon';
import { getEmoticons, getUserFavEmoticonIds } from '@/libs/emoticons'
import { Pagination } from './pagination';
import { Search } from './search';
import { getDictionary, SupportedLang } from '../dictionaries';
import { auth } from '@clerk/nextjs/server';
import { addOp, removeOp } from './[slug]/page';

interface Props {
  searchParams?: Promise<{
    page?: string;
    q?: string;
  }>;
  params: Promise<{ lang: SupportedLang }>
}

export default async function Page(props: Props) {
  const lang = (await props.params).lang
  const { userId } = await auth()

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.q;

  const emoticons = await getEmoticons({ pageNumber: currentPage, pageSize: 24, query });
  const userFavEmoticonIds = await getUserFavEmoticonIds(userId);

  const dict = await getDictionary(lang);

  if (emoticons.length === 0) {
    return <div>No emoticons found</div>
  }

  return (
    <div className='max-w-md md:max-w-xl lg:max-w-4xl m-auto py-12 px-4 md:px-0'>
      <div className='flex flex-col gap-4'>
        <Search query={query} dict={dict} />
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
        <div className='pt-4'>
          <Pagination currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}