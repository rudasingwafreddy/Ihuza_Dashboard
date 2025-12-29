import { cn } from "../../utils";

export const Select = ({
  label,
  error,
  className,
  id,
  options = [],
  placeholder = "Select an option",
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primaryColor-500/50 focus:border-primaryColor-500",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "appearance-none bg-no-repeat bg-right pr-8",
          error &&
            "border-destructive focus:ring-destructive/50 focus:border-destructive",
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.5rem center",
        }}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};
