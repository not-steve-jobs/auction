// NPM Modules
import sgMail from '@sendgrid/mail';

// LOCAL Modules
import config from '../config/variables.config';

const { SENDGRID_API_KEY } = config;

sgMail.setApiKey(SENDGRID_API_KEY);

export default class EmailUtil {
  static sendMail(from, to, html, subject) {
    const msg = {
      from,
      to,
      html,
      subject
    };

    return sgMail.send(msg);
  }
}
