import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

interface Order {
  id: string;
  amount: number;
  amount_shipping: number;
  images: Array<string>;
  timestamp: number;
  items: any;
}

const Order = (order: any) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          {/* <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p> */}
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            {/* <Currency quantity={amount} currency="HKD" /> - Next Day Delivery{" "}
            <Currency quantity={amount_shipping} currency="HKD" /> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
