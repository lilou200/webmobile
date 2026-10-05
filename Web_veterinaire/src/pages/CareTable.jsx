import { message } from "antd";
import { useEffect, useState } from "react";
import {
  addCare,
  deleteCare,
  fetchCares,
  filterCaresByAnimalCategory,
  getCareCount,
  searchCaresByVeterinarian,
  updateCare,
} from "../API/httpCare";
import GenericTable from "../components/GenericTable";

const CareTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");

  const loadData = async (page) => {
    try {
      setCurrentAction("none");
      setLoading(true);
      const result = await fetchCares(page ?? 1).then((res) =>
        res.map((item) => ({
          ...item,
          key: `${item.animalcategory}-${item.veterinarian_id}`,
        }))
      );
      const { count } = await getCareCount();
      setPagination({ ...pagination, total: count, current: page ?? 1 });
      setData(result);
    } catch (error) {
      console.error("Error during loading:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async (veterinarian) => {
    if (!veterinarian) return loadData(1);
    try {
      setLoading(true);
      const result = await searchCaresByVeterinarian(veterinarian).then((res) =>
        res.map((item) => ({
          ...item,
          key: `${item.animalcategory}-${item.veterinarian_id}`,
        }))
      );
      setFilteredData(result);
      setData(result);
      setPagination({ ...pagination, total: result.length, current: 1 });
      setCurrentAction("filtering");
    } catch (error) {
      console.error("Error during search:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByAnimalCategory = async (animalcategory) => {
    if (!animalcategory) return loadData(1);
    try {
      setLoading(true);
      const result = await filterCaresByAnimalCategory(animalcategory, 1).then((res) =>
        res.map((item) => ({
          ...item,
          key: `${item.animalcategory}-${item.veterinarian_id}`,
        }))
      );
      setPagination({ ...pagination, total: result.length, current: 1 });
      setCurrentAction("filtering");
      setData(result);
    } catch (error) {
      setLoading(false);
      console.error("Error during filtering:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newCare) => {
    try {
      setLoading(true);
      await addCare({...newCare, veterinarian_id: parseInt(newCare.veterinarian_id)});
      loadData();
      message.success("Care successfully added");

    } catch (error) {
      console.error("Error during adding:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleUpdate = async (animalcategory_veterinarian_id, updatedRow) => {
    try {
      setLoading(true);
      await updateCare(updatedRow);
      loadData();
      setData((prevData) => prevData.map((item) => (item.animalcategory_veterinarian_id === animalcategory_veterinarian_id ? { ...updatedRow, animalcategory_veterinarian_id} : item)));
    } catch (error) {
      console.error("Error during updating:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (animalcategory_veterinarian_id) => {
    try {
      setLoading(true);
      const [animalCategory, veterinarian_id] = animalcategory_veterinarian_id.split("-");
      await deleteCare(veterinarian_id, animalCategory);
      loadData();
      setData((prevData) => prevData.filter((item) => item.animalcategory_veterinarian_id !== animalcategory_veterinarian_id));
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (tablePagination) => {
    if (currentAction === "filtering" && tablePagination.current !== pagination.current) {
      const startIndex = (tablePagination.current - 1) * tablePagination.pageSize;
      setData(filtredData.slice(startIndex, startIndex + tablePagination.pageSize));
      setPagination({ ...pagination, current: tablePagination.current });
    } else {
      loadData(tablePagination.current);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: "Animal Category",
      dataIndex: "animalcategory",
      key: "animalcategory",
  
      validationRules: [{ required: true, whitespace: true }],
    },
    { title: "Veterinarian ID", dataIndex: "veterinarian_id", key: "veterinarian_id", validationRules: [{ required: true }] },
    { title: "Remark", dataIndex: "remark", key: "remark" },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      tableName="Care"
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onSearch={handleSearch}
      onFilter={handleFilterByAnimalCategory}
      loading={loading}
      editRowTitle={"Edit Care"}
      addRowTitle={"Add Care"}
      onTableChange={handlePageChange}
      searchPlaceHolder="search by vet id"
      filterPlaceHolder="filter by animalcategory"
      pagination={pagination}
    />
  );
};
export default CareTable;
