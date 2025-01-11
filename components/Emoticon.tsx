'use client';

import { useToast } from "@/hooks/use-toast";

interface EmoticonProps {
  label: string;
}

export const Emoticon = ({ label }: EmoticonProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(label);
    toast({
      title: 'Copied to clipboard',
      description: 'You can now paste it anywhere',
    });
  }

  return (
    <div
      className='bg-gray-200 h-48 rounded-3xl text-black flex flex-col items-center justify-center text-2xl cursor-pointer group'
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