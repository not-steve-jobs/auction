// NPM Modules
import express from 'express';

// Local Modules
import { NotificationController } from '../controller';

const router = express.Router();

router.post('/sendMail',
  NotificationController.sendMail);

export default router;
