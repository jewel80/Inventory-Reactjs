import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import {Card} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import useRole from "../../../hooks/AdminSettings/useRole";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";
import Helper from "../../../Helper/Helper";
import FormItem from "antd/es/form/FormItem";
import {maxInputFieldLength, maxTextAreaLength} from "../../../Helper/CommonStings";
import CustomInput from "../../../components/Common/InputFields/CustomInput";
import CustomTextArea from "../../../components/Common/InputFields/CustomTextArea";
import CommonModal from "../../../components/Common/Modal/CommonModal";

const RoleList = () => {
  const {
    id,
    urls,
    roleForm,
    modalTitle,
    isModalOpen,
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
  } = useRole();

  const {
    loading,
    collection,
    currentPage,
    itemsPerPage,
    totalElements,
    paginate,
    fetchData,
  } = useGenericPagination(urls[1]);

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
          handleActiveInactive={() => handleActiveInactive(record.id, record.statusId)}
          handleDelete={() => handleDelete(record.id, fetchData)}
          statusCode={record.statusId}
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
            title="Role list"
            onClickHandle={handleAddOrEditModal}
            addBtn={true}
          />
        }
      >
        <CustomTab
          handleChange={() => handleTabChange(fetchData)}
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
        form={roleForm}
        loading={loadingOnUserAction}
        onReset={onReset}
        modalTitle={modalTitle}
        handleSubmit={(data) => handleSubmit(data, fetchData)}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
        formName={'roleForm'}
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
            placeholder="Please enter full name"
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
      </CommonModal>
    </>
  );
}

export default RoleList