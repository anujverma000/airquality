'use client';
import { MultiSelect } from '@/components/ui/multiselect';
import { DateRangePicker } from './ui/daterange';
import { SearchParameters } from '@/app/page';

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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    />
    <DateRangePicker from={startDate} to={endDate} onStartDateChange={onStartDateChange} onEndDateChange={onEndDateChange} />
  </div>
);