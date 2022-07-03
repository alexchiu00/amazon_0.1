import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import Header from "../components/Header";
import moment from "moment";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const session = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session.status === "authenticated" ? (
          <h2>Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const stripe = require("stripe")(
    '"sk_test_51LDg6mIRV64cFDkXNf7bUdvdwmWfeZcOyBoYILHw68IlZMmbCurq1d7DFyBA5FtWRNV3u5kO8bwphskhsxAprddc00Jrbg8py5"'
  );
  const session = await getSession(context);

  async function getOrders(db, email) {
    const ordersColRef = collection(db, "users", email, "orders");
    const q = query(ordersColRef, orderBy("timestamp", "desc"));
    const ordersList = await getDocs(q);
    return ordersList.docs;
  }
  var orders;
  try {
    const stripeOrders = await getOrders(db, session?.user?.email);
    consolo.log(stripeOrders);
    const orderFromDB = await Promise.all(
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
    orders = orderFromDB;
  } catch (error) {
    console.log(error);
  }

  if (!session?.user) {
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
