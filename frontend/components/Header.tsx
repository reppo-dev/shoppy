import { getToken } from "@/app/action/token";
import ButtonLogout from "./button-logout";
import LightDarkToggle from "./light-dark";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@/interface";
import { getInfoUser } from "@/app/action/user";

const Header = async () => {
  const token = await getToken();
  const userInfi = await getInfoUser();
  const user: User = userInfi.data;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <Link href={"/"} className="uppercase font-bold">
            LOGO
          </Link>
          <Link className="hidden sm:block" href={"/products"}>
            <Button variant={"outline"}>PRODUCTS</Button>
          </Link>
          {token && (
            <Link className="hidden sm:block" href={"/cart"}>
              <Button variant={"outline"}>CART</Button>
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <LightDarkToggle />
          {token ? (
            <>
              <ButtonLogout />
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={user.image} alt="Profile" />
                  <AvatarFallback>LG</AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
              </Link>
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
    </div>
  );
};

export default Header;
