"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const Cart = () => {
  const {
    cartItems,
    showCart,
    setShowCart,
    totalPrice,
    totalQuantities,
    updateProductQuantity,
    removeProduct,
  } = useCart();

  const handleClose = () => {
    setShowCart(false);
  };

  const handleUpdateQuantity = (
    productId: number,
    currentQty: number,
    increment: boolean
  ) => {
    const newQty = increment ? currentQty + 1 : currentQty - 1;
    updateProductQuantity(productId, newQty);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        if(data.url) window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error checking out:", error);
      return null;
    }
  };

  return (
    <div className={`cart-wrapper ${showCart ? "active" : ""}`}>
      <div className="cart-container">
        <div className="cart-heading">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <h2 className="text-xl font-bold">{totalQuantities}</h2>
          <button onClick={handleClose} className="cart-close">
            <IoMdClose />
          </button>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="flex gap-2 mb-[10px]" key={item.id}>
              <div className="relative w-20 h-20">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="cart-item-details flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p>£{item.price}</p>
                <div className="flex items-center gap-4 mt-2">
                  <p className="quantity-desc flex items-center border-black">
                    <span
                      className="minus cursor-pointer"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, false)
                      }
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span
                      className="plus cursor-pointer"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, true)
                      }
                    >
                      <AiOutlinePlus />
                    </span>
                  </p>
                  <button
                    className="text-3xl text-red-500"
                    onClick={() => removeProduct(item.id)}
                  >
                    <TiDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && (
            <p className="text-center py-4">Your cart is empty.</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Subtotal:</span>
              <span className="font-bold">£{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn w-full"
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;