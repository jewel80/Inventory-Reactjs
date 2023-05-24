import axiosInstance from "../../config/api.config";

const CommonService = () => {

  const fetchUserTypeList = () => {
    return axiosInstance.get('/CommonService/GetUserTypes');
  }

  return {
    fetchUserTypeList,
  }
}

export default CommonService