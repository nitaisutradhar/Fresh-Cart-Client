import { MdTrendingUp, MdListAlt } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <div className="space-y-1">
      <MenuItem
        icon={MdTrendingUp}
        label="View Price Trends"
        address="/dashboard/user/price-trends"
      />
      <MenuItem
        icon={FaTools}
        label="Manage Watchlist"
        address="/dashboard/user/watchlist"
      />
      <MenuItem
        icon={MdListAlt}
        label="My Order List"
        address="/dashboard/user/orders"
      />
    </div>
  );
};

export default UserMenu;
