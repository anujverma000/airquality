'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Controls } from '@/components/controls';
import { AirQualityChart } from '@/components/chart';
import { DataTable } from '@/components/data-table';
import { ChartSkeleton, TableSkeleton } from '@/components/skeletons';
import { formatDate } from '@/lib/utils';
import { SearchParameters } from '@/constants';
export interface AirQualityData {
  timestamp: string;
  [key: string]: number | string;
}

const DashboardPage = () => {
  const [selectedParams, setSelectedParams] = useState<string[]>(SearchParameters);
  const [startDate, setStartDate] = useState<Date>(new Date('2004-03-10'));
  const [endDate, setEndDate] = useState<Date>(new Date('2005-04-04'));
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['airQualityData', selectedParams, startDate, endDate, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        parameters: selectedParams.join('__'),
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      });

      const response = await fetch(`/api/time-series?${params}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    },
    staleTime: 1000 * 60
  });

  if (isError) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className='flex flex-row flex-wrap gap-4 justify-between items-center'>
            <CardTitle>Air Quality Trends</CardTitle>
            <Controls
              selectedParams={selectedParams}
              onParamsChange={setSelectedParams}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />

          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <AirQualityChart data={data} parameters={selectedParams} />
          )}
        </CardContent>



        <CardContent>
          {isLoading ? (
            <TableSkeleton columns={selectedParams.length + 1} />
          ) : (
            <DataTable
              data={data}
              parameters={selectedParams}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isPreviousDisabled={currentPage === 1 || isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;