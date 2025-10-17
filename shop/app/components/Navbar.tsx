'use client'

import Link from 'next/link'
import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import Cart from './Cart'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useCart();

  // const handleCartClick = () => {
  //   setIsCartOpen(true);
  // };

  // const handleCloseCart = () => {
  //   setIsCartOpen(false);
  // };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  // const handleCloseCart = () => {
  //   setShowCart(false);
  // };

  return (
    <>
      <div className='w-full h-[80px] bg-white'>
        <div className='container w-full h-full flex justify-between items-center'>
          <Link href="/" className='logo urbanist-normal'>Shop</Link>
          <Link href="/" className='logo'>Shop 2</Link>

          <button className='cart-icon' onClick={handleCartClick}>
            <FiShoppingBag />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
      </div>
      {/* <Cart isOpen={showCart} onClose={handleCloseCart} /> */}
      <Cart />
    </>
  )
}

export default Navbar