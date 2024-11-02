import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useSignInMutation } from "../../redux/api/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { USER_ROLE } from "../../constant/UserConsatant";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [login] = useSignInMutation();
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (data) => {
    const toastId = toast.loading("logging In...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.token);
      if (user?.role === USER_ROLE.user || user?.role === USER_ROLE.admin) {
        dispatch(
          setUser({
            user: { ...user, name: res?.data?.name },
            token: res.token,
          })
        );
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
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
                  {...register("email", { required: "Email is required" })} // Register email
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/*  {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p> // Display error message
                )} */}
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
                  })} // Register password
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/*   {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p> // Display error message
                )} */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Dont have an account?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
