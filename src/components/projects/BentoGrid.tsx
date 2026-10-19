import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export default function BentoGrid({ children, columns = 3 }: BentoGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 md:gap-8`}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoItem({
  children,
  className = "",
  span = 1,
  rowSpan = 1,
}: BentoItemProps) {
  const spanClasses = span === 2 ? "md:col-span-2" : "";
  const rowSpanClasses = rowSpan === 2 ? "md:row-span-2" : "";

  return (
    <div className={`${spanClasses} ${rowSpanClasses} ${className}`}>
      {children}
    </div>
  );
}
