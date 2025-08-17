import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <Loading />;

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const result = await signIn(email, password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      const errorCode = err.code;
      switch (errorCode) {
        case "auth/wrong-password":
          toast.error("Your password is not correct.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        default:
          toast.error("Something went wrong. Please try again.");
          break;
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-center text-primary dark:text-emerald-400 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-100">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-100">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must include at least one uppercase and one lowercase letter",
                  },
                })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xl text-gray-500 dark:text-gray-300 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button type="submit" className="w-full bg-primary text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer">
              Login
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="my-6">
          <Separator className="dark:border-gray-600" />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 mb-2">or</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center cursor-pointer dark:border-gray-400 dark:text-gray-100"
            >
              <FaGoogle />
              Login with Google
            </Button>
          </motion.div>
        </div>

        {/* Redirect to SignUp */}
        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Don't have an account?
          <Link to="/signup" className="text-primary dark:text-emerald-400 font-medium ml-1 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
