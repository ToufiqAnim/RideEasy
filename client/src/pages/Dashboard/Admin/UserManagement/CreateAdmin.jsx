import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSignUpMutation } from "../../../../redux/api/auth/authApi";
import { USER_ROLE } from "../../../../constant/UserConsatant";

const CreateAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createAdmin] = useSignUpMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const createAdminData = {
        ...data,
        role: USER_ROLE.admin,
      };

      const res = await createAdmin(createAdminData).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        reset();
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Admin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
