import { cn } from "../../utils";

export const Textarea = ({
  label,
  error,
  className,
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          "w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground resize-none",
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
