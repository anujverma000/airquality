"use client"

import { AirQualityData } from '@/app/page';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { LineChart, BarChart } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CHART_COLORS_DARK, CHART_COLORS_LIGHT, CHART_TYPES, DEFAULT_CHART_TYPE, DEFAULT_THEME, MAX_LEGEND_COUNT } from '@/constants';
import { cn } from '@/lib/utils';

interface ChartProps {
  data: AirQualityData[];
  parameters: string[];
}

type ChartType = 'line' | 'bar';

export const AirQualityChart = ({ data, parameters }: ChartProps) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const [charType, setChartType] = useState<ChartType>(() => localStorage.getItem("chart_type") as ChartType || DEFAULT_CHART_TYPE);
  useEffect(() => localStorage.setItem("chart_type", `${charType}`), [charType]);

  const [isSmooth, setSmooth] = useState(() => localStorage.getItem("smooth_chart") === 'true');
  useEffect(() => localStorage.setItem("smooth_chart", `${isSmooth}`), [isSmooth]);

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

  useEffect(() => {
    if (data.length === 1) {
      setChartType('bar')
    }
  }, [data]);

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
      data: data?.map(d => d.timestamp),
    },
    yAxis: { type: 'value' },
    series: parameters.map((param, index) => ({
      name: param,
      type: charType,
      smooth: isSmooth,
      symbol: 'none',
      itemStyle: { type: index % 2 === 0 ? 'solid' : 'dashed' },
      data: data?.map(d => [d.timestamp, d[param]])
    })),
    color: theme === "light" ? CHART_COLORS_LIGHT : CHART_COLORS_DARK,
    legend: {
      data: parameters.slice(0, MAX_LEGEND_COUNT),
      paddingTop: 10,
      top: 0,
    }
  };

  const handleSmoothChange = () => {
    setSmooth(!isSmooth);
  }

  return <>
    <div className="flex justify-between items-center p-4 border-b bg-muted">
      <div className='flex gap-2 items-center'>
        <Label className='hidden sm:block'>Chart Type</Label>
        {CHART_TYPES.map((key) => {
          const chart = key.toLowerCase() as ChartType;
          return (
            <button
              key={chart}
              data-active={charType === chart}
              className="flex flex-col justify-center gap-1 p-2 rounded text-left data-[active=true]:bg-amber-300"
              onClick={() => setChartType(chart)}
            >
              <span className="text-xs">
                {chart === 'line' && <div className='flex gap-2 justify-center items-start'><LineChart className='w-4 h-4' /> <Label>Line</Label></div>}
                {chart === 'bar' && <div className='flex gap-2 justify-center items-start'><BarChart className='w-4 h-4' />  <Label>Bar</Label></div>}
              </span>
            </button>
          )
        })}
      </div>
      <div className={cn("flex items-center space-x-2", charType === 'bar' ? 'hidden' : '')}>
        <Switch id="smooth-chart"
          checked={isSmooth}
          onCheckedChange={handleSmoothChange}
        />
        <Label htmlFor="smooth-chart" className='cursor-pointer'>Smooth Chart</Label>
      </div>
    </div>
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} theme={theme} />
  </>
};