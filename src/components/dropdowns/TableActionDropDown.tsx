import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="#"
        style={{ pointerEvents: "none" }}
      >
        Edit
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="#"
        style={{ pointerEvents: "none" }}
      >
        Delete
      </a>
    ),
  },
];

const TableActionDropDown: React.FC = React.memo(() => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined style={{ color: "black" }} />
        </Space>
      </a>
    </Dropdown>
  );
});

export default TableActionDropDown;
