import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Header from "../components/Header";

const success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <div className="text-green-500 h-10">
              <AiOutlineCheckCircle size={40} />
            </div>
            <h1>Thank you , your order has been confirmed</h1>
          </div>
          <p>
            Thank you for shopping with us, We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default success;
