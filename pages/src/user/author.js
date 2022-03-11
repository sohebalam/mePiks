import AuthWrapper from "../../../components/auth/authWrapper"
import { getSession } from "next-auth/react"

const Author = () => {
  return (
    <AuthWrapper>
      <h1>Author </h1>
    </AuthWrapper>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Author
