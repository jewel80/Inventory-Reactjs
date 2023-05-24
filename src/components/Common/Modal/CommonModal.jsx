import {Card, Modal} from "antd";
import CustomForm from "../Form/CustomForm";
import CustomFormSubmit from "../Form/CustomFormSubmit";
import CustomButton from "../Buttons/CustomButton";

const CommonModal = (
  {
    id,
    form,
    onReset,
    loading,
    formName,
    fetchData,
    modalTitle,
    handleClose,
    handleSubmit,
    isModalOpen = false,
    ...props
  }
) => {
  return (
    <Modal title={modalTitle} open={isModalOpen}  footer={null} onCancel={() => handleClose(id)}>
      <Card style={{marginTop: "30px", paddingRight: "15px"}}>
        <CustomForm
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          name={formName}
          form={form}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >

          {props.children}

          <CustomFormSubmit id={id} onReset={onReset} loading={loading} lg={12}>
            <CustomButton
              text="Close"
              onClick={() => handleClose(id)}
              type="primary" danger
            />
          </CustomFormSubmit>
        </CustomForm>
      </Card>
    </Modal>
  )
}

export default CommonModal