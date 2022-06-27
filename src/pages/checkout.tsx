import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { itemType } from "../types/type";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const session = useSession();
  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    console.log("stripe==========", stripe);
    const checkoutSession = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/create-checkout-session`,
      {
        items,
        email: session.data?.user?.email,
      }
    );
    console.log("checkoutSession=====", checkoutSession);
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.log("redirectToCheckout================", result);
    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
          </div>
          {items.map((item: itemType, index: number) => (
            <CheckoutProduct
              key={index}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              rating={item.rating}
              hasPrime={item.hasPrime}
            />
          ))}
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items.length} items:{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="HKD" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckOutSession}
                disabled={session.status !== "authenticated"}
                className={`button mt-2 ${
                  session.status !== "authenticated" &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session.status !== "authenticated"
                  ? "Sign in to checkout"
                  : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
