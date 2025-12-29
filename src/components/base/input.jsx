import { cn } from "../../utils";

export const Input = ({
  label,
  error,
  className,
  id,
  type = "text",
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          "w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primaryColor-500/50 focus:border-primaryColor-500",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error &&
            "border-destructive focus:ring-destructive/50 focus:border-destructive",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};
