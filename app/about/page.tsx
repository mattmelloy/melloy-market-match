import Link from 'next/link'

export default function About(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">About Melloy Market Match</h1>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            ← Back
          </Link>
        </div>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Game Overview</h2>
          <p className="text-gray-700 mb-4">
            Melloy Market Match is an engaging share market simulation game where players track and compare their investment performance.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Game Rules</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Players enter their name and track share values over time</li>
            <li>No cryptocurrency is allowed in this simulation</li>
            <li>Regular updates of share values are encouraged</li>
            <li>Performance is tracked and displayed on the leaderboard</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Play</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Navigate to the "Update Value" page</li>
            <li>Enter your name</li>
            <li>Input your current share value</li>
            <li>Check the leaderboard to see your progress</li>
            <li>Update your values regularly to stay competitive</li>
          </ol>
        </section>
        
        <div className="text-center mt-8">
          <Link 
            href="/update" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Start Playing Now
          </Link>
        </div>
      </div>
    </div>
  )
}
