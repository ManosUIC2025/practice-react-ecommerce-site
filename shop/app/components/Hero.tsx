'use client'
import React from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'

const Hero = () => {
    const variants = {
        hidden: { opacity: 0.25, y: 30, x:0 },
        visible: { opacity: 1, y: -80, x:0, transition: { delay:0.05,  duration: 0.5 } },
    };
  return (
    <div className='hero-section'>
        <div className='hero-container'>
            <div className='object-cover w-full'>
                <Image
                    src="https://placehold.co/1400x100.png"
                    width="1400"
                    height="100"
                    alt="Hero image"
                    className='rounded-lg w-full'
                />
            </div>
            <div className='hero-image'>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}>
                    <Image
                        src="https://placehold.co/700x100.png"
                        width="700"
                        height="100"
                        alt="Airpods"
                        className='rounded-lg'
                    />
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Hero