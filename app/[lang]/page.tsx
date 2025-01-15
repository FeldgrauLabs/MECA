import { MecaBear } from "@/components/MecaBear";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { getDictionary, SupportedLang } from "./dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>
}) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-4rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/" // FIXME: Replace with this repo link
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
