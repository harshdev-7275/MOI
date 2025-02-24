import { useEffect, useState } from "react"
import { sampleUsers } from "../data/user"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../slices/authSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useSelect } from "@react-three/drei"
import { RootState } from "../store/store"


const AuthPage = () => {
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)


    useEffect(()=>{
        console.log(isAuthenticated)
        if(isAuthenticated){
            navigate("/")
        }
    },[navigate,isAuthenticated])

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        if (!username || !password) {
            toast.error("Please fill in all fields")
            setIsLoading(false)
            return
        }
        e.preventDefault()
        console.log("handleLogin")
        const user = sampleUsers.find(user => user.username === username && user.password === password)
        console.log("user", user)
        if (user) {
            console.log("user found")
            toast.success("Login successful! Redirecting...")
            setTimeout(() => {
                dispatch(login(user.username))
                setIsLoading(false)
                navigate("/")
            }, 2000)
        } else {
            console.log("user not found")
            toast.error("Invalid username or password")
            setIsLoading(false)
        }

    }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 tracking-wider">MOI</h1>
          <p className="text-blue-400/80 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-400">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 bg-black border border-blue-400/30 rounded-md text-blue-400 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 bg-black border border-blue-400/30 rounded-md text-blue-400 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-400 text-black font-semibold rounded-md hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage