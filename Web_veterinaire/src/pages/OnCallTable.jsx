import { message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { addOnCall, fetchOnCalls, getOnCallCount, searchOnCallByDate } from "../API/httpOnCall";
import GenericTable from "../components/GenericTable";
import { renderBoolean } from "../utils/antUtils";

const OncallTable = () => {
  const [data, setData] = useState([]);
  const [onCallCount, setOnCallCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, total: 0, showSizeChanger: false, pageSize: 5 });
  const [currentAction, setCurrentAction] = useState("none");

  const mapResult = (item) => ({ ...item, key: item.gard_id });
  const loadData = async (page) => {
    try {
      setLoading(true);
      setCurrentAction("none");
      const fetchedData = await fetchOnCalls(page ?? pagination.current).then((res) => res.map(mapResult));
      const { count } = await getOnCallCount();

      setData(fetchedData);
      setPagination({ ...pagination, total: count, current: page ?? pagination.current });
    } catch (error) {
      console.error("Erreur dans la récuperation des données", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async (date) => {
    try {
      if (!date || date.trim().length === 0) return loadData(1);
      const formattedDate = dayjs(date).format("YYYY-MM-DD"); 
      setLoading(true);
      setCurrentAction("filtering");
      console.error(null);
      const result = await searchOnCallByDate(formattedDate).then((res) => res.map(mapResult));
      setPagination({ ...pagination, total: result.length, current: 1 });
      setData(result);
    } catch (error) {
      console.error("Erreur dans la recherche de garde");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newOnCall) => {
    try {
      setLoading(true);
      console.error(null);
      const onCallDate = dayjs(newOnCall.date?.$d).format("YYYY-MM-DD");
      newOnCall.date = onCallDate;
      await addOnCall(newOnCall);
      loadData();
      message.success("Oncall successfully added");
    } catch (error) {
      console.error("Erreur dans l'ajout d'un nouveau garde");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (tablePagination) => {
    loadData(tablePagination.current);
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: "Garde ID", hidden: true, dataIndex: "gard_id", key: "gard_id" },
    { title: "Date", dataIndex: "date", type: "date", key: "date", render: (value) => dayjs(value).format("YYYY-MM-DD") },
    {
      title: "Garde de Nuit",
      dataIndex: "isnightoncall",
      key: "isnightoncall",
      type: "checkbox",
      validationRules: [{ required: false }],
    },
  ];
  return (
    <GenericTable
      data={data}
      columns={columns}
      tableName="OnCall"
      onAdd={handleAdd}
      onSearch={handleSearch}
      loading={loading}
      editRowTitle={"Edit an onCall"}
      addRowTitle={"Add an onCall"}
      onTableChange={handlePageChange}
      totalItems={onCallCount}
      searchPlaceHolder="search by date"
      pagination={pagination}
    />
  );
};
export default OncallTable;
