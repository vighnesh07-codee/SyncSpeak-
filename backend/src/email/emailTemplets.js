/**
 * emailTemplates.js
 * Email templates for user onboarding and notifications.
 */

// ─────────────────────────────────────────────
//  Helper: inline CSS reset / base styles
// ─────────────────────────────────────────────
const baseStyles = {
  wrapper: `
    margin: 0; padding: 0; width: 100%; background-color: #f4f6fb;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  `,
  container: `
    max-width: 600px; margin: 40px auto; background: #ffffff;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  `,
  header: `
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    padding: 48px 40px 36px; text-align: center;
  `,
  logo: `
    font-size: 28px; font-weight: 800; color: #e94560;
    letter-spacing: 2px; text-decoration: none;
  `,
  tagline: `
    color: #a0aec0; font-size: 13px; margin-top: 6px;
    letter-spacing: 1px; text-transform: uppercase;
  `,
  heroTitle: `
    color: #ffffff; font-size: 30px; font-weight: 700;
    margin: 24px 0 8px; line-height: 1.3;
  `,
  heroSubtitle: `
    color: #a0aec0; font-size: 16px; margin: 0;
  `,
  body: `
    padding: 40px 40px 32px;
  `,
  greeting: `
    font-size: 17px; color: #2d3748; margin: 0 0 16px;
    font-weight: 600;
  `,
  paragraph: `
    font-size: 15px; color: #4a5568; line-height: 1.8;
    margin: 0 0 20px;
  `,
  ctaWrapper: `
    text-align: center; margin: 32px 0;
  `,
  ctaButton: `
    display: inline-block; background: linear-gradient(135deg, #e94560, #c62a47);
    color: #ffffff; font-size: 16px; font-weight: 700;
    padding: 16px 40px; border-radius: 50px; text-decoration: none;
    letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(233,69,96,0.35);
  `,
  divider: `
    border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;
  `,
  featuresGrid: `
    display: table; width: 100%; border-collapse: separate;
    border-spacing: 0; margin: 24px 0;
  `,
  featureCell: `
    display: table-cell; width: 33.33%; padding: 12px 8px;
    text-align: center; vertical-align: top;
  `,
  featureIcon: `
    font-size: 28px; display: block; margin-bottom: 8px;
  `,
  featureLabel: `
    font-size: 13px; color: #718096; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.5px;
  `,
  footer: `
    background: #f7fafc; padding: 28px 40px; text-align: center;
    border-top: 1px solid #e2e8f0;
  `,
  footerText: `
    font-size: 12px; color: #a0aec0; line-height: 1.7; margin: 0 0 8px;
  `,
  footerLink: `
    color: #e94560; text-decoration: none; font-weight: 600;
  `,
  socialRow: `
    margin-top: 16px;
  `,
  socialLink: `
    display: inline-block; margin: 0 6px; color: #718096;
    font-size: 12px; text-decoration: none;
  `,
};

// ─────────────────────────────────────────────
//  Main Template: Welcome on First Signup
// ─────────────────────────────────────────────

/**
 * generateWelcomeEmail
 * @param {Object} options
 * @param {string} options.firstName        - User's first name
 * @param {string} [options.email]          - User's email address
 * @param {string} [options.ctaUrl]         - Call-to-action URL (dashboard link)
 * @param {string} [options.brandName]      - Your brand / product name
 * @param {string} [options.brandLogoUrl]   - Optional logo image URL
 * @param {string} [options.supportEmail]   - Support email address
 * @param {string} [options.unsubscribeUrl] - Unsubscribe link
 * @returns {{ subject: string, html: string, text: string }}
 */
function generateWelcomeEmail({
  firstName = "there",
  email = "",
  ctaUrl = "https://yourwebsite.com/dashboard",
  brandName = "YourBrand",
  brandLogoUrl = "",
  supportEmail = "support@yourwebsite.com",
  unsubscribeUrl = "https://yourwebsite.com/unsubscribe",
} = {}) {
  const subject = `🎉 Welcome to ${brandName}, ${firstName}! You're all set.`;

  // ── HTML Version ──────────────────────────────────────────────────────────
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>${subject}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="${baseStyles.wrapper}">

  <!-- Outer Table (email client compatibility) -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 16px;">

        <!-- Card Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="${baseStyles.container}">

          <!-- ── HEADER ──────────────────────────────────── -->
          <tr>
            <td style="${baseStyles.header}">
              ${
                brandLogoUrl
                  ? `<img src="${brandLogoUrl}" alt="${brandName}" width="140" style="display:block;margin:0 auto 16px;" />`
                  : `<span style="${baseStyles.logo}">${brandName.toUpperCase()}</span>`
              }
              <p style="${baseStyles.tagline}">Welcome aboard</p>
              <h1 style="${baseStyles.heroTitle}">Your account is ready! 🚀</h1>
              <p style="${baseStyles.heroSubtitle}">
                We're thrilled to have you join the community.
              </p>
            </td>
          </tr>

          <!-- ── BODY ───────────────────────────────────── -->
          <tr>
            <td style="${baseStyles.body}">

              <p style="${baseStyles.greeting}">Hi ${firstName},</p>

              <p style="${baseStyles.paragraph}">
                Welcome to <strong>${brandName}</strong>! Your account has been
                successfully created${email ? ` for <strong>${email}</strong>` : ""}.
                We're so glad you're here — you've just unlocked everything we have to offer.
              </p>

              <p style="${baseStyles.paragraph}">
                To get started, click the button below and explore your new dashboard.
                It only takes a few minutes to set up your profile and hit the ground running.
              </p>

              <!-- CTA Button -->
              <div style="${baseStyles.ctaWrapper}">
                <a href="${ctaUrl}" target="_blank" style="${baseStyles.ctaButton}">
                  Go to My Dashboard →
                </a>
              </div>

              <hr style="${baseStyles.divider}" />

              <!-- Features highlight (3-column) -->
              <p style="font-size:14px;font-weight:700;color:#2d3748;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">
                What you can do now
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="33%" align="center" style="padding:12px 8px;vertical-align:top;">
                    <span style="${baseStyles.featureIcon}">⚡</span>
                    <span style="${baseStyles.featureLabel}">Quick Setup</span>
                  </td>
                  <td width="33%" align="center" style="padding:12px 8px;vertical-align:top;">
                    <span style="${baseStyles.featureIcon}">🔒</span>
                    <span style="${baseStyles.featureLabel}">Secure Account</span>
                  </td>
                  <td width="33%" align="center" style="padding:12px 8px;vertical-align:top;">
                    <span style="${baseStyles.featureIcon}">💬</span>
                    <span style="${baseStyles.featureLabel}">24/7 Support</span>
                  </td>
                </tr>
              </table>

              <hr style="${baseStyles.divider}" />

              <p style="${baseStyles.paragraph}">
                Have questions or need help? Our support team is always here for you.
                Just reply to this email or reach us at
                <a href="mailto:${supportEmail}" style="color:#e94560;font-weight:600;">${supportEmail}</a>.
              </p>

              <p style="font-size:15px;color:#4a5568;margin:0;">
                Cheers,<br/>
                <strong>The ${brandName} Team</strong>
              </p>

            </td>
          </tr>

          <!-- ── FOOTER ──────────────────────────────────── -->
          <tr>
            <td style="${baseStyles.footer}">
              <p style="${baseStyles.footerText}">
                You received this email because you signed up at
                <a href="https://yourwebsite.com" style="${baseStyles.footerLink}">${brandName}</a>.
              </p>
              <p style="${baseStyles.footerText}">
                <a href="${unsubscribeUrl}" style="${baseStyles.footerLink}">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="https://yourwebsite.com/privacy" style="${baseStyles.footerLink}">Privacy Policy</a>
                &nbsp;·&nbsp;
                <a href="https://yourwebsite.com/terms" style="${baseStyles.footerLink}">Terms of Service</a>
              </p>
              <p style="${baseStyles.footerText}">
                © ${new Date().getFullYear()} ${brandName}. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card Container -->

      </td>
    </tr>
  </table>
  <!-- /Outer Table -->

</body>
</html>
  `.trim();

  // ── Plain-Text Version (fallback) ─────────────────────────────────────────
  const text = `
Welcome to ${brandName}, ${firstName}!

Your account has been successfully created${email ? ` for ${email}` : ""}.

We're so glad you're here. To get started, visit your dashboard:
${ctaUrl}

---
What you can do now:
  ⚡ Quick Setup
  🔒 Secure Account
  💬 24/7 Support

---
Need help? Contact us at ${supportEmail}.

Cheers,
The ${brandName} Team

─────────────────────────────────────────
You received this because you signed up at ${brandName}.
Unsubscribe: ${unsubscribeUrl}
© ${new Date().getFullYear()} ${brandName}. All rights reserved.
  `.trim();

  return { subject, html, text };
}

// ─────────────────────────────────────────────
//  Usage Examples
// ─────────────────────────────────────────────

/*

  // 1. Basic usage
  const email = generateWelcomeEmail({
    firstName: "Riya",
    email: "riya@example.com",
    ctaUrl: "https://myapp.com/dashboard",
    brandName: "SnapApp",
    supportEmail: "hello@snapapp.com",
    unsubscribeUrl: "https://myapp.com/unsubscribe",
  });

  console.log(email.subject);
  console.log(email.html);    // send as HTML body
  console.log(email.text);    // fallback plain-text body


  // 2. With Nodemailer
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({ ... });

  await transporter.sendMail({
    from: `"SnapApp" <no-reply@snapapp.com>`,
    to: "riya@example.com",
    subject: email.subject,
    html: email.html,
    text: email.text,
  });


  // 3. With SendGrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  await sgMail.send({
    to: "riya@example.com",
    from: "no-reply@snapapp.com",
    subject: email.subject,
    html: email.html,
    text: email.text,
  });


  // 4. With AWS SES
  const SES = new AWS.SES();
  await SES.sendEmail({
    Source: "no-reply@snapapp.com",
    Destination: { ToAddresses: ["riya@example.com"] },
    Message: {
      Subject: { Data: email.subject },
      Body: {
        Html: { Data: email.html },
        Text: { Data: email.text },
      },
    },
  }).promise();

*/

// ─────────────────────────────────────────────
//  Exports
// ─────────────────────────────────────────────
export { generateWelcomeEmail };