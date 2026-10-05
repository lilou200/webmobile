import { message } from "antd";
import { useEffect, useState } from "react";
import {
  addAnimalCategory,
  deleteAnimalCategory,
  fetchAnimalCategories,
  filterAnimalCategoryByLabelEn,
  getCategoryCount,
  searchAnimalCategoryByLabel,
  updateAnimalCategory,
} from "../API/httpAnimalCat";

import GenericTable from "../components/GenericTable";
import { VALIDATION_RULES } from "../utils/antUtils";

const AnimalCategoryTable = () => {
  const [data, setData] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");
  const [filtredData, setFilteredData] = useState([]);


  const loadData = async (page) => {
    try {
      setLoading(true);
      setCurrentAction("none");
      const result = await fetchAnimalCategories(page ?? pagination.current);
      const { count } = await getCategoryCount();
      setCategoryCount(count);
      setData(result.map((item) => ({ ...item, key: item.label_fr })));
      setPagination({ ...pagination, total: count, current: page ?? 1 });
    } catch (error) {
      console.error("Error during loading:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (label_fr) => {
    try {
      setLoading(true);
      setCurrentAction("filtering");
      if (!label_fr || label_fr.trim().length === 0){
        return loadData(1);
      }
      const result = await searchAnimalCategoryByLabel(label_fr).then((res) => [{ ...res, key: res.label_fr }]);
      setPagination({ ...pagination, total: result.length, current: 1 });
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Erreur de la recheche de catégorie animal", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByLabelEn = async (label) => {
    try {
      if (!label || label.trim().length === 0) {
        return loadData(1);
      }
      setLoading(true);
      const result = await filterAnimalCategoryByLabelEn(label).then((res) =>
        res.map((item) => ({ ...item, key:item.label_fr }))
      );
      setData(result);
      setFilteredData(result);
      setPagination({ ...pagination, total: result.length, current: 1 });
    } catch (error) {
      console.error("Erreur dans le filtrage par label en angalais", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newCategory) => {
    try {
      setLoading(true);
      await addAnimalCategory(newCategory);
      loadData();
      message.success("animal category succesfully added");
    } catch (error) {
      console.error("Erreur d'ajout d'un catégorie animal", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (label_fr, updatedCategory) => {
    try {
      setLoading(true);
      await updateAnimalCategory(updatedCategory);
      setData((prevData) => prevData.map((item) => (item.label_fr === label_fr ? { ...updatedCategory, label_fr } : item)));
    } catch (error) {
      console.error("Erreur dans la mise d'un catégorie animal ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (label_fr) => {
    try {
      setLoading(true);
      await deleteAnimalCategory(label_fr);
      setData((prevData) => prevData.filter((item) => item.label_fr !== label_fr));
    } catch (error) {
      console.error("Erreur de suppression d'une catégorie animal", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (tablePagination) => {
    if (currentAction === "filtering") {
      setData(
        filtredData.slice((tablePagination.current - 1) * tablePagination.pageSize, tablePagination.current * tablePagination.pageSize)
      );
      setPagination({ ...pagination, current: tablePagination.current });
    } else {
      await loadData(tablePagination.current);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: "label_fr", dataIndex: "label_fr", key: "label_fr", validationRules: VALIDATION_RULES.requiredNonBlankString },
    { title: "label_en", dataIndex: "label_en", key: "label_en", validationRules: VALIDATION_RULES.requiredNonBlankString },
    {
      title: "description_fr",
      dataIndex: "description_fr",
      key: "description_fr",
      validationRules: VALIDATION_RULES.requiredNonBlankString,
    },
    {
      title: "description_en",
      dataIndex: "description_en",
      key: "description_en",
      validationRules: VALIDATION_RULES.requiredNonBlankString,
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      tableName="Animal Category"
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onSearch={handleSearch}
      onFilter={handleFilterByLabelEn}
      loading={loading}
      addRowTitle={"Add Animal Category"}
      editRowTitle={"Edit Animal Category"}
      onTableChange={handlePageChange}
      totalItems={categoryCount}
      searchPlaceHolder="search by label_fr"
      filterPlaceHolder="filter by label_en"
      pagination={pagination}
    />
  );
};
export default AnimalCategoryTable;
