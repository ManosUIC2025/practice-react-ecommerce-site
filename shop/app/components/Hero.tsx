'use client'
import React from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'

const Hero = () => {
    const variants = {
        hidden: { opacity: 0.25, y: 70, x:0 },
        visible: { opacity: 1, y: -10, x:0, transition: { delay:0.05,  duration: 0.5 } },
    };
  return (
    <div className='w-full md:h-[350px] h-[300px] flex items-center'>
        <div className='h-full md:max-w-[1024px] max-w-[600px] m-auto flex justify-center mt-[20px] relative px-4 md:px-0'>
            <div className='object-cover'>
                <Image
                    src="https://placehold.co/1400x100.png"
                    width="1400"
                    height="100"
                    alt="Hero image"
                    className='rounded-lg'
                />
            </div>
            <div className='absolute md:mt-[100px] mt-[50px]'>
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