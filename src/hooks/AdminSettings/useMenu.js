import {useState} from "react";
import {Form, notification} from "antd";
import Helper from "../../Helper/Helper";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import MenuService from "../../services/RoleMenu/MenuService";

const useMenu = () => {

  const listUrl = '/role-menu/settings/menus';
  const {id} = useParams()
  const [queryParams] = useSearchParams();
  const statusId = queryParams.get('statusId') ? parseInt(queryParams.get('statusId')) : 1;
  const [menu, setMenu] = useState()
  const [activeTab, setActiveTab] = useState(statusId)
  const [menuForm] = Form.useForm()
  const [loading, setLoading] = useState({})
  const [menuList, setMenuList] = useState([])
  const [parentDisabled, setParentDisabled] = useState(false)
  const urls = ['Menu/GetAllMenus']

  const title = (! id) ? 'Add New Menu' : 'Update Menu';

  const listPageBreadCrumb = [
    {
      label: 'Role Menu Settings'
    },
    {
      label: 'Menu List'
    }
  ]
  const addPageBreadCrumb = [
    {
      label: 'Role Menu Settings'
    },
    {
      label: 'Menu List',
      link: listUrl
    },
    {
      label: title
    }
  ]

  const {getErrorMessage} = Helper()
  const navigate = useNavigate()

  const {
    deleteMenu,
    getAllMenus,
    getMenuById,
    setActiveInactive,
    createOrUpdateMenu
  } = MenuService();

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

  const handleSubmit = (data) => {
    setLoading(true)
    if(id) {
      data.id = id;
    }
    data.sortId = (data.sortId) ? parseInt(data.sortId) : null;
    data.levelAt = (data.levelAt) ? parseInt(data.levelAt) : null;
    data.updatedBy = "3";
    createOrUpdateMenu(id, data)
      .then(res => {
        if(res.data.isSuccess) {
          notification.success({
            message: res.data.message
          })
          navigate(listUrl);
        }
      })
      .catch(err => {
        notification.error({
          message: getErrorMessage(err)
        })
      })
      .finally(() => setLoading(false))
  }

  const handleClose = () => {
    onReset();
  }

  const handleEdit = (id) => {
    navigate(`/role-menu/settings/menus/edit/${id}`);
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true)
    deleteMenu(id)
      .then(res => {
        if(res.data.isSuccess) {
          notification.success({
            message: res.data.message
          })
          handleClose();
          fetchData({
            queryObject: {
              page: 1,
              statusId: activeTab
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

  const handleActiveInactive = (id, statusId, fetchData) => {
    setActiveInactive(id, statusId)
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
    id ? menuForm.setFieldsValue(menu) : menuForm.resetFields();
  }

  const fetchParentList = () => {
    if(id) {
      getMenuById(id)
        .then(res => {
          setMenu(res.data);
          setParentDisabled(res.data.isParent)
          menuForm.setFieldsValue(res.data);
        })
    }

    getAllMenus()
      .then(res => {
        setMenuList(res.data)
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
    title,
    loading,
    listUrl,
    menuForm,
    menuList,
    activeTab,
    parentDisabled,
    addPageBreadCrumb,
    listPageBreadCrumb,
    onReset,
    handleEdit,
    handleClose,
    handleDelete,
    handleSubmit,
    fetchParentList,
    handleTabChange,
    setParentDisabled,
    handleActiveInactive,
  }
}

export default useMenu