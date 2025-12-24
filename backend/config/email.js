const nodemailer = require('nodemailer');

// Create transporter for sending emails
// For production, use a real email service (Gmail, SendGrid, AWS SES, etc.)
const createTransporter = () => {
    // For development: using ethereal email (fake SMTP service for testing)
    // In production, replace with real SMTP credentials
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction && process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // Production email config
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    } else {
        // Development: Log to console instead of sending real emails
        console.log('⚠️ Using console-only email service (no real emails sent)');
        return null;
    }
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || '"FlitCode Admin" <flitcode.dev@gmail.com>',
        to: email,
        subject: 'Your Login OTP Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                <div style="background-color: #1f2937; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0;">FlitCode Admin</h1>
                </div>
                <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1f2937; margin-top: 0;">Your Login Verification Code</h2>
                    <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
                        You requested to log in to your admin account. Use the following OTP code to complete your login:
                    </p>
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                        <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${otp}</span>
                    </div>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                        ⏰ This code will expire in <strong>10 minutes</strong>.
                    </p>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                        🔒 For security reasons, do not share this code with anyone.
                    </p>
                    <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        If you didn't request this code, please ignore this email or contact support immediately.
                    </p>
                </div>
            </div>
        `,
        text: `Your FlitCode Admin login OTP code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nFor security reasons, do not share this code with anyone.\n\nIf you didn't request this code, please ignore this email.`,
    };

    try {
        if (transporter) {
            const info = await transporter.sendMail(mailOptions);
            console.log('✅ OTP email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        } else {
            // Development mode: log to console
            console.log('\n📧 ========== OTP EMAIL (DEVELOPMENT MODE) ==========');
            console.log(`To: ${email}`);
            console.log(`Subject: ${mailOptions.subject}`);
            console.log(`OTP Code: ${otp}`);
            console.log('===================================================\n');
            return { success: true, messageId: 'dev-mode' };
        }
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = { sendOTPEmail };
