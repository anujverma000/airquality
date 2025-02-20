import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatISODate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const formatDate = (date: Date) => {
  return format(date, DATE_FORMAT)
}

export const getStringDateTime = (date: Date) => {
  return format(date, DATE_TIME_FORMAT).split('__')
}