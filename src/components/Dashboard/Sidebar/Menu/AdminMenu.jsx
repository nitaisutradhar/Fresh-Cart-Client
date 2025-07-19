import { MdAddBox, MdInventory, MdCampaign, MdBarChart } from "react-icons/md";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <div className="space-y-1">
      <MenuItem
        icon={MdAddBox}
        label="Add Product"
        address="/dashboard/admin/add-product"
      />
      <MenuItem
        icon={MdInventory}
        label="My Products"
        address="/dashboard/admin/my-products"
      />
      <MenuItem
        icon={MdCampaign}
        label="Add Advertisement"
        address="/dashboard/admin/add-advertisement"
      />
      <MenuItem
        icon={MdBarChart}
        label="My Advertisements"
        address="/dashboard/admin/my-advertisements"
      />
    </div>
  );
};

export default AdminMenu;
