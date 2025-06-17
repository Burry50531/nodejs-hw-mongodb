
import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

import { getEnvVar } from '../utils/getEnvVar.js';


const transporter = nodemailer.createTransport({
    host: getEnvVar(SMTP.SMTP_HOST), // адреса SMTP-сервера (наприклад, smtp-relay.brevo.com)
    port: Number(getEnvVar(SMTP.SMTP_PORT)), // порт (465 або 587)
    auth: {
      user: getEnvVar(SMTP.SMTP_USER), // логін (часто = email)
      pass: getEnvVar(SMTP.SMTP_PASSWORD), // пароль або API-ключ
    },
});
  
export const sendEmail = async (options) => {
    return await transporter.sendMail(options);
  };
  