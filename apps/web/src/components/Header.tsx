import { BookOpenText, CirclePlus, LogOut } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  Separator,
} from "./ui";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "@/store/features/user/userSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const { isAuthenticated } = useSelector(selectUser);
  const [logout] = useLogoutMutation();

  const handleSignOut = async () => {
    await logout();
  };

  const handleCreate = () => {
    toast.warning("Working on it...");
  };

  return (
    <header className="flex h-14 w-full items-center justify-between px-4">
      <Button variant="ghost" size="icon">
        <BookOpenText />
      </Button>

      <div className="flex h-full items-center justify-center">
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCreate}>
              <CirclePlus />
              Create
            </Button>

            <Separator orientation="vertical" className="h-5 bg-[#d0d0d0]" />

            <ModeToggle />

            <Separator orientation="vertical" className="h-5 bg-[#d0d0d0]" />

            <Button variant="ghost" size="icon">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        )}

        {isAuthenticated || (
          <Link to="/sign-in">
            <Button variant="outline">
              <CircleUserRound />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
