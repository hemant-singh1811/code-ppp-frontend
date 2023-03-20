import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import {
  useGetModelQuery,
  useGetTableDataQuery,
} from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";

export default function TableScreen() {
  const location = useLocation();
  let { data, error, isFetching, refetch } = useGetTableDataQuery(
    location.pathname.split("/")[2]
  );
  let modelResult = useGetModelQuery(location.pathname.split("/")[2]);

  useEffect(() => {
    refetch(location.pathname.split("/")[2]);
    modelResult.refetch(location.pathname.split("/")[2]);
  }, [location.pathname.split("/")[2]]);

  if (isFetching || modelResult?.isFetching) {
    return <Loading />;
  }
  if (error || modelResult?.error) {
    return <Error error={error} />;
  }

  // console.log(modelResult.data)
  // console.log(data)
  return <Table tableData={data} tableModel={modelResult.data} />;
}
