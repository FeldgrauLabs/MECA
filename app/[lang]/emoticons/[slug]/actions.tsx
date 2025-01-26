'use client';

import { constructEmoticonPath } from "@/components/ActionBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { BookmarkIcon, BookmarkXIcon, CopyIcon, MessageSquareIcon, ShareIcon } from "lucide-react";
import { LocaleDict } from "../../dictionaries";
import { usePostHog } from "posthog-js/react";
import { useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface ButtonsProps {
  emoticon: Emoticon;
  isFav?: boolean;
  dict: LocaleDict;

  addOp: (userId: string, emoticonId: string) => Promise<boolean>;
  removeOp: (userId: string, emoticonId: string) => Promise<boolean>;
}

interface Action {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  disabledMessage?: string;
}

const POSTHOG_VIA = 'action_button';

export const Buttons = ({ emoticon, dict, isFav = false, addOp, removeOp }: ButtonsProps) => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const { userId } = useAuth();
  const router = useRouter();

  const { display } = emoticon;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    posthog.capture('emoticon_copy', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    toast({
      title: dict.toast.copy.title,
      description: dict.toast.copy.description,
    });
  }

  const copyUrl = () => {
    posthog.capture('emoticon_share', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    const url = constructEmoticonPath(emoticon.id);
    navigator.clipboard.writeText(url);
    toast({
      title: dict.toast.share.title,
      description: dict.toast.share.description,
    });
  }

  const createMessage = () => {
    posthog.capture('emoticon_create_message', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    const url = constructEmoticonPath(emoticon.id, '/message', {
      edit: 'yes'
    });

    router.push(url);
  }

  const addToCollection = async (userId: string) => {
    await addOp(userId, emoticon.id);

    posthog.capture('emoticon_add_to_collection', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    toast({
      title: dict.toast.addToFav.title,
      description: dict.toast.addToFav.description,
    });
  }

  const removeFromCollection = async (userId: string) => {
    await removeOp(userId, emoticon.id);

    posthog.capture('emoticon_remove_from_collection', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    toast({
      title: dict.toast.removeFromFav.title,
      description: dict.toast.removeFromFav.description,
    });
  }

  const actions: Action[] = [
    { label: dict.common.copy, icon: <CopyIcon />, onClick: copyToClipboard },
    { label: dict.common.share, icon: <ShareIcon />, onClick: copyUrl },
    { label: 'Create message', icon: <MessageSquareIcon />, onClick: createMessage },
  ]

  if (!userId) {
    actions.push(
      { label: dict.common.addToFav, icon: <BookmarkIcon />, onClick: () => null, disabled: true, disabledMessage: dict.common.loginToAction },
    )
  } else {
    if (isFav) {
      actions.push(
        { label: dict.common.removeFromFav, icon: <BookmarkXIcon />, onClick: () => removeFromCollection(userId) },
      )
    } else {
      actions.push(
        { label: dict.common.addToFav, icon: <BookmarkIcon />, onClick: () => addToCollection(userId) },
      )
    }
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      {actions.map((action, i) => {
        if (action.disabled) {
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Button key={i} size='lg' className="rounded-xl" onClick={action.onClick} variant='outline' disabled={action.disabled}>
                  {action.icon} {action.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.disabledMessage ? action.disabledMessage : action.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        } else {
          return (
            <Button key={i} size='lg' className="rounded-xl" onClick={action.onClick} variant='outline'>
              {action.icon} {action.label}
            </Button>
          )
        }
      })}
    </div>
  )
}