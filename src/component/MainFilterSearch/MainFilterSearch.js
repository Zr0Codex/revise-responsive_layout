import React, { useState, useEffect } from "react";
import { Input, Button, Space } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SaveFilled,
} from "@ant-design/icons";
import "./MainFilterSearch.style.scss";
import { MultiSelect } from "react-multi-select-component";

import FilterOptions from "../../util/FilterOptions";

const MainFilterSearch = (props) => {
  const [selected, setSelected] = useState(props.defaultFields);

  useEffect(() => {
    FilterOptions.map((option) => {
      selected.map((select) => {
        if (option.value.includes(select.value)) {
          option.disabled = true;
        }
      });
    });
  }, [FilterOptions]);

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

  return (
    <form onSubmit={handleSubmit}>
      {selected.map((element, index) => (
        <>
          <div className="search-box-position ">
            <Input
              className="input-width"
              addonBefore={element.label}
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />

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
          >
            Save
          </Button>
        </Space>
      </div>
    </form>
  );
};

export default MainFilterSearch;
