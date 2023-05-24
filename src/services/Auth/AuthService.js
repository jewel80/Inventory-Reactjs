import axiosInstance from "../../config/api.config";

const AuthService = () => {

  const login = (credentials) => {
    return axiosInstance.post('/Authenticate/Login', credentials)
  }

  const sendForgetPasswordMail = (request) => {
    return axiosInstance.post(`/Authenticate/ForgetPassword?email=${request.email}`)
  }

  const resetPassword = (request) => {
    return axiosInstance.post(`/Authenticate/UpdatePassword`, request)
  }


  return {
    login,
    resetPassword,
    sendForgetPasswordMail
  }
}

export default AuthService