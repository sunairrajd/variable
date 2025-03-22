export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Your T-Shirt Designer</h1>
      <p className="mb-8 text-lg">Create your custom t-shirt design with your favorite music</p>
      <div className="space-y-4">
        <a 
          href="/make" 
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Create New Design
        </a>
      </div>
    </div>
  )
}


