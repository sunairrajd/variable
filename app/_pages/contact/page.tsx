export default function Contact() {
  return (
    <div className="prose max-w-none p-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p>Have questions Wed love to hear from you. Send us a message and well respond as soon as possible.</p>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p>support@example.com</p>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Address</h3>
          <p>123 Example Street<br />City, State 12345<br />Country</p>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Hours</h3>
          <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday & Sunday Closed</p>
        </div>
      </section>
    </div>
  )
} 