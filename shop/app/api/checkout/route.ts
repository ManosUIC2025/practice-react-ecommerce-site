//'use client'
import { NextResponse } from 'next/server'
//import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
})


// export async function GET() {
//     return NextResponse.json({
//         message: "Checkout API endpoint - use POST to create checkout session"
//     })
// }

export async function POST(request: Request) {

    try {
        // const headersList = await headers()
        // const origin = headersList.get('origin')

        const { cartItems } = await request.json()
        let activeProducts = await stripe.products.list({
            active: true
        })
        console.log(activeProducts)
        let stripeProducts: any[] = []

        for (const item of cartItems) {
            const product = activeProducts?.data?.find((p: any) => p.id.toString() === item.id.toString())
            if (product) {
                stripeProducts.push({
                    price: product.default_price,
                    quantity: item.quantity,
                })
            } else {
                const newProduct = await stripe.products.create({
                    id: item.id,
                    name: item.name,
                    default_price_data: {
                        currency: 'gbp',
                        unit_amount: item.price * 100,
                    },
                   // quantity: item.quantity,
                })
                // line_items.push({
                //     price: newProduct.id,
                //     quantity: item.quantity,
                // })
                console.log(newProduct)
            }
        }

        activeProducts = await stripe.products.list({
            active: true
        })
        for (const item of cartItems) {
            const product = activeProducts?.data?.find((p: any) => p.id.toString() === item.id.toString())
            if (product) {
                stripeProducts.push({
                    price: product.default_price,
                    quantity: item.quantity,
                })
            }
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: stripeProducts,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000"
        })
        if (!session.url) {
            throw new Error('Failed to create checkout session')
        }
        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}