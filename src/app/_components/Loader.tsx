// Loader.tsx
import { cn } from "~/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-t-primary border-b-primary border-gray-200",
        sizes[size],
        className
      )}
    />
  );
}
