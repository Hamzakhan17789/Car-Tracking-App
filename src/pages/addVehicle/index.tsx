import React, { useState } from "react";
import VehicleForm from "../../components/forms/VehicleForm";
import LayoutDesign from "../../components/layout/FullLayout";

const AddVehicle = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
   <>
      <VehicleForm />
   </>
  );
};

export default AddVehicle;
