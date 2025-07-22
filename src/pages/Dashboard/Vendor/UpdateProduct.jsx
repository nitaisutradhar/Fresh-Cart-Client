import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const watchedDate = watch("date");

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);
  const watchedPrices = watch("prices"); // live tracking for prices


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

  const onSubmit = (data) => {
    console.log("updated data", data)
    mutation.mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Update Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label className="mb-1 block">🏪 Market Name</Label>
          <Input {...register("marketName", { required: true })} />
        </div>

        <div>
        <Label className="mb-1 block">📅 Date</Label>
        <DatePicker
            selected={watchedDate ? new Date(watchedDate) : null}
            onChange={(date) => setValue("date", date)}
            dateFormat="dd/MM/yyyy"
            className="w-full border rounded-md p-2"
            placeholderText="Select a date"
        />
        </div>

        <div>
          <Label className="mb-1 block">📝 Market Description</Label>
          <Input {...register("marketDescription", { required: true })} />
        </div>

        <div>
          <Label className="mb-1 block">🥦 Item Name</Label>
          <Input {...register("itemName", { required: true })} />
        </div>

        <div>
          <Label className="mb-1 block">📄 Status</Label>
          <Input {...register("status", { required: true })} readOnly />
        </div>

        <div>
          <Label className="mb-1 block">🖼️ Product Image URL</Label>
          <Input {...register("image", { required: true })} />
        </div>

        <div>
          <Label className="mb-1 block">💵 Price Per Unit</Label>
          <Input type="number" {...register("price", { required: true })} />
        </div>

        <div>
          <Label className="mb-1 block">📊 Price Trends</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <DatePicker
                selected={
                watchedPrices?.[index]?.date
                    ? new Date(watchedPrices[index].date)
                    : null
                }

                onChange={(date) =>
                  setValue(`prices.${index}.date`, date)
                }
                dateFormat="dd/MM/yyyy"
                className="w-2/3 px-3 py-2 border rounded-md"
              />
              <Input
                type="number"
                placeholder="৳ Price"
                {...register(`prices.${index}.price`, { required: true })}
                className="w-1/2"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
              >
                ❌
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ date: "", price: "" })}
            className="mt-2"
          >
            ➕ Add More
          </Button>
        </div>

        <div>
          <Label className="mb-1 block">📝 Item Description</Label>
          <Input {...register("description")} />
        </div>

        <Button type="submit" className="w-full mt-6 bg-primary text-white">
          ✅ Update Product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
