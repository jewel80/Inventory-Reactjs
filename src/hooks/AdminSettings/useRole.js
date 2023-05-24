import {useState} from "react";
import {Form, notification} from "antd";
import RoleService from "../../services/RoleMenu/RoleService";
import Helper from "../../Helper/Helper";

const useRole = () => {

  const listUrl = '/role-menu/settings/roles';
  const [id, setId] = useState(null)
  const [role, setRole] = useState({name:'', description:''})
  const [activeTab, setActiveTab] = useState(1)
  const [roleForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [loading, setLoading] = useState({})
  const urls = [
    '/Role/GetRoles',
    '/Role/GetRoles'
  ]
  const listPageBreadCrumb = [
    {
      label: 'Role Menu Settings'
    },
    {
      label: 'Role List'
    }
  ]
  const {getErrorMessage} = Helper()
  const {
    deleteRole,
    getRoleById,
    createOrUpdateRole
  } = RoleService();

  //methods

  const handleTabChange = (fetchData) => {
    const currentTab = (! activeTab) ? 1 : 0;
    setActiveTab(currentTab);
    fetchData(
      {
        updatedUrl: urls[currentTab],
        queryObject: {
          page: 1,
        }
      }
    );
  }

  const handleAddOrEditModal = (id = null) => {
    setId(null);
    if(id) {
      setId(id);
      setModalTitle('Update Role')
    } else {
      setModalTitle('Add Role')
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (data, fetchData) => {
    setLoading(true)
    if(id) {
      data.id = id;
    }
    createOrUpdateRole(id, data)
      .then(res => {
        if(res.data.isSuccess) {
          notification.success({
            message: res.data.message
          })
          handleClose();
          fetchData({
            updatedUrl: urls[activeTab],
            queryObject: {
              page: 1
            }
          })
        }
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => setLoading(false))
  }

  const handleClose = (id) => {
    onReset();
    setIsModalOpen(false)
  }

  const handleEdit = (id) => {
    setLoading(true)
    getRoleById(id)
      .then(res => {
        setRole(res.data);
        roleForm.setFieldsValue(res.data)
        handleAddOrEditModal(id);
      })
      .catch(err => {
        notification.error(err)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true)
    deleteRole({id: id})
      .then(res => {
        if(res.data.isSuccess) {
          notification.success({
            message: res.data.message
          })
          handleClose();
          fetchData({
            updatedUrl: urls[activeTab],
            queryObject: {
              page: 1
            }
          })
        }
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => setLoading(false))
  }

  const handleActiveInactive = (id, statusId) => {
    console.log(id, statusId)
  }

  const onReset = (id) => {
    id ? roleForm.setFieldsValue(role) : roleForm.resetFields();
  }

  return {
    id,
    urls,
    loading,
    listUrl,
    roleForm,
    modalTitle,
    isModalOpen,
    listPageBreadCrumb,
    onReset,
    handleEdit,
    handleClose,
    handleDelete,
    handleSubmit,
    handleTabChange,
    handleActiveInactive,
    handleAddOrEditModal
  }
}

export default useRole