// import model here
const { user } = require('../../models')

// import package here
const Joi = require("joi")

exports.register = async (req, res) => {
  // code here
  try {
    const data = req.body

    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().required(),
      status: Joi.string().required()
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.status(400).send({
        status: "error",
        message: error.details[0].message
      })
    }

    const newUser = await user.create({
      name: data.name,
      email: data.email,
      password: data.password,
      status: data.status
    })

    res.status(201).send({
      status: "Success",
      data: {
        name: data.name,
        email: data.email
      }
    })

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server error"
    })
  }
};

exports.login = async (req, res) => {
  // code here
  const data = req.body
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().required()
  })

  const { error } = schema.validate(data)

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message
    })
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: data.email,
        password: data.password
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password doesnt exist"
      })
    }

    res.status(200).send({
      status: "Success",
      data: {
        email: data.email
      }
    })
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server error"
    })
  }
};
