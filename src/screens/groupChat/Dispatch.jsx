import React from "react";
import { useSelector } from "react-redux";

export default function Dispatch() {
  const load = useSelector((state) => state.load.load);
  const dispatchData = {
    dispatchDetails: [
      `Dispatch # : ${load?.dispatch || "N/A"}`,
      `Load Number : ${load?.load_number || "N/A"}`,
      `Load Type : ${load?.Load_type || "N/A"}`,
      `Carrier : ${load?.carrier_name || "N/A"}`,
      `Status : ${load?.load_status || "N/A"}`,
      `ETA : ${load?.DEL_time || "N/A"}`,
      `Dispatch Notes : ${load?.truckNotes || "N/A"}`,
      `Last updated by : ${load?.dispatch || "N/A"}`,
      `Truck : ${load?.truck_name || "N/A"}`,
      `Driver A : ${load?.DriverData?.driverAInfo?.Name || "N/A"}`,
      `Driver B : ${load?.DriverData?.driverBInfo?.Name || "N/A"}`,
      `Trailer : ${load?.dispatch || "N/A"}`,
      `Driver Notes : ${load?.Driver_notes || "N/A"}`,
      `Last updated by : ${load?.dispatch || "N/A"}`,
      `Trailer Notes : ${load?.dispatch || "N/A"}`,
      `Next Load : ${load?.dispatch || "N/A"}`,
    ],
    RCDetails: [
      `Load Number : ${load?.load_number || "N/A"}`,
      `Customer : ${load?.customerName || "N/A"}`,
      `Customer Email : ${load?.customerEmail || "N/A"}`,
      `Customer Details : ${load?.dispatch || "N/A"}`,
      `Customer Phone : ${load?.dispatch || "N/A"}`,
      `Commodity : ${load?.dispatch || "N/A"}`,
      `Seal : ${load?.dispatch || "N/A"}`,
      `Weight : ${load?.dispatch || "N/A"}`,
      `Distance : ${load?.dispatch || "N/A"}`,
      `Booked By : ${load?.dispatch || "N/A"}`,
      `RC Confirmed By : ${load?.dispatch || "N/A"}`,
      `Trailer Required : ${load?.dispatch || "N/A"}`,
      `PU Date : ${load?.dispatch || "N/A"}`,
      `DEL Date : ${load?.dispatch || "N/A"}`,
      `Rate : ${load?.dispatch || "N/A"}`,
    ],
    ShipperDetails: [
      `Shipper : ${load.dispatch || "N/A"}`,
      `Address : ${load.dispatch || "N/A"}`,
      `Phone : ${load.dispatch || "N/A"}`,
      `PU Number : ${load.dispatch || "N/A"}`,
      `PU Date : ${load.dispatch || "N/A"}`,
      `PU Type : ${load.dispatch || "N/A"}`,
      `PU Time : ${load.dispatch || "N/A"}`,
    ],
    ReceiverDetails: [
      `Receiver : ${load?.dispatch || "N/A"}`,
      `Address : ${load?.receiver_address || "N/A"}`,
      `Phone : ${load?.dispatch || "N/A"}`,
      `DEL Date : ${load?.dispatch || "N/A"}`,
      `DEL Time : ${load?.dispatch || "N/A"}`,
      `Delivery Number : ${load?.dispatch || "N/A"}`,
      `Drop Type : ${load?.receiverType || "N/A"}`,
    ],
  };

  return (
    <div className=" h-full w-full overflow-y-scroll ">
      <div className="block">
        <div>
          <h1 className="bg-black  pl-8 px-4 py-3 rounded-r-2xl font-semibold text-xl inline-block mb-4 mt-1 text-white">
            Dispatch# : {load?.dispatch}
          </h1>
        </div>
        <div>
          <h2 className="bg-black text-white inline pl-8 py-1 px-2 rounded-r-full font-semibold text-xl">
            Dispatch Details:
          </h2>
        </div>
      </div>
      <div className="flex bg-slate-50 mx-8 p-4 my-3 rounded-lg">
        <div>
          {dispatchData.dispatchDetails.map((element, index) => {
            return (
              <div className="" key={index}>
                {element}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="bg-black text-white inline pl-8 py-1 px-2 rounded-r-full font-semibold text-xl">
          RC Details:
        </h2>
      </div>
      <div className="flex bg-slate-50 mx-8 p-4 my-3 rounded-lg">
        <div>
          {dispatchData.RCDetails.map((element, index) => {
            return (
              <div className="" key={index}>
                {element}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="bg-black text-white inline pl-8 py-1 px-2 rounded-r-full font-semibold text-xl">
          Shipper Details:
        </h2>
      </div>
      <div className="flex bg-slate-50 mx-8 p-4 my-3 rounded-lg">
        <div>
          {dispatchData.ShipperDetails.map((element, index) => {
            return (
              <div className="" key={index}>
                {element}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="bg-black text-white inline pl-8 py-1 px-2 rounded-r-full font-semibold text-xl">
          Receiver Details:
        </h2>
      </div>
      <div className="flex bg-slate-50 mx-8 p-4 my-3 rounded-lg">
        <div>
          {dispatchData.ReceiverDetails.map((element, index) => {
            return (
              <div className="" key={index}>
                {element}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
