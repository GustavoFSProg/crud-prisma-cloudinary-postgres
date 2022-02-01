import { Request, Response } from 'express-serve-static-core'
import myUserModel from '../models/userModels'
import md5 from 'md5'
import fs from 'fs'
var cloudinary = require('cloudinary')

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import dotenv from 'dotenv'

dotenv.config()

var imagem = ''
var resultado = ''

async function register(req, res) {
  try {
    cloudinary.config({
      cloud_name: 'my-owne',
      api_key: '327628669172468',
      api_secret: 'LNotetZzgEplBeGVjsqm0jDZqdo',
    })

    cloudinary.uploader.upload(`/uploads/${req.file}`, function (result, error) {
      // console.log(result, error)
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })
    const user = await myUserModel.create({
      name: req.body.name,
      email: req.body.email,
      avatar: imagem,
      password: md5(req.body.password, process.env.SECRET),
    })

    return res.status(201).send({ msg: 'user created successfuly!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function getAll(req, res) {
  try {
    const data = await myUserModel.find()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { register, getAll }
