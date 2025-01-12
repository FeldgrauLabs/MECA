'use client';

import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { CopyIcon, ShareIcon } from "lucide-react";

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
    navigator.clipboard.writeText(`${window.location.href}/${emoticon.id}`);
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
          <button
            key={action.label}
            onClick={action.action}
            className="h-8 w-8 flex items-center justify-center bg-purple-100 rounded-full hover:bg-purple-200"
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  )

}