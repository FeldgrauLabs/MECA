import { Pagination } from './pagination';
import { Search } from './search';
import { getDictionary, SupportedLang } from '../dictionaries';
import { auth } from '@clerk/nextjs/server';
import { Emoticons, EmoticonsSkeleton } from './Emoticons';
import { Suspense } from 'react';

interface Props {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    collection?: string;
  }>;
  params: Promise<{ lang: SupportedLang }>
}

export default async function Page(props: Props) {
  const lang = (await props.params).lang
  const { userId } = await auth()

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.q;
  const collectionName = searchParams?.collection;
  const filtered = collectionName === 'default';

  const dict = await getDictionary(lang);

  return (
    <div className='max-w-md md:max-w-xl lg:max-w-4xl m-auto py-12 px-4 md:px-0'>
      <div className='flex flex-col gap-4'>
        <Search query={query} dict={dict} filtered={filtered} />
        <Suspense fallback={<EmoticonsSkeleton />}>
          <Emoticons currentPage={currentPage} query={query} filtered={filtered} userId={userId} dict={dict} />
        </Suspense>
        <div className='pt-4'>
          <Pagination currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}