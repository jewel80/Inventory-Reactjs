import axiosInstance from "../../config/api.config";

const RoleService = () => {
  const createOrUpdateRole = (id, data) => {
    const url = id ? '/Role/UpdateRole' : '/Role/AddRole'
    return axiosInstance.post(url, data)
  }

  const getRoleById = (id) => {
    return axiosInstance.get(`/Role/GetRoleById/${id}`);
  }

  const deleteRole = (data) => {
    return axiosInstance.post('/Role/DeleteRole', data)
  }

  return {
    deleteRole,
    getRoleById,
    createOrUpdateRole
  }
}

export default RoleService