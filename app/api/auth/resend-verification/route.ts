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

    // Generate new verification code and token
    const { generateVerificationCode, generateVerificationToken, getVerificationEmailTemplate, sendEmail } = await import('@/lib/email')
    
    const verificationCode = generateVerificationCode()
    const verificationToken = generateVerificationToken(user._id.toString(), email)
    const verificationExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    
    // Update user with new verification data
    await User.findByIdAndUpdate(user._id, {
      verificationCode,
      verificationToken,
      verificationExpires
    })
    
    // Create magic link
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host') || 'www.cleanspark.site'
    const baseUrl = `${protocol}://${host}`
    const magicLink = `${baseUrl}/auth/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`
    
    // Send verification email
    try {
      const emailTemplate = getVerificationEmailTemplate(verificationCode, magicLink, user.name)
      await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text)
      
      return NextResponse.json({
        message: 'Email xác thực đã được gửi lại',
        success: true
      })
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