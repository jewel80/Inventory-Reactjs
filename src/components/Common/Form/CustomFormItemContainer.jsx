import {Col, Row} from "antd";

const CustomFormItemContainer = ({children}) => {
  return (
    <Row>
      <Col sm={20} md={15} lg={20}>
        {children}
      </Col>
    </Row>
  );
}

export default CustomFormItemContainer