import React from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import useInventoryLayout from "../../hooks/LayoutHooks/useInventoryLayout";
import '../../assets/styles/Layout/InventoryLayout.scss'
import {Outlet} from "react-router-dom";
import CustomHeader from "./Header/CustomHeader";
import Sidebar from "./Sidebar/Sidebar";

const InventoryLayout = () => {
  const {
    collapsed,
    setCollapsed
  } = useInventoryLayout();

  return (
    <Layout id="content-full-height">
      <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout className="site-layout">
        <Sider
          trigger={null}
          width={250}
          collapsible
          collapsed={collapsed}
          className="sidebar-menu"
        >
          <Sidebar />
        </Sider>
        <Content
          className="layout-content"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default InventoryLayout;