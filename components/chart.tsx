'use client';
import { AirQualityData } from '@/app/page';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import { LineChart, BarChart, PieChart } from "lucide-react"

interface ChartProps {
  data: AirQualityData[];
  parameters: string[];
}

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#413ea0'];

type ChartType = 'line' | 'bar' | 'pie';

export const AirQualityChart = ({ data, parameters }: ChartProps) => {
  const [charType, setChartType] = useState<ChartType>('line');

  const options = {
    grid: { top: 40, right: 40, bottom: 40, left: 60 },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      data: data?.map(d => d.timestamp)
    },
    yAxis: { type: 'value' },
    series: parameters.map((param, index) => ({
      name: param,
      type: charType,
      smooth: true,
      symbol: 'none',
      itemStyle: { color: colors[index % colors.length] },
      data: data?.map(d => [d.timestamp, d[param]])
    })),
    legend: {
      data: parameters,
      bottom: 0
    }
  };

  return <>
    <div className="flex">
      {["line", "bar"].map((key) => {
        const chart = key.toLowerCase() as ChartType;
        return (
          <button
            key={chart}
            data-active={charType === chart}
            className="flex flex-col justify-center gap-1 px-6 py-4 text-left data-[active=true]:bg-muted/50"
            onClick={() => setChartType(chart)}
          >
            <span className="text-xs text-muted-foreground">
              {chart === 'line' && <LineChart />}
              {chart === 'bar' && <BarChart />}
              {chart === 'pie' && <PieChart />}
            </span>
          </button>
        )
      })}
    </div>
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  </>
};