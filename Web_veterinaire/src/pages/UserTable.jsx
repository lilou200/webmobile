import { Checkbox, message } from "antd";
import { useEffect, useState } from "react";
import { addUser, deleteUser, fetchUserByUserName, fetchUsers, filterUsersByAdminStatus, getUserCount, updateUser } from "../API/httpUser";
import GenericTable from "../components/GenericTable";
import { renderBoolean, VALIDATION_RULES } from "../utils/antUtils";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [filtredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");

  const mapResult = (item) => ({ ...item, key: item.email });
  const loadData = async (page) => {
    try {
      setLoading(true);
      setCurrentAction("none");
      const result = await fetchUsers(page ?? pagination.current).then((res) => res.map(mapResult));
      const { count } = await getUserCount();

      setPagination({ ...pagination, total: count, current: page ?? 1 });
      setData(result);
    } catch (error) {
      console.error("Erreur dans la récuperation des utilisateurs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (tablePagination) => {
    if (currentAction === "filtering" && tablePagination.current !== pagination.current) {
      const startIndex = (tablePagination.current - 1) * tablePagination.pageSize;
      setData(filtredData.slice(startIndex, startIndex + tablePagination.pageSize));
      setPagination({ ...pagination, current: tablePagination.current });
    } else {
      loadData(tablePagination.current);
    }
  };

  const handleSearch = async (username) => {
    try {
      setLoading(true);
      setCurrentAction("filtering");

      if (!username || username === "") {
        return loadData();
      }

      const users = await fetchUserByUserName(username).then((res) => res.map(mapResult));
      setPagination({ ...pagination, total: users.length, current: 1 });
      setFilteredData(users);
      setData(users);
    } catch (error) {
      console.error("Erreur de recherche par nom d'utilisateur", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilter = async (isadmin) => {
    try {
      if (!isadmin) {
        return loadData();
      }
      setLoading(true);
      const result = await filterUsersByAdminStatus(isadmin);
      if (result) {
        setPagination({ ...pagination, total: result.length, current: 1 });
        setCurrentAction("filtering");
      }

      setData(result);
      setFilteredData(result);
      return result.map((item) => ({ ...item, key: item.email }));
    } catch (error) {
      console.error("Erreur dans le filltrage des utilisateurs admin");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newUser) => {
    try {
      setLoading(true);
      console.error(null);
      await addUser(newUser);
      loadData();
      message.success("L'utilisateur a été créé");
    } catch (error) {
      console.error("Erreur dans l'ajout d'utilisateur", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (email, updatedRow) => {
    try {
      setLoading(true);
      await updateUser(updatedRow);
      setData((prevData) => prevData.map((item) => (item.email === email ? { ...updatedRow, email } : item)));
    } catch (error) {
      console.error("Erreur dans la mise à jour d'un utilisatuer", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      setLoading(true);
      await deleteUser(email);
      setData((prevData) => prevData.filter((item) => item.email !== email));
    } catch (error) {
      console.error("Erreur dans la suppression de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: "Email", dataIndex: "email", key: "email", type: "email", validationRules: VALIDATION_RULES.requiredEmail },
    { title: "username", dataIndex: "username", key: "username", validationRules: VALIDATION_RULES.required},
    { title: "password", dataIndex: "password", key: "password", type: "password", validationRules: VALIDATION_RULES.requiredPassword },
    {
  
      title: "Admin",
      dataIndex: "isadmin",
      key: "isadmin",
      type: "checkbox",
      valuePropName: "checked",
      validationRules: [{ required: false }],
    },
  ];

  return (
    <>
      <GenericTable
        data={data}
        columns={columns}
        tableName="User"
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onTableChange={handleTableChange}
        loading={loading}
        editRowTitle={"Edit User"}
        addRowTitle={"Add User"}
        searchPlaceHolder="search by username"
        filterPlaceHolder="show admins only"
        pagination={pagination}
      />
    </>
  );
};
export default UserTable;
