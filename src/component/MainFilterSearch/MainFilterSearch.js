import React, { useState, useEffect } from "react";
import { Input, Button, Space, DatePicker, Dropdown, Menu } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveFilled,
  DownOutlined,
} from "@ant-design/icons";
import "./MainFilterSearch.style.scss";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

// import { useHistory } from "react-router-dom";

import FilterOptions from "../../util/FilterOptions";
import menu_doctype from "./menu_doctype";
import wording from "../../util/wording";
import { response } from "express";

const MainFilterSearch = (props) => {
  // let history = useHistory();

  const [selected, setSelected] = useState(props.defaultFields);
  const [doctype, setDoctype] = useState([]);

  useEffect(() => {
    FilterOptions.map((option) => {
      selected.map((select) => {
        if (option.value.includes(select.value)) {
          option.disabled = true;
        }
      });
    });
  }, [FilterOptions]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT_GET_CONFIGURATION_DOCTYPE)
      .then((response) => {
        setDoctype(response.data);
      })
      .catch(console.error(response));
  }, [doctype]);

  console.log("get doctype: ", doctype);
  const doctype_menu = (
    <>
      {menu_doctype.map((data) => {
        return (
          <Menu>
            <Menu.Item>{data.menu}</Menu.Item>
          </Menu>
        );
      })}
    </>
  );

  let handleChange = (i, e) => {
    let newFormValues = [...selected];
    newFormValues[i][e.target.name] = e.target.value;
    setSelected(newFormValues);
  };

  function removeFormFields(i) {
    let newFormValues = [...selected];
    newFormValues.splice(i, 1);
    setSelected(newFormValues);
  }

  function removeAllFields() {
    let newFormValues = props.defaultFields;
    selected.map((temp) => (temp.name = ""));
    setSelected(newFormValues);
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(selected));
  };

  function onChange(date, dateString, index) {
    let newFormValues = [...selected];
    console.log("dateString: ", dateString);
    console.log("form values: ", newFormValues);
    newFormValues[index]["name"] = dateString;
    setSelected(newFormValues);
  }

  const isInput = "Input";
  const isDatePicker = "Datepicker";
  const isDropDownDocType = "DocType-Dropdown";
  const isDateRange = "Rangepicke";

  return (
    <form onSubmit={handleSubmit}>
      {selected.map((element, index) => (
        <>
          <div className="search-box-position ">
            {element.type === isInput && (
              <Input
                className="input-width"
                addonBefore={element.label}
                name="name"
                value={element.name || ""}
                onChange={(e) => handleChange(index, e)}
              />
            )}

            {element.type === isDatePicker && (
              <>
                <Space>
                  <label className="input-width-datepicker">{`${element.label} : `}</label>
                  <DatePicker
                    className="datepicker-width"
                    onChange={(date, dateString) =>
                      onChange(date, dateString, index)
                    }
                  />
                </Space>
              </>
            )}

            {element.type === isDropDownDocType && (
              <>
                <Space>
                  <label className="input-width-doctype">{`${element.label} : `}</label>
                  <Dropdown
                    className="selected-width-doctype"
                    overlayClassName="subselected-menu"
                    overlay={doctype_menu}
                    trigger={["click"]}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button>
                      <Space>{wording.please_select}</Space>
                    </Button>
                  </Dropdown>
                </Space>
              </>
            )}

            {index ? (
              <Button
                className="remove-button-height"
                icon={<DeleteOutlined />}
                onClick={() => removeFormFields(index)}
              ></Button>
            ) : (
              <>
                <MultiSelect
                  hasSelectAll={false}
                  className="more-menu "
                  options={FilterOptions}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </>
            )}
          </div>
        </>
      ))}

      <div className="filter-button-position">
        <Space>
          <Button className="search-button" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              display: "inline-flex",
              padding: "4px 4px",
              borderRadius: "5px",
              height: "28px",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "12px",
            }}
            icon={
              <PlusCircleOutlined
                style={{
                  margin: "auto",
                  color: "#1890FF",
                  backgroundColor: "#E6F7FF",
                }}
              />
            }
            onClick={() => removeAllFields()}
          >
            Clear Filter
          </Button>

          <Button
            style={{
              display: "inline-flex",
              padding: "4px 10px",
              borderRadius: "5px",
              height: "28px",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "12px",
            }}
            icon={
              <SaveFilled
                style={{
                  margin: "auto",
                  color: "#1890FF",
                  backgroundColor: "#E6F7FF",
                }}
              />
            }
            // onClick={() => {
            //   history.push("/home/registration_document");
            // }}
          >
            Save
          </Button>
        </Space>
      </div>
    </form>
  );
};

export default MainFilterSearch;
