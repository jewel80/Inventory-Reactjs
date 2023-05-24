import {Tabs} from "antd";

const CustomTab = ({
   Children,
   handleChange,
   defaultActiveId = 1
  }) => {
  const items = [
    {
      key: 1,
      label: "Active",
      children: Children,
    },
    {
      key: 0,
      label: "Inactive",
      children: Children,
    },
  ]

  return (
    <Tabs
      type="card"
      size="large"
      items={items}
      onChange={(e) => handleChange()}
      defaultActiveKey={parseInt(defaultActiveId)}
    />
  )
}

export default CustomTab