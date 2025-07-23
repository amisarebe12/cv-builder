import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      )
    }

    // Connect to database
    const { default: connectDB } = await import('@/lib/mongodb')
    const { default: User } = await import('@/models/User')
    
    await connectDB()
    
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Người dùng không tồn tại' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email đã được xác thực' },
        { status: 400 }
      )
    }

    // Check rate limiting (prevent spam)
    const lastVerificationTime = user.verificationExpires
    if (lastVerificationTime) {
      const timeSinceLastRequest = Date.now() - (lastVerificationTime.getTime() - 5 * 60 * 1000) // 5 minutes ago
      const cooldownTime = 60 * 1000 // 1 minute cooldown
      
      if (timeSinceLastRequest < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - timeSinceLastRequest) / 1000)
        return NextResponse.json(
          { error: `Vui lòng đợi ${remainingTime} giây trước khi gửi lại` },
          { status: 429 }
        )
      }
    }

    // Send verification email
    try {
      const verificationResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userId: user._id.toString(),
          name: user.name
        })
      })

      if (!verificationResponse.ok) {
        throw new Error('Failed to send verification email')
      }

      const result = await verificationResponse.json()
      return NextResponse.json(result)
    } catch (emailError) {
      console.error('Resend verification error:', emailError)
      return NextResponse.json(
        { error: 'Có lỗi xảy ra khi gửi email xác thực' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra' },
      { status: 500 }
    )
  }
}