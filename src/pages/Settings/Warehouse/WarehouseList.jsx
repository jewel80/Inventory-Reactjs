import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import useWarehouse from "../../../hooks/SettingsHooks/useWarehouse";
import Helper from "../../../Helper/Helper";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";
import {Card} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import CommonModal from "../../../components/Common/Modal/CommonModal";
import FormItem from "antd/es/form/FormItem";
import {maxInputFieldLength, maxTextAreaLength} from "../../../Helper/CommonStings";
import CustomInput from "../../../components/Common/InputFields/CustomInput";
import CustomTextArea from "../../../components/Common/InputFields/CustomTextArea";

const WarehouseList = () => {
  const {
    id,
    urls,
    activeTab,
    modalTitle,
    isModalOpen,
    warehouseForm,
    loading : loadingOnUserAction,
    listPageBreadCrumb,
    onReset,
    handleEdit,
    handleClose,
    handleDelete,
    handleSubmit,
    handleTabChange,
    handleActiveInactive,
    handleAddOrEditModal
  } = useWarehouse();

  const {
    loading,
    collection,
    currentPage,
    itemsPerPage,
    totalElements,
    paginate,
    fetchData,
  } = useGenericPagination(urls[0], true);

  const {getSerialNumber, formatDate} = Helper();

  const columns = [
    {
      title: "SN",
      dataIndex: "id",
      key: "id",
      render: (_, record) => getSerialNumber(collection, record, currentPage, itemsPerPage),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record.name
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => record.description
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => record.address
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      render: (_, record) => record.createdByUser
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => formatDate(record.createdAt)
    },
    {
      title: <div style={{textAlign: "center"}}>Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <TableActionColumn
          handleEdit={() => handleEdit(record.id)}
          handleActiveInactive={() => handleActiveInactive(record.id, activeTab, fetchData)}
          handleDelete={() => handleDelete(record.id, fetchData)}
          statusCode={activeTab}
          loading={loadingOnUserAction}
        />
      )
    }
  ];
  return (
    <>
      <CustomBreadCrumb pageLists={listPageBreadCrumb} />
      <Card
        title={
          <PageTitleWithButton
            title="Warehouse list"
            onClickHandle={handleAddOrEditModal}
            addBtn={true}
          />
        }
      >
        <CustomTab
          handleChange={() => handleTabChange(fetchData)}
          defaultActiveId={activeTab}
          Children={(
            <CustomTable
              columns={columns}
              dataSource={collection}
              paginate={paginate}
              loading={loading}
              paginationInfo={{
                currentPage: currentPage,
                totalElements: totalElements,
                perPage: itemsPerPage
              }}
            />
          )}
        />
      </Card>

      {/*  Modal to add or edit data */}

      <CommonModal
        id={id}
        form={warehouseForm}
        loading={loadingOnUserAction}
        onReset={onReset}
        modalTitle={modalTitle}
        handleSubmit={(data) => handleSubmit(data, fetchData)}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
        formName={'warehouseForm'}
      >
        <FormItem
          label={'Name'}
          name='name'
          rules={[
            {required: true, message: "Name field is required"},
            {max: maxInputFieldLength, message: `Name can be maximum of ${maxInputFieldLength} characters`}
          ]}
        >
          <CustomInput
            placeholder="Please enter warehouse name"
            maxLength={maxInputFieldLength}
          />
        </FormItem>

        <FormItem
          name={"description"}
          label={"Description"}
          rules={[
            {max: maxTextAreaLength, message: `Maximum ${maxTextAreaLength} characters allowed`}
          ]}
        >
          <CustomTextArea maxLength={maxTextAreaLength}/>
        </FormItem>

        <FormItem
          name={"address"}
          label={"Address"}
          rules={[
            {max: maxTextAreaLength, message: `Maximum ${maxTextAreaLength} characters allowed`}
          ]}
        >
          <CustomTextArea maxLength={maxTextAreaLength}/>
        </FormItem>
      </CommonModal>
    </>
  );
}

export default WarehouseList