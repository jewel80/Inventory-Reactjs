import axiosInstance from "../../config/api.config";

const RoleWiseMenuService = () => {
  const fetchMenuList = (id) => {
    return axiosInstance.get(`/Role/GetMenuList`)
  }
  const fetchUnMappedRoles = () => {
    return axiosInstance.get('/Role/GetUnmappedRoles')
  }
  const fetchMappedRoles = () => {
    return axiosInstance.get('/Role/GetMappedRoles')
  }
  const fetchRoleByIds = (id) => {
    return axiosInstance.get(`/Role/GetRoleById/${id}`)
  }
  const fetchRoleWiseMenuIds = (id) => {
    return axiosInstance.get(`/Role/GetRoleWiseMenuIds/${id}`)
  }

  const saveRoleMenuPermission = (data) => {
    return axiosInstance.post(`/Role/SaveRoleMenuPermission`, data)
  }

  const deleteRolePermission = (id) => {
    return axiosInstance.delete(`/Role/DeleteRoleMenuPermission/${id}`)
  }

  return {
    fetchMenuList,
    fetchRoleByIds,
    fetchMappedRoles,
    fetchUnMappedRoles,
    deleteRolePermission,
    fetchRoleWiseMenuIds,
    saveRoleMenuPermission
  }
}
export default RoleWiseMenuService;
