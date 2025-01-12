'use client';

import { constructEmoticonPath } from "@/components/ActionBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { CopyIcon, ShareIcon } from "lucide-react";

interface ButtonsProps {
  emoticon: Emoticon;
}

export const Buttons = ({ emoticon }: ButtonsProps) => {
  const { toast } = useToast();

  const { display } = emoticon;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: 'Copied to clipboard',
      description: 'You can now paste it anywhere',
    });
  }

  const copyUrl = () => {
    const url = constructEmoticonPath(emoticon.id);
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied URL',
      description: 'You can now share this link',
    });
  }

  const actions = [
    { label: 'Copy', icon: <CopyIcon />, onClick: copyToClipboard },
    { label: 'Share', icon: <ShareIcon />, onClick: copyUrl },
  ]

  return (
    <div className="flex flex-col gap-2 py-4">
      {actions.map((action, i) => (
        <Button key={i} size='lg' className="rounded-xl" onClick={action.onClick} variant='outline'>
          {action.icon} {action.label}
        </Button>
      ))}
    </div>
  )
}