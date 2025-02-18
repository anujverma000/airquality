import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import Papa from 'papaparse'

export const dynamic = 'force-dynamic' // Disable static optimization

export async function POST(request: NextRequest) {
  try {
    const reader = request.body?.getReader()
    if (!reader) {
      return NextResponse.json(
        { message: 'No data received' },
        { status: 400 }
      )
    }

    // Read request body stream
    const chunks: Uint8Array[] = []
    let done = false
    
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      if (value) chunks.push(value)
      done = doneReading
    }

    // Convert chunks to CSV string
    const buffer = Buffer.concat(chunks)
    const csv = buffer.toString('utf-8')

    // Parse CSV
    const data: any[] = await new Promise((resolve, reject) => {
      Papa.parse(csv, {
        header: true,
        delimiter: ';',
        complete: (results) => resolve(results.data),
        error: (error) => reject(error)
      })
    })

    // Process data
    const processed = data
      .filter(row => row.Date)
      .map(row => {
        const [day, month, year] = row.Date.split('/')
        const time = row.Time.split('.').slice(0, 3).join(':')
        
        return {
          timestamp: new Date(`${year}-${month}-${day}T${time}`),
          co_gt: parseFloat(row['CO(GT)']?.replace(',', '.')),
          pt08_s1_co: parseInt(row['PT08.S1(CO)']),
          nmhc_gt: parseFloat(row['NMHC(GT)']?.replace(',', '.')),
          c6h6_gt: parseFloat(row['C6H6(GT)']?.replace(',', '.')),
          pt08_s2_nmhc: parseInt(row['PT08.S2(NMHC)']),
          nox_gt: parseFloat(row['NOx(GT)']?.replace(',', '.')),
          pt08_s3_nox: parseInt(row['PT08.S3(NOx)']),
          no2_gt: parseFloat(row['NO2(GT)']?.replace(',', '.')),
          pt08_s4_no2: parseInt(row['PT08.S4(NO2)']),
          pt08_s5_o3: parseInt(row['PT08.S5(O3)']),
          temperature: parseFloat(row['T']?.replace(',', '.')),
          rh: parseFloat(row['RH']?.replace(',', '.')),
          ah: parseFloat(row['AH']?.replace(',', '.'))
        }
      })

    // Insert into database
    await prisma.airQuality.createMany({
      data: processed,
      skipDuplicates: true
    })

    return NextResponse.json(
      { message: 'Data uploaded successfully', count: processed.length },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Error processing file', error: error.message },
      { status: 500 }
    )
  }
}