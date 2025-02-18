import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'
import { AirQuality } from '@prisma/client'

const PARAM_MAP: { [key: string]: string } = {
  'CO': 'co_gt',
  'PT08_S1_CO': 'pt08_s1_co',
  'NMHC': 'nmhc_gt',
  'Benzene': 'c6h6_gt',
  'PT08_S2_NMHC': 'pt08_s2_nmhc',
  'NOx': 'nox_gt',
  'PT08_S3_NOx': 'pt08_s3_nox',
  'NO2': 'no2_gt',
  'PT08_S4_NO2': 'pt08_s4_no2',
  'PT08_S5_O3': 'pt08_s5_o3',
  'Temperature': 'temperature',
  'Humidity': 'rh',
  'Absolute_Humidity': 'ah'
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const params = url.searchParams
    
    // Get main parameter to select
    const parameter = params.get('parameter')
    if (!parameter || !PARAM_MAP[parameter]) {
      return NextResponse.json(
        { 
          message: 'Invalid parameter',
          valid_parameters: Object.keys(PARAM_MAP)
        },
        { status: 400 }
      )
    }

    // Build date filter
    const dateFilter = {
      ...(params.get('start_date') && { gte: new Date(params.get('start_date')!) }),
      ...(params.get('end_date') && { lte: new Date(params.get('end_date')!)})
    }

    // Build additional filters
    const filters: { [key: string]: number } = {}
    params.forEach((value, key) => {
      if (key === 'parameter' || key === 'start_date' || key === 'end_date') return
      
      if (PARAM_MAP[key]) {
        const dbField = PARAM_MAP[key] as keyof AirQuality
        const numericValue = parseFloat(value)
        if (!isNaN(numericValue)) {
          filters[dbField] = numericValue
        }
      }
    })

    // Combine all filters
    const whereClause = {
      ...(Object.keys(dateFilter).length > 0 && { timestamp: dateFilter }),
      ...filters
    }

    // Execute query
    const data = await prisma.airQuality.findMany({
      where: whereClause,
      select: {
        timestamp: true,
        [PARAM_MAP[parameter]]: true
      },
      orderBy: { timestamp: 'asc' }
    })

    // Format response
    const formatted = data.map(item => ({
      timestamp: (item.timestamp as Date).toISOString(),
      value: item[PARAM_MAP[parameter] as keyof typeof item]
    }))

    return NextResponse.json(formatted)

  } catch (error: any) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    )
  }
}