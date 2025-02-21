"use client"

import { MultiSelect } from '@/components/ui/multiselect';
import { DateRangePicker } from './ui/daterange';
import { DATA_END_DATE, DATA_START_DATE, SearchParameters } from '@/constants';

interface ControlsProps {
  selectedParams: string[];
  onParamsChange: (params: string[]) => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

export const Controls = ({
  selectedParams,
  onParamsChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: ControlsProps) => (
  <div className="flex flex-row gap-4 flex-wrap">
    <MultiSelect
      selectedOptions={selectedParams}
      setSelectedOptions={onParamsChange}
      options={
        SearchParameters.map((param) => ({
          label: param,
          value: param
        }))
      }
      placeholder="Select parameters"
      preText="Selected Parameters"
    />
    <DateRangePicker
      from={startDate}
      to={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      min={DATA_START_DATE}
      max={DATA_END_DATE} />
  </div>
);