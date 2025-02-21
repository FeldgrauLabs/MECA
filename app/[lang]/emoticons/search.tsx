'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2Icon, SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { LocaleDict } from "../dictionaries";
import { usePostHog } from "posthog-js/react";
import { useAuth } from "@clerk/nextjs";
import { SavedToggle } from "./savedToggle";

interface SearchProps {
  query?: string;
  dict: LocaleDict;
  filtered: boolean;
}

export function Search({ query, dict, filtered }: SearchProps) {
  const posthog = usePostHog();
  const { userId } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState(query || '');
  const router = useRouter();

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  const onSearch = () => {
    posthog.capture('emoticon_search', {
      query: value,
      user_id: userId,
    });

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('q', value);
      params.set('page', '1');

      const url = `${pathname}?${params.toString()}`
      router.push(url);
    });
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <SavedToggle state={filtered ? 'active' : 'inactive'} />
      <Input
        type="text"
        placeholder={dict.common.search}
        className="bg-white"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onSearchEnter}
      />
      <Button onClick={onSearch} disabled={isPending}>
        {isPending ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
        <span className="hidden sm:inline">{dict.common.search}</span>
      </Button>
    </div>
  )
}