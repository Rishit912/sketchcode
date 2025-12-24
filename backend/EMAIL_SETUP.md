# Email OTP Setup Guide

## Overview
The login system now uses Email OTP (One-Time Password) verification for enhanced security. Every login requires entering a 6-digit code sent to the admin's email.

## Development Mode
In development mode (`NODE_ENV=development`), OTP codes are **logged to the console** instead of being sent via email. Check your backend terminal to see the OTP code.

Example console output:
```
📧 ========== OTP EMAIL (DEVELOPMENT MODE) ==========
To: admin@example.com
Subject: Your Login OTP Code
OTP Code: 123456
===================================================
```

## Production Setup

### Option 1: Gmail (Recommended for small applications)

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select "2-Step Verification"
   - Scroll to "App passwords"
   - Generate a new app password for "Mail"
3. Add these to your `.env` file:

```env
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM="FlitCode Admin <noreply@flitcode.com>"
```

### Option 2: SendGrid (Recommended for production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Add these to your `.env` file:

```env
NODE_ENV=production
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM="FlitCode Admin <noreply@flitcode.com>"
```

### Option 3: AWS SES (Recommended for enterprise)

1. Set up [AWS SES](https://aws.amazon.com/ses/)
2. Verify your domain
3. Get SMTP credentials
4. Add these to your `.env` file:

```env
NODE_ENV=production
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-aws-smtp-username
EMAIL_PASS=your-aws-smtp-password
EMAIL_FROM="FlitCode Admin <noreply@flitcode.com>"
```

## Security Features

✅ **Email OTP Verification** - 6-digit code sent to admin email  
✅ **10-minute expiry** - OTP codes expire after 10 minutes  
✅ **Resend functionality** - Can request new OTP with 60-second cooldown  
✅ **Brute force protection** - Account locks after 5 failed attempts  
✅ **Generic error messages** - Doesn't reveal if email exists  

## Testing

1. Start the backend server
2. Go to the login page
3. Enter your credentials
4. Check the console (dev) or email (prod) for the OTP
5. Enter the 6-digit code to complete login

## Troubleshooting

**OTP not received in production:**
- Check spam/junk folder
- Verify SMTP credentials are correct
- Ensure EMAIL_HOST and EMAIL_PORT are correct
- Check firewall/network settings

**Console shows no OTP in development:**
- Make sure `NODE_ENV=development` is set in `.env`
- Restart the backend server after changing `.env`

**OTP expired:**
- OTPs are valid for 10 minutes
- Request a new OTP using the "Resend OTP" button
