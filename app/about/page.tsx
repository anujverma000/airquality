import { Card} from '@/components/ui/card'
import Link from 'next/link'

const About = () => {
  return (
    <main className="p-4 sm:p-20">
      <Card className='p-20 text-center'>
          <h1 className="text-2xl font-semibold">About</h1>
          <div className='mt-4 max-w-lg mx-auto my-10'>
            <p>
              This is a simple air quality dashboard that displays air quality data.
            </p>
            <p>
              The dashboard is built with Next.js and Tailwind CSS.
            </p>
          </div>
          <Link href="/" className='text-blue-500 hover:underline'>
              Explore more
            </Link>
      </Card>
    </main>
  )
}

export default About