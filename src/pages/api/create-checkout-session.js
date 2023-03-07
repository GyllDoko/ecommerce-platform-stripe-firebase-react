const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { items, email } = req.body
  const transformItems = items.map(item => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    }
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ["shr_1Mii9KD4wFXI4IlsPAE1cSMe"],
    shipping_address_collection: {
      allowed_countries: ["US", "BJ"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 699, currency: 'usd' },
          display_name: 'Next-Day Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    line_items: transformItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      image: JSON.stringify(items.map(item => item.image))
    }
  })

  res.status(200).json({ id: session.id })
}