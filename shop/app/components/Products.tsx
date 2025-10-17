import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "./Card";
import { fetchProducts } from "../utils";

async function Products() {
    // async function fetchProducts() {
    //     // const res = await fetch("http://localhost:8000/products.json");
    //     // .then((res) => res.json())
    //     // .then(data => {
    //     //   products = data;
    //     // })

    //     try {
    //         const response = await fetch("http://localhost:8000/products.json");
    //         if (!response.ok) {
    //             throw new Error(`Response status: ${response.status}`);
    //         }

    //         const result = await response.json();

    //         return result;
    //     } catch (error) {
    //         //console.error(error.message);
    //         return null;
    //     }
    // }

    const products = await fetchProducts();
    console.log("Products:", products);
    console.log("First product image URL:", products?.[0]?.images?.[0]);

    return (
        <div className="bg-[#f8f8f8] w-full py-12">
            <div className="container">
                <div className="py-4">
                    <h1 className="text-3xl font-bold">Best Selling Products</h1>
                    <h1>Enjoy up to 50%</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-2 mt-6">
                    {products.map((product: any, index: number) => {
                        return (
                            <Card product={product} key={index} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Products;
