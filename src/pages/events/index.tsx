import React, { useState } from "react";
import { Button, Col, Row, Input, Modal } from "antd";
import EventsTable from "../../components/tables/EventsTable";
import { dateConversionToISO } from "../../components/helperFunctions/ReportFunctions";
import RangePickerSearchBox from "../../components/searchBox/RangePickerSearchBox";

const Events = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1 style={{ fontSize: "24px" }}>Events</h1>
          <Button onClick={showModal}>Search Data</Button>
        </div>
        <Row>
          <Col span={24}>
            {showTable ? (
              <EventsTable
                selectedLocationId={selectedLocationId}
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
                  Please Select Device & Date From Search Data
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
        <RangePickerSearchBox
          onChange={onChange}
          onSearch={onSearch}
          DatePickerHandler={DatePickerHandler}
          showHandler={showHandler}
          selectedLocationId={selectedLocationId}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Modal>
    </>
  );
};

export default Events;
