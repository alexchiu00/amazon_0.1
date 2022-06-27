import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore/lite";
import Header from "../components/Header";
import moment from "moment";
import Order from "../components/Order";
import { Orders, OrderType } from "../types/type";

const Orders = ({ orders }: Orders) => {
  const [ordersRendering, setOrders] = useState(Array<OrderType>);
  useEffect(() => {
    setOrders(orders);
  }, []);
  const session = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session.status === "authenticated" ? (
          <h2>{ordersRendering.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {ordersRendering?.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

  async function getOrders(db: Firestore, email: any) {
    const ordersColRef = collection(db, "users", email, "orders");
    const q = query(ordersColRef, orderBy("timestamp", "desc"));
    const ordersList = await getDocs(q);
    return ordersList.docs;
  }

  const stripeOrders = await getOrders(db, session?.user?.email);
  const orders = await Promise.all(
    stripeOrders.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amount_shipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 1000,
        })
      ).data,
    }))
  );
  if (!session) {
    return {
      props: {},
    };
  } else {
    return {
      props: {
        orders,
      },
    };
  }
}

export default Orders;
