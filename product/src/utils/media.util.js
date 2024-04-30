// NPM Modules
import path from 'path';
import fs from 'fs';

// Local Modules
import config from '../config/variables.config';
import { LoggerUtil } from '.';

const { STORAGE } = config;

export default class MediaUtil {
  static deleteMedia(myProducts) {
    for (const myProduct of myProducts) {
      for (const image of myProduct.images) {
        fs.unlink(path.join(__dirname, `../../../${STORAGE.IMAGES}/${image.name}`),
          (err) => { if (err) LoggerUtil.error(err); });
      }
      for (const video of myProduct.video) {
        fs.unlink(path.join(__dirname, `../../../${STORAGE.VIDEOS}/${video.name}`),
          (err) => { if (err) LoggerUtil.error(err); });
      }
    }
  }
}
