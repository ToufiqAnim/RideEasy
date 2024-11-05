import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleCarQuery,
  useUpdatecarMutation,
} from "../../../../redux/api/car/carApi";

const UpdateCar = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();

  // Fetch the car data
  const { data: carData, isLoading: isFetching } = useGetSingleCarQuery(id);
  const [updateCar, { isLoading: isUpdating }] = useUpdatecarMutation();

  useEffect(() => {
    if (carData) {
      reset(carData);
      if (carData.features) setValue("features", carData.features.join(", "));
      if (carData.images) setValue("images", carData.images.join(", "));
    }
  }, [carData, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const carInfo = {
        ...data,
        year: Number(data.year),
        pricing: Number(data.pricing),
        availability: data.availability === "true",
        features: data.features.split(","),
        images: data.images.split(","),
        specifications: {
          mileage: data.mileage,
          topSpeed: data.topSpeed,
          acceleration: data.acceleration,
          engine: data.engine,
          horsepower: data.horsepower,
          transmission: data.transmission,
          capacity: data.capacity,
        },
      };

      const response = await updateCar({ id, ...carInfo });

      if (response?.data?.success) {
        toast.success("Car updated successfully!");
        navigate("/cars");
      } else {
        toast.error(response.error?.data?.message || "Failed to update car.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the car.");
    }
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Car
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["make", "model", "type", "year", "category", "pricing"].map(
            (field) => (
              <div className="form-control" key={field}>
                <label className="label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  {...register(field)}
                  type={
                    field === "year" || field === "pricing" ? "number" : "text"
                  }
                  className="input input-bordered w-full"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            )
          )}

          <div className="form-control">
            <label className="label">Features</label>
            <input
              {...register("features")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter features (comma-separated)"
            />
          </div>

          <div className="form-control">
            <label className="label">Specifications</label>
            {[
              "mileage",
              "topSpeed",
              "acceleration",
              "engine",
              "horsepower",
              "transmission",
              "capacity",
            ].map((spec) => (
              <input
                key={spec}
                {...register(spec)}
                type="text"
                className="input input-bordered w-full"
                placeholder={spec.charAt(0).toUpperCase() + spec.slice(1)}
              />
            ))}
          </div>

          <div className="form-control">
            <label className="label">Availability</label>
            <select
              {...register("availability")}
              className="select select-bordered w-full"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">Images</label>
            <input
              {...register("images")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter images (comma-separated)"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
