import { useQuery } from "@apollo/client";
import { Button } from "antd";
import React from "react";
import { Socket, io } from "socket.io-client";

const Notifications = () => {
  // const {loading,error,data}=useQuery()

  const socket = io("http://54.252.32.156:3111/");

  const socketConnectHandler = () => {
    const id = [{ id: "16" }, { id: "19" }, { id: "11" }];
    console.log("socket CONNECT Handler Called");
    id.map((item: any) => {
      return socket.on(item.id, (data: any) => {
        console.log("data", data);
      });
    });
  };
  const disconnectSocketHandler = () => {
    console.log("socket DISCONNECT Handler Called");
    socket.disconnect();
  };
  return (
    <div style={{ marginLeft: 10 }}>
      <h2>Notifications from Socket</h2>
      <Button onClick={socketConnectHandler}>Connect Socket</Button>
      <Button onClick={disconnectSocketHandler}>Dissconnect Socket</Button>
    </div>
  );
};

export default Notifications;
