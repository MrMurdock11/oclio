import { Button, Checkbox, Input } from "@/components/ui";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="flex w-[24.125rem] flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-[1.5rem] font-medium text-slate-900">
          Hello, hello!
        </span>
        <span className="text-gray-300">
          Enter your information below in order to sign up to your Oclio account
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span className="text-gray-300">Remember me</span>
        </div>
        <Button>Sign Up</Button>
        <div className="self-end text-gray-300">
          Already have and account?{" "}
          <Link
            to="/sign-in"
            className="bg-gradient-accent rounded-md bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
