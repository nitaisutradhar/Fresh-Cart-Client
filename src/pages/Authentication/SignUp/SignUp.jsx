import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    console.log("Signup Data:", data)
    // TODO: Send to Firebase or backend
  }

  return (
    <motion.div
      className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <Label htmlFor="photo">Profile Image URL</Label>
            <Input
              id="photo"
              placeholder="https://imagehost.com/photo.jpg"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                    },
                    pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must include at least one uppercase and one lowercase letter",
                    },
                })}
                />
                <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer"
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            </div>


          {/* Submit */}
          <Button type="submit" className="w-full bg-primary text-white hover:bg-emerald-600">
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6">
          <Separator />
          <p className="text-center text-sm text-gray-500 mt-4 mb-2">or</p>
          <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
            <FaGoogle />
            Sign up with Google
          </Button>
        </div>

        {/* Already have account */}
        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-primary font-medium ml-1 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUp
