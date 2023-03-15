import React from 'react'
import { useGetClaimsQuery } from '../../store/services/alphaTruckingApi';
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationClaims() {
    const { data, error, isFetching } = useGetClaimsQuery()

    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
