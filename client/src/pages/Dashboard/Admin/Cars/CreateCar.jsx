import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateCarMutation } from "../../../../redux/api/car/carApi";

const CreateCar = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createCar, { isLoading }] = useCreateCarMutation();

  const onSubmit = async (data) => {
    try {
      // Format the data as needed for the API
      const carInfo = {
        make: data.make,
        model: data.model,
        type: data.type,
        year: Number(data.year),
        category: data.category,
        features: data.features.split(","),
        specifications: {
          mileage: data.mileage,
          topSpeed: data.topSpeed,
          acceleration: data.acceleration,
          engine: data.engine,
          horsepower: data.horsepower,
          transmission: data.transmission,
          capacity: data.capacity,
        },
        pricing: Number(data.pricing),
        availability: data.availability === "true",
        images: data.images ? data.images.split(",") : [],
      };

      const response = await createCar(carInfo);

      if (response?.data?.success) {
        toast.success("Car created successfully!");
        reset(); // Reset the form
      } else {
        toast.error(response.error?.data?.message || "Failed to create car.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the car.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Car
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">Make</label>
            <input
              {...register("make")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter car make"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Model</label>
            <input
              {...register("model")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter car model"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Type</label>
            <input
              {...register("type")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter car type"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Year</label>
            <input
              {...register("year")}
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter car year"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Category</label>
            <input
              {...register("category")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter car category"
              required
            />
          </div>

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
            <input
              {...register("mileage")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Mileage"
            />
            <input
              {...register("topSpeed")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Top Speed"
            />
            <input
              {...register("acceleration")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Acceleration"
            />
            <input
              {...register("engine")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Engine"
            />
            <input
              {...register("horsepower")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Horsepower"
            />
            <input
              {...register("transmission")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Transmission"
            />
            <input
              {...register("capacity")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Capacity"
            />
          </div>

          <div className="form-control">
            <label className="label">Pricing</label>
            <input
              {...register("pricing")}
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter pricing per day"
              required
            />
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
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCar;
