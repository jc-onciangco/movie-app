
import { useRouter } from "next/router"
import { useEffect } from "react"
export default function Home({movies}) {
  const router = useRouter()

  useEffect(() => {
    router.push('/movie')
  }, [router])

  return (
    <div></div>
  )
}
