import Table from "../../src/components/Table/Table";
import Error from "../../src/components/utilities/Error";
import Loading from "../../src/components/utilities/Loading";
import { useGetTrucksQuery } from "../../src/store/services/alphaTruckingApi";



export default function Trucks() {
  let { data, error, isFetching } = useGetTrucksQuery();

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return <Table tableData={data} />
}
