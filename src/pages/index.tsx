import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { Products } from "../types/type";

interface Props {
  data: Products;
}

const Home = ({ data }: Props) => {
  const [products, setProducts] = useState<Products>([]);
  useEffect(() => setProducts(data), []);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 0.1</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  return {
    props: {
      data,
    },
  };
};
