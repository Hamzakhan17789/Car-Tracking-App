import React from "react";
import { Button, Modal, Timeline } from "antd";
import classes from "./StatisticsModal.module.css";
import StatisticsModalTable from "./StatisticsModalTable";

type Props = {
  isModalOpen?: boolean;
  closeModal?: () => void;
};

const StatisticsModal = React.memo(({ isModalOpen, closeModal }: Props) => {
  ////console.log('StatisticModal')
  return (
    <div className={classes.modal}>
      <Modal
        bodyStyle={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
        style={{ top: "40px" }}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
        width={"952px"}
        closable={false}
      >
        <div className={classes.heading}>
          <p className={classes.headingFont}>Statistics</p>
        </div>
        <div className={classes.vehicleInfo}>
          <div className={classes.vehicleDestination}>
            <p className={classes.vehicleName}>Prius Prime AFR 2022</p>
            <Timeline>
              <Timeline.Item color="green" style={{ paddingBottom: "0px" }}>
                <p style={{ fontSize: "12px" }}>
                  Liaquat National Hospital and Medical College, National
                  Stadium Rd, Karachi.
                </p>
              </Timeline.Item>
              <Timeline.Item color="red">
                <p style={{ fontSize: "12px" }}>
                  Allama Shabbir Ahmed Usmani Rd, Block 3 Gulshan e Iqbal,
                  Karachi.
                </p>
              </Timeline.Item>
            </Timeline>
          </div>
          <Button className={classes.downloadBtn}>Download</Button>
          <div className={classes.vehicleDetail}>
            <div className={classes.firstBox}>
              <p>Time: </p>
              <p>Duration:</p>
              <p>Move Duration:</p>
              <p>Stop Duration:</p>
            </div>
            <div className={classes.secondBox}>
              <p>Engine Work:</p>
              <p>Engine Idle:</p>
              <p>Engine Hours:</p>
              <p>Fuel Consumption:</p>
             </div>
            <div className={classes.thirdBox}>
              <p>Max Speed:</p>
              <p>Average Speed:</p>
              <p>Overspeed Count</p>
              <p>Odometer</p>
            </div>
            <div className={classes.fourthBox}>
              <p>Ignition On:</p>
              <p>Ignition Off:</p>
              <p>Battery Low:</p>
              <p>Fuel Level Low:</p>
            </div>
          </div>
        </div>
        <div>
          { <StatisticsModalTable /> }
        </div>
      </Modal>
    </div>
  );
});

export default StatisticsModal;
