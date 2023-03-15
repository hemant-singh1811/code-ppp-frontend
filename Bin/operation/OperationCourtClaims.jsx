import React from 'react'
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';
import { useGetCourtClaimDataQuery } from '../../store/services/alphaTruckingApi';

export default function OperationCourtClaims() {
    const { data, error, isFetching } = useGetCourtClaimDataQuery()

    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
