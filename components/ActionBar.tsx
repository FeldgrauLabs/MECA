'use client';

import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CopyIcon, ShareIcon } from "lucide-react";

export const constructEmoticonPath = (id: string) => {
  const url = new URL(window.location.href);
  url.pathname = `/emoticons/${id}`;
  url.search = '';

  return url.toString();
}

export const ActionBar = ({ emoticon }: { emoticon: Emoticon }) => {
  const { toast } = useToast();

  const { display } = emoticon;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(display);
    toast({
      title: 'Copied to clipboard',
      description: 'You can now paste it anywhere',
    });
  }

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = constructEmoticonPath(emoticon.id);
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied URL',
      description: 'You can now share this link',
    });
  }

  const actions = [
    { icon: <CopyIcon className="w-4 h-4" />, label: 'Copy', action: copyToClipboard, },
    {
      icon: <ShareIcon className="w-4 h-4" />, label: 'Share', action: copyUrl
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