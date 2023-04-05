import React, { useEffect } from "react";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import {
  useGetModelQuery,
  useGetTableDataQuery,
} from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";

export default function TableScreen() {
  const { selectedTableId } = useSelector((state) => state.globalState);
  let { data, error, isFetching, refetch } =
    useGetTableDataQuery(selectedTableId);
  let modelResult = useGetModelQuery(selectedTableId);

  useEffect(() => {
    refetch(selectedTableId);
    modelResult.refetch(selectedTableId);
  }, [selectedTableId]);

  if (isFetching || modelResult?.isFetching) {
    return <Loading />;
  }
  if (error || modelResult?.error) {
    return <Error error={error} />;
  }



  return <Table tableData={data} tableModel={modelResult.data} />;
}
