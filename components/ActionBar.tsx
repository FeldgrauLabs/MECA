'use client';

import { useToast } from "@/hooks/use-toast";
import { Emoticon } from "@/libs/emoticons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BookmarkIcon, BookmarkXIcon, CopyIcon, ShareIcon } from "lucide-react";
import { LocaleDict } from "@/app/[lang]/dictionaries";
import { usePostHog } from "posthog-js/react";
import { useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";

export const constructEmoticonPath = (id: string) => {
  const url = new URL(window.location.href);
  url.pathname = `/emoticons/${id}`;
  url.search = '';

  return url.toString();
}

interface Action {
  label: string;
  icon: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  disabledMessage?: string;
}

const POSTHOG_VIA = 'action_button'

export const ActionBar = ({ emoticon, dict, isFav = false, addOp, removeOp }: {
  emoticon: Emoticon,
  dict: LocaleDict,
  addOp: (userId: string, emoticonId: string) => Promise<boolean>;
  removeOp: (userId: string, emoticonId: string) => Promise<boolean>;
  isFav?: boolean
}) => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const { userId } = useAuth();

  const { display } = emoticon;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();

    posthog.capture('emoticon_copy', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

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
    { icon: <CopyIcon className="w-4 h-4" />, label: dict.common.copy, onClick: copyToClipboard, },
    {
      icon: <ShareIcon className="w-4 h-4" />, label: dict.common.share, onClick: copyUrl
    },
  ]

  if (!userId) {
    actions.push(
      {
        label: dict.common.addToFav,
        icon: <BookmarkIcon className="w-4 h-4" />,
        onClick: (e) => {
          e.stopPropagation();
        },
        disabled: true,
        disabledMessage: dict.common.loginToAction
      },
    )
  } else {
    if (isFav) {
      actions.push(
        {
          label: dict.common.removeFromFav,
          icon: <BookmarkXIcon className="w-4 h-4" />,
          onClick: async (e) => {
            e.stopPropagation();
            await removeFromCollection(userId)
          }
        },
      )
    } else {
      actions.push(
        {
          label: dict.common.addToFav,
          icon: <BookmarkIcon className="w-4 h-4" />,
          onClick: async (e) => {
            e.stopPropagation();
            await addToCollection(userId);
          }
        },
      )
    }
  }

  return (
    <div className="absolute bottom-4">
      <div className="flex gap-1 px-2 py-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  if (action.disabled) {
                    return;
                  }
                  return action.onClick(e);
                }}
                className="h-8 w-8 flex items-center justify-center bg-purple-100 rounded-full hover:bg-purple-200"
              >
                {action.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{action.disabled && action.disabledMessage ? action.disabledMessage : action.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )

}