'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'Email xác thực đã được gửi!')
        // Redirect to verify email page after 2 seconds
        setTimeout(() => {
          router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`)
        }, 2000)
      } else {
        setError(data.error || 'Có lỗi xảy ra')
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi gửi yêu cầu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gửi lại mã xác thực
            </h2>
            <p className="text-gray-600 mb-8">
              Nhập email của bạn để nhận lại mã xác thực
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                placeholder="Nhập email của bạn"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Đang gửi...' : 'Gửi lại mã xác thực'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Đã có mã xác thực?{' '}
              <Link href="/auth/verify-email" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Xác thực ngay
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Quay lại{' '}
              <Link href="/auth/signin" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Lưu ý</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Mã xác thực có hiệu lực trong 5 phút</li>
            <li>• Kiểm tra cả hộp thư spam/junk</li>
            <li>• Chỉ có thể gửi lại sau 1 phút</li>
            <li>• Liên hệ hỗ trợ nếu vẫn gặp vấn đề</li>
          </ul>
        </div>
      </div>
    </div>
  )
}