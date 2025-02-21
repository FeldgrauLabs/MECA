'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { BookmarkIcon, Loader2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface Props {
  state: 'active' | 'inactive';
}

export function SavedToggle({ state }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { userId } = useAuth();

  const goToAll = () => {
    startTransition(() => {
      if (!userId) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString())
      params.delete('collection');

      const url = `${pathname}?${params.toString()}`
      router.push(url);
    });
  }

  const goToLimited = () => {
    startTransition(() => {
      if (!userId) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString())
      params.set('collection', 'default');

      const url = `${pathname}?${params.toString()}`
      router.push(url);
    });
  }

  const tooltipText = state === 'active' ? 'Remove favs filter' : 'Filter favs only';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={state === 'active' ? 'default' : 'outline'}
          onClick={state === 'active' ? goToAll : goToLimited}
          disabled={isPending}
        >
          {isPending ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <BookmarkIcon className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {userId === null ? <div>Login required to see favourites</div> : <span>{tooltipText}</span>}
      </TooltipContent>
    </Tooltip>
  )
}
