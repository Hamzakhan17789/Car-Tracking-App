import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
const { Search } = Input;
// const mockVal = (str: string, repeat = 1) => ({
//   value: str.repeat(repeat),
// });

const SideNavSearchBox: React.FC = React.memo(() => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    ////////////console.loglog("search");
  };

  const onSelect = (data: string) => {
    ////////////console.loglog("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <Search
        // options={options}
        style={{ width: "100%" }}
        // onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    </>
  );
});

export default SideNavSearchBox;
