// import { Google } from "@/components/icons";
import { Button, Checkbox, Input } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/store/api/authApi";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async () => {
    const result = await login({ email, password }).unwrap();
    if (result.user) {
      navigate("/");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex w-[24.125rem] flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-[1.5rem] font-medium text-slate-900">
          Hello, hello!
        </span>
        <span className="text-gray-300">
          Enter your information below in order to sign in to your Oclio account
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Input placeholder="Email" onChange={handleEmailChange} />
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox />
          <span className="text-gray-300">Remember me</span>
        </label>
        <Button onClick={handleSignIn} disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Sign In
        </Button>
        <div className="self-end text-gray-300">
          Do not have an account?{" "}
          <Link
            to="/sign-up"
            className="rounded-md bg-gradient-accent bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* <div className="grid grid-cols-[1fr_min-content_1fr] items-center gap-5 text-gray-300">
        <hr className="h-[1px] bg-gray-300" />
        <span>or</span>
        <hr className="h-[1px] bg-gray-300" />
      </div>

      <Button variant="outline" className="flex w-full">
        <Google />
        Sign In with Google
      </Button> */}
    </div>
  );
};

export default Form;
