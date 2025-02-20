import { Skeleton } from '@/components/ui/skeleton';

export const ChartSkeleton = () => (
  <Skeleton className="w-full h-[400px]" />
);

export const TableSkeleton = ({ columns }: { columns: number }) => (
  <>
    {Array(columns).fill(0).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full mb-2" />
    ))}
    <div className="flex gap-2 justify-end mt-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </>
);