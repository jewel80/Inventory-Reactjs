import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import useMenu from "../../../hooks/AdminSettings/useMenu";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import {Card} from "antd";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";
import Helper from "../../../Helper/Helper";

const MenuList = () => {
  const {
    urls,
    activeTab,
    loading : loadingOnUserAction,
    listPageBreadCrumb,
    handleTabChange,
    handleEdit,
    handleActiveInactive,
    handleDelete,
  } = useMenu()

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
      title: "Menu Name",
      dataIndex: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Parent Name",
      dataIndex: "parentName",
    },
    {
      title: "URL",
      dataIndex: "url",
    },
    {
      title: "Is Visible",
      dataIndex: "isVisible",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Show Menu",
      dataIndex: "showMenu",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Created By",
      dataIndex: "createdByName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
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
            title="Menu list"
            link={"/role-menu/settings/menus/add"}
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
    </>
  )
}

export default MenuList