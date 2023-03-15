import React from "react";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import Login from "../screens/authentication/Login";
import ProtectedRoute from "../screens/authentication/ProtectedRoute";
import Dashboard from "../components/dashboard/pages/Dashboard";
import Schedule from "../screens/schedule/Schedule";
import Master from "../screens/master/Master";
import Trucks from "../screens/trucks/Trucks";
import Drivers from "../screens/drivers/Drivers";
import Customer from "../screens/customer/Customer";
import Company from "../screens/company/Company";
import Brokers from "../screens/brokers/Brokers";
import About from "../screens/about/About";
import Trailers from "../screens/trailers/Trailers";
import Chats from "../components/chats/Chats";
import PageNotFound from "../screens/PageNotFound";

import Operation from "../screens/operation/Operation";
import OperationClaims from "../screens/operation/OperationClaims";
import OperationExaminationTickets from "../screens/operation/OperationExaminationTickets";
import OperationDriverRecruitment from "../screens/operation/OperationDriverRecruitment";
import OperationSmsViolationSummary from "../screens/operation/OperationSmsViolationSummary";
import OperationSmsInspections from "../screens/operation/OperationSmsInspections";
import OperationCourtClaims from "../screens/operation/OperationCourtClaims";
import Repairs from "../screens/repairs/Repairs";
import PreventativeMaintenance from "../screens/repairs/PreventativeMaintenance";
import Inventory from "../screens/repairs/Inventory";
import WorkQueueKentYard from "../screens/repairs/WorkQueueKentYard";
import DriversPayroll from "../screens/payrolls/DriversPayroll";
import CompanyPayroll from "../screens/payrolls/CompanyPayroll";
import Payrolls from "../screens/payrolls/Payrolls";
import OperationDriverHiringForm from "../screens/operation/OperationDriverHiringForm";
import OperationCarriers from "../screens/operation/OperationCarriers";
import OperationLossRuns from "../screens/operation/OperationLossRuns";
import OperationAssets from "../screens/operation/OperationAssets";
import OperationInsuranceClaims from "../screens/operation/OperationInsuranceClaims";
import OperationRecordableAccidents from "../screens/operation/OperationRecordableAccidents";
import OperationInsuranceAdjuster from "../screens/operation/OperationInsuranceAdjuster";
import OperationInsuranceCompany from "../screens/operation/OperationInsuranceCompany";
import OperationDriverHiringInstructions from "../screens/operation/OperationDriverHiringInstructions";
import OperationSocialMedia from "../screens/operation/OperationSocialMedia";

import Dispatch from "../screens/dispatch/Dispatch";
import DispatchDrivers from "../screens/dispatch/DispatchDrivers";
import DispatchMaster from "../screens/dispatch/DispatchMaster";
import DispatchTrailers from "../screens/dispatch/DispatchTrailers";
import DispatchTrucks from "../screens/dispatch/DispatchTrucks";

import USPS from "../screens/usps/USPS";
import USPSDispatch from "../screens/usps/USPSDispatch";
import USPSSchedule from "../screens/usps/USPSSchedule";

import Sales from "../screens/sales/Sales";
import SalesBrokers from "../screens/sales/SalesBrokers";
import SalesCurrentShippers from "../screens/sales/SalesCurrentShippers";
import SalesCustomers from "../screens/sales/SalesCustomers";
import SalesTemplate from "../screens/sales/SalesTemplate";
import IFTA from "../screens/IFTA/IFTA";

import Audit from "../screens/audit/Audit";
import AuditCalifornia from "../screens/audit/AuditCalifornia";
import AuditDOT_FMSCA from "../screens/audit/AuditDOT_FMSCA";
import AuditOregon from "../screens/audit/AuditOregon";
import AuditWashington from "../screens/audit/AuditWashington";
import TableScreen from "../screens/Table/TableScreen";

export default function MainRouting() {
  const { userInfo } = useSelector((state) => state.auth);

  const routes = [
    { path: "/:tableId", component: <TableScreen /> },
    { path: "/:baseId/:tableId", component: <TableScreen /> },
    { path: "/dispatch", component: <Dispatch /> },
    { path: "/dispatch/drivers", component: <DispatchDrivers /> },
    { path: "/dispatch/master", component: <DispatchMaster /> },
    { path: "/dispatch/trailers", component: <DispatchTrailers /> },
    { path: "/dispatch/trucks", component: <DispatchTrucks /> },

    { path: "/usps", component: <USPS /> },
    { path: "/usps/dispatch", component: <USPSDispatch /> },
    { path: "/usps/schedule", component: <USPSSchedule /> },

    { path: "/sales", component: <Sales /> },
    { path: "/sales/brokers", component: <SalesBrokers /> },
    { path: "/sales/current-shippers", component: <SalesCurrentShippers /> },
    { path: "/sales/customers", component: <SalesCustomers /> },
    { path: "/sales/sales-template", component: <SalesTemplate /> },

    { path: "/operation", component: <Operation /> },
    { path: "/operation/claims", component: <OperationClaims /> },
    {
      path: "/operation/examination-tickets",
      component: <OperationExaminationTickets />,
    },
    {
      path: "/operation/driver-recruitment",
      component: <OperationDriverRecruitment />,
    },
    {
      path: "/operation/sms-violation-summary",
      component: <OperationSmsViolationSummary />,
    },
    {
      path: "/operation/sms-inspections",
      component: <OperationSmsInspections />,
    },
    { path: "/operation/court-claims", component: <OperationCourtClaims /> },
    {
      path: "/operation/driver-hiring-form",
      component: <OperationDriverHiringForm />,
    },
    { path: "/operation/carriers", component: <OperationCarriers /> },
    { path: "/operation/loss-runs", component: <OperationLossRuns /> },
    { path: "/operation/assets", component: <OperationAssets /> },
    {
      path: "/operation/insurance-claims",
      component: <OperationInsuranceClaims />,
    },
    {
      path: "/operation/recordable-accidents",
      component: <OperationRecordableAccidents />,
    },
    {
      path: "/operation/insurance-adjuster",
      component: <OperationInsuranceAdjuster />,
    },
    {
      path: "/operation/insurance-company",
      component: <OperationInsuranceCompany />,
    },
    {
      path: "/operation/driver-hiring-instruction",
      component: <OperationDriverHiringInstructions />,
    },
    { path: "/operation/social-media", component: <OperationSocialMedia /> },

    { path: "/repairs", component: <Repairs /> },
    {
      path: "/repairs/preventative-maintenance",
      component: <PreventativeMaintenance />,
    },
    { path: "/repairs/work-queue-kent-yard", component: <WorkQueueKentYard /> },
    { path: "/repairs/inventory", component: <Inventory /> },

    { path: "/payrolls", component: <Payrolls /> },
    { path: "/payrolls/drivers-payroll", component: <DriversPayroll /> },
    { path: "/payrolls/company-payroll", component: <CompanyPayroll /> },

    { path: "/audit", component: <Audit /> },
    { path: "/audit/california", component: <AuditCalifornia /> },
    { path: "/audit/fmsca", component: <AuditDOT_FMSCA /> },
    { path: "/audit/oregon", component: <AuditOregon /> },
    { path: "/audit/washington", component: <AuditWashington /> },

    { path: "/chats", component: <Chats /> },
    { path: "/schedule", component: <Schedule /> },
    { path: "/master", component: <Master /> },
    { path: "/trailers", component: <Trailers /> },
    { path: "/trucks", component: <Trucks /> },
    { path: "/drivers", component: <Drivers /> },
    { path: "/customers", component: <Customer /> },
    { path: "/company", component: <Company /> },
    { path: "/brokers", component: <Brokers /> },
    { path: "/about", component: <About /> },
    { path: "/dispatch", component: <About /> },
    { path: "/ifta", component: <IFTA /> },
  ];

  return (
    <Routes>
      <Route path="/" element={userInfo ? <Dashboard /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        {routes.map(({ path, component }, index) => {
          return <Route key={index} path={path} element={component} />;
        })}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
