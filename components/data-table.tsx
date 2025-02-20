
'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AirQualityData } from '@/app/page';

interface DataTableProps {
  data: AirQualityData[];
  parameters: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
  isPreviousDisabled: boolean;
}

export const DataTable = ({
  data,
  parameters,
  currentPage,
  onPageChange,
  isPreviousDisabled
}: DataTableProps) => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          {parameters.map(param => (
            <TableHead key={param}>{param}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
            {parameters.map(param => (
              <TableCell key={param}>{row[param]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        disabled={isPreviousDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  </>
);