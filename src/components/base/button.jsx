import { cva } from "class-variance-authority";
import { cn } from "../../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primaryColor-500 text-background hover:bg-primaryColor-600 shadow-sm",
        primary:
          "bg-primaryColor-500 text-background hover:bg-primaryColor-600 shadow-sm",
        accent:
          "bg-accent-500 text-accent-foreground hover:bg-accent-600 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-muted/50",
        ghost: "text-foreground hover:bg-muted/50",
        link: "text-primaryColor-400 underline hover:text-primaryColor-600 px-0",
        danger:
          "bg-destructive text-background hover:bg-destructive/90 shadow-sm",
        success: "bg-success text-background hover:bg-success/90 shadow-sm",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const Button = ({ variant, size, className, children, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
