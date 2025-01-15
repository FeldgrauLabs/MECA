'use client';

import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CopyIcon, ShareIcon } from "lucide-react";
import { LocaleDict } from "@/app/[lang]/dictionaries";
import { usePostHog } from "posthog-js/react";

export const constructEmoticonPath = (id: string) => {
  const url = new URL(window.location.href);
  url.pathname = `/emoticons/${id}`;
  url.search = '';

  return url.toString();
}

const POSTHOG_VIA = 'action_button'

export const ActionBar = ({ emoticon, dict }: { emoticon: Emoticon, dict: LocaleDict }) => {
  const { toast } = useToast();
  const posthog = usePostHog();

  const { display } = emoticon;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();

    posthog.capture('emoticon_copy', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,

      via: POSTHOG_VIA,
    });

    navigator.clipboard.writeText(display);
    toast({
      title: dict.toast.copy.title,
      description: dict.toast.copy.description,
    });
  }

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();

    posthog.capture('emoticon_share', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,

      via: POSTHOG_VIA,
    });

    const url = constructEmoticonPath(emoticon.id);
    navigator.clipboard.writeText(url);
    toast({
      title: dict.toast.share.title,
      description: dict.toast.share.description,
    });
  }

  const actions = [
    { icon: <CopyIcon className="w-4 h-4" />, label: dict.common.copy, action: copyToClipboard, },
    {
      icon: <ShareIcon className="w-4 h-4" />, label: dict.common.share, action: copyUrl
    },
  ]

  return (
    <div className="absolute bottom-4">
      <div className="flex gap-1 px-2 py-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <button
                onClick={action.action}
                className="h-8 w-8 flex items-center justify-center bg-purple-100 rounded-full hover:bg-purple-200"
              >
                {action.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )

}