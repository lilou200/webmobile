import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";

const TableHeader = ({ title, searchHandler, filterHandler, searchPlaceHolder, filterPlaceHolder, showAddModalHandler,hiddenFilterButton }) => {
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");


  console.log(hiddenFilterButton);
  return (
  
    <>
      <h2>{title}</h2>
      <Space style={{ marginBottom: 16, width: "100%" }}>
        {/* Recherche */}
        <Input
          placeholder={searchPlaceHolder}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => searchHandler(searchText)}
          allowClear
        />

        {/* Filtrage */}
    
        {!hiddenFilterButton && (
        <Input
          placeholder={filterPlaceHolder}
          style={{ width: 200 }}
          prefix={<FilterOutlined />}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          onPressEnter={() => filterHandler(filterText)}
          allowClear
        />
        )}

        {/* Ajout */}
        <Button icon={<PlusOutlined />} type="primary" onClick={showAddModalHandler} style={{ marginLeft: "auto" }}>
          Add
        </Button>
      </Space>
    </>
  );
};

export default TableHeader;
