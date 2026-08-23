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
        "mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {titleHindi && (
        <p className="text-sm font-semibold text-[#0EA5E9] uppercase tracking-widest mb-2 text-hindi">
          {titleHindi}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-2xl sm:text-3xl font-bold text-[#0F2A5C] leading-tight",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {accentLine && (
        <div
          className={cn(
            "mt-3 h-1 w-12 rounded-full bg-[#0EA5E9]",
            align === "center" ? "mx-auto" : ""
          )}
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base text-slate-600 max-w-2xl leading-relaxed",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
