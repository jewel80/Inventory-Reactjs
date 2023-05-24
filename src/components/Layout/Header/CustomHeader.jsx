import logo from "../../../assets/Images/sl-logo.svg";
import React, {useContext} from "react";
import {CaretDownOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {Avatar, Dropdown, Space} from "antd";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {SidebarContext} from "../../../context/SidebarContext";
const CustomHeader = ({collapsed, setCollapsed}) => {
  const { dispatch } = useContext(AuthContext)
  const {dispatch: sidebarDispatch} = useContext(SidebarContext)

  const items = [
    {
      label: <Link to="/profile"> <UserOutlined /> Profile</Link>,
      key: "0",
    },
    {
      label: (
        <>
        <LoginOutlined /> Log out
        </>
      ),
      key: "1",
      onClick: () => {
        logOutHandler();
      }
    },
  ];

  const logOutHandler = () => {
    sidebarDispatch({type: 'DELETE_MENU'})
    dispatch({type: 'LOGOUT'})
  }

  return (
    <Header style={{ padding: 0}}>
      <div className="header-content">
        <div className="logo">
          <Link to={'/'} >
            <img src={logo} alt="Shop Lover Logo"/>
          </Link>
          <div className="trigger">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
        </div>
        <div className="account">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <span
              onClick={(e) => e.preventDefault()}
              style={{ cursor: "pointer" }}
            >
              <Space className="custom-avatar-design">
                <Avatar size={25} className="avatar-icon-container">
                  <UserOutlined />
                </Avatar>
                Admin <CaretDownOutlined />
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default CustomHeader;