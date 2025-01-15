'use client';

import { constructEmoticonPath } from "@/components/ActionBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { CopyIcon, ShareIcon } from "lucide-react";
import { LocaleDict } from "../../dictionaries";

interface ButtonsProps {
  emoticon: Emoticon;
  dict: LocaleDict;
}

export const Buttons = ({ emoticon, dict }: ButtonsProps) => {
  const { toast } = useToast();

  const { display } = emoticon;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: dict.toast.copy.title,
      description: dict.toast.copy.description,
    });
  }

  const copyUrl = () => {
    const url = constructEmoticonPath(emoticon.id);
    navigator.clipboard.writeText(url);
    toast({
      title: dict.toast.share.title,
      description: dict.toast.share.description,
    });
  }

  const actions = [
    { label: dict.common.copy, icon: <CopyIcon />, onClick: copyToClipboard },
    { label: dict.common.share, icon: <ShareIcon />, onClick: copyUrl },
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