import Link from 'next/link'

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-center mb-6">Melloy Market Match</h1>
                <p className="text-center">Welcome to the exciting world of share market simulation!</p>
                <div className="flex justify-center space-x-4 mt-6">
                  <Link href="/about" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition">
                    About the Game
                  </Link>
                  <Link href="/update" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Update Value
                  </Link>
                  <Link href="/leaderboard" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
