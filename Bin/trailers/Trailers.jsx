import React from "react";
import Table from "../../components/Table/Table";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetTrailersQuery } from "../../store/services/alphaTruckingApi";


export default function Trailers() {
  let { data, error, isFetching } = useGetTrailersQuery();

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  // console.log(data)

  return <Table tableData={data} />
}