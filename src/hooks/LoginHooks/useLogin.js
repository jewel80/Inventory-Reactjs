import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import AuthService from "../../services/Auth/AuthService";
import {Form, notification} from "antd";
import Helper from "../../Helper/Helper";
import {useNavigate, useSearchParams} from "react-router-dom";

const useLogin = () => {
  const {dispatch} = useContext(AuthContext);
  const [searchParam] = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [errorData, setErrorData] = useState([]);
  const [passwordResetForm] = Form.useForm()
  const [sendEmailConfirmation, setSendEmailConfirmation] = useState(
    { success: false, message: '' }
  );
  const navigate = useNavigate();
  const {
    login,
    resetPassword,
    sendForgetPasswordMail
  } = AuthService();
  const {getErrorMessage} = Helper();

  //methods
  const handleSubmit = (credentials) => {
    setLoading(true);
    login(credentials)
      .then(res => {
        if(res.data) {
          dispatch({type: 'LOGIN', payload: res.data.token})
        }
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        });
      })
      .finally(() => setLoading(false))
  }

  const handleSendMail = (request) => {
    setLoading(true);
    setSendEmailConfirmation({ success: false, message: '' });
    sendForgetPasswordMail(request)
      .then(res => {
        if (res.data.isSuccess) {
          setSendEmailConfirmation({ success: res.data.isSuccess, message: res.data.message });
        }
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getEmailAddressFromUrl = () => {
    passwordResetForm.setFieldValue('email', searchParam.get('email'))
    setToken(searchParam.get('token'))
  }

  const handleResetPassword = (request) => {
    setLoading(true)
    setErrorData([])
    const updatedRequest = {
      ...request,
      token: token
    }
    resetPassword(updatedRequest)
      .then(res => {
        if (res.data.isSuccess) {
          notification.success({
            message: res.data.message
          });

          navigate('/login')
          return;
        }
        notification.error({
          message: 'Something went wrong please try again'
        })
        console.log(res)
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
        if(err.response && err.response.data && err.response.data.data) {
          setErrorData(err.response.data.data);
        }
      })
      .finally(() => setLoading(false))
  }

  return {
    loading,
    navigate,
    errorData,
    passwordResetForm,
    sendEmailConfirmation,
    handleSubmit,
    handleSendMail,
    handleResetPassword,
    getEmailAddressFromUrl,
  }
}

export default useLogin;