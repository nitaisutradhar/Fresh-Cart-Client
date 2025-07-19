import { MdAddBox, MdOutlineLibraryBooks, MdCampaign, MdBarChart } from "react-icons/md"
import MenuItem from './MenuItem'
const VendorMenu = () => {

  return (
    <>
    <div className="space-y-1">
        <MenuItem
        icon={MdAddBox}
        label="Add Product"
        address="/dashboard/vendor/add-product"
      />
      <MenuItem
        icon={MdOutlineLibraryBooks}
        label="My Products"
        address="/dashboard/vendor/my-products"
      />
      <MenuItem
        icon={MdCampaign}
        label="Add Advertisement"
        address="/dashboard/vendor/add-advertisement"
      />
      <MenuItem
        icon={MdBarChart}
        label="My Advertisements"
        address="/dashboard/vendor/my-advertisements"
      />
    </div>
      

    </>
  )
}

export default VendorMenu