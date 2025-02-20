// "use client";
import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const MultiSelect = ({ placeholder, options, selectedOptions, setSelectedOptions }: ISelectProps) => {
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal",
            selected.length == 0 && "text-muted-foreground"
          )}>{placeholder}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {options.map(({ label, value }, index) => {
          return (
            <div key={index} className="flex items-center gap-2 py-1 px-2">
              <Checkbox
                id={label}
                onSelect={(e) => e.preventDefault()}
                checked={isOptionSelected(value)}
                onCheckedChange={() => select(value)}
              />
              <label
                htmlFor={label}
                className="text-sm font-medium leading-none"
              >
                {label}
              </label>
            </div>
          );
        })}
        <div className="p-2">
          <Button onClick={applyParamsFilter} className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover >
  )
}
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }