import React from 'react'
import { useGetDriverHiringFormDataQuery } from '../../store/services/alphaTruckingApi';
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationDriverHiringForm() {
    const { data, error, isFetching } = useGetDriverHiringFormDataQuery()

    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
