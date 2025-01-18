'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  state: 'active' | 'inactive';
}

export function SavedToggle({ state }: Props) {
  const router = useRouter();
  const { userId } = useAuth();

  const goToAll = () => {
    if (!userId) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete('collection');

    router.push(url.toString());
  }

  const goToLimited = () => {
    if (!userId) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('collection', 'default');

    router.push(url.toString());
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
