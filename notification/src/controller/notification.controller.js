// NPM Modules

// Local Modules
import { EmailService } from '../services';
import { SuccessHandlerUtil } from '../utils';

class NotificationController {
  static async sendMail(req, res, next) {
    try {
      const { email, verification_code } = req.body;
      await EmailService.sendEmail(email, verification_code);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default NotificationController;
