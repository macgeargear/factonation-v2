import { FC } from "react";

interface ShopProps {}

const Shop: FC<ShopProps> = ({}) => {
  return (
    <div className="h-screen mx-auto mt-40">
      <div className="mx-auto font-semibold text-5xl">
        Unlimited access to 100+ lists.
      </div>
    </div>
  );
};

export default Shop;
