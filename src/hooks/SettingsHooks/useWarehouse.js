import {useState} from "react";
import {Form, notification} from "antd";
import Helper from "../../Helper/Helper";
import {useSearchParams} from "react-router-dom";
import WarehouseService from "../../services/Settings/WarehouseService";

const useWarehouse = () => {

  const listUrl = '/settings/warehouses';
  const [queryParams] = useSearchParams();
  const statusId = queryParams.get('statusId') ? parseInt(queryParams.get('statusId')) : 1;
  const [id, setId] = useState(null)
  const [warehouse, setWarehouse] = useState({name:'', description:'', address: ''})
  const [activeTab, setActiveTab] = useState(statusId)
  const [warehouseForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [loading, setLoading] = useState({})
  const urls = ['/Warehouse/GetAllWarehouses']
  const listPageBreadCrumb = [
    {
      label: 'Settings'
    },
    {
      label: 'Warehouse List'
    }
  ]
  const {
    deleteWarehouse,
    getWarehouseById,
    setActiveOrInactive,
    createOrUpdateWarehouse
  } = WarehouseService()
  const {getErrorMessage} = Helper()

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

  const handleAddOrEditModal = (id = null) => {
    setId(null);
    if(id) {
      setId(id);
      setModalTitle('Update Warehouse')
    } else {
      setModalTitle('Add Warehouse')
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (data, fetchData) => {
    setLoading(true)
    if(id) {
      data.id = id;
    }
    createOrUpdateWarehouse(id, data)
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

  const handleClose = (id) => {
    onReset();
    setIsModalOpen(false)
  }

  const handleEdit = (id) => {
    setLoading(true)
    getWarehouseById(id)
      .then(res => {
        setWarehouse(res.data);
        warehouseForm.setFieldsValue(res.data)
        handleAddOrEditModal(id);
      })
      .catch(err => {
        notification.error(err)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = (id, fetchData) => {
    setLoading(true)
    deleteWarehouse(id)
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
    setLoading(true)
    setActiveOrInactive(id, statusId)
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

  const onReset = (id) => {
    id ? warehouseForm.setFieldsValue(warehouse) : warehouseForm.resetFields();
  }

  return {
    id,
    urls,
    loading,
    listUrl,
    activeTab,
    modalTitle,
    isModalOpen,
    warehouseForm,
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

export default useWarehouse