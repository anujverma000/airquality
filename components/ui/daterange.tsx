"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
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
}

function DateRangePicker({
  from,
  to,
  onStartDateChange,
  onEndDateChange,

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
            "w-fit justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
        />
        <div className="p-2">
          <Button onClick={applyDateFilter} className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
