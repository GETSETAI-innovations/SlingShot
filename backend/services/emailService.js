const { google } = require('googleapis');

// OAuth2 client for Gmail API
let oauth2Client = null;

// Validate email configuration at startup
const validateEmailConfig = () => {
  const required = ['GMAIL_CLIENT_ID', 'GMAIL_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN', 'GMAIL_SENDER'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required Gmail OAuth configuration:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease set these variables in your .env file');
    return false;
  }
  return true;
};

// Initialize OAuth2 client
const initializeOAuth2Client = () => {
  if (!validateEmailConfig()) {
    return null;
  }

  if (!oauth2Client) {
    oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });
  }
  return oauth2Client;
};

// Send OTP email using Gmail API
const sendOTPEmail = async (recipientEmail, otp) => {
  const auth = initializeOAuth2Client();

  if (!auth) {
    throw new Error('Gmail OAuth client could not be initialized. Check your email configuration.');
  }

  const gmail = google.gmail({ version: 'v1', auth });

  // Create email content
  const emailContent = createEmailContent(recipientEmail, otp);

  try {
    // Encode the email to base64url format
    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send the email using Gmail API
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    console.log('✅ OTP email sent successfully via Gmail API:', result.data.id);
    return { success: true, messageId: result.data.id };
  } catch (error) {
    console.error('❌ Error sending OTP email via Gmail API:', error.message);

    // Handle specific Gmail API errors
    if (error.code === 401) {
      throw new Error('Gmail authentication failed. Check your OAuth credentials.');
    } else if (error.code === 403) {
      throw new Error('Gmail API permission denied. Ensure gmail.send scope is authorized.');
    } else if (error.code === 429) {
      throw new Error('Gmail API rate limit exceeded. Please try again later.');
    } else if (error.message && error.message.includes('Invalid recipient')) {
      throw new Error('Invalid recipient email address.');
    }

    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

// Create email content in RFC 5322 format
const createEmailContent = (to, otp) => {
  const boundary = 'boundary_' + Date.now();
  const senderEmail = process.env.GMAIL_SENDER;

  const emailParts = [
    `From: "Elite Slingshot Association of Chhattisgarh" <${senderEmail}>`,
    `To: ${to}`,
    `Subject: Verify Your Email - ESAC Athlete Registration`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    'Dear Athlete,',
    '',
    'Thank you for registering with the Elite Slingshot Association of Chhattisgarh (ESAC).',
    'To complete your athlete registration, please verify your email address using the one-time password (OTP) below.',
    '',
    `Your Verification Code: ${otp}`,
    'This code will expire in 5 minutes.',
    '',
    '⚠️ Security Notice:',
    '- Never share this OTP with anyone, including ESAC staff',
    '- ESAC will never ask for your OTP via phone or email',
    '- This code can only be used once',
    '',
    'If you did not request this verification, please ignore this email or contact our support team immediately.',
    'For assistance, please contact your District Sports Coordinator or call our Toll-Free Helpline: 1800-233-ESAC.',
    '',
    '© 2026 Elite Slingshot Association of Chhattisgarh',
    'State Governing Body • Official Athlete Credentials',
    'This is an automated email. Please do not reply.',
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    '',
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Email Verification</title>',
    '  <style>',
    '    body {',
    '      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;',
    '      background-color: #f5f5f5;',
    '      margin: 0;',
    '      padding: 20px;',
    '    }',
    '    .container {',
    '      max-width: 600px;',
    '      margin: 0 auto;',
    '      background-color: #ffffff;',
    '      border-radius: 10px;',
    '      overflow: hidden;',
    '      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);',
    '    }',
    '    .header {',
    '      background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);',
    '      color: white;',
    '      padding: 30px;',
    '      text-align: center;',
    '    }',
    '    .header h1 {',
    '      margin: 0;',
    '      font-size: 24px;',
    '      font-weight: bold;',
    '    }',
    '    .content {',
    '      padding: 30px;',
    '    }',
    '    .otp-box {',
    '      background-color: #fff3e0;',
    '      border: 2px solid #ff6b00;',
    '      border-radius: 8px;',
    '      padding: 20px;',
    '      text-align: center;',
    '      margin: 20px 0;',
    '    }',
    '    .otp-code {',
    '      font-size: 36px;',
    '      font-weight: bold;',
    '      color: #ff6b00;',
    '      letter-spacing: 8px;',
    '      margin: 10px 0;',
    '    }',
    '    .warning {',
    '      background-color: #fff3cd;',
    '      border-left: 4px solid #ffc107;',
    '      padding: 15px;',
    '      margin: 20px 0;',
    '      font-size: 14px;',
    '      color: #856404;',
    '    }',
    '    .footer {',
    '      background-color: #f8f9fa;',
    '      padding: 20px;',
    '      text-align: center;',
    '      font-size: 12px;',
    '      color: #6c757d;',
    '    }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="container">',
    '    <div class="header">',
    '      <h1>Elite Slingshot Association of Chhattisgarh</h1>',
    '      <p>Email Verification</p>',
    '    </div>',
    '    <div class="content">',
    '      <p>Dear Athlete,</p>',
    '      <p>Thank you for registering with the Elite Slingshot Association of Chhattisgarh (ESAC). To complete your athlete registration, please verify your email address using the one-time password (OTP) below.</p>',
    '      <div class="otp-box">',
    '        <p style="margin: 0; font-size: 14px; color: #666;">Your Verification Code:</p>',
    `        <div class="otp-code">${otp}</div>`,
    '        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">This code will expire in 5 minutes</p>',
    '      </div>',
    '      <div class="warning">',
    '        <strong>⚠️ Security Notice:</strong>',
    '        <ul style="margin: 10px 0 0 20px; padding: 0;">',
    '          <li>Never share this OTP with anyone, including ESAC staff</li>',
    '          <li>ESAC will never ask for your OTP via phone or email</li>',
    '          <li>This code can only be used once</li>',
    '        </ul>',
    '      </div>',
    '      <p>If you did not request this verification, please ignore this email or contact our support team immediately.</p>',
    '      <p>For assistance, please contact your District Sports Coordinator or call our Toll-Free Helpline: 1800-233-ESAC.</p>',
    '    </div>',
    '    <div class="footer">',
    '      <p>© 2026 Elite Slingshot Association of Chhattisgarh</p>',
    '      <p>State Governing Body • Official Athlete Credentials</p>',
    '      <p>This is an automated email. Please do not reply.</p>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>',
    '',
    `--${boundary}--`
  ];

  return emailParts.join('\r\n');
};

module.exports = {
  validateEmailConfig,
  initializeOAuth2Client,
  sendOTPEmail
};
