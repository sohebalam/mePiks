import jwt from "jsonwebtoken"

import { getSession } from "next-auth/react"

import User from "../../model/userModel"

const Authenticated = (component) => {
  return async (req, res) => {
    const session = await getSession({ req })

    if (session) {
      const user = await User.findOne({ email: session?.user?.email })
      console.log(user)

      req.user = user
      return component(req, res)
    }

    if (req.headers && req.headers?.authorization) {
      var token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // console.log(decoded?.userId)

      const user = await User.findById({ _id: decoded?.userId }).exec()

      //   console.log(user)

      req.user = user
      return component(req, res)
    }
  }
}

export default Authenticated
