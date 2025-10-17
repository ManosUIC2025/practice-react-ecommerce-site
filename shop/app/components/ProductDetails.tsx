'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CartContext } from '../context/CartContext'

const ProductDetails = ({ product }: any) => {
    const [index, setIndex] = useState(0);
    const { cartItems, qty, incQty, decQty, addProduct }: any = useContext(CartContext);
    console.log(cartItems);

    function imageLoader() {
        return product.images[index];
    }
    return (
        <div className='product-details-section'>
            <div className='product-details-container'>
                {/*left*/}
                <div>
                    {/*top*/}
                    <div className='h-[450px] flex items-center mb-[25px]'>
                        <Image
                            loader={imageLoader}
                            src={product.images[index]}
                            alt={product.name}
                            width={350}
                            height={350}
                            className='object-cover mx-auto'
                        />
                    </div>

                    {/*bottom*/}
                    <div className='small-images-container'>
                        {product.images.map((image: string, i: number) => (
                            <div key={i} onClick={() => setIndex(i)}>
                                <Image
                                    loader={() => image}
                                    src={image}
                                    alt={`${product.name} - ${i + 1}`}
                                    width={220}
                                    height={100}
                                    className='object-cover h-32 mx-auto border rounded-xl hover:cursor-pointer'
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/*right*/}
                <div className='flex flex-col gap-8 md:pt-32 pt-0'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-3xl font-bold'>{product.name}</div>
                        <div className='text-xl font-medium'>£{product.price}</div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <h3>Quantity</h3>
                        <p className='quantity-desc flex items-center border-black'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>

                    <button className='btn add-to-cart hover:cursor-pointer' onClick={() => addProduct(product, qty)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails