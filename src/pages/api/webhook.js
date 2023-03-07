import { buffer } from "micro"
const admin = require('firebase-admin')
import { getApps } from "firebase-admin/app"
// Secure connexion to firebase
const serviceAccount = require('../../../permissions.json')

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const adminDb = admin.firestore()


// Establish connesion with Stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_SIGNING_SECRET

export default async (req, res) => {
  // console.log(req)
  if (req.method === "POST") {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']

    let event
    // Verify the event came from  stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
      // Handle the checkout session completed event

      if (event.type === "checkout.session.completed") {
        const session = event.data.object
        console.log(session)
        // Fufilled our database
        await adminDb.collection("users")
          .doc(session.metadata.email)
          .collection('orders')
          .doc(session.id)
          .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.image),
            timestamp: admin.firestore.Timestamp.now()
          }, {
            merge: true
          })
          .then(() => console.log("Success"))
          .catch((err) => console.log("Firebase Error", err))
        console.log("Set to database")
        return res.status(200)
      }
    } catch (error) {
      console.log("ERROR:", error.message);
      return res.status(400).send(`Webhooks error: ${error.message}`)
    }


  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}