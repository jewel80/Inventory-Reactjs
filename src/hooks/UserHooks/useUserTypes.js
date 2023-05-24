import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserTypeService from "../../services/Users/UserTypeService";
import {Form, notification} from "antd";
import Helper from "../../Helper/Helper";

const useUserTypes = () => {

  const listUrl = '/users/type';
  const [activeTab, setActiveTab] = useState(1)
  const [userTypes, setUserTypes] = useState({})
  const [loading, setLoading] = useState({})
  const listPageBreadCrumb = [
    {
      label: 'Users'
    },
    {
      label: 'User Types'
    }
  ]
  const addPageBreadCrumb = [
    {
      label: 'Users'
    },
    {
      label: 'User Types',
      link: listUrl
    },
    {
      label: 'User Type Add',
    }
  ]
  const {id} = useParams()
  const navigate = useNavigate();
  const urls = ['/UserType/GetAllUserTypes'];
  const {
    addUserType,
    deleteUserType,
    updateUserType,
    setActiveInactive,
    fetchUserTypeById
  } = UserTypeService();
  const {getErrorMessage} = Helper();
  const [userTypeForm] = Form.useForm();

  //methods
  const handleTabChange = (fetchData) => {
    const currentTab = (! activeTab) ? 1 : 0;
    setActiveTab(currentTab);
    fetchData(
      {
        queryObject: {
          page: 1,
          statusId: currentTab
        }
      }
    );
  }

  const handleSubmit = (request) => {
    setLoading(true)

    if(id) {
      request.id = id;
      updateUserType(request)
        .then(res => {
          if(res.data.isSuccess) {
            notification.success({
              message: res.data.message
            })
            navigate(listUrl)
            return;
          }
          console.log(res.data)
        })
        .catch(err => {
          notification.error({
            message: getErrorMessage(err)
          })
        })
        .finally(() => {
          setLoading(false)
        })
      return;
    }

    addUserType(request)
      .then(res => {
        if(res.data.isSuccess) {
          notification.success({
            message: res.data.message
          })
          navigate(listUrl)
          return;
        }
        console.log(res.data)
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

  const handleEdit = (id) => {
    navigate(`${listUrl}/edit/${id}`);
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true)
    deleteUserType(id)
      .then(res => {
        notification.success({
          message: res.data.message
        });
        fetchData({
          queryObject: {
            page: 1,
            statusId: activeTab
          }
        })
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .then(() => setLoading(false))
  }

  const handleActiveInactive = (id, status, fetchData) => {
    setLoading(true);
    setActiveInactive(id, status)
      .then(res => {
        notification.success({
          message: res.data.message
        });
        fetchData({
          queryObject: {
            page: 1,
            statusId: activeTab
          }
        })
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .then(() => setLoading(false))
  }

  const onReset = (id) => {
    id ? userTypeForm.setFieldsValue(userTypes) : userTypeForm.resetFields();
  }

  const getUserTypeDataFromId = (id) => {
    fetchUserTypeById(id)
      .then(res => {
        setUserTypes(res.data)
        userTypeForm.setFieldsValue(res.data)
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
  }

  return {
    id,
    urls,
    loading,
    userTypeForm,
    addPageBreadCrumb,
    listPageBreadCrumb,
    onReset,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleTabChange,
    handleActiveInactive,
    getUserTypeDataFromId
  }
}

export default useUserTypes;