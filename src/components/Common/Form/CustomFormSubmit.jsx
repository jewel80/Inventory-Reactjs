import {Col, Row, Space} from "antd";
import CustomButton from "../Buttons/CustomButton";

const CustomFormSubmit = (
  {
    id,
    justify = 'end',
    sm = 10,
    md = 14,
    lg = 7,
    onReset,
    loading = false,
    ...props
  }
) => {
  return (
    <Row justify={justify}>
      <Col sm={sm} md={md} lg={lg}>
        <Space size="small">
          <CustomButton type="primary" htmlType="submit" text={id ? "Update" : "Submit"} loading={loading} />
          <CustomButton text="Reset" onClick={() => onReset(id)} type="primary" danger />
          {props.children}
        </Space>
      </Col>
    </Row>
  )
}

export default CustomFormSubmit