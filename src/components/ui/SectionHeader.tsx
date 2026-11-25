import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  titleHindi?: string;
  subtitle?: string;
  align?: "left" | "center";
  accentLine?: boolean;
  className?: string;
  id?: string;
}

export function SectionHeader({
  title,
  titleHindi,
  subtitle,
  align = "center",
  accentLine = true,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {titleHindi && (
        <p className="text-xs sm:text-sm font-bold text-[#B77B50] uppercase tracking-widest mb-1.5 text-hindi">
          {titleHindi}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold text-[#242426] leading-tight tracking-tight font-display scroll-mt-28 lg:scroll-mt-32",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {accentLine && (
        <div
          className={cn(
            "mt-2.5 h-1 w-12 rounded-full bg-[#B77B50]",
            align === "center" ? "mx-auto" : ""
          )}
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base text-[#686469] max-w-2xl leading-relaxed text-hindi",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
