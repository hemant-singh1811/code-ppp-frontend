import React from 'react'
import { useGetInsuranceClaimsQuery } from '../../store/services/alphaTruckingApi'
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationInsuranceClaims() {
    const { data, error, isFetching } = useGetInsuranceClaimsQuery()
    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
