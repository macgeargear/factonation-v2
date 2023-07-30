import { pricingPlans } from "./../app/pricing/pricing_plans";
export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type pricingPlan = {
  module: string;
  title: string;
  price: number;
  desc: string[];
};
