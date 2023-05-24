import * as AntdIcons from '@ant-design/icons';
import {Menu} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../../context/ThemeContext";
import {Link} from "react-router-dom";
import {SidebarContext} from "../../../context/SidebarContext";
import useInventoryLayout from "../../../hooks/LayoutHooks/useInventoryLayout";

const Sidebar = () => {
  const {currentTheme} = useContext(ThemeContext);
  const {sidebar, dispatch} = useContext(SidebarContext)
  const {getSidebarMenus} = useInventoryLayout()
  const [sidebarItemsFromJson, setSidebarItemsFromJson] = useState([]);

  const generateSidebarItems = (sidebar) => {
    let sidebarUpdatedItems = [];
    sidebar.map(item => {
      let label = getLabel(item);
      let children = getChildrenComponents(item);
      let icon = getIcon(item)
      if (label && (!children || children?.length > 0)) {
        sidebarUpdatedItems.push({
          key: item.key,
          label: label,
          icon: icon,
          children: children
        })
      }
      return item;
    });
    return sidebarUpdatedItems;
  }

  const getChildrenComponents = (item) => {
    if (item.children && item.children.length > 0) {
      return generateSidebarItems(item.children)
    }
    return null;
  }

  const getIcon = (item) => {
    if ((! item.parentId && typeof item.parentId !== 'undefined') || (item.children && item.children.length > 0)) {
      let AntdIcon = AntdIcons[item["menuIcon"]]
      if (typeof AntdIcon === 'undefined') {
        AntdIcon = AntdIcons['UnorderedListOutlined']
      }
      return <AntdIcon/>;
    }
    return null;
  }

  const getLabel = (item) => {
    if (item.children && item.children.length > 0) {
      return item.title
    }
    return (item.url) ? <Link to={item.url}>{item.title}</Link> : null
  }

  useEffect(() => {
    if (sidebar !== null) {
      setSidebarItemsFromJson(generateSidebarItems(sidebar))
      return
    }
    getSidebarMenus()
      .then(res => {
        setSidebarItemsFromJson(generateSidebarItems(res.data.menus))
        dispatch({type: 'SET_MENU', payload: res.data.menus})
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {
        (sidebarItemsFromJson.length > 0) ? (
          <Menu
            theme={currentTheme}
            mode="inline"
            items={sidebarItemsFromJson}
          />
        ) : null
      }
    </>
  );
}

export default Sidebar;