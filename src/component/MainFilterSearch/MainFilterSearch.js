import React, { useState, useEffect } from "react";
import { Input, Button, Space, DatePicker, Select } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveFilled,
} from "@ant-design/icons";
import "./MainFilterSearch.style.scss";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

import FilterOptions from "../../util/FilterOptions";
import wording from "../../util/wording";

const { Option } = Select;
const { RangePicker } = DatePicker;

const MainFilterSearch = (props) => {
  const [selected, setSelected] = useState(props.defaultFields);

  const [doctype, setDoctype] = useState([]);
  const [docstatus, setDocStatus] = useState([]);

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
    const FetchDOCTYPE = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT_GET_CONFIGURATION_DOCTYPE)
          .then((response) => {
            setDoctype(response.data.menu_doctype);
          });
      } catch (error) {
        console.error(error);
      }
    };

    FetchDOCTYPE();
  }, []);

  useEffect(() => {
    const FetchDOCSTATUS = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT_GET_CONFIGURATION_DOCSTATUS)
          .then((response) => {
            setDocStatus(response.data.status_doctype);
          });
      } catch (error) {
        console.error(error);
      }
    };

    FetchDOCSTATUS();
  }, []);

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

    const generateFinalData = {
      claim_no: "",
      claim_box_no: "",
      insurance_no: "",
      warehouse_box_no: "",
      document_type: "",
      user_id: "",
      collecting_date: "",
      document_status: "",
      searching_range: "",
    };

    selected.map((value) => {
      if (value.value === "เลขที่เรื่องสินไหม") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.claim_no = value.name;
        }
      }
      if (value.value === "เลขที่กรมธรรม์") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.insurance_no = value.name;
        }
      }
      if (value.value === "เลขที่กล่องสินไหม") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.claim_box_no = value.name;
        }
      }
      if (value.value === "เลขที่กล่องคลัง") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.warehouse_box_no = value.name;
        }
      }
      if (value.value === "ประเภทเอกสาร") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.document_type = value.name;
        }
      }
      if (value.value === "รหัสผู้จัดเก็บ") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.user_id = value.name;
        }
      }
      if (value.value === "วันที่จัดเก็บ") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.collecting_date = value.name;
        }
      }
      if (value.value === "สถานะเอกสาร") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.document_status = value.name;
        }
      }
      if (value.value === "ช่วงที่ต้องการค้นหา") {
        if (value.name !== "" || value.name !== null) {
          generateFinalData.searching_range = value.name;
        }
      }
    });

    console.log(generateFinalData);
  };

  function onChange(date, dateString, index) {
    let newFormValues = [...selected];
    console.log("dateString: ", dateString);
    console.log("form values: ", newFormValues);
    newFormValues[index]["name"] = dateString;
    setSelected(newFormValues);
  }

  function onSelectionChange(index, value) {
    let newFormValues = [...selected];
    console.log("index:", index);
    console.log("value: ", value);
    newFormValues[index]["name"] = value;
    setSelected(newFormValues);
  }

  const isInput = "Input";
  const isDatePicker = "Datepicker";
  const isDropDownDocType = "DocType-Dropdown";
  const isDropDownDocStatus = "DocStatus-Dropdown";
  const isDateRange = "Rangepicke";

  return (
    <form onSubmit={handleSubmit}>
      {selected.map((element, index) => (
        <>
          <div className="search-box-position ">
            {element.type === isInput && (
              <>
                <Space>
                  <label className="input-label-width">{`${element.label} : `}</label>
                  <Input
                    className="input-width"
                    // addonBefore={element.label}
                    name="name"
                    value={element.name || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Space>
              </>
            )}

            {element.type === isDatePicker && (
              <>
                <Space>
                  <label className="input-label-width">{`${element.label} : `}</label>
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
                  <label className="input-label-width">{`${element.label} : `}</label>

                  <Select
                    className="datepicker-width"
                    placeholder={wording.please_select}
                    // style={{ width: 200, height: 32, fontSize: 18 }}
                    onChange={(value) => {
                      onSelectionChange(index, value);
                    }}
                  >
                    {doctype.map((data) => {
                      return (
                        <>
                          <Option value={data.menu}>{data.menu}</Option>
                        </>
                      );
                    })}
                  </Select>
                </Space>
              </>
            )}

            {element.type === isDropDownDocStatus && (
              <>
                <Space>
                  <label className="input-label-width">{`${element.label} : `}</label>

                  <Select
                    className="datepicker-width"
                    placeholder={wording.please_select}
                    // style={{ width: 200, height: 32, fontSize: 18 }}
                    onChange={(value) => {
                      onSelectionChange(index, value);
                    }}
                  >
                    {docstatus.map((data) => {
                      return (
                        <>
                          <Option value={data.menu}>{data.menu}</Option>
                        </>
                      );
                    })}
                  </Select>
                </Space>
              </>
            )}

            {element.type === isDateRange && (
              <>
                <Space>
                  <label className="input-label-width">{`${element.label} : `}</label>

                  <RangePicker
                    className="datepicker-width"
                    onChange={(date, dateString) =>
                      onChange(date, dateString, index)
                    }
                  />
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
