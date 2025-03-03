import { Button, Checkbox, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@/shared/hooks/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const result = await signUp(email, username, password);
    if (result.success) {
      navigate("/sign-in");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
          Enter your information below in order to sign up to your Oclio account
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Input placeholder="Email" role="email" onChange={handleEmailChange} />
        <Input
          placeholder="Username"
          role="username"
          onChange={handleUsernameChange}
        />
        <div className="relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={handlePasswordChange}
          />

          <Button
            className="absolute right-0 top-0"
            variant="ghost"
            size="icon"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye className={cn(isPasswordVisible ? "hidden" : "block")} />
            <EyeOff className={cn(isPasswordVisible ? "block" : "hidden")} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox />
          <span className="text-gray-300">Remember me</span>
        </label>
        <Button onClick={handleSignUp} disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Sign Up
        </Button>
        <div className="self-end text-gray-300">
          Already have and account?{" "}
          <Link
            to="/sign-in"
            className="rounded-md bg-gradient-accent bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
