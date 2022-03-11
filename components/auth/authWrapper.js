import { CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { parseCookies } from "nookies"
import { loadUser } from "../../redux/userAction"

const AuthWrapper = ({ children }) => {
  const router = useRouter()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile
  const cookies = parseCookies()
  const { data: session } = useSession()

  //   const user = cookies?.user
  //     ? JSON.parse(cookies.user)
  //     : session?.user
  //     ? session?.user
  //     : ""

  useEffect(() => {
    // useDispatch(loadUser(user?.email, user))
    if (!session && !cookies?.user) {
      router.push("/src/user/login")
    }
  }, [router, session, cookies])

  return <>{loading ? <CircularProgress /> : <div>{children}</div>}</>
}

export default AuthWrapper
