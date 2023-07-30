import NavbarAdmin from "@/components/NavbarAdmin";
import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  );
};

export default layout;
