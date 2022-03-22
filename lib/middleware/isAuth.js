import jwt from "jsonwebtoken"
import User from "../../model/userModel"

const Authenticated = (component) => {
  return async (req, res) => {
    console.log("here", req.headers?.authorization)
    if (req.headers && req.headers?.authorization) {
      var token = req.headers.authorization.split(" ")[1]

      console.log(token)

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      console.log(decoded?.userId)

      const user = await User.findById({ _id: decoded?.userId }).exec()

      //   console.log(user)

      req.user = user
    }

    return component(req, res)
  }
}

export default Authenticated
