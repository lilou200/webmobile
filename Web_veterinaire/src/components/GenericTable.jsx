import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox,Form, Modal, Popconfirm, Space, Spin, Table } from "antd";

import { useState } from "react";
import { getValues } from "../utils/antUtils";
import { renderForm } from "./Form";
import TableHeader from "./TableHeader";

const GenericTable = ({
  data,
  columns,
  tableName,
  onAdd,
  onUpdate,
  onDelete,
  onSearch,
  onFilter,
  editRowTitle,
  addRowTitle,
  onTableChange,
  searchPlaceHolder = "search",
  filterPlaceHolder = "filter",
  hasAvailabilitySubform = false,
  rowKey = "key",
  pagination,
  loading = false,
  booleanFilter = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const addTitle = addRowTitle ?? "Add row";
  const editTitle = editRowTitle ?? "Edit row";
  const [form] = Form.useForm();
  const tableColumns = columns.filter((c) => c.dataIndex != "password");
  const hiddenDeleteButton = !onDelete || typeof onDelete !== "function";
  const hiddenUptateButton = !onUpdate || typeof onUpdate !== "function";
  const hiddenFilterButton = !onFilter || typeof onFilter !== "function"; // on a ajout une variable pour cacher le bouton de filtrage
  const handleSearch = async (value) => {
    try {
      await onSearch(value);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleFilter = async (value) => {
    try {
      await onFilter(value);
    } catch (error) {
      console.error("Error during filtering:", error);
    }
  };

  const showAddModal = () => {
    form.resetFields();
    setEditingRow(null);
    setIsModalVisible(true);
  };

  const modifiedColumns = tableColumns.map((col) => {
    if (col.type === "checkbox") {
      return {
        ...col,
        render: (_, record) => (
          <Checkbox
            checked={record[col.dataIndex]}
            onChange={(e) => {
              onUpdate(record.key, { ...record, [col.dataIndex]: e.target.checked });
            }}
          />
        ),
      };
    }
    return col;
  });

  return (
    <Spin spinning={loading}>
      <Space style={{ marginBottom: 16 }}>
        <TableHeader
          title={tableName}
          searchHandler={handleSearch}
          filterHandler={handleFilter}
          hasBooleanFilter={booleanFilter}
          showAddModalHandler={showAddModal}
          filterPlaceHolder={filterPlaceHolder}
          searchPlaceHolder={searchPlaceHolder}
          hiddenFilterButton={hiddenFilterButton} // Pass la variable en tant que prop
        />
      </Space>

      <Table
        dataSource={data}
        columns={[
          //...tableColumns,
          ...modifiedColumns,
          {
            title: "Update",
            render: (text, record) => (
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingRow(record);
                  form.setFieldsValue(getValues(record));
                  setIsModalVisible(true);
                }}
              />
            ),
            hidden: hiddenUptateButton,
          },
          {
            title: "Delete",
            render: (text, record) => (
              <Popconfirm
                title={`Delete ${tableName?.toLowerCase()}`}
                description="Are you sure to delete this record?"
                onConfirm={() => onDelete(record.key)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ),
            hidden: hiddenDeleteButton,
          },
         
        ]}
        rowKey={rowKey}
        pagination={pagination}
        onChange={onTableChange}
      />

      <Modal
        title={editingRow ? editTitle : addTitle}
        open={isModalVisible}
        okText={editingRow ? "Edit" : "Add"}
        onOk={async () => {
          await form.validateFields();

          if (editingRow) {
            onUpdate(editingRow.key, form.getFieldsValue());
          } else {
            onAdd(form.getFieldsValue());
          }
          setIsModalVisible(false);
          setEditingRow(null);
        }}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose={true}
      >
        {renderForm(columns, form, editingRow, hasAvailabilitySubform)}
      </Modal>
    </Spin>
  );
};

export default GenericTable;
