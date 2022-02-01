import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  avatar: { type: String },
})

export default model('myUserModel', schema)
