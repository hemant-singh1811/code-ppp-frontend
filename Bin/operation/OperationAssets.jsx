import React from 'react'
import { useGetAssetsQuery } from '../../store/services/alphaTruckingApi'
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function OperationAssets() {
    const { data, error, isFetching } = useGetAssetsQuery()
    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }

    const modal = {
        name: 'Operation Assets',
        baseId: []
    }

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            modal.baseId.push(element.id)
        }
    }

    return <Table tableData={data} />
}
