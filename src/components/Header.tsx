import Image from "next/image";
import React from "react";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const session = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex-grow items-center sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* Search */}
        <div className="h-10 bg-yellow-400 items-center hover:bg-yellow-500 hidden sm:flex rounded-md flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <div className="h-12 p-4">
            <AiOutlineSearch />
          </div>
        </div>
        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            className="link"
            onClick={() => {
              session.status == "unauthenticated" ? signIn() : signOut();
            }}
          >
            <p>
              {session.status == "authenticated"
                ? `Hello, ${session.data.user?.name}`
                : "Sign In"}
            </p>
            <p className="font-extrabold md: text-sm">Account & Lists</p>
          </div>
          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md: text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="link relative flex items-center"
          >
            <span className=" absolute top-0 right-0 md:right-9 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <AiOutlineShoppingCart size={40} />
            <p className="font-extrabold md: text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center">
          <AiOutlineMenu style={{ height: "12", marginRight: "0.25rem" }} />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
