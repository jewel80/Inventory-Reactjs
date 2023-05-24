import {Col, Row} from "antd";
import CommonAddButton from "../Buttons/CommonAddButton";
import CommonBackButton from "../Buttons/CommonBackButton";
const PageTitleWithButton =
  (
    {
      title,
      link,
      onClickHandle,
      addBtn = false,
      loading = false
    }
  ) => {
  return (
    <Row justify="space-between">
      <Col>
        <span
          style={{
            fontSize: "1.4em"
          }}
        >
          {title}
        </span>
      </Col>
      <Col>
        {
          addBtn ?
            (<CommonAddButton link={link} onClickHandle={onClickHandle} loading={loading}/> )
            :
            (<CommonBackButton link={link} onClickHandle={onClickHandle} loading={loading}/> )
        }
      </Col>
    </Row>
  );
}

export default PageTitleWithButton