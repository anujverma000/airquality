
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AirQualityData } from '@/app/page';
import { format } from "date-fns"
import { DATA_PAGE_SIZE } from '@/constants';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DataTableProps {
  data: AirQualityData[];
  parameters: string[];
}

export const DataTable = ({ data, parameters }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isPreviousDisabled = currentPage === 0;
  const isNextDisabled = (currentPage + 1) * DATA_PAGE_SIZE >= data.length;
  const totalPages = Math.ceil(data.length / DATA_PAGE_SIZE);
  const renderData = data.slice(currentPage * DATA_PAGE_SIZE, (currentPage + 1) * DATA_PAGE_SIZE);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table>
        <TableHeader className='bg-muted h-16'>
          <TableRow>
            <TableHead>Date</TableHead>
            {parameters.map(param => (
              <TableHead key={param}>{param}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderData?.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className='text-xs whitespace-nowrap'>{format(new Date(row.timestamp), "LLL dd, y __ p").split("__")[0]}</div>
                <div className='text-muted-foreground whitespace-nowrap text-xs hidden sm:block'>{format(new Date(row.timestamp), "LLL dd, y __ p").split("__")[1]}</div>
              </TableCell>
              {parameters.map(param => (
                <TableCell key={param}>
                  <span className='text-xs'>{row[param]}</span>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {
            totalPages === 0 && (
              <TableRow>
                <TableCell colSpan={parameters.length + 1} className='text-center'>No data available</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      <div className={cn("flex justify-center sm:justify-between items-center gap-2 my-4 border-t px-4 pt-4", totalPages <= 1 && 'hidden')}>
        <p className='text-xs hidden sm:block'>Showing {currentPage * DATA_PAGE_SIZE + 1} to {Math.min((currentPage + 1) * DATA_PAGE_SIZE, data.length)} of {data.length}</p>
        <div className='flex items-center gap-4'>
          <Button
            variant="outline"
            disabled={isPreviousDisabled}
            className='w-24 bg-transparent'
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className='border px-4 py-2 rounded-full text-xs'>{currentPage + 1} / {totalPages}</span>
          <Button
            variant="outline"
            className='w-24 bg-transparent'
            disabled={isNextDisabled}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
};