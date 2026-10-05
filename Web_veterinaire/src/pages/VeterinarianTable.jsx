import { message } from "antd";
import { useEffect, useState } from "react";
import {
  addVeterinarian,
  deleteVeterinarian,
  fetchVeterinarianByLastName,
  fetchVeterinarianByLocality,
  fetchVeterinarians,
  getVetCount,
  updateVeterinarian,
} from "../API/httpVet";
import GenericTable from "../components/GenericTable";
import { renderBoolean, VALIDATION_RULES } from "../utils/antUtils";

const VeterinarianTable = () => {
  const [data, setData] = useState([]);
  const [veterinarianCount, setVeterinarianCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [filtredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");

  const mapResult = (item) => ({...item, key: item.id,});
  const loadData = async (page) => {
    try {
      setLoading(true);
      setCurrentAction("none");
      const result = await fetchVeterinarians(page ?? pagination.current).then((res) => res.map(mapResult));
      const { count } = await getVetCount();
      setPagination({ ...pagination, total: count, current: page ?? 1 });
      setData(result);
    } catch (error) {
      console.error("Erreur dans la récuperation des véterinaires", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (lastname) => {
    try {
      if (!lastname || lastname.trim().length === 0) return loadData(1);
      setCurrentAction("filtering");
      setLoading(true);
      const result = await fetchVeterinarianByLastName(lastname).then((res) => res.map(mapResult));
      setPagination({ ...pagination, total: result.length, current: 1 });
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Erreur dans la recherche du vetérianaire par son nom", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (locality) => {
    try {
      if (!locality ) return loadData(1);
      setLoading(true);
      setCurrentAction("filtering");
      const result = await fetchVeterinarianByLocality(locality).then((res) => res.map((item) => ({ ...item, key: item.id })));
      setPagination({ ...pagination, total: result.length, current: 1 });
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Erreur dans le filtrage des vetérinaires", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newVeterinarian) => {
    try {
      setLoading(true);
      console.error(null);
      const { availabilities = [], ...veterinarian } = newVeterinarian;
      if (!veterinarian.website) {
        delete veterinarian.website; // the backend throws an error if this field is blank, empty or invalid url
      }
      availabilities.forEach((a) => (a.oncall_id = parseInt(a.oncall_id))); // the form field is a string so we need to convert it to an integer
      const finalVet = { veterinarian, availabilities };
      const addedVeterinarinarian = await addVeterinarian(finalVet);
      setData((prevData) => [...prevData, { ...addedVeterinarinarian, key: addedVeterinarinarian.id }]);
      message.success("Veterinarian successfully added");
    } catch (error) {
      console.error("Erruer dans l'ajout du véterianaire");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedRow) => {
    try {
      setLoading(true);
      console.error(null);
      await updateVeterinarian(updatedRow);
      setData((prevData) => prevData.map((item) => (item.id === id ? { ...updatedRow, id } : item)));
    } catch (error) {
      console.error("Erreur dans la mise à jour d'un véterianire");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      console.error(null);
      await deleteVeterinarian(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur se supression d'un vétrinaire");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = async (tablePagination) => {
    if (currentAction === "filtering" && tablePagination.current !== pagination.current) {
      const startIndex = (tablePagination.current - 1) * tablePagination.pageSize;
      setData(filtredData.slice(startIndex, startIndex + tablePagination.pageSize));
    } else {
      debugger;
      await loadData(tablePagination.current);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "last name", dataIndex: "lastname", key: "lastname", validationRules: VALIDATION_RULES.requiredNonBlankString },
    { title: "first name", dataIndex: "firstname", key: "firstname", validationRules: VALIDATION_RULES.requiredNonBlankString },
    {
  
      title: "makes home visits",
      dataIndex: "makehomevisits",
      type: "checkbox",
      key: "makehomevisits",
      valuePropName: "checked",
      validationRules: [{ required: false }],

    },
    { title: "gsm", dataIndex: "gsm", key: "gsm", validationRules: VALIDATION_RULES.requiredPhoneNumber },
    { title: "street clinic", dataIndex: "streetclinic", key: "streetclinic", validationRules: VALIDATION_RULES.required },
    { title: "number clinic", dataIndex: "numberclinic", key: "numberclinic", validationRules: VALIDATION_RULES.required },
    { title: "locality clinic", dataIndex: "localityclinic", key: "localityclinic", validationRules: VALIDATION_RULES.required },
    { title: "gps coordinate", dataIndex: "gpscoordinate", key: "gpscoordinate", validationRules: VALIDATION_RULES.required },
    { title: "schedule fr", dataIndex: "schedule_fr", key: "schedule_fr", validationRules: VALIDATION_RULES.required },
    { title: "schedule en", dataIndex: "schedule_en", key: "schedule_en", validationRules: VALIDATION_RULES.required },
    { title: "website", dataIndex: "website", key: "website" },
  ];

  return (
    <>
      <GenericTable
        data={data}
        columns={columns}
        tableName="Veterinarian"
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onFilter={handleFilter}
        loading={loading}
        pagination={pagination}
        onTableChange={handleTableChange}
        hasAvailabilitySubform={true}
        searchPlaceHolder="search by lastname"
        filterPlaceHolder="filter by localityclinic"
      />
    </>
  );
};
export default VeterinarianTable;
