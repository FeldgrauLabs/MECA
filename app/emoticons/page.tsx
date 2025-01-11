import { Emoticon } from '@/components/Emoticon';
import { getEmoticons } from '@/libs/emoticons'
import { Pagination } from './pagination';

interface Props {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const emoticons = await getEmoticons({ pageNumber: currentPage, pageSize: 24 });

  if (emoticons.length === 0) {
    return <div>No emoticons found</div>
  }

  return (
    <div className='max-w-4xl m-auto py-12'>
      <div className='grid grid-cols-3 gap-4'>
        {emoticons.map((emoticon) => (
          <Emoticon key={emoticon.id} label={emoticon.display} />
        ))}
      </div>
      <div className='pt-4'>
        <Pagination currentPage={currentPage} />
      </div>
    </div>
  )
}