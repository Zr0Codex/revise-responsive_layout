import React, { useState, useEffect } from "react";
import { Input, Button, Space } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveFilled,
} from "@ant-design/icons";
import "./FindDocument.style.scss";
import { MultiSelect } from "react-multi-select-component";

import FilterOptions from "../../util/FilterOptions";
import { MainFilterSearch } from "../../component";

const FindDocument = () => {
  let defaultFields = [
    {
      label: "เลขที่เรื่องสินไหม",
      value: "เลขที่เรื่องสินไหม",
      name: "",
      type: "Input",
      disabled: false,
    },
  ];

  return (
    <>
      <MainFilterSearch defaultFields={defaultFields} />
    </>
  );
};

export default FindDocument;
