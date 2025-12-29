import { cva } from "class-variance-authority";
import { cn } from "../utils";

const iconCardVariants = cva("flex rounded-lg justify-center items-center", {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      primary:
        "bg-primaryColor-50/85 text-primaryColor-600 dark:bg-primaryColor-500/20 dark:text-primaryColor-400",
      accent:
        "bg-accent-50/85 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400",
      success:
        "bg-green-50/85 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      warning:
        "bg-amber-50/85 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      error: "bg-red-50/85 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      ghost: "bg-transparent text-muted-foreground",
      "primary-inverse": "bg-primaryColor-500 text-white",
    },
    size: {
      sm: "size-6 p-1",
      md: "size-8 p-1.5",
      lg: "size-10 p-2",
    },
    type: {
      filled: "",
      outline: "border-none !bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    type: "filled",
  },
});

const iconSizeMap = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

export const IconCard = ({
  icon: Icon,
  variant,
  size = "md",
  type,
  className,
}) => {
  return (
    <div className={cn(iconCardVariants({ variant, size, type, className }))}>
      <Icon className={iconSizeMap[size]} />
    </div>
  );
};
