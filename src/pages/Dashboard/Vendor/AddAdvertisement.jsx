import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useState } from "react"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import useAuth from "@/hooks/useAuth"

const AddAdvertisement = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  const axiosSecure = useAxiosSecure()
  const [uploading, setUploading] = useState(false)
  const [photoURL, setPhotoURL] = useState("")
  const {user} = useAuth()

  const onSubmit = async (data) => {
    try {
      const adData = {
        vendorEmail: user.email,
        title: data.title,
        description: data.description,
        image: data.image,
        status: "pending",
        created_at: new Date().toISOString()
      }

      const res = await axiosSecure.post("/advertisements", adData)
      if (res.data.insertedId) {
        toast.success("Advertisement submitted!")
        reset()
      }
    } catch (err) {
      toast.error("Failed to submit advertisement.", err)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("image", file)

    setUploading(true)
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
      })
      const imgData = await res.json()
      if (imgData.success) {
        setPhotoURL(imgData.data.url)
        setValue("image", imgData.data.url)
        toast.success("Image uploaded successfully!")
      }
    } catch (err) {
      toast.error("Image upload failed!",err)
    } finally {
      setUploading(false)
      setPhotoURL("")
    }
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">📢 Create Advertisement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Ad Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Ad Title</Label>
          <Input id="title" {...register("title", { required: "Ad title is required" })} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea id="description" rows="4" {...register("description", { required: "Description is required" })} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
          <Input type="hidden" {...register("image", { required: "Image is required" })} />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          {photoURL && (
        <img
          src={photoURL}
          alt="Profile Preview"
          className="h-16 w-16 mt-3 rounded-md border"
        />
      )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 cursor-pointer"
          asChild={false}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Advertisement
        </Button>
      </form>
    </motion.div>
  )
}

export default AddAdvertisement
