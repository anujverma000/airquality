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
type DisplayKey = keyof typeof PARAM_MAP;
type DbKey = typeof PARAM_MAP[DisplayKey];

const REVERSE_PARAM_MAP = Object.entries(PARAM_MAP).reduce((acc, [key, value]) => {
  acc[value] = key as DisplayKey;
  return acc;
}, {} as Record<DbKey, DisplayKey>);

const DEFAULT_ALL_PARAMETERS = Object.keys(PARAM_MAP)
export const dynamic = 'force-dynamic'
const CACHE_MAX_AGE = 60 // cache for 1 minute

/**
 * @openapi
 * /time-series:
 *   get:
 *     summary: Get time series data for a specific parameter
 *     tags:
 *       - Time Series
 *     parameters:
 *       - in: query
 *         name: parameters
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['CO', 'PT08_S1_CO', 'NMHC', 'Benzene', 'PT08_S2_NMHC', 'NOx', 'PT08_S3_NOx', 'NO2', 'PT08_S4_NO2', 'PT08_S5_O3', 'Temperature', 'Humidity', 'Absolute_Humidity']
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: date
 *           format: date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: date
 *           format: date
 *     responses:
 *       200:
 *         description: Time series data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   value:
 *                     type: number
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const params = url.searchParams
    
    // Get all parameters to select
    const parameters = (params.get('parameters') || DEFAULT_ALL_PARAMETERS.join('__')).split('__')
    let validParams = parameters.filter(p => DEFAULT_ALL_PARAMETERS.includes(p));
    if (validParams.length === 0) {
      validParams = DEFAULT_ALL_PARAMETERS
    }
    // Build date filter
    const dateFilter = {
      ...(params.get('start_date') && { gte: new Date(params.get('start_date')!) }),
      ...(params.get('end_date') && { lte: new Date(params.get('end_date')!)})
    }

    // Build additional filters
    const filters: Array<{ [key: string]: number }> = []
    params.forEach((value, key) => {
      if (key === 'parameters' || key === 'start_date' || key === 'end_date') return
      
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
    const selectedFields = {}
    for (const param of validParams) {
      selectedFields[PARAM_MAP[param]] = true
    }

    // Execute query
    const data = await prisma.airQuality.findMany({
      where: whereClause,
      select: {
        timestamp: true,
        ...selectedFields
      },
      orderBy: { timestamp: 'asc' }
    })
    // Format response
    function renameKeys<T extends Record<DbKey, any>>(dataFromDb: T): Record<DisplayKey, any> {
      return Object.entries(dataFromDb).reduce((acc, [dbKey, value]) => {
        const originalKey = REVERSE_PARAM_MAP[dbKey as DbKey];
        if(originalKey){
          acc[originalKey] = value;
        }
        return acc;
      }, {} as Record<DisplayKey, any>);
    }
    const formatted = data.map(item => {
      const timestamp = (item.timestamp as Date).toISOString()
      return {...renameKeys(item), timestamp}
    })

    const response = NextResponse.json(formatted)
    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`
    )
    
    return response

  } catch (error: any) {
    const errorResponse = NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    )
    // Prevent caching of errors
    errorResponse.headers.set('Cache-Control', 'no-store')
    return errorResponse
  }
}