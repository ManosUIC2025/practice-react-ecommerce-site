import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string | number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description?: string;
}

interface CardProps {
  product: Product;
}

const Card = ({product}: CardProps) => {

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="bg-white pt-10 drop-shadow-md rounded-lg overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.slug}
          width={100}
          height={100}
          quality={100}
          className="object-cover h-32 mx-auto"
          loading="eager"
        />
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <h1 className="text-xl text-gray-200 font-bold">£{product.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Card;
