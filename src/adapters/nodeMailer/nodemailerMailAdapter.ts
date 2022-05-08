import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4b74a418d23559",
    pass: "c131987c54389a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'João Macieira <jpfis2015@gmail.com>',
      subject,
      html: body,
    });
  }
}