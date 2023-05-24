import {useState} from "react";
import axiosInstance from "../../config/api.config";

const useInventoryLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const getSidebarMenus = () => {
    return axiosInstance.get('/CommonService/GetNavMenus');
  }

  return {
    collapsed,
    setCollapsed,
    getSidebarMenus
  }
}

export default useInventoryLayout;