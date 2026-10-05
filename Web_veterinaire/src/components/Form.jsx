import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Space, Switch } from "antd";
import dayjs from "dayjs";


function renderInput(col, isEditing) {
  if (!col) {
    throw new Error("la colonne ne doit pas être nulle");
  }

  // Désactiver des champs si on est en mode Edition
  
  const isFieldLocked = isEditing &&  (
    col.dataIndex === "veterinarian_id" ||
    col.dataIndex === "oncall_id" ||
    col.dataIndex === "animalcategory" ||
    col.dataIndex === "email" ||
    col.dataIndex === "label_fr" 
  );

  const inputProps = {
    disabled: isFieldLocked || col.dataIndex === "id",
    readOnly: col.readOnly ?? false,
  };

  switch (col.type) {
    case "checkbox":
      return <Checkbox {...inputProps} checked={col.checked ?? false}> {col.title}</Checkbox>;
    case "password":
      return <Input.Password {...inputProps} />;
    case "date":
      return <DatePicker {...inputProps} defaultValue={dayjs(new Date(), "YYYY-MM-DD")} />;
    case "switch":
      return <Switch disabled={inputProps.disabled}/>;
    default:
      return <Input {...inputProps} />;
  }
}

function renderItem(col, isEditing) {
  return (
    <Form.Item
      key={col.dataIndex}
      name={col.dataIndex}
      label={col.type != "checkbox" ? col.title : null}
      hidden={col.hidden ?? false}
      hasFeedback
      validateTrigger="onBlur"
      rules={
        col.validationRules || [
          {
            required: col.dataIndex !== "website" && col.dataIndex !== "remark",
            message: `Please input ${col.title}`,
            type: col.type ?? "text",
          },
        ]
      }
      valuePropName={col.type === "checkbox" || col.type === "switch" ? "checked" : "value"}
      initialValue={col.type === "checkbox" || col.type === "switch" ? false : ""}
      layout={col.type === "checkbox" || col.type === "switch" ? "horizontal" : "vertical"}
      initialValues={{}}
    >
      {renderInput(col, isEditing)}
    </Form.Item>
  );
}

function renderAvailabilitySubForm(listName, listLabel) {
  return (
    <Form.Item label={"Availabilities"}>
      <Form.List name={"availabilities"}>
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
            {fields.map((field) => (
              <Space key={field.key}>
                <Form.Item
                  noStyle
                  name={[field.name, "oncall_id"]}
                  rules={[{ required: true, message: "availability oncall_id is required" }]}
                >
                  <Input placeholder="oncall_id" />
                </Form.Item>
                <Form.Item noStyle name={[field.name, "remark"]} rules={[{ required: false }]}>
                  <Input placeholder="remark" />
                </Form.Item>
                <CloseOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add availability
            </Button>
          </div>
        )}
      </Form.List>
    </Form.Item>
  );
}

export function renderForm(fields, form, isEditing, hasSubform) {
  return (
    <Form form={form} layout="vertical">
      {fields.map((field) => renderItem(field, isEditing))}
      {hasSubform ? renderAvailabilitySubForm("list", "Availabilities") : null}
    </Form>
  );
}




