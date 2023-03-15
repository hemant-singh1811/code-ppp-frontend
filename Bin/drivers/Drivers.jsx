import React from "react";
import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";
import getAllDrivers from "../../store/LocalAPi/getAllDrivers.json"
import Table from "../../components/Table/Table";



export default function Drivers() {
  // let { data, error, isFetching } = useGetDriversQuery();
  let data = getAllDrivers;
  // if (isFetching) {
  // return <Loading />;
  // }
  // if (error) {
  //   return <Error error={error} />;
  // }

  return (
    <Table tableData={data} />
  );
}
