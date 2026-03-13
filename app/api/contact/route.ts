import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      // to: ['lucas.soubry@gmail.com', 'atlantisplongee971@gmail.com'],
      to: ['lucas.soubry@gmail.com'],
      replyTo: email,
      subject: `[Contact Site] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0369a1; border-bottom: 2px solid #0369a1; padding-bottom: 8px;">
            Nouveau message de contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nom :</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email :</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sujet :</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
          </table>
          <h3 style="color: #374151; margin-top: 16px;">Message :</h3>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            Message envoyé depuis le formulaire de contact de atlantisplongee.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json(
      { error: "Échec de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
