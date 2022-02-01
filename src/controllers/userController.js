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

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      // console.log(result, error)
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        avatar: imagem,
        password: md5(req.body.password, process.env.SECRET),
      },
    })

    return res.status(201).send({ msg: 'user created successfuly!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function update(req, res) {
  try {
    cloudinary.config({
      cloud_name: 'my-owne',
      api_key: '327628669172468',
      api_secret: 'LNotetZzgEplBeGVjsqm0jDZqdo',
    })

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      // console.log(result, error)
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    const { id } = req.params

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        name: req.body.name,
        email: req.body.email,
        avatar: imagem,
        password: md5(req.body.password, process.env.SECRET),
      },
    })

    return res.status(201).send({ msg: 'user created successfuly!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function getAll(req, res) {
  try {
    const data = await prisma.user.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params

    const data = await prisma.user.findFirst({
      where: { id: id },
    })

    return res.status(200).json({ data })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getByName(req, res) {
  try {
    const { name } = req.body

    const data = await prisma.user.findFirst({
      where: { name: name },
    })

    return res.status(200).json({ data })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function apagar(req, res) {
  try {
    const { id } = req.params

    await prisma.user.delete({
      where: { id: id },
    })

    return res.status(200).json({ msg: 'Apagado!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'Deu ERRO!!', error })
  }
}

export default { register, getById, getByName, getAll, update, apagar }
