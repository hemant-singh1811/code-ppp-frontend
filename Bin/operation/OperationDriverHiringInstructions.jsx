import React from 'react'
import { useGetDriverHiringInstructionsQuery } from '../../store/services/alphaTruckingApi'
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationDriverHiringInstructions() {
    const { data, error, isFetching } = useGetDriverHiringInstructionsQuery()
    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
