import { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import useAuth from "@/hooks/useAuth"
import useAxios from "@/hooks/useAxios"

const AddProduct = () => {
  const { user } = useAuth()
  const axiosInstance = useAxios()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [{ date: "", price: null }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  })

  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axiosInstance.post("/products", newProduct)
      return res.data
    },
    onSuccess: () => {
      toast.success("Product added successfully!")
      reset()
    },
    onError: (err) => {
      toast.error("❌ Failed to add product.")
      console.error(err)
    },
  })

  const onSubmit = (data) => {
    const productData = {
      ...data,
      date: selectedDate,
      email: user?.email,
      status: "pending",
    }
    mutation.mutate(productData)
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-xl transition-colors duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-emerald-400">📝 Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Vendor Email</Label>
          <Input type="email" value={user?.email} readOnly className="dark:bg-gray-700 dark:text-gray-100" />
        </div>

        {/* Vendor Name */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Vendor Name (Optional)</Label>
          <Input
            {...register("vendorName")}
            value={user?.displayName}
            placeholder="Vendor name (optional)"
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* Market Name */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Market Name</Label>
          <Input
            {...register("marketName", { required: "Market name is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.marketName && <p className="text-red-500 text-sm">{errors.marketName.message}</p>}
        </div>

        {/* Date */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Date</Label>
          <DatePicker
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Market Description */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Market Description</Label>
          <Textarea
            {...register("marketDescription", { required: "Description is required" })}
            placeholder="e.g., This market is located in..."
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.marketDescription && <p className="text-red-500 text-sm">{errors.marketDescription.message}</p>}
        </div>

        {/* Item Name */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Item Name</Label>
          <Input
            {...register("itemName", { required: "Item name is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* Product Image */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Product Image URL</Label>
          <Input
            {...register("image", { required: "Image is required" })}
            placeholder="https://..."
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* Price Per Unit */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Price per Unit (৳)</Label>
          <Input
            type="number"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            placeholder="৳30"
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* Historical Prices */}
        <div className="space-y-2">
          <Label className="dark:text-gray-100">Price History</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <Controller
                control={control}
                name={`prices.${index}.date`}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    className="w-1/2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange(date?.toISOString())}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Date"
                  />
                )}
              />
              <Input
                type="number"
                placeholder="৳ Price"
                {...register(`prices.${index}.price`, { required: true, valueAsNumber: true })}
                className="w-1/2 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <Button type="button" variant="ghost" onClick={() => remove(index)}>
                ❌
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ date: "", price: null })}>
            ➕ Add Price Entry
          </Button>
        </div>

        {/* Item Description */}
        <div className="space-y-1">
          <Label className="dark:text-gray-100">Item Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Optional notes like freshness, quality..."
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer"
          >
            Submit Product
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default AddProduct
