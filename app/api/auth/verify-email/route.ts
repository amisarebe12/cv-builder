import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { code, token, email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      )
    }

    if (!code && !token) {
      return NextResponse.json(
        { error: 'Cần có mã xác thực hoặc token' },
        { status: 400 }
      )
    }

    // Connect to database
    const { default: connectDB } = await import('@/lib/mongodb')
    const { default: User } = await import('@/models/User')
    
    await connectDB()
    
    // Find user by email
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
        { message: 'Email đã được xác thực trước đó' },
        { status: 200 }
      )
    }

    // Check if verification has expired
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      return NextResponse.json(
        { error: 'Mã xác thực đã hết hạn. Vui lòng yêu cầu mã mới.' },
        { status: 400 }
      )
    }

    let isValid = false

    // Verify by code
    if (code) {
      if (user.verificationCode === code) {
        isValid = true
      }
    }

    // Verify by token (magic link)
    if (token && !isValid) {
      const decoded = verifyToken(token)
      if (decoded && decoded.email === email && decoded.userId === user._id.toString()) {
        isValid = true
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Mã xác thực hoặc token không hợp lệ' },
        { status: 400 }
      )
    }

    // Update user as verified
    await User.findByIdAndUpdate(user._id, {
      emailVerified: true,
      $unset: {
        verificationToken: 1,
        verificationCode: 1,
        verificationExpires: 1
      }
    })

    return NextResponse.json({
      message: 'Email đã được xác thực thành công!',
      verified: true
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi xác thực email' },
      { status: 500 }
    )
  }
}

// Handle GET request for magic link verification
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect('/auth/signin?error=missing_token')
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.redirect('/auth/signin?error=invalid_token')
    }

    // Connect to database
    const { default: connectDB } = await import('@/lib/mongodb')
    const { default: User } = await import('@/models/User')
    
    await connectDB()
    
    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.redirect('/auth/signin?error=user_not_found')
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.redirect('/auth/signin?message=already_verified')
    }

    // Check if verification has expired
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      return NextResponse.redirect('/auth/signin?error=token_expired')
    }

    // Verify token matches
    if (user.verificationToken !== token) {
      return NextResponse.redirect('/auth/signin?error=invalid_token')
    }

    // Update user as verified
    await User.findByIdAndUpdate(user._id, {
      emailVerified: true,
      $unset: {
        verificationToken: 1,
        verificationCode: 1,
        verificationExpires: 1
      }
    })

    return NextResponse.redirect('/auth/signin?message=email_verified')
  } catch (error) {
    console.error('Magic link verification error:', error)
    return NextResponse.redirect('/auth/signin?error=verification_failed')
  }
}
