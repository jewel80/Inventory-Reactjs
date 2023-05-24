import { Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonCard from "../Card/CommonCard";
import '../../../assets/styles/Breadcrumb/Breadcrumb.scss'

const CustomBreadCrumb = ({ pageLists }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState();
  useEffect(() => {
    const breadcrumbItems = pageLists.map(list => {
      if(list.link) {

        return  {
          title : <Link to={list.link}>{list.label}</Link>
        }
      }

      return  {
        title: list.label
      }
    })

    setItems([
      {
        title: <ArrowLeftOutlined onClick={() => navigate(-1)} />,
      },
      ...breadcrumbItems
    ]);
  }, []);


  return (
    <CommonCard style={{ margin: "10px 0px"}} className="breadcrumb-card">
      <Breadcrumb items={items}></Breadcrumb>
    </CommonCard>
  );
};

export default CustomBreadCrumb;
