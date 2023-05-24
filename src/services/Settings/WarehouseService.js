import axiosInstance from "../../config/api.config";

const WarehouseService = () => {
  const createOrUpdateWarehouse = (id, data) => {
    const url = id ? 'Warehouse/UpdateWarehouse' : '/Warehouse/AddWarehouse';
    return axiosInstance.post(url, data)
  }

  const getWarehouseById = (id) => {
    return axiosInstance.get(`/Warehouse/GetWarehouseById/${id}`);
  }

  const deleteWarehouse = (id) => {
    return axiosInstance.post(`/Warehouse/DeleteWarehouse?id=${id}`);
  }


  const setActiveOrInactive = (id, status) => {
    const url = (status === 1) ?  `/Warehouse/SetInActiveWarehouse?id=${id}` : `/Warehouse/SetActiveWarehouse?id=${id}`;
    return axiosInstance.post(url);
  }

  return {
    deleteWarehouse,
    getWarehouseById,
    setActiveOrInactive,
    createOrUpdateWarehouse,
  }
}

export default WarehouseService