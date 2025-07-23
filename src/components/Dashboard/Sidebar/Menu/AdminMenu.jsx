import { FaUsers } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <div className="space-y-1">
      <MenuItem
        icon={FaUsers}
        label="All Users"
        address="/dashboard/admin/all-users"
      />
      <MenuItem
        icon={FaClipboardList}
        label="All Products"
        address="/dashboard/admin/all-products"
      />
      <MenuItem
        icon={RiAdvertisementFill}
        label="All Advertisements"
        address="/dashboard/admin/all-advertisements"
      />
      <MenuItem
        icon={FaCartArrowDown}
        label="All Orders"
        address="/dashboard/admin/all-orders"
      />
    </div>
  );
};

export default AdminMenu;
