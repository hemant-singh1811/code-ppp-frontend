import React, { useEffect, useState } from "react";
import { useGetLoadQuery } from "../../store/services/alphaTruckingApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoad } from "../../store/features/loadSlice";
import Loading from "../utilities/Loading";
import Error from "../utilities/Error";

export default function AsideBody() {
  let { data, error, isFetching } = useGetLoadQuery();

  const dispatch = useDispatch();
  const { search, filter } = useSelector((state) => state.globalState);
  let dataArray = {
    alphaLionData: [],
    ironLionData: [],
    alphaTigerData: [],
    alphaLionRepairData: [],
    wolfPackData: [],
    trailHeadTransportData: [],
  };

  const [companiesOptions, setCompaniesOptions] = useState([
    {
      companyName: "Alpha Lion",
      clientId: "recIV837MTikNtcd1",
      collapse: true,
    },
    {
      companyName: "Iron Lion",
      clientId: "recVD4OIfP8RlkntH",
      collapse: true,
    },
    {
      companyName: "TrailHead transport LLC",
      clientId: "recYRvEqumGF9fz36",
      collapse: true,
    },
    {
      companyName: "wolfPack",
      clientId: "recCkMdePgOJYNiUS",
      collapse: true,
    },
    {
      companyName: "Alpha Tiger",
      clientId: "recGhw7uVh6j3ehOj",
      collapse: true,
    },
    {
      companyName: "Alpha Lion Repair",
      clientId: "rec6tb50Bgk9Rdr8K",
      collapse: true,
    },
  ]);

  useEffect(() => {
    if (search !== "") {
      companiesOptions.map((element) => {
        if (!element.collapse)
          setCompaniesOptions((prev) => {
            return prev.map((ele) => {
              return {
                companyName: ele.companyName,
                clientId: ele.clientId,
                collapse: true,
              };
            });
          });
      });
    }
  }, [search]);

  if (isFetching) return <Loading />;
  if (error) return <Error error={error} />;

  // console.log(data);

  companiesOptions.map((element, index) => {
    switch (element.companyName) {
      case "Alpha Lion":
        dataArray.alphaLionData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      case "Iron Lion":
        dataArray.ironLionData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      case "TrailHead transport LLC":
        dataArray.trailHeadTransportData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      case "wolfPack":
        dataArray.wolfPackData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      case "Alpha Tiger":
        dataArray.alphaTigerData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      case "Alpha Lion Repair":
        dataArray.alphaLionRepairData = data.filter((ele) => {
          if (ele?.data?.client_id) {
            return ele?.data?.client_id[0] === element.clientId;
          }
        });
        break;
      default:
        break;
    }
  });

  const toggle = (element) => {
    setCompaniesOptions((prev) => {
      return prev.map((ele) => {
        if (ele.companyName === element.companyName) {
          return {
            companyName: ele.companyName,
            clientId: ele.clientId,
            collapse: !ele.collapse,
          };
        }
        return ele;
      });
    });
  };

  return (
    <div className='w-[28rem] bg-[#0E1723] text-white flex flex-col overflow-y-auto m-0 p-0'>
      <div className='m-3'>
        {companiesOptions.map((element, index) => {
          return (
            <div key={index}>
              <div
                className='flex w-full items-center justify-between mb-2 cursor-pointer'
                onClick={() => toggle(element)}
              >
                <p className='capitalize'>{element.companyName}</p>
                <div
                  className={`${element.collapse ? "rotate-180" : "rotate-0"}`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-6 h-6 `}
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
              {element.collapse &&
                element.companyName === "Alpha Lion" &&
                handleListData(
                  dataArray.alphaLionData,
                  search,
                  dispatch,
                  filter
                )}
              {element.collapse &&
                element.companyName === "Iron Lion" &&
                handleListData(
                  dataArray.ironLionData,
                  search,
                  dispatch,
                  filter
                )}
              {element.collapse &&
                element.companyName === "TrailHead transport LLC" &&
                handleListData(
                  dataArray.trailHeadTransportData,
                  search,
                  dispatch,
                  filter
                )}
              {element.collapse &&
                element.companyName === "wolfPack" &&
                handleListData(
                  dataArray.wolfPackData,
                  search,
                  dispatch,
                  filter
                )}
              {element.collapse &&
                element.companyName === "Alpha Tiger" &&
                handleListData(
                  dataArray.alphaTigerData,
                  search,
                  dispatch,
                  filter
                )}
              {element.collapse &&
                element.companyName === "Alpha Lion Repair" &&
                handleListData(
                  dataArray.alphaLionRepairData,
                  search,
                  dispatch,
                  filter
                )}
              {index < companiesOptions.length - 1 && (
                <div className='w-full m-auto my-2 h-[1px] bg-red-300 rounded-sm'></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// console.log(filter)

function handleListData(alphaLionData, search, dispatch, filter) {
  // console.log(filter)
  return alphaLionData.filter(({ data }) => {
    if (
      (filter[0]?.isSelected &&
        data?.load_status
          ?.toLowerCase()
          .includes(filter[0]?.name.toLowerCase())) ||
      (filter[1]?.isSelected &&
        data?.load_status
          ?.toLowerCase()
          .includes(filter[1]?.name.toLowerCase())) ||
      (filter[2]?.isSelected &&
        data?.load_status
          ?.toLowerCase()
          .includes(filter[2]?.name.toLowerCase()))
    ) {
      if (data.DriverData?.driverAInfo?.Name !== undefined) {
        if (
          data.DriverData?.driverAInfo?.Name.toLowerCase().includes(
            search.toLowerCase()
          ) ||
          data?.load_status?.toLowerCase().includes(search.toLowerCase()) ||
          data?.customerName[0]?.toLowerCase().includes(search.toLowerCase()) ||
          data?.load_number?.toLowerCase().includes(search.toLowerCase()) ||
          data?.PU_time?.toLowerCase().includes(search.toLowerCase()) ||
          data?.customerAddress[0]?.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  }).length === 0 ? (
    <div className='w-full bg-white rounded-md text-black p-5 text-center font-bold text-xl py-2'>
      No Load Found
    </div>
  ) : (
    alphaLionData
      .filter(({ data }) => {
        if (
          (filter[0]?.isSelected &&
            data?.load_status
              ?.toLowerCase()
              .includes(filter[0]?.name.toLowerCase())) ||
          (filter[1]?.isSelected &&
            data?.load_status
              ?.toLowerCase()
              .includes(filter[1]?.name.toLowerCase())) ||
          (filter[2]?.isSelected &&
            data?.load_status
              ?.toLowerCase()
              .includes(filter[2]?.name.toLowerCase()))
        ) {
          if (data.DriverData?.driverAInfo?.Name !== undefined) {
            if (
              data.DriverData?.driverAInfo?.Name.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              data?.load_status?.toLowerCase().includes(search.toLowerCase()) ||
              data?.customerName[0]
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
              data?.load_number?.toLowerCase().includes(search.toLowerCase()) ||
              data?.PU_time?.toLowerCase().includes(search.toLowerCase()) ||
              data?.customerAddress[0]
                ?.toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return true;
            }
          }
        }
        return false;
      })
      .map(({ data }) => {
        return (
          <div
            onClick={() => dispatch(setLoad(data))}
            key={data.id}
            className='bg-white rounded-xl cursor-pointer flex p-1  text-start overflow-hidden h-full font-semibold capitalize mb-2 text-black'
          >
            <div className='mr-1 flex flex-1 '>
              <div className='overflow-hidden items-center justify-center flex'>
                <img
                  effect='blur'
                  src={"/demo1.jpg"}
                  className='h-20 w-20 rounded-xl border-solid border-sky-600 border-2 overflow-hidden'
                />
              </div>
            </div>
            <div className='flex flex-col justify-between my-1 flex-1'>
              <p className='truncate-multiline text-black text-xs'>
                {data.DriverData?.driverAInfo?.Name || "N/A"}
              </p>
              <p className='truncate-multiline text-black text-xs'>
                {data?.load_status || "N/A"}
              </p>
            </div>
            <div className='w-[1px] m-1 bg-black '>&nbsp;</div>
            <div className='flex flex-col justify-between my-1 flex-1'>
              <p className='truncate-multiline text-black text-xs'>
                {data?.customerName[0] || "N/A"}
              </p>
              <p className='truncate-multiline text-black text-xs'>
                Loaded: {data?.load_number || "N/A"}
              </p>
            </div>
            <div className='w-[1px] m-1 bg-black '>&nbsp;</div>
            <div className='flex flex-col justify-between my-1 flex-1'>
              <p className='truncate-multiline text-xs text-slate-500'>
                {data?.PU_time || "N/A"}
              </p>
              <p className='text-xs text-sky-600 max-w-[5rem] truncate-multiline'>
                {data?.customerAddress[0] || "N/A"}
              </p>
            </div>
          </div>
        );
      })
  );
}
