'use client';
import { AirQualityData } from '@/app/page';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { LineChart, BarChart } from "lucide-react"

interface ChartProps {
  data: AirQualityData[];
  parameters: string[];
}

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#413ea0'];
const LegentCount = 3
type ChartType = 'line' | 'bar';

export const AirQualityChart = ({ data, parameters }: ChartProps) => {
  const [charType, setChartType] = useState<ChartType>('line');
  const [theme, setTheme] = useState('light');
  const updateTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  };
  useEffect(() => {
    updateTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateTheme();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
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
      data: parameters.slice(0, LegentCount),
      paddingTop: 10,
      bottom: 0,
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
            className="flex flex-col justify-center gap-1 p-2 rounded text-left data-[active=true]:bg-amber-300"
            onClick={() => setChartType(chart)}
          >
            <span className="text-xs text-muted-foreground">
              {chart === 'line' && <div className='flex gap-2 justify-center items-start'><LineChart className='w-4 h-4'/> Line</div>}
              {chart === 'bar' &&  <div className='flex gap-2 justify-center items-start'><BarChart className='w-4 h-4'/>  Bar</div>}
            </span>
          </button>
        )
      })}
    </div>
    <ReactECharts option={options} style={{ height: 300, width: '100%' }} theme={theme} />
  </>
};