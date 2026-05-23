import { Resend } from 'resend';
import { generateWelcomeEmail } from '../email/emailTemplets.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send welcome email to new user
 * @param {Object} options
 * @param {string} options.fullname - User's full name
 * @param {string} options.email - User's email address
 * @returns {Promise<Object>} Resend response
 */
export const sendWelcomeEmail = async ({ fullname, email }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in environment variables');
    }

    if (!email) {
      throw new Error('Email is required to send welcome email');
    }

    const firstName = fullname?.split(' ')[0] || 'there';

    // Generate email content
    const { subject, html, text } = generateWelcomeEmail({
      firstName,
      email,
      brandName: 'Sync Speak',
      ctaUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@syncspeakapp.com',
    });

    // Send via Resend
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'no-reply@syncspeakapp.com',
      to: email,
      subject,
      html,
      text,
    });

    if (response.error) {
      console.error('Resend error:', response.error);
      throw new Error(`Failed to send welcome email: ${response.error.message}`);
    }

    console.log(`✅ Welcome email sent to ${email}`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    throw error;
  }
};