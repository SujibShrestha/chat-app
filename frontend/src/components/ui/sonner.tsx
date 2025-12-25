import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-600" />,
        info: <InfoIcon className="size-4 text-green-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-green-500" />,
      }}
      style={
        {
          "--normal-bg": "#D7F4E8",          // soft green background
          "--normal-text": "#065F46",        // dark green text
          "--normal-border": "#34D399",      // green border
          "--border-radius": "12px",         // rounded corners
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
