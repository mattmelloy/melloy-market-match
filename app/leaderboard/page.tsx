'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { 
  fetchMarketEntries, 
  deleteMarketEntry, 
  MarketEntry 
} from '@/src/utils/supabase'

// Dynamically import Line chart to prevent SSR issues
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
})

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Leaderboard(): React.ReactElement {
  const [playerData, setPlayerData] = useState<{ [key: string]: MarketEntry[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: number | null
    playerName: string
    shareValue: number
  }>({ id: null, playerName: '', shareValue: 0 })

  useEffect(() => {
    setIsClient(true)
    loadLeaderboardData()
  }, [])

  const loadLeaderboardData = async (): Promise<void> => {
    setLoading(true)
    const { data, error } = await fetchMarketEntries()

    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    if (data) {
      // Group data by player name
      const groupedData = data.reduce((acc, entry) => {
        if (!acc[entry.player_name]) {
          acc[entry.player_name] = []
        }
        acc[entry.player_name].push(entry)
        return acc
      }, {} as { [key: string]: MarketEntry[] })

      setPlayerData(groupedData)
    }

    setLoading(false)
  }

  const handleDeleteEntry = async (): Promise<void> => {
    if (!deleteConfirmation.id) return

    const { error } = await deleteMarketEntry(deleteConfirmation.id)

    if (error) {
      setError(error)
      return
    }

    // Remove the deleted entry from the state
    const updatedPlayerData = { ...playerData }
    Object.keys(updatedPlayerData).forEach(playerName => {
      updatedPlayerData[playerName] = updatedPlayerData[playerName]
        .filter(entry => entry.id !== deleteConfirmation.id)
      
      // Remove player entirely if no entries left
      if (updatedPlayerData[playerName].length === 0) {
        delete updatedPlayerData[playerName]
      }
    })

    setPlayerData(updatedPlayerData)
    setDeleteConfirmation({ id: null, playerName: '', shareValue: 0 })
  }

  const chartData = isClient && Object.keys(playerData).length > 0 ? {
    labels: Object.values(playerData)[0]?.map(entry => 
      new Date(entry.created_at).toLocaleDateString()
    ) || [],
    datasets: Object.entries(playerData).map(([playerName, entries], index) => ({
      label: playerName,
      data: entries.map(entry => entry.share_value),
      borderColor: `hsl(${index * 360 / Object.keys(playerData).length}, 70%, 50%)`,
      tension: 0.1
    }))
  } : null

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Player Share Value Progress'
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Leaderboard</h1>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            ← Back
          </Link>
        </div>
        
        {loading ? (
          <p className="text-center text-gray-600">Loading leaderboard...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Rankings</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Rank</th>
                    <th className="border p-2">Player</th>
                    <th className="border p-2">Latest Share Value</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(playerData)
                    .sort((a, b) => {
                      const latestA = a[1][a[1].length - 1].share_value
                      const latestB = b[1][b[1].length - 1].share_value
                      return latestB - latestA
                    })
                    .map(([playerName, entries], index) => (
                      <tr key={playerName} className="text-center">
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">{playerName}</td>
                        <td className="border p-2">{entries[entries.length - 1].share_value}</td>
                        <td className="border p-2">
                          <button 
                            onClick={() => setDeleteConfirmation({
                              id: entries[entries.length - 1].id,
                              playerName,
                              shareValue: entries[entries.length - 1].share_value
                            })}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Historical Progress</h2>
              {isClient && chartData && (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.id && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete the entry for {deleteConfirmation.playerName} 
                with share value {deleteConfirmation.shareValue}?
              </p>
              <div className="flex justify-between">
                <button 
                  onClick={() => setDeleteConfirmation({ id: null, playerName: '', shareValue: 0 })}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteEntry}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
