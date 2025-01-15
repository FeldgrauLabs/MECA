'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocaleDict } from "../dictionaries";

interface SearchProps {
  query?: string;
  dict: LocaleDict;
}

export function Search({ query, dict }: SearchProps) {
  const [value, setValue] = useState(query || '');
  const router = useRouter();

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  const onSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', value);
    url.searchParams.set('page', '1');

    router.push(url.toString());
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder={dict.common.search}
        className="bg-white"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onSearchEnter}
      />
      <Button onClick={onSearch}>
        <SearchIcon className="h-4 w-4" />
        {dict.common.search}
      </Button>
    </div>
  )
}