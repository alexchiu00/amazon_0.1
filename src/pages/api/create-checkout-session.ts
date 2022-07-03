const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item: any) => ({
    quantity: 1,
    price_data: {
      currency: "hkd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1LDgjLIRV64cFDkX5vxXMGxE"],
      shipping_address_collection: {
        allowed_countries: ["HK", "US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",

      success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item: any) => item.image)),
      },
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(400).json(error);
  }
};
