import axiosInstance from "../../config/api.config";

const UserService = () => {
  const fetchUserById = (id) => {
    return axiosInstance.get(`/User/GetUserById/${id}`);
  }
  const addUser = (data) => {
    return axiosInstance.post(`/User/SaveUser`, data);
  }
  const setActiveOrInactive = (id, status) => {
    const url = (status === 1) ?  `/User/InActiveUser/${id}` : `/User/ActiveUser/${id}`;
    return axiosInstance.post(url);
  }
  const deleteUser = (id) => {
    return axiosInstance.delete(`/User/DeleteUser/${id}`);
  }

  return {
    addUser,
    deleteUser,
    fetchUserById,
    setActiveOrInactive,
  }
}

export default UserService