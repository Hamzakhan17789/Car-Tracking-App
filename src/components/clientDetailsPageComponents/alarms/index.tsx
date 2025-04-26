// import { Card, Watermark } from "antd";
// import React from "react";

// const Alarms = () => {
//   return (
//     <Watermark content={["Working", "In Progress"]}>
//       <Card style={{ height: "520px", marginTop: "10px" }} />dddd
//     </Watermark>
//   );
// };

// export default Alarms;
import React, { useState, useContext } from "react";
import { Button, Col, Row, Input, Empty, Modal } from "antd";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import EventsTable from "./../../../components/tables/EventsTableClientDetails";
import { dateConversionToISO } from "./../../../components/helperFunctions/ReportFunctions";
import RangePickerInput from "./../../../components/searchBox/RangePickerInput";

const Alarms = () => {
  const vehicleIDforClientDetail = sessionStorage.getItem("vehicleIDforClientDetail");

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(vehicleIDforClientDetail);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("xxx", vehicleIDforClientDetail)

  const showHandler = () => {
    console.log("play btn clicked");
    setIsModalOpen(false);
    setShowTable(true);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setShowTable(false);
    setSelectedLocationId(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const DatePickerHandler = (value: any[]) => {
    setShowTable(false);
    const dateResultObj = dateConversionToISO(value);
    setToDate(dateResultObj.finalDTo);
    setFromDate(dateResultObj.finalDFrom);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const clientCtx = useContext(ClientDetailPlateExplorerContext);

  if (!clientCtx.isVehicleListCardClicked) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          //alignSelf: 'center',
          height: "600px",
        }}
      >
        <Empty
          description={"Please select a vehicle."}
          style={{
            height: "300px",

            alignSelf: "center",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <h1 style={{ fontSize: "24px" }}>Alarms</h1>
          <Button onClick={showModal}>Date Picker</Button>
        </div>
        <Row>
          <Col span={24}>
            {showTable ? (
              <EventsTable
                selectedLocationId={vehicleIDforClientDetail}
                fromDate={fromDate}
                toDate={toDate}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    alignSelf: "center",
                  }}
                >
                  Please Choose a Date!
                </p>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <Modal
        title="Filter"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        width={350}
      >
        <RangePickerInput
          onChange={onChange}
          onSearch={onSearch}
          DatePickerHandler={DatePickerHandler}
          showHandler={showHandler}
          selectedLocationId={vehicleIDforClientDetail}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Modal>
    </>
  );
};

export default Alarms;
