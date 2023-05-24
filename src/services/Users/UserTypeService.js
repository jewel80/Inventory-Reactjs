import axiosInstance from "../../config/api.config";

const UserTypeService = () => {
  const fetchUserTypeById = (id) => {
    return axiosInstance.get(`/UserType/GetUserTypeById/${id}`);
  }
  const addUserType = (data) => {
    return axiosInstance.post(`/UserType/AddUserType`, data);
  }
  const updateUserType = (data) => {
    return axiosInstance.put(`/UserType/UpdateUserType`, data);
  }
  const deleteUserType = (id) => {
    return axiosInstance.delete(`/UserType/DeleteUserType/${id}`);
  }
  const setActiveInactive = (id, status) => {
    const url = (! status) ? `/UserType/SetActiveUserType/${id}` : `/UserType/SetInActiveUserType/${id}`
    return axiosInstance.put(url);
  }

  return {
    addUserType,
    updateUserType,
    deleteUserType,
    setActiveInactive,
    fetchUserTypeById,
  }
}

export default UserTypeService