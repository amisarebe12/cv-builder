import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// JWT utilities for verification tokens
export const generateVerificationToken = (userId: string, email: string) => {
  const payload = {
    userId,
    email,
    type: 'email_verification',
    iat: Math.floor(Date.now() / 1000)
  }
  
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
    expiresIn: '5m' // 5 minutes
  })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
  } catch (error) {
    return null
  }
}

// Generate 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Generate secure random token
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

// Email templates
export const getVerificationEmailTemplate = (code: string, magicLink: string, userName: string) => {
  return {
    subject: 'Xác thực email của bạn - CV Builder',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px dashed #0891b2; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .code { font-size: 32px; font-weight: bold; color: #0891b2; letter-spacing: 5px; }
          .button { display: inline-block; background: #0891b2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 CV Builder</h1>
            <p>Xác thực email của bạn</p>
          </div>
          
          <div class="content">
            <h2>Xin chào ${userName}!</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản CV Builder. Để hoàn tất quá trình đăng ký, vui lòng xác thực email của bạn.</p>
            
            <div class="code-box">
              <p><strong>Mã xác thực của bạn:</strong></p>
              <div class="code">${code}</div>
              <p><small>Mã này có hiệu lực trong 5 phút</small></p>
            </div>
            
            <p>Hoặc bạn có thể nhấp vào liên kết bên dưới để xác thực ngay:</p>
            <div style="text-align: center;">
              <a href="${magicLink}" class="button">Xác thực Email</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Lưu ý bảo mật:</strong>
              <ul>
                <li>Không chia sẻ mã xác thực này với bất kỳ ai</li>
                <li>Mã chỉ có hiệu lực trong 5 phút</li>
                <li>Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>Email này được gửi từ CV Builder</p>
            <p>Nếu bạn gặp vấn đề, vui lòng liên hệ hỗ trợ</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Xin chào ${userName}!
      
      Cảm ơn bạn đã đăng ký tài khoản CV Builder.
      
      Mã xác thực của bạn: ${code}
      Mã này có hiệu lực trong 5 phút.
      
      Hoặc truy cập liên kết: ${magicLink}
      
      Nếu bạn không yêu cầu xác thực này, vui lòng bỏ qua email.
      
      Trân trọng,
      CV Builder Team
    `
  }
}

// Send email function (using Vercel's built-in email or external service)
export const sendEmail = async (to: string, subject: string, html: string, text: string) => {
  // For Vercel free tier, we'll use a simple email service
  // You can replace this with your preferred email service (SendGrid, Resend, etc.)
  
  try {
    // Using fetch to send email via external service
    // This is a placeholder - you'll need to configure your email service
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'noreply@cvbuilder.com',
        to: [to],
        subject,
        html,
        text
      })
    })
    
    if (!response.ok) {
      throw new Error(`Email service error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

// Alternative: Simple email logging for development
export const logEmail = (to: string, subject: string, code: string, magicLink: string) => {
  console.log('=== EMAIL VERIFICATION ====')
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Verification Code: ${code}`)
  console.log(`Magic Link: ${magicLink}`)
  console.log('==========================')
}