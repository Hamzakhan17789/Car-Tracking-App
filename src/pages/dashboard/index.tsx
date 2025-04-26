import React, { useState, useEffect } from "react";
import { Empty, Button, Result, DatePicker, Spin, message } from "antd";

const Dashboard = () => {
  return (
    <>
        {/* <Empty description={false} /> */}
        <Result
          style={{marginTop:"10%"}}
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          // extra={<Button type="primary">Back Home</Button>}
        />
    </>
  );
};

export default Dashboard;