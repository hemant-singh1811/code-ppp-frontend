import React from 'react'
import { useSelector } from 'react-redux'
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";
import { useGetBasesQuery } from '../../store/services/alphaTruckingApi';
import Sidebar from './Sidebar';

export default function SidebarParent() {

    const { data, error, isFetching } = useGetBasesQuery()
    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    console.log(data)
    return <Sidebar data={data} />
}


