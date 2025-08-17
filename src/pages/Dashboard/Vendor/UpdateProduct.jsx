import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading from "@/components/Loading";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "prices" });

  const watchedDate = watch("date");
  const watchedPrices = watch("prices");

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/products/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries(["product", id]);
      navigate("/dashboard/vendor/my-products");
    },
    onError: (err) => {
      toast.error("Failed to update product");
      console.error(err);
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary dark:text-emerald-400">
        Update Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="mb-1 block dark:text-gray-100">🏪 Market Name</Label>
          <Input
            {...register("marketName", { required: "Market name is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.marketName && <p className="text-red-500 text-sm mt-1">{errors.marketName.message}</p>}
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">📅 Date</Label>
          <DatePicker
            selected={watchedDate ? new Date(watchedDate) : null}
            onChange={(date) => setValue("date", date)}
            dateFormat="dd/MM/yyyy"
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-gray-100"
            placeholderText="Select a date"
          />
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">📝 Market Description</Label>
          <Textarea
            {...register("marketDescription", { required: "Market description is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.marketDescription && <p className="text-red-500 text-sm mt-1">{errors.marketDescription.message}</p>}
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">🥦 Item Name</Label>
          <Input
            {...register("itemName", { required: "Item name is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>}
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">📄 Status</Label>
          <Input
            {...register("status", { required: true })}
            readOnly
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">🖼️ Product Image URL</Label>
          <Input
            {...register("image", { required: "Image URL is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">💵 Price Per Unit</Label>
          <Input
            type="number"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">📊 Price Trends</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <DatePicker
                selected={watchedPrices?.[index]?.date ? new Date(watchedPrices[index].date) : null}
                onChange={(date) => setValue(`prices.${index}.date`, date)}
                dateFormat="dd/MM/yyyy"
                className="w-2/3 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
                placeholderText="Date"
              />
              <Input
                type="number"
                placeholder="৳ Price"
                {...register(`prices.${index}.price`, { required: "Price is required", valueAsNumber: true })}
                className="w-1/2 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <Button type="button" variant="ghost" onClick={() => remove(index)}>
                ❌
              </Button>
            </div>
          ))}
          {errors.prices && <p className="text-red-500 text-sm mt-1">Please ensure all price history entries have a date and a price.</p>}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ date: "", price: null })}
            className="mt-2"
          >
            ➕ Add More
          </Button>
        </div>

        <div>
          <Label className="mb-1 block dark:text-gray-100">📝 Item Description</Label>
          <Textarea
            {...register("description", { required: "Item description is required" })}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <Button type="submit" className="w-full mt-6 bg-primary text-white dark:bg-emerald-500 dark:hover:bg-emerald-600">
          ✅ Update Product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
