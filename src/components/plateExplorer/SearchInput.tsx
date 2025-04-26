import React, { useState, useEffect, useContext } from "react";
// import { ClientDetailPlateExplorerContext } from "../../../context/client-detail-plate-explorer-context/client-detail-plate-explorer-context";
// import { ClientDetailList } from "../../../model/plate-explorer-types/plate-explorer-types";
import { ClientDetailList } from "../../model/plateExplorerTypes/plateExplorerTypes";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
// import classes from "./client-detail-search-input.module.css";
import { AutoComplete, Input } from "antd";
import { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";
const { Search } = Input;

interface PropTypes {
  searchResult?: ClientDetailList[];
}

const SearchInput = React.memo(({ searchResult }: PropTypes) => {
  const [inputValue, setInputValue] = useState("");

  const clientCtx = useContext(ClientDetailPlateExplorerContext);
  const graphlQlGetOneClientCtx = useContext(GraphQlOperationContext);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);

    graphlQlGetOneClientCtx.gettingSearchedValue(inputValue);
  };

  useEffect(() => {
    clientCtx.onChangeHandler(inputValue);

    graphlQlGetOneClientCtx.gettingSearchedValue(inputValue);
  }, [inputValue]);

  return (
    <>
      <Search value={inputValue} onChange={onChangeHandler} />
    </>
  );
});

export default SearchInput;
