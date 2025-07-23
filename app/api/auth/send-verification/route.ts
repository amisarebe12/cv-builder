import { NextRequest, NextResponse } from 'next/server'
import { generateVerificationToken, generateVerificationCode, getVerificationEmailTemplate, sendEmail, logEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, userId, name } = await request.json()

    if (!email || !userId || !name) {
      return NextResponse.json(
        { error: 'Thiếu thông tin cần thiết' },
        { status: 400 }
      )
    }

    // Connect to database
    const { default: connectDB } = await import('@/lib/mongodb')
    const { default: User } = await import('@/models/User')
    
    await connectDB()
    
    // Find user
    const user = await User.findById(userId)
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

    // Generate verification token and code
    const verificationToken = generateVerificationToken(userId, email)
    const verificationCode = generateVerificationCode()
    const verificationExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    // Create magic link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const magicLink = `${baseUrl}/auth/verify-email?token=${verificationToken}`

    // Update user with verification data
    await User.findByIdAndUpdate(userId, {
      verificationToken,
      verificationCode,
      verificationExpires
    })

    // Get email template
    const emailTemplate = getVerificationEmailTemplate(verificationCode, magicLink, name)

    try {
      // Try to send email via external service
      if (process.env.RESEND_API_KEY) {
        await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)
      } else {
        // Fallback to console logging for development
        logEmail(email, emailTemplate.subject, verificationCode, magicLink)
      }

      return NextResponse.json({
        message: 'Email xác thực đã được gửi',
        expiresIn: '5 phút'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      
      // Still return success but log the email details
      logEmail(email, emailTemplate.subject, verificationCode, magicLink)
      
      return NextResponse.json({
        message: 'Email xác thực đã được tạo (kiểm tra console log)',
        expiresIn: '5 phút',
        warning: 'Email service không khả dụng, kiểm tra console'
      })
    }
  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi email xác thực' },
      { status: 500 }
    )
  }
}
