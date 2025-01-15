'use client';

import { useToast } from "@/hooks/use-toast";
import { ActionBar } from "./ActionBar";
import { Emoticon as EmoticonType } from "@/libs/emoticons";
import { LocaleDict } from "@/app/[lang]/dictionaries";

interface EmoticonProps {
  emoticon: EmoticonType;
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
}

export const Emoticon = ({ emoticon, fixedTextSize, withActions = false, dict }: EmoticonProps) => {
  const { toast } = useToast();

  const characterCount = emoticon.display.length;

  const copyToClipboard = () => {
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
        <div
          className="grow flex items-center group-hover:text-purple-500 font-[family-name:var(--font-geist-sans)]"
        >
          {emoticon.display}
        </div>
        {withActions && (
          <ActionBar emoticon={emoticon} dict={dict} />
        )}
      </div>
    </div>
  )
}