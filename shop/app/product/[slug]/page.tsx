// import { notFound } from 'next/navigation';
// import Image from 'next/image';

// interface Props {
//     params: {
//         slug: string;
//     };
// }

// async function ProductPage({ params: { slug } }: Props) {
//     // TODO: Replace with your actual product fetching logic
//     async function getProduct() {
//         try {
//             const response = await fetch(`http://localhost:8000/products.json`);
//             if (!response.ok) {
//                 throw new Error(`Response status: ${response.status}`);
//             }
//             const products = await response.json();
//             return products.find((p: any) => p.slug === slug);
//         } catch (error) {
//             return null;
//         }
//     }

//     const product = await getProduct();

//     if (!product) {
//         notFound();
//     }

//     return (
//         <div className="bg-white">
//             <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//                     <div className="relative h-96">
//                         <Image
//                             src={product.images[0]}
//                             alt={product.name}
//                             fill
//                             className="object-contain"
//                             priority
//                         />
//                     </div>
//                     <div>
//                         <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//                             {product.name}
//                         </h1>
//                         <div className="mt-3">
//                             <h2 className="sr-only">Product information</h2>
//                             <p className="text-3xl tracking-tight text-gray-900">
//                                 £{product.price}
//                             </p>
//                         </div>
//                         <div className="mt-6">
//                             <h3 className="sr-only">Description</h3>
//                             <p className="text-base text-gray-700">
//                                 {product.description || 'No description available'}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductPage;

import React from 'react'
import ProductDetails from '@/app/components/ProductDetails'
import { fetchProducts } from '@/app/utils'
import { notFound } from 'next/navigation'

interface Product {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    images: string[];
    description?: string;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// export async function generateStaticParams() {
//     const products = await fetchProducts();
//     return products.map((product: Product) => ({
//         slug: product.slug,
//     }));
// }

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const products = await fetchProducts() as Product[];
    const product = products.find((p: Product) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}