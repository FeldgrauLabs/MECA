'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MessageEditForm = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    // redirect to the same page, but 
    // 1. remove the `edit` query param
    // 2. add the `text` query param with the message
    const path = `${pathname}?text=${encodeURIComponent(message)}`;
    router.push(path);
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )

};