import { cva } from "class-variance-authority";
import { cn } from "../../utils";

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-transparent font-medium whitespace-nowrap transition-shadow px-2.5 py-1 text-xs",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary:
          "bg-primaryColor-50/85 text-primaryColor-800 dark:bg-primaryColor-500/20 dark:text-primaryColor-400",
        accent:
          "bg-accent-50/85 text-accent-800 dark:bg-accent-500/20 dark:text-accent-400",
        success:
          "bg-emerald-50/85 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
        warning:
          "bg-amber-50/85 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
        error: "bg-red-50/85 text-red-800 dark:bg-red-500/20 dark:text-red-400",
        muted: "bg-muted/85 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const textToVariant = {
  Admin: "accent",
  Manager: "primary",
  Staff: "default",
  Active: "success",
  Inactive: "error",
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "error",
};

export const Badge = ({ variant = "default", text, className }) => {
  const resolvedVariant = textToVariant[text] || variant;

  return (
    <div className={cn(badgeVariants({ variant: resolvedVariant, className }))}>
      {text}
    </div>
  );
};
