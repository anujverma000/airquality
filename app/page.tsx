"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Controls } from '@/components/controls';
import { AirQualityChart } from '@/components/chart';
import { DataTable } from '@/components/data-table';
import { ChartSkeleton, TableSkeleton } from '@/components/skeletons';
import { DATA_PAGE_SIZE, DATA_START_DATE, DEFAULT_END_DATE, DEFAULT_SELECTED_PARAMS } from '@/constants';
import { PanelBottom, PanelTop, Rows2 } from 'lucide-react';
import useAirQuality from '@/hooks/useAirQuality';

export interface AirQualityData {
  timestamp: string;
  [key: string]: number | string;
}

const DashboardPage = () => {
  const [selectedParams, setSelectedParams] = useState<string[]>(DEFAULT_SELECTED_PARAMS);
  const [startDate, setStartDate] = useState<Date>(DATA_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const [displaySetting, setDisplaySetting] = useState({
    chart: true,
    table: true
  });

  const hideTable = () => {
    setDisplaySetting({
      chart: true,
      table: false
    });
  }
  const hideChart = () => {
    setDisplaySetting({
      chart: false,
      table: true
    });
  }
  const resetDisplaySetting = () => {
    setDisplaySetting({
      chart: true,
      table: true
    });
  }

  const { data, isLoading, isError } = useAirQuality({
    selectedParams,
    startDate,
    endDate
  });

  if (isError) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <main className="p-4 sm:p-20">
      <Card>
        <CardHeader className='border-b'>
          <div className='flex flex-row flex-wrap gap-4 justify-between items-center'>
            <CardTitle>Trends</CardTitle>
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
        <CardContent className={displaySetting.chart ? '' : 'hidden'}>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <AirQualityChart data={data} parameters={selectedParams} />
          )}
        </CardContent>

        <CardHeader className='border-t'>
          <div className='flex flex-row flex-wrap gap-4 items-center justify-center  hover:bg-muted w-fit px-4 py-2 rounded-lg m-auto'>
            <Button variant='ghost' size='lg' className='p-0 h-auto text-blue-300 hover:text-blue-500' onClick={resetDisplaySetting}>
              <Rows2 />
            </Button>
            <Button variant='ghost' size='lg' className='p-0 h-auto text-blue-300 hover:text-blue-500' onClick={hideTable}>
              <PanelBottom />
            </Button>
            <Button variant='ghost' size='lg' className='p-0 h-auto text-blue-300 hover:text-blue-500' onClick={hideChart}>
              <PanelTop />
            </Button>
          </div>
        </CardHeader>

        <CardContent className={displaySetting.table ? '' : 'hidden'}>
          {isLoading ? (
            <TableSkeleton columns={DATA_PAGE_SIZE} />
          ) : (
            <DataTable
              data={data}
              parameters={selectedParams}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardPage;