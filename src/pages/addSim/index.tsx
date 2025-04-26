import React, { useState } from "react";
import SimForm from "../../components/forms/SimForm";
import LayoutDesign from "../../components/layout/FullLayout";

const AddSim = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <SimForm />
    </>
  );
};

export default AddSim;
