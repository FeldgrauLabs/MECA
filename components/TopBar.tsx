import Link from "next/link"
import { MecaBear } from "./MecaBear"
import { BookIcon, GithubIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { LocaleDict } from "@/app/[lang]/dictionaries"
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"

export const TopBar = ({ dict }: { dict: LocaleDict }) => {
  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="w-full h-16 flex justify-between items-center">
        <Link href='/' className="text-3xl">
          <MecaBear />
        </Link>
        <div className="flex flex-row-reverse items-center gap-4 grow">
          <SignedOut>
            <SignInButton>
              <div className="hover:text-purple-600 rounded-full px-4 py-0.5 flex items-center justify-center border-2 border-purple-600 cursor-pointer">
                Sign In
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="border-2 border-purple-600 rounded-full h-8 w-8">
              <UserButton />
            </div>
          </SignedIn>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='/emoticons' className="hover:text-purple-600 rounded-full p-1 flex items-center justify-center border-2 border-purple-600">
                <BookIcon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dict.common.browse}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='https://github.com/FeldgrauLabs/MECA' target="_blank" className="hover:text-purple-600 rounded-full p-1 flex items-center justify-center border-2 border-purple-600">
                <GithubIcon className="h-5 w-5" />
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