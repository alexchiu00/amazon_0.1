const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
  const { items, email } = req.body;

  // const transformedItems = await items.map((item: any) => ({
  //   quantity: 1,
  //   description: item.description,
  //   price_data: {
  //     currency: "hkd",
  //     unit_amount: item.price * 100,
  //     product_data: {
  //       name: item.title,
  //       images: [item.image],
  //     },
  //   },
  // }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1LDgjLIRV64cFDkX5vxXMGxE"],
      shipping_address_collection: {
        allowed_countries: ["HK", "US", "CA"],
      },
      // line_items: transformedItems,
      line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }],
      mode: "payment",

      success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
      // metadata: {
      //   email,
      //   images: JSON.stringify(items.map((item: any) => item.image)),
      // },
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(400).json(error);
  }
};
