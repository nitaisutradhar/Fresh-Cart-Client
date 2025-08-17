import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";

const SignUp = () => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { name, email, password, photo } = data;

      const result = await createUser(email, password);
      if (result.user) {
        const userData = {
          name,
          email,
          image: photo || "https://i.pravatar.cc/150?img=3",
        };
        await axiosInstance.post("/user", userData);
      }
      await updateUserProfile({ displayName: name, photoURL: photo });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      const errorCode = err.code;
      switch (errorCode) {
        case "auth/wrong-password":
          toast.error("Your password is not correct.");
          break;
        case "auth/email-already-in-use":
          toast.error("An account with this email already exists.");
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

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL || "https://i.pravatar.cc/150?img=3",
        };
        await axiosInstance.post("/user", userData);
      }
      toast.success("Signed in with Google!");
      navigate("/");
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
          Create Your Account
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-100">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                {...register("name", { required: "Name is required" })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <ImageUpload />

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
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer"
              >
                Sign Up
              </Button>
            </motion.div>
          </form>
        </FormProvider>

        {/* Divider */}
        <div className="my-6">
          <Separator className="dark:border-gray-600" />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 mb-2">or</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center dark:border-gray-400 dark:text-gray-100"
            >
              <FaGoogle />
              Sign up with Google
            </Button>
          </motion.div>
        </div>

        {/* Already have account */}
        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?
          <Link
            to="/login"
            className="text-primary dark:text-emerald-400 font-medium ml-1 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
