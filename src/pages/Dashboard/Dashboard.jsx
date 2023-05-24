import CustomBreadCrumb from "../../components/Common/BreadCrumb/CustomBreadCrumb";

const Dashboard = () => {
  const pageLists = [
    {
      label: "Dashboard"
    }
  ]
  return (
    <>
      <CustomBreadCrumb pageLists={pageLists} />
    </>
  );
}

export default Dashboard