import styled from "@emotion/styled";
import { Card } from "antd";

const CommonCard = styled(Card)`
  .ant-card {
    border-radius: 5px;
  }
  .ant-list-item:hover {
    background-color: #eeeeed;
  }
  .ant-card-head-title {
    text-transform: uppercase;
  }
  .ant-card-head {
    background-color: #eeeeed;
    border-bottom: 1px solid black;
  }
  .ant-list-item a {
    text-decoration: none;
    color: black;
    padding-left: 10px;
  }
`;

export default CommonCard 