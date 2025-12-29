import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as BaseToaster } from "sonner";
import { useTheme } from "../../contexts/theme-context";

const Toaster = ({ ...props }) => {
  const { theme = "light" } = useTheme();

  return (
    <BaseToaster
      theme={theme}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group border bg-background text-foreground shadow-lg rounded-xl",
          title: "text-sm font-medium",
          description: "text-sm opacity-90",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3 py-1.5 rounded-md font-medium",
          cancelButton:
            "bg-muted text-muted-foreground hover:bg-muted/80 text-xs px-3 py-1.5 rounded-md font-medium",
          closeButton:
            "bg-background border text-foreground hover:bg-muted rounded-full",
          success:
            "!bg-green-100 dark:!bg-green-950/50 !text-green-800 dark:!text-green-200 !border-green-200 dark:!border-green-800/50 [&_svg]:!text-green-600 dark:[&_svg]:!text-green-400",
          error:
            "!bg-red-100 dark:!bg-red-950/50 !text-red-800 dark:!text-red-200 !border-red-200 dark:!border-red-800/50 [&_svg]:!text-red-600 dark:[&_svg]:!text-red-400",
          warning:
            "!bg-amber-100 dark:!bg-amber-950/50 !text-amber-800 dark:!text-amber-200 !border-amber-200 dark:!border-amber-800/50 [&_svg]:!text-amber-600 dark:[&_svg]:!text-amber-400",
          info: "!bg-blue-100 dark:!bg-blue-950/50 !text-blue-800 dark:!text-blue-200 !border-blue-200 dark:!border-blue-800/50 [&_svg]:!text-blue-600 dark:[&_svg]:!text-blue-400",
          loading: "!border-muted-foreground/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
