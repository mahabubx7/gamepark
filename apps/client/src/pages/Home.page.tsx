/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [featured, setFeatured] = useState<Record<string, any>[]>([])

  useEffect(() => {
    async function fetchFeaturedVenues() {
      const response = await fetch('http://127.0.0.1:5000/api/venue')
      if (response.ok) {
        const data = (await response.json()) as {
          data: Record<string, any>[]
        }
        console.log(data)
        setFeatured(data.data)
      }
    }

    fetchFeaturedVenues()
  }, [])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container flex flex-col gap-0'>
        <div
          className='mb-6 w-full bg-indigo-500 text-white font-semibold rounded-lg
      py-8 text-4xl shadow-md text-center shadow-indigo-400 shadow-opacity-50'
        >
          <h1 className='text-5xl capitalize'>gamepark.</h1>
        </div>

        <section className='bg-indigo-50 rounded-sm py-4 text-gray-600'>
          <h2 className='text-4xl font-bold text-gray-700 mb-6 text-left px-2'>
            <strong className='text-sky-600'>Hey!</strong>
            <br />
            <span className='text-3xl'>Welcome to GamePark</span>
          </h2>

          <div className='flex flex-col gap-4'>
            {featured.length > 0 ? (
              featured.map((venue) => (
                <div
                  key={venue.id}
                  className='flex bg-white justify-start items-start gap-2 p-4 rounded-md shadow-sm shadow-gray-300 shadow-opacity-50'
                >
                  <div className='w-32'>
                    <img
                      src={venue.coverImage}
                      alt={venue.name}
                      className='w-24 h-24 object-cover rounded-md'
                    />
                  </div>

                  <div className='flex flex-col w-full pl-2'>
                    <div className='flex flex-col items-start'>
                      <h2 className='text-2xl'>{venue.name}</h2>
                      <p className='text-gray-500'>{venue.address}</p>
                    </div>

                    <div className='flex justify-end w-full mt-4'>
                      <button className='bg-indigo-500 text-white px-4 py-2 rounded-md'>
                        Check Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center'>
                <p>There are no featured Venues at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
