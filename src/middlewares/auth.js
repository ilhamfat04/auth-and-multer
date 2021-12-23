// import package here
const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
  // code here
  const authHeader = req.header("Authorization")

  // return res.send({
  //   authHeader,
  //   array: authHeader.split(' ')
  // })

  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(400).send({
      message: "Access Denied"
    })
  }

  try {
    // const SECRET_KEY = 'Sangatrahasia'
    const verified = jwt.verify(token, process.env.TOKEN_KEY)

    req.user = verified
    next()

  } catch (error) {
    res.status(400).send({
      message: "Invalid Token"
    })
  }
};
