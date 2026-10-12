const nodemailer = require('nodemailer');

// Validate email configuration at startup
const validateEmailConfig = () => {
  const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_APP_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required email configuration:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease set these variables in your .env file');
    return false;
  }
  return true;
};

// Create email transporter
const createTransporter = () => {
  if (!validateEmailConfig()) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();

  if (!transporter) {
    throw new Error('Email transporter could not be created. Check your email configuration.');
  }

  const mailOptions = {
    from: `"Elite Slingshot Association of Chhattisgarh" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - ESAC Athlete Registration',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 30px;
          }
          .otp-box {
            background-color: #fff3e0;
            border: 2px solid #ff6b00;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #ff6b00;
            letter-spacing: 8px;
            margin: 10px 0;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #856404;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Elite Slingshot Association of Chhattisgarh</h1>
            <p>Email Verification</p>
          </div>
          <div class="content">
            <p>Dear Athlete,</p>
            <p>Thank you for registering with the Elite Slingshot Association of Chhattisgarh (ESAC). To complete your athlete registration, please verify your email address using the one-time password (OTP) below.</p>
            
            <div class="otp-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Your Verification Code:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">This code will expire in 5 minutes</p>
            </div>

            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0 0 20px; padding: 0;">
                <li>Never share this OTP with anyone, including ESAC staff</li>
                <li>ESAC will never ask for your OTP via phone or email</li>
                <li>This code can only be used once</li>
              </ul>
            </div>

            <p>If you did not request this verification, please ignore this email or contact our support team immediately.</p>
            <p>For assistance, please contact your District Sports Coordinator or call our Toll-Free Helpline: 1800-233-ESAC.</p>
          </div>
          <div class="footer">
            <p>© 2026 Elite Slingshot Association of Chhattisgarh</p>
            <p>State Governing Body • Official Athlete Credentials</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    console.error('Error details:', error.code, error.response);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

module.exports = {
  validateEmailConfig,
  createTransporter,
  sendOTPEmail
};
