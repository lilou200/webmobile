import { message } from "antd";
import { useEffect, useState } from "react";
import {
  addAvailability,
  deleteAvailability,
  fetchAvailabilities,
  getAvailabilityCount,
  searchAvailabilityByDate,
  searchAvailabilityByVeterinarian,
  updateAvailability,
} from "../API/httpAvailability";
import GenericTable from "../components/GenericTable";
import { VALIDATION_RULES } from "../utils/antUtils";

const AvailabilityTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");
  const [filtredData, setFilteredData] = useState([]);

  const loadData = async (page) => {
    try {
      setLoading(true);
      setCurrentAction("none");
      const result = await fetchAvailabilities(page || 1).then((res) =>
        res.map((item) => ({ ...item, key: `${item.veterinarian_id}-${item.oncall_id}` }))
      );
      const { count } = await getAvailabilityCount();
      setPagination({ ...pagination, total: count, current: page || 1 });
      setData(result);
    } catch (error) {
      setLoading(false);
      console.error("Erreur dans la récuperation des disponibilitées ", error);
    } finally {
      setLoading(false);
    }
  };

  const mapResult = (vet) => ({...vet, key: `${vet.veterinarian_id}-${vet.oncall_id}`, });

  const handlesearchBydate = async (date) => {
    try {
      if (!date || date.trim().length === 0) return loadData(1);
      setLoading(true);
      setCurrentAction("filtering");
      const result = await searchAvailabilityByDate(date).then((res) => res.map(mapResult));
      setData(result);
      setPagination({ ...pagination, total: result.length, current: 1 });
      setFilteredData(result);
    } catch (error) {
      console.error("Erreur dans la recherche de disponibilité par date:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newAvailability) => {
    try {
      setLoading(true);
      console.error(null);

      await addAvailability({
        ...newAvailability,
        oncall_id: parseInt(newAvailability.oncall_id),
        veterinarian_id: parseInt(newAvailability?.veterinarian_id),
      });

      loadData();
      message.success("Availability successfuly added");
    } catch (error) {
      setLoading(false);
      console.error(" Erreur en ajoutant la disponibilité", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (veterinarian_id_oncall_id) => {
    try {
      setLoading(true);
      console.error(null);
      const [veterinarian_id, oncall_id] = veterinarian_id_oncall_id.split("-");
      await deleteAvailability(veterinarian_id, oncall_id);
      loadData();
    } catch (error) {
      console.error("Erreur de suppression de disponibilité", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (veterinarian_id_oncall_id, updatedAvailability) => {
    try {
      setLoading(true);
      console.error(null);
      await updateAvailability(updatedAvailability);
      loadData();
      setData((prevData) => prevData.map((item) => (item.veterinarian_id_oncall_id === veterinarian_id_oncall_id ? { ...updateAvailability, veterinarian_id_oncall_id } : item)));
    } catch (error) {
      console.error("Erreur dans la mise en jour de disponibilité", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByVeterinarian = async (idvete) => {
    try {
      if (!idvete || idvete.trim().length === 0) return loadData(1);
      setLoading(true);
      setCurrentAction("filtering");
      const result = await searchAvailabilityByVeterinarian(idvete).then((res) => res.map(mapResult));
      setData(result);
      setFilteredData(result);
      setPagination({ ...pagination, total: result.length, current: 1 });
    } catch (error) {
      setLoading(false);
      console.error("Disponibilité par vétérianire est introuvavle", error);
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
    loadData(1);
  }, []);

  const columns = [
    {
      title: "Veterinarian ID",
      dataIndex: "veterinarian_id",
      key: "veterinarian_id",
      validationRules: [{ required: true }],
    },
    {
      title: "Oncall ID",
      dataIndex: "oncall_id",
      key: "oncall_id",
    validationRules: [{ required: true }],
    },
    { title: "Remark", dataIndex: "remark", key: "remark", validationRules: VALIDATION_RULES.optionalNonBlankString },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      tableName="Availability"
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onSearch={handlesearchBydate}
      onFilter={handleSearchByVeterinarian}
      loading={loading}
      addRowTitle={"Add Availability"}
      editRowTitle={"Edit Availability"}
      onTableChange={handlePageChange}
      pagination={pagination}
      searchPlaceHolder="search by date"
      filterPlaceHolder="filter by id vet"
    />
  );
};
export default AvailabilityTable;
