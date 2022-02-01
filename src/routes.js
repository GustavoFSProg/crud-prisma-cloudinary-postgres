import { Router } from 'express'
import userController from './controllers/userController'
import uploadConfig from './config/uploadConfig'
import multer from 'multer'

const upload = multer(uploadConfig)

const route = Router()

route.get('/', userController.getAll)
route.get('/get-id/:id', userController.getById)
route.get('/get-name/:name', userController.getByName)
route.post('/register', upload.single('image'), userController.register)
route.put('/update/:id', upload.single('image'), userController.update)
route.delete('/del/:id', userController.apagar)

export default route
