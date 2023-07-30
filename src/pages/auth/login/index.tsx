import { UserAuthForm, UserAuthFormPage } from "@/components/UserAuthForm";
import { FC } from "react";
import Image from "next/image";
import loginImage from "../../../../public/IMG_1798.webp";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  return (
    <div className="flex min-h-screen flex-1">
      <UserAuthForm page={UserAuthFormPage.LogIn} />
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={loginImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default index;
