import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../components/Header'

function Success() {
  const router = useRouter()
  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        <div className='flex flex-col p-10 bg-white mt-5'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-3xl'>Thank you, your order has been confirmed !</h1>
          </div>
          <p>
            Thanks you for shopping with us. We'll send a confirmation once your  item has shipped. if you would like to check the status of your order(s) please press the link below.
          </p>

          <button onClick={() => router.push("/orders")} className='button mt-8'>Go to Order</button>
        </div>
      </main>
    </div>
  )
}

export default Success
