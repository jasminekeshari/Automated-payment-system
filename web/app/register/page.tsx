// File: web/app/register/page.tsx
'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '../../src/lib/firebaseClient'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [role, setRole] = useState<'admin'|'edtech'|'mentor'>('mentor')
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (pw.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    return true
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setLoading(true)
    try {
      await signUp(email, pw)
      // persist role in your own backend as needed...
      router.push('/login')
    } catch (err: any) {
      // Firebase error codes mapping
      if (err.code === 'auth/email-already-in-use') {
        setError('That email is already registered.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            disabled={loading}
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            required
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            disabled={loading}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Role</span>
          <select
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="mt-1 block w-full border-gray-300 rounded focus:ring focus:ring-blue-200"
            disabled={loading}
          >
            <option value="admin">Admin</option>
            <option value="edtech">EdTech Admin</option>
            <option value="mentor">Mentor</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded ${
            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
          } transition`}
        >
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  )
}