import { Emoticon } from '@/components/Emoticon';
import { getEmoticons } from '@/libs/emoticons'
import { Pagination } from './pagination';
import { Search } from './search';

interface Props {
  searchParams?: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.q;

  const emoticons = await getEmoticons({ pageNumber: currentPage, pageSize: 24, query });

  if (emoticons.length === 0) {
    return <div>No emoticons found</div>
  }

  return (
    <div className='max-w-md md:max-w-xl lg:max-w-4xl m-auto py-12'>
      <div className='flex flex-col gap-4'>
        <Search query={query} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {emoticons.map((emoticon) => (
            <Emoticon key={emoticon.id} emoticon={emoticon} withActions />
          ))}
        </div>
        <div className='pt-4'>
          <Pagination currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}