// NPM modules
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import fs from 'fs';

// Local modules
import { ErrorsUtil, LoggerUtil } from '../utils';
import config from '../config/variables.config';

const { InputValidationError } = ErrorsUtil;
const { IMG_DIR, VID_DIR } = config;

export class ImageUploadMiddleware {
  static uploadImages(req, res, next) {
    try {
      req.folderName = req.baseUrl.slice(req.baseUrl.lastIndexOf('/')).slice(1);
      if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR);

      for (let i = 0; i < req.files?.length; i += 1) {
        const ext = (extname(req.files[i].originalname)).toLowerCase();

        // TODO is not defined list of video or image formats
        if (ext !== '.mp4') {
          const image = Buffer.from(req.files[i].buffer, 'base64');
          const newName = `${uuidv4()}${ext}`;
          const storePath = `${IMG_DIR}/${newName}`;
          const type = req.files[i].mimetype.split('/')[0];

          req.files[i].originalname = newName;
          req.files[i].type = type;

          const stream = fs.createWriteStream(storePath);
          stream.write(image);
          stream.end();
          stream.on('finish', () => LoggerUtil.info(`Image ${newName} is uploaded!`));
        }
      }
      next();
    } catch (error) {
      throw new InputValidationError(error.message);
    }
  }

  static uploadVideo(req, res, next) {
    try {
      req.folderName = req.baseUrl.slice(req.baseUrl.lastIndexOf('/')).slice(1);
      if (!fs.existsSync(VID_DIR)) fs.mkdirSync(VID_DIR);

      for (let i = 0; i < req.files?.length; i += 1) {
        const ext = (extname(req.files[i].originalname)).toLowerCase();

        // TODO is not defined list of video or image formats
        if (ext === '.mp4') {
          const video = Buffer.from(req.files[i].buffer, 'base64');
          const newName = `${uuidv4()}${ext}`;
          const storePath = `${VID_DIR}/${newName}`;
          const type = req.files[i].mimetype.split('/')[0];

          req.files[i].originalname = newName;
          req.files[i].type = type;

          const stream = fs.createWriteStream(storePath);
          stream.write(video);
          stream.end();
          stream.on('finish', () => LoggerUtil.info(`Video ${newName} is uploaded!`));
        }
      }
      next();
    } catch (error) {
      throw new InputValidationError(error.message);
    }
  }
}
