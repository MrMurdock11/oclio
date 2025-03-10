import { BookOpenText, CirclePlus } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "./ui";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "@/store/features/user/userSlice";

const Header = () => {
  const { isAuthenticated } = useSelector(selectUser);

  return (
    <header className="flex h-14 w-full items-center justify-between px-4">
      <Button variant="ghost" size="icon">
        <BookOpenText />
      </Button>

      <div className="flex items-center justify-center">
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <CirclePlus />
              Create
            </Button>

            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
