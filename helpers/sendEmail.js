const nodeMailer = require("nodemailer");

exports.sendEmail = async (email, otp, emailtype) => {
    console.log("sendEmail function called");
  try {
    console.log("sendEmail function called");

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    console.log(process.env.AUTH_EMAIL);
console.log(process.env.AUTH_PASSWORD);

    const info = await transporter.sendMail({
      from: `Ecommerce Shop BD <${process.env.AUTH_EMAIL}>`,
      to: 'saimonpriya57@gmail.com',
      subject: "Hello" + " " +
        emailtype === "verify"
          ? "OTP Verification"
          : "Forgot Password - OTP Verification",
      html:
        emailtype === "verify"
          ? `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="background-color: #4CAF50; padding: 30px 20px;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 1px;">Ecommerce Shop BD</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; color: #333333;">
                            <h2 style="color: #4CAF50; margin-bottom: 10px;">অভিনন্দন! 🎉</h2>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">আপনার অ্যাকাউন্টটি সফলভাবে তৈরি করা হয়েছে। আমাদের সাথে যুক্ত হওয়ার জন্য আপনাকে অসংখ্য ধন্যবাদ।</p>
                            <div style="margin: 35px 0; padding: 20px; background-color: #f1f8f1; border-radius: 8px; border-left: 5px solid #4CAF50;">
                                <p style="margin: 0; font-size: 14px; color: #555555;">আপনার ইউজারনেম/ইমেইল:</p>
                                <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #333333;">${email}</p>
                                <p style="margin: 15px 0 0 0; font-size: 14px; color: #555555;">আপনার OTP কোড:</p>
                                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #333333; letter-spacing: 5px;">${otp}</p>
                            </div>
                            <p style="font-size: 16px; line-height: 1.6;">এখনই কেনাকাটা শুরু করতে নিচের বাটনে ক্লিক করুন:</p>
                            <div style="margin-top: 30px;">
                                <a href="https://yourwebsite.com/login" style="background-color: #4CAF50; color: #ffffff; padding: 15px 35px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 50px; display: inline-block;">Log In to Your Account</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f4f4f4; padding: 20px; color: #777777; font-size: 12px;">
                            <p style="margin: 0;">এটি একটি সিস্টেম জেনারেটেড ইমেইল, দয়া করে রিপ্লাই করবেন না।</p>
                            <p style="margin: 10px 0 0 0;">© 2026 Ecommerce Shop BD. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
          : `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 30px 0;">
                <table width="550" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <tr>
                        <td height="5" style="background-color: #e74c3c;"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 30px 20px;">
                            <h2 style="margin: 0; color: #333; font-size: 24px;">Ecommerce Shop BD</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                            <div style="margin-bottom: 25px;">
                                <span style="font-size: 50px;">🔑</span>
                            </div>
                            <h2 style="color: #333; margin-top: 0;">পাসওয়ার্ড রিসেট রিকোয়েস্ট</h2>
                            <p style="color: #666; font-size: 16px; line-height: 1.5;">আপনি আপনার অ্যাকাউন্টের পাসওয়ার্ড রিসেট করার জন্য অনুরোধ করেছেন। নিচে দেওয়া <strong>OTP</strong> কোডটি ব্যবহার করে আপনার পাসওয়ার্ড পরিবর্তন করুন।</p>
                            <div style="margin: 30px 0; padding: 20px; background-color: #fff5f5; border: 2px dashed #e74c3c; border-radius: 10px; display: inline-block;">
                                <span style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #e74c3c;">${otp}</span>
                            </div>
                            <p style="color: #999; font-size: 14px; margin-bottom: 30px;">এই কোডটি আগামী <strong>৫ মিনিটের</strong> জন্য কার্যকর থাকবে।</p>
                            <a href="https://yourwebsite.com/reset-password" style="background-color: #333; color: #ffffff; padding: 14px 30px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 8px; display: inline-block;">Reset Password Now</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #fcfcfc; padding: 25px; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0; font-size: 12px; color: #aaaaaa;">&copy; 2026 Ecommerce Shop BD. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};