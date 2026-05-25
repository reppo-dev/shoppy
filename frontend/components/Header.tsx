import { getToken } from "@/app/action/token";
import ButtonLogout from "./button-logout";
import LightDarkToggle from "./light-dark";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = async () => {
  const token = await getToken();
  return (
    <div className="px-10 w-screen py-6 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <span className="uppercase font-bold">LOGO</span>
        <Link className="hidden sm:block" href={"/products"}>
          <Button variant={"outline"}>PRODUCTS</Button>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <LightDarkToggle />
        {token ? (
          <>
            <ButtonLogout />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>LG</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
