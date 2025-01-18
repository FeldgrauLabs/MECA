'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { BookmarkIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  state: 'active' | 'inactive';
}

export function SavedToggle({ state }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { userId } = useAuth();

  const goToAll = () => {
    if (!userId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete('collection');

    const url = `${pathname}?${params.toString()}`
    router.push(url);
  }

  const goToLimited = () => {
    if (!userId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('collection', 'default');

    const url = `${pathname}?${params.toString()}`
    router.push(url);
  }

  const tooltipText = state === 'active' ? 'Remove favs filter' : 'Filter favs only';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={state === 'active' ? 'default' : 'secondary'}
          onClick={state === 'active' ? goToAll : goToLimited}
        >
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {userId === null ? <div>Login required to see favourites</div> : <span>{tooltipText}</span>}
      </TooltipContent>
    </Tooltip>
  )
}
