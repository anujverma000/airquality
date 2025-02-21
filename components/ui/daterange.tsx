"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePicker {
  from: Date;
  to: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  min?: Date;
  max?: Date;
}

function DateRangePicker({
  from,
  to,
  onStartDateChange,
  onEndDateChange,
  min,
  max,

}: DateRangePicker) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from,
    to,
  })

  const applyDateFilter = () => {
    setIsOpen(false)
    if (date?.from) {
      onStartDateChange(date.from)
    }
    if (date?.to) {
      onEndDateChange(date.to)
    }
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-64 justify-start text-left font-normal bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {
            date?.from ? 
            (date.to ? <>{formatDate(date.from)} - {formatDate(date.to)}</> : <>{formatDate(date.from)} -</>) 
            : <span>Pick a date range</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          fromDate={min}
          toDate={max}
        />
        <div className="p-2">
          <Button onClick={applyDateFilter} className="w-full" disabled={!date?.from || !date?.to}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
