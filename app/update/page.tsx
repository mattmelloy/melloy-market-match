'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { insertMarketEntry } from '@/src/utils/supabase'

export default function UpdateValue(): React.ReactElement {
  const [name, setName] = useState('')
  const [shareValue, setShareValue] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    // Basic validation
    if (!name || !shareValue) {
      setError('Please enter both name and share value')
      setIsSubmitting(false)
      return
    }

    try {
      // Validate share value is a positive number
      const parsedShareValue = parseFloat(shareValue)
      if (isNaN(parsedShareValue) || parsedShareValue <= 0) {
        setError('Please enter a valid positive share value')
        setIsSubmitting(false)
        return
      }

      const { data: _data, error } = await insertMarketEntry({
        player_name: name.trim(),
        share_value: parsedShareValue
      })

      if (error) {
        setError(error)
        return
      }

      setSuccess('Share value updated successfully!')
      setName('')
      setShareValue('')
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to update share value. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Update Share Value</h1>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            ← Back
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-gray-700 font-semibold mb-2"
            >
              Player Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label 
              htmlFor="shareValue" 
              className="block text-gray-700 font-semibold mb-2"
            >
              Share Value
            </label>
            <input 
              type="number" 
              id="shareValue"
              value={shareValue}
              onChange={(e) => setShareValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your current share value"
              step="0.01"
              min="0"
              required 
              disabled={isSubmitting}
            />
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              {success}
            </div>
          )}
          
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Value'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
