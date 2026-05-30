import Link from "next/link";
import { getInfoUser } from "@/app/action/user";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/interface";

const ProfilePage = async () => {
  const userInfi = await getInfoUser();
  const user: User = userInfi.data;

  return (
    <div className="flex justify-center items-center">
      <Card className="w-xl">
        <CardHeader className="justify-center items-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>LG</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </CardHeader>
        <CardContent className="h-auto">
          <h1 className="text-lg font-bold text-gray-500">
            name: {user?.first_name} {user?.last_name}
          </h1>
          <p className="text-gray-500 mt-1">user name: {user?.user_name}</p>
          <p className="text-gray-500 mt-2">email: {user?.email}</p>
          <Link href="/profile/edit">
            <Button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
