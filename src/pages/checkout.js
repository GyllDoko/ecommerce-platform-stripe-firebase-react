import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from "../components/Header"
import { selectItems, selectTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'


const stripePromise = loadStripe(process.env.stripe_public_key)
function Checkout() {
  const items = useSelector(selectItems)
  const { data: session } = useSession()
  const total = useSelector(selectTotal)

  const createCheckoutSession = async () => {
    const stripe = await stripePromise
    // Call the backend to create a checkout session
    const checkoutSession = await axios.post(
      "/api/create-checkout-session",
      {
        items,
        email: session.user.email
      }
    )
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result.error) {
      alert(result.error.message)
    }
  }
  return (
    <div className='bg-gray-100'>
      <Header />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left  */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className='flex flex-col space-y-10 bg-white p-5'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? " Your Shopping basket is empty"
                : "Shopping Basket"
              }
            </h1>
            {items.map(({ id, title, price, description, category, image, rating, hasPrime }, i) => (
              <CheckoutProduct
                key={i}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
                hasPrime={hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                <span className='font-bold'> {" "}
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
                onClick={createCheckoutSession}
                role="link" className={`button mt-5 ${!session && 'from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed border-gray-200'}`}>
                {!session ? "Sign In to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
