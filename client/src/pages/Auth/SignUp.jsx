import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_ROLE } from "../../constant/UserConsatant";
import { useSignUpMutation } from "../../redux/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/feature/authSlice";

const SignUp = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Signing Up....");
    try {
      const signUpData = {
        ...data,
        role: USER_ROLE.user,
      };
      const res = await signUp(signUpData).unwrap();
      console.log(res);
      if (res?.success) {
        dispatch(setAuth({ user: res.data, token: res.data.accessToken }));

        toast.success(res?.message, { id: toastId, duration: 2000 });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="mx-auto container">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Now
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })} // Register name field
                  type="text"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.message && (
                  <p className="text-red-600 text-sm">
                    {String(errors.name?.message)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "Email is required" })} // Register email field
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email?.message && (
                  <p className="text-red-600 text-sm">
                    {String(errors.email?.message)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })} // Register password field
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password?.message && (
                  <p className="text-red-600 text-sm">
                    {String(errors.password?.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                {/*      <div className="mt-2">
                  <input
                    id="phone"
                    {...register("phone", { required: "Phone is required" })}
                    type="number"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone?.message && (
                    <p className="text-red-600 text-sm">
                      {String(errors.phone?.message)}
                    </p>
                  )}
                </div> */}
              </div>

              {/*       <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                    })} // Register address field
                    type="text"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address?.message && (
                    <p className="text-red-600 text-sm">
                      {String(errors.address?.message)}
                    </p>
                  )}
                </div>
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
