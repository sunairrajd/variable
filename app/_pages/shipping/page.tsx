"use client"

export default function Shipping() {
  return (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Shipping Methods</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Delivery Times</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>
    </div>
  )
} 