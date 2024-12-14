import useForm from "../../hook/useForm";
import { Link } from "react-router-dom";
import { signupUser } from "../../api/auth.js";
import { toast } from "react-hot-toast";

function Signup() {
  const { input, inputValue, formReset } = useForm({
    name: "",
    email: "",
    password: "",
  });

  async function onFormSubmit(e) {
    e.preventDefault();

    const data = await signupUser(input);

    if (data.user) {
      toast.success(data.message);
      formReset();
    } else {
      toast.error(data.message);
    }
  }
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="w-[450px] flex flex-col items-center justify-center p-4 border rounded-md">
        <h2 className="text-center text-3xl font-bold text-black w-full">
          Get Start With obayed
        </h2>
        <form className="w-full mt-4 space-y-5" onSubmit={onFormSubmit}>
          <div className="space-y-2 flex flex-col">
            <label
              className="w-full text-base font-semibold text-current"
              htmlFor=""
            >
              Name
            </label>
            <input
              className="w-full py-2 px-4 text-base  rounded-md focus:outline-none  bg-slate-100 border border-gray-200"
              type="text"
              name="name"
              value={input.name}
              onChange={inputValue}
              placeholder="name"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label
              className="w-full text-base font-semibold text-current"
              htmlFor=""
            >
              Email
            </label>
            <input
              className="w-full py-2 px-4 text-base rounded-md focus:outline-none  bg-slate-100 border border-gray-200"
              type="text"
              name="email"
              value={input.email}
              onChange={inputValue}
              placeholder="email"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label
              className="w-full text-base font-semibold text-current"
              htmlFor=""
            >
              Password
            </label>
            <input
              className="w-full py-2 px-4 text-base rounded-md focus:outline-none  bg-slate-100 border border-gray-200"
              type="text"
              name="password"
              value={input.password}
              onChange={inputValue}
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-center text-base mt-2 bg-red-700 rounded-md text-slate-100 font-semibold p-2"
          >
            Signup
          </button>
        </form>
        <div className="flex flex-row gap-1 mt-10">
          <p className="text-xl text-current font-semibold ">
            Have an account!
          </p>{" "}
          <Link
            className="underline text-red-700 text-xl font-semibold"
            to="/login"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
