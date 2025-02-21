"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

interface SelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  preText?: string;
}

const MultiSelect = ({ placeholder, options, selectedOptions, setSelectedOptions, preText = '' }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(selectedOptions)
  const isOptionSelected = (value: string): boolean => {
    return selected.includes(value)
  };

  const applyParamsFilter = () => {
    setIsOpen(false)
    setSelectedOptions(selected)
  }

  const select = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((val) => val !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const selectAll = () => {
    setSelected(options.map(option => option.value))
  }
  const selectOnly = (value) => {
    setSelected([value])
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal bg-transparent",
            selected.length == 0 && "text-muted-foreground"
          )}>
          {selectedOptions.length > 0 ? <><span className='hidden sm:block'>{preText}</span><SelectedOptions selectedOptions={selectedOptions} /></> : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-row border-b items-center justify-between p-2 w-full">
          <Button className="text-blue-800 text-xs p-0 h-fit" variant="link" onClick={selectAll}>Select All</Button>
        </div>
        {options.map(({ label, value }, index) => {
          return (
            <div key={index} className="flex items-center gap-2 py-1.5 px-2 hover:bg-muted rounded justify-between group">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={label}
                  onSelect={(e) => e.preventDefault()}
                  checked={isOptionSelected(value)}
                  onCheckedChange={() => select(value)}
                />
                <Label
                  htmlFor={label}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {label}
                </Label>
              </div>
              <Button className="text-blue-800 text-xs p-0 hidden group-hover:block h-fit" variant="link" onClick={() => selectOnly(value)}>Only</Button>
            </div>
          );
        })}
        <div className="p-2">
          <Button onClick={applyParamsFilter} className="w-full" disabled={selected.length === 0}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover >
  )
}

const SelectedOptions = ({ selectedOptions }: { selectedOptions: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedOptions.slice(0, 2).map((option) => (
        <Badge key={option} className="rounded-full font-normal">
          {option}
        </Badge>
      ))}
      {selectedOptions.length > 2 && <Badge variant="secondary" className="rounded-full font-normal">+{selectedOptions.length - 2} parameters</Badge>}
    </div>
  )
}

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }