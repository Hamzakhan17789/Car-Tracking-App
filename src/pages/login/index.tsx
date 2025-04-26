import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Card, Space } from "antd";
import Image from "next/image";
import Logo from "./../../../public/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import dynamic from "next/dynamic";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { signIn, isLoading } = useContext(AuthContext);

  //console.log('login page')
  const onFinish = (values: any) => {
    signIn(userEmail, userPassword);
    //console.loglog("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    //console.loglog("Failed:", errorInfo);
  };

  if (typeof window === "undefined") {
    return <p>Please Wait...</p>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          alignSelf: "center",
          padding: "10px",
          width: 400,
          boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px auto 50px",
          }}
        >
          {/* <Image src={imageLogo} alt="logo" width={"120px"} height={"120px"} /> */}
          <Image src={Logo} width={"140px"} height={"28.23px"} alt="s3ctr" />
        </div>

        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email">
            <Input
              value={userEmail}
              placeholder="abc@cloudornate.com"
              onChange={(e: any) => {
                setUserEmail(e.target.value);
                //console.loglog(e.target.value);
              }}
              type="email"
              required
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input
              value={userPassword}
              onChange={(e: any) => {
                setUserPassword(e.target.value);
                //console.loglog(e.target.value);
              }}
              type="password"
              required
              placeholder="********"
            />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            {isLoading ? (
              <Button type="primary" style={{ width: "100%" }} loading>
                Loading
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Signin
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
/*
export default dynamic(() => Promise.resolve(Login), {
  ssr: false
})
*/
export default Login;
