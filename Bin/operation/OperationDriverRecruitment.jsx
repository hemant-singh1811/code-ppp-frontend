import React from 'react'
import { useGetRecruitmentDHTeamDataQuery } from '../../store/services/alphaTruckingApi'
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationDriverRecruitment() {
    const { data, error, isFetching } = useGetRecruitmentDHTeamDataQuery()
    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
