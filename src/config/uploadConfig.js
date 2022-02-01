import multer from 'multer'
import path from 'path'

export default {
  // eslint-disable-next-line new-cap
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
}
