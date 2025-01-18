import { MecaBear } from "@/components/MecaBear";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { getDictionary, SupportedLang } from "./dictionaries";
import { currentUser } from "@clerk/nextjs/server";
import { FlashBanner } from "@/components/FlashBanner";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const user = await currentUser();
  let name;

  if (user && (user.firstName || user.lastName)) {
    name = `${user.firstName} ${user.lastName}`;
  }

  return (
    <div className="grid grid-rows-3 items-center justify-items-center min-h-[calc(100vh-8rem)] p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 h-full w-full flex flex-col">
        <FlashBanner />
        <div className="flex grow items-end justify-center">
          {name && (
            <div className="flex items-end p-3 m-2 bg-purple-600 text-gray-50 rounded-xl rounded-bl-none text-sm transform translate-x-28 max-w-40">
              <span className="truncate">
                Hello {name}
              </span>
            </div>
          )}
        </div>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-4xl w-full items-center flex justify-center cursor-pointer">
          <MecaBear />
        </div>
        <div className="text-2xl w-full items-center flex justify-center gap-2">
          <div>
            <span className="font-bold text-purple-600">M</span>ake
          </div>
          <div>
            <span className="font-bold text-purple-600">E</span>moticons
          </div>
          <div>
            <span className="font-bold text-purple-600">C</span>ool
          </div>
          <div>
            <span className="font-bold text-purple-600">A</span>gain
          </div>
        </div>

        <div className="relative w-full">
          <div className="flex justify-center items-center gap-2">
            <span className="absolute -left-28 animate-poke-right transform translate-x-full">(☞ﾟヮﾟ)☞</span>
            <Link
              className="rounded-full border border-solid border-black/[.4] transition-colors flex items-center justify-center hover:bg-foreground hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/lucky"
            >
              {dict.landing.feelingLucky}
            </Link>
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/emoticons"
              rel="noopener noreferrer"
              prefetch
            >
              {dict.landing.browseAll}
            </Link>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href='https://github.com/FeldgrauLabs/MECA'
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          {dict.common.sourceCode}
        </a>
      </footer>
    </div>
  );
}
