'use client';

import { useToast } from "@/hooks/use-toast";
import { ActionBar } from "./ActionBar";
import { Emoticon as EmoticonType } from "@/libs/emoticons";
import { LocaleDict } from "@/app/[lang]/dictionaries";
import { usePostHog } from "posthog-js/react";
import { BookmarkIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface EmoticonProps {
  emoticon: EmoticonType;
  isFav: boolean;
  /**
   * If value set, the emoticon will be displayed with fixed size.
   * @default 'text-2xl'
   */
  fixedTextSize?: string;
  /**
   * To show the action bar as part of the emoticon display
   * @default false
   */
  withActions?: boolean;
  dict: LocaleDict;
  addOp: (userId: string, emoticonId: string) => Promise<boolean>;
  removeOp: (userId: string, emoticonId: string) => Promise<boolean>;
}

const POSTHOG_VIA = 'card';

export const Emoticon = ({ emoticon, fixedTextSize, withActions = false, dict, isFav = false, addOp, removeOp }: EmoticonProps) => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const { userId } = useAuth();

  const characterCount = emoticon.display.length;

  const copyToClipboard = () => {
    posthog.capture('emoticon_copy', {
      emoticon: emoticon.display,
      emoticon_id: emoticon.id,
      user_id: userId,

      via: POSTHOG_VIA,
    });

    navigator.clipboard.writeText(emoticon.display);
    toast({
      title: dict.toast.copy.title,
      description: dict.toast.copy.description,
    });
  }

  let textSize = 'text-3xl';
  if (characterCount >= 28) {
    textSize = 'text-xs'
  } else if (characterCount >= 24) {
    textSize = 'text-sm'
  } else if (characterCount >= 20) {
    textSize = 'text-md';
  } else if (characterCount >= 16) {
    textSize = 'text-lg';
  } else if (characterCount >= 12) {
    textSize = 'text-xl';
  } else if (characterCount >= 8) {
    textSize = 'text-2xl';
  }

  if (fixedTextSize) {
    textSize = fixedTextSize;
  }

  return (
    <div className="relative">
      <div
        className={`bg-white h-64 rounded-3xl text-black flex flex-col items-center justify-center ${textSize} cursor-pointer group hover:border-2 hover:border-purple-500 outline-purple-500`}
        onClick={copyToClipboard}
        tabIndex={0}
      >
        {isFav && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 text-purple-600">
              <BookmarkIcon />
            </div>
          </div>
        )}
        <div
          className="grow flex items-center group-hover:text-purple-500 font-[family-name:var(--font-geist-sans)]"
        >
          {emoticon.display}
        </div>
        {withActions && (
          <ActionBar emoticon={emoticon} dict={dict} isFav={isFav} addOp={addOp} removeOp={removeOp} />
        )}
      </div>
    </div>
  )
}