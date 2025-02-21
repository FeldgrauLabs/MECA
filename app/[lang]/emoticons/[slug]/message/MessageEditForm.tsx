'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const MessageEditForm = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    startTransition(() => {

      e.preventDefault();

      if (message.trim() === '') {
        return;
      }

      // redirect to the same page, but 
      // 1. remove the `edit` query param
      // 2. add the `text` query param with the message
      const path = `${pathname}?text=${encodeURIComponent(message)}`;
      router.push(path);
    })
  }

  return (
    <div>
      <form
        className="flex flex-row py-4 gap-2"
        onSubmit={onSubmit}
      >
        <Input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          className="bg-white"
        />
        <Button type="submit" disabled={isPending}>
          Submit
          {isPending && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </div>
  )

};