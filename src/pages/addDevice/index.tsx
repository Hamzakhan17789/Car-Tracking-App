import React, { useState } from "react";
import DeviceForm from "../../components/forms/DeviceForm";
import LayoutDesign from "../../components/layout/FullLayout";
import DeviceTable from "../../components/tables/DeviceTable";

const AddDevice = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
<>   
      <DeviceForm />
</>
  );
};

export default AddDevice;
