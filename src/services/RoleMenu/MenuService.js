import axiosInstance from "../../config/api.config";

const MenuService = () => {
  const getAllMenus = () => {
    return axiosInstance.get('/CommonService/GetMenus')
  }

  const createOrUpdateMenu = (id, data) => {
    if(id) {
      return axiosInstance.put('/Menu/UpdateMenu', data)
    }
    return  axiosInstance.post('/Menu/AddMenu', data)
  }

  const getMenuById = (id) => {
    return axiosInstance.get(`/Menu/GetMenuById/${id}`);
  }

  const setActiveInactive = (id, statusId) => {
    const url = (! statusId) ? `/Menu/SetActiveMenu/${id}` : `/Menu/SetInActiveMenu/${id}`
    return axiosInstance.put(url);
  }

  const deleteMenu = (id) => {
    return axiosInstance.delete(`/Menu/DeleteMenu/${id}`)
  }

  return {
    deleteMenu,
    getMenuById,
    getAllMenus,
    setActiveInactive,
    createOrUpdateMenu
  }
}

export default MenuService