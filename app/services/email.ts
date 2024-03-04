import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};

export const htmlEmailTemplate = (otp: number): string => `
<html>
  <body>
    <h3>Welcome to app</h3>
    <p>Your verification code is ${otp}</p>
  </body>
</html>`;

export const forgetPasswordEmailTemplate = (
  token: string,
  first_name: string
): string => `
<html>
  <body>
    <h3>Welcome to Only Classactions</h3>
    <p>Dear ${first_name},</p>
    <p>Click here to reset your password </p>
    <button> <a href=${process.env.APP_URL}/password-reset/${token}> Click Me </a> </button>
    <
  </body>
</html>`;

export const subadminInvitationEmailTemplate = (
  token: string,
  name: string
): string => `
<html>
  <body>
    <h3>Welcome to Only Classactions</h3>
    <p>Dear ${name},</p>
    <p>Click here to setup your profile </p>
    <button> <a href=${process.env.APP_URL}/auth/profile-setup/${token}> Click Me </a> </button>
  </body>
</html>`;

export const reportEmailTemplate = (name: string) => `
<html>
  <body>
    <h3>Open Classactions Repory</h3>
    <p>Dear ${name},</p>
    <p></p>
    <button> <a href=""> Download </a> </button>
  </body>
</html>`;
