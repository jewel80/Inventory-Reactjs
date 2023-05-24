import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {Form, notification} from "antd";
import RoleWiseMenuService from "../../services/RoleMenu/RoleWiseMenuService";
import Helper from "../../Helper/Helper";

const useMenuPermission = () => {
  const {getErrorMessage} = Helper();
  const listUrl = '/role-menu/settings/menu-permission';
  const {id} = useParams()
  const navigation = useNavigate();
  const [roleMenuForm] = Form.useForm()
  const [loading, setLoading] = useState({})
  const [roleData, setRoleData] = useState([])
  const [activeTab, setActiveTab] = useState(1)
  const [checkedKeys, setCheckedKeys] = useState([])
  const [mappedRoles, setMappedRoles] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])
  const [unMappedRoles, setUnMappedRoles] = useState([])
  const [checkedKeysHistory, setCheckedKeysHistory] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const {
    fetchMenuList,
    fetchMappedRoles,
    fetchUnMappedRoles,
    fetchRoleWiseMenuIds,
    deleteRolePermission,
    saveRoleMenuPermission,
  } = RoleWiseMenuService()

  const urls = [
    '/Role/GetRoleWiseMenuList',
    '/Role/GetRoleWiseMenuList'
  ]

  const title = (! id) ? 'Add Role Wise Menu Permission' : 'Update Role Wise Menu Permissions';

  const listPageBreadCrumb = [
    {
      label: 'Role Menu Settings'
    },
    {
      label: 'Role Menu Permission'
    }
  ]
  const addPageBreadCrumb = [
    {
      label: 'Role Menu Settings'
    },
    {
      label: 'Role Menu Permission',
      link: listUrl
    },
    {
      label: title
    }
  ]

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

  const onSelectCopyRole = (id) => {
    fetchRoleWiseMenuIds(id)
      .then(res => {
        if(res.data) {
          setCheckedKeys(res.data)
          setCheckedKeysHistory(res.data)
        }
      })
  }

  const handleEdit = (id) => {
    navigation(`${listUrl}/edit/${id}`)
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true);
    deleteRolePermission(id)
      .then(res => {
        notification["success"]({
          message: res.data.message,
        });
        fetchData({
          updatedUrl: urls[activeTab],
          queryObject: {
            page: 1
          }
        })
      })
      .catch(err => {
        notification["error"]({
          message: getErrorMessage(err),
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      let formData = {
        roleId: data.roleId,
        selectedMenuIds: checkedKeys
      };

      await saveRoleMenuPermission(formData);

      notification["success"]({
        message: id
          ? "Role menu permission updated successfully"
          : "Role menu permission added successfully",
      });

      navigation(listUrl)
    } catch (error) {
      notification['error']({message: getErrorMessage(error)})
    }
  }

  const getRolePermissionData = async () => {
    setTimeout(() => {
      roleMenuForm.setFieldsValue({roleId: parseInt(id)});
    }, 300);
    onSelectCopyRole(id);
  }

  const getMappedAndUnmappedRoles = () => {
    setLoading(true);
    Promise.all([
      fetchUnMappedRoles()
        .then(res => {
          if (res.data) {
            setUnMappedRoles(res.data)
          }
        }),
      fetchMappedRoles()
        .then(async res => {
          if (res.data) {
            if (id) {
              setUnMappedRoles(res.data)
              await getRolePermissionData();
            }
            setMappedRoles(res.data)
          }
        }),
      fetchMenuList()
        .then(res => {
          if (res.data) {
            setRoleData(res.data.menus ?? []);
            setExpandedKeys(res.data.parentIds ?? [])
          }
        })
    ])
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onCheckTreeNode = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
  }

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onReset = () => {
    if (id)
    {
      setCheckedKeys(checkedKeysHistory)
    } else {
      roleMenuForm.resetFields()
      setCheckedKeys([])
    }
  }

  return {
    id,
    urls,
    title,
    listUrl,
    loading,
    roleData,
    activeTab,
    checkedKeys,
    mappedRoles,
    expandedKeys,
    roleMenuForm,
    unMappedRoles,
    autoExpandParent,
    listPageBreadCrumb,
    addPageBreadCrumb,
    onReset,
    onExpand,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleTabChange,
    onCheckTreeNode,
    onSelectCopyRole,
    getMappedAndUnmappedRoles
  }
}

export default useMenuPermission