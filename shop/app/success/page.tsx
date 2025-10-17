import React from 'react'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-2xl w-full bg-white border-4 border-teal-500 rounded-lg p-12 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
          SUCCESS
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Your order has been placed! 🎉
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Continue shopping →
        </Link>
      </div>
    </div>
  )
}

export default SuccessPage