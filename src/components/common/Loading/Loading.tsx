import { cn } from "@/lib/helpers";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loading({ size = "md", className, text }: LoadingProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-primary-200 border-t-primary-500",
          sizes[size]
        )}
      />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}
