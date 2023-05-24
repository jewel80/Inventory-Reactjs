import {useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Form, notification} from "antd";
import Helper from "../../Helper/Helper";
import userService from "../../services/Users/UserService";
import CommonService from "../../services/Common/CommonService";

const useUsers = () => {

  const listUrl = '/users';
  const [queryParams] = useSearchParams();
  const statusId = queryParams.get('statusId') ? parseInt(queryParams.get('statusId')) : 1;
  const [activeTab, setActiveTab] = useState(statusId)
  const [user, setUser] = useState({})
  const [userTypes, setUserTypes] = useState([])
  const [loading, setLoading] = useState({})
  const {id} = useParams()
  const listPageBreadCrumb = [
    {
      label: 'Users'
    },
    {
      label: 'User List'
    }
  ]
  const addPageBreadCrumb = [
    {
      label: 'Users'
    },
    {
      label: 'User List',
      link: listUrl
    },
    {
      label: id ? 'Update User' : 'Add User',
    }
  ]
  const navigate = useNavigate();
  const urls = [
    '/User/GetInActiveUsers',
    '/User/GetUsers'
  ];
  const {
    addUser,
    deleteUser,
    fetchUserById,
    setActiveOrInactive
  } = userService();
  const {
    fetchUserTypeList
  } = CommonService()
  const {getErrorMessage} = Helper();
  const [userForm] = Form.useForm();

  //methods
  const handleTabChange = (fetchData) => {
    const currentTab = (! activeTab) ? 1 : 0;
    setActiveTab(currentTab);
    fetchData(
      {
        updatedUrl: urls[currentTab],
        queryObject: {
          page: 1,
          statusId: currentTab,
        }
      }
    );
  }

  const handleSubmit = (request) => {
    setLoading(true)

    if(id) {
      request.id = id;
    }
    delete request.confirmPassword;
    addUser(request)
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

  const goToListPage = () => {
    navigate(listUrl);
  }

  const handleEdit = (id) => {
    navigate(`${listUrl}/edit/${id}`);
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true)
    deleteUser(id)
      .then(res => {
        notification.success({
          message: res.data.message
        });
        fetchData({
          updatedUrl: urls[activeTab],
          queryObject: {
            page: 1,
          }
        })
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => setLoading(false))
  }

  const handleActiveInactive = (id, status, fetchData) => {
    setLoading(true);
    setActiveOrInactive(id, status)
      .then(res => {
        notification.success({
          message: res.data.message
        });
        fetchData({
          updatedUrl: urls[activeTab],
          queryObject: {
            page: 1,
          }
        })
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => setLoading(false))
  }

  const onReset = (id) => {
    id ? userForm.setFieldsValue(user) : userForm.resetFields();
  }

  const getUserDataFromId = (id) => {
    fetchUserById(id)
      .then(res => {
        setUser(res.data)
        userForm.setFieldsValue(res.data)
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
  }

  const getUserTypeList = () => {
    setUserTypes([])
    fetchUserTypeList()
      .then(res => {
        setUserTypes(res.data)
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
    userForm,
    activeTab,
    userTypes,
    addPageBreadCrumb,
    listPageBreadCrumb,
    onReset,
    handleEdit,
    goToListPage,
    handleSubmit,
    handleDelete,
    getUserTypeList,
    handleTabChange,
    getUserDataFromId,
    handleActiveInactive,
  }
}

export default useUsers;