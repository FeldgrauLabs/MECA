import { Loader2Icon } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <Loader2Icon className="animate-spin text-purple-600" size="64" />
    </div>
  )
}