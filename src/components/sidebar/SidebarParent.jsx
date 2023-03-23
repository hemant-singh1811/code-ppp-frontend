import React, { useEffect } from "react";
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";
import { useGetBasesQuery } from "../../store/services/alphaTruckingApi";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { handelAddBases } from "../../store/features/BasesStateSlice";

export default function SidebarParent() {
  const { data, error, isFetching, isSuccess } = useGetBasesQuery();
  const dispatch = useDispatch()
  // console.log(temp.startedTimeStamp)
  // console.log(temp.fulfilledTimeStamp)
  // console.log(temp.fulfilledTimeStamp - temp.startedTimeStamp + "ms");

  // useEffect(() => {
  //   dispatch(handelAddBases(data))
  // }, [isSuccess])

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  dispatch(handelAddBases(data))

  return <Sidebar />;
}
