// src/components/ImageUpload.jsx
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

const ImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const { setValue, watch, register, formState: { errors } } = useFormContext()

  const photoUrl = watch("photo")

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    setUploading(true)

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      )
      const result = await res.json()

      if (result.success) {
        const imageUrl = result.data.url
        setValue("photo", imageUrl)
        toast.success("Image uploaded successfully!",{ autoClose: 1000,
hideProgressBar: true, })
      } else {
        toast.error("Image upload failed. Please try again.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong while uploading.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Upload Profile Image</Label>
      <Input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleImageUpload}
        className="cursor-pointer"
      />

      {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}

      {/* Hidden input to store photo URL in react-hook-form */}
      <input
        type="hidden"
        {...register("photo", { required: "Profile image is required" })}
      />

      {photoUrl && (
        <img
          src={photoUrl}
          alt="Profile Preview"
          className="h-16 w-16 mt-3 rounded-md border"
        />
      )}

      {errors.photo && (
        <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
      )}
    </div>
  )
}

export default ImageUpload
