import React from "react";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import { ProductType, Products } from "../types/type";
import Product from "./Product";

interface Props {
  products: Products;
}

function ProductFeed({ products }: Props) {
  return (
    <div className="grid grid-flow-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(
          (
            {
              id,
              title,
              price,
              description,
              category,
              image,
              rating,
            }: ProductType,
            i
          ) => (
            <Product
              key={i}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          )
        )}
      <img className="md:col-span-full" src="https://links.papareact.com/dyz" />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(
            (
              {
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
              }: ProductType,
              index
            ) => (
              <Product
                key={index}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
              />
            )
          )}
      </div>
      {products
        .slice(5, products.length)
        .map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
          }: ProductType) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          )
        )}
    </div>
  );
}

export default ProductFeed;
