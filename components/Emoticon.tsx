'use client';

import { useToast } from "@/hooks/use-toast";

interface EmoticonProps {
  label: string;
  /**
   * If value set, the emoticon will be displayed with fixed size.
   * @default 'text-2xl'
   */
  fixedTextSize?: string;
}

export const Emoticon = ({ label, fixedTextSize }: EmoticonProps) => {
  const { toast } = useToast();

  const characterCount = label.length;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(label);
    toast({
      title: 'Copied to clipboard',
      description: 'You can now paste it anywhere',
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

  return (
    <div
      className={`bg-gray-200 h-48 rounded-3xl text-black flex flex-col items-center justify-center ${textSize} cursor-pointer group`}
      onClick={copyToClipboard}
    >
      <div
        className="grow flex items-center group-hover:text-purple-500"
      >
        {label}
      </div>
    </div>
  )
}