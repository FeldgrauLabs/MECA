import Link from "next/link"
import { MecaBear } from "./MecaBear"
import { BookIcon, GithubIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { LocaleDict } from "@/app/[lang]/dictionaries"

export const TopBar = ({ dict }: { dict: LocaleDict }) => {
  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="w-full h-16 flex justify-between items-center">
        <Link href='/' className="text-2xl">
          <MecaBear />
        </Link>
        <div className="flex gap-4 md:gap-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='/emoticons' className="hover:text-purple-600">
                <BookIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.common.browse}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* FIXME: Replace with repo link */}
              <Link href='https://github.com' target="_blank" className="hover:text-purple-600">
                <GithubIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.common.sourceCode}</p>
            </TooltipContent>
          </Tooltip>

        </div>
      </div>
    </div>
  )
}