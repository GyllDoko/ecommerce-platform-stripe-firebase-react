
import { getApps } from 'firebase-admin/app'
import moment from 'moment'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { db } from '../../firebase'
import Header from '../components/Header'
import Order from '../components/Order'

function Orders({ orders }) {
  const { data: session } = useSession()
  // console.log(orders)
  return (
    <div>
      <Header />
      <main className='max-w-screen-2xl mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className='mt-5 space-y-4'>

          {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
            <Order
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              items={items}
              timestamp={timestamp}
              images={images}
            />
          ))}

        </div>
      </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context) {
  const admin = require('firebase-admin')
  const serviceAccount = require('../../permissions.json')
  if (!getApps().length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }

  const adminDb = admin.firestore()
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  const session = await getSession(context)
  const { user } = session

  if (!session) {
    return {
      props: {}
    }
  }
  // const userRef = doc(adminDb, "users", user.email)
  const stripeOrders = await adminDb.collection('users')
    .doc(user.email)
    .collection('orders')
    .orderBy('timestamp', "desc")
    .get()

  // const stripeOrders = await getDoc(userRef).then(snapshot => snapshot.data())
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data,
    }))
  )
  return {
    props: {
      orders,
    }
  }
}