import Link from "next/link"
import { MecaBear } from "./MecaBear"
import { BookIcon, GithubIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export const TopBar = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full h-16 flex justify-between items-center">
        <Link href='/' className="text-2xl">
          <MecaBear />
        </Link>
        <div className="flex gap-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='/emoticons' className="hover:text-purple-600">
                <BookIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse</p>
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
              <p>Source Code</p>
            </TooltipContent>
          </Tooltip>

        </div>
      </div>
    </div>
  )
}