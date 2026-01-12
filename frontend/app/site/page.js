"use client";

import React, { useState } from "react";
import {
  Settings,
  ClipboardList,
  CheckCircle,
  XCircle,
  Activity,
  Filter,
  X,
  AlertTriangle,
  Zap,
  Menu,
  ChevronLeft,
} from "lucide-react";
import {
  dummySetupData,
  dummyProductionEntries,
  dummyVerificationData,
  dummyRejectionEntries,
} from "./data/dummyData";

// Shared Components (inline for completeness)
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({ title, icon: Icon, children, action }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all p-6 mb-6">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-gray-700" size={26} />}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, badge }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
        {badge}
      </span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);

// FilterBar Component
const FilterBar = ({ filters, setFilters, onReset }) => {
  const handleDateRangeChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value },
    }));
  };

  const activeFilterCount = Object.values(filters).filter((val) => {
    if (typeof val === "object" && val !== null) {
      return Object.values(val).some((v) => v !== "");
    }
    return val !== "";
  }).length;

  return (
    <div className="space-y-5">
      {/* Active Filters Badge */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg border border-gray-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white text-xs font-bold rounded-full shadow-md">
              {activeFilterCount}
            </span>
            <span className="text-sm font-medium text-gray-700">
              Active filters
            </span>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={14} />
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Date Range */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          📅 Date Range
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => handleDateRangeChange("from", e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
            placeholder="From"
          />
          <input
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => handleDateRangeChange("to", e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
            placeholder="To"
          />
        </div>
      </div>

      {/* Customer */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          👤 Customer
        </label>
        <input
          type="text"
          value={filters.customer}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, customer: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
          placeholder="Search customer..."
        />
      </div>

      {/* Product/Part No */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          🔧 Product/Part
        </label>
        <input
          type="text"
          value={filters.partNo}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, partNo: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
          placeholder="Part number..."
        />
      </div>

      {/* Batch/Order Number */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          📦 Batch/Order
        </label>
        <input
          type="text"
          value={filters.batchNo}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, batchNo: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
          placeholder="Batch/Order..."
        />
      </div>

      {/* Inspection Status */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          ✓ Status
        </label>
        <select
          value={filters.inspectionStatus}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              inspectionStatus: e.target.value,
            }))
          }
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
        >
          <option value="">All Status</option>
          <option value="passed">✓ Passed</option>
          <option value="failed">✗ Failed</option>
          <option value="pending">⏳ Pending</option>
        </select>
      </div>

      {/* Machine */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          ⚙️ Machine
        </label>
        <input
          type="text"
          value={filters.machineNo}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, machineNo: e.target.value }))
          }
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 transition-all"
          placeholder="Machine number..."
        />
      </div>

      {/* Quick Date Presets */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <span className="text-xs font-bold text-gray-700 w-full">
          Quick Presets:
        </span>
        <button
          onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            handleDateRangeChange("from", today);
            handleDateRangeChange("to", today);
          }}
          className="flex-1 min-w-[80px] px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => {
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            handleDateRangeChange("from", lastWeek.toISOString().split("T")[0]);
            handleDateRangeChange("to", today.toISOString().split("T")[0]);
          }}
          className="flex-1 min-w-[80px] px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => {
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            handleDateRangeChange("from", firstDay.toISOString().split("T")[0]);
            handleDateRangeChange("to", today.toISOString().split("T")[0]);
          }}
          className="flex-1 min-w-[80px] px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          This Month
        </button>
      </div>
    </div>
  );
};

// NavTab Component
const NavTab = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap text-sm ${
      activeTab === id
        ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

// Placeholder components (import your actual components)
const SetupApprovalComponent = ({
  setupData,
  handleSetupChange,
  handleSetupParamChange,
}) => (
  <div className="space-y-6">
    <Card title="Setup Information" icon={Settings}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          label="Work Centre"
          value={setupData.workCentre}
          onChange={(e) => handleSetupChange("workCentre", e.target.value)}
          placeholder="e.g., Coiling"
        />
        <InputField
          label="Machine No"
          value={setupData.machineNo}
          onChange={(e) => handleSetupChange("machineNo", e.target.value)}
          placeholder="e.g., CL-001"
        />
        <InputField
          label="Date"
          type="date"
          value={setupData.date}
          onChange={(e) => handleSetupChange("date", e.target.value)}
        />
        <InputField
          label="Shift"
          value={setupData.shift}
          onChange={(e) => handleSetupChange("shift", e.target.value)}
          placeholder="e.g., Morning (A)"
        />
        <InputField
          label="Setup Card Issue Date"
          type="date"
          value={setupData.setupCardIssueDate}
          onChange={(e) =>
            handleSetupChange("setupCardIssueDate", e.target.value)
          }
        />
      </div>
    </Card>

    <Card title="Setup Parameters">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <InputField
          label="Helix"
          value={setupData.setupParams.helix}
          onChange={(e) =>
            handleSetupParamChange("setupParams", "helix", e.target.value)
          }
          placeholder="Helix value"
        />
        <InputField
          label="L.O"
          value={setupData.setupParams.lo}
          onChange={(e) =>
            handleSetupParamChange("setupParams", "lo", e.target.value)
          }
          placeholder="Length"
        />
        <InputField
          label="OD/ID"
          value={setupData.setupParams.odId}
          onChange={(e) =>
            handleSetupParamChange("setupParams", "odId", e.target.value)
          }
          placeholder="OD/ID"
        />
        <InputField
          label="N.C"
          value={setupData.setupParams.nc}
          onChange={(e) =>
            handleSetupParamChange("setupParams", "nc", e.target.value)
          }
          placeholder="No. of Coils"
        />
        <InputField
          label="Ends"
          value={setupData.setupParams.ends}
          onChange={(e) =>
            handleSetupParamChange("setupParams", "ends", e.target.value)
          }
          placeholder="Ends"
        />
      </div>
    </Card>

    <Card title="Approved Parameters">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <InputField
          label="Helix"
          value={setupData.approvedParams.helix}
          onChange={(e) =>
            handleSetupParamChange("approvedParams", "helix", e.target.value)
          }
          placeholder="Helix value"
        />
        <InputField
          label="L.O"
          value={setupData.approvedParams.lo}
          onChange={(e) =>
            handleSetupParamChange("approvedParams", "lo", e.target.value)
          }
          placeholder="Length"
        />
        <InputField
          label="OD/ID"
          value={setupData.approvedParams.odId}
          onChange={(e) =>
            handleSetupParamChange("approvedParams", "odId", e.target.value)
          }
          placeholder="OD/ID"
        />
        <InputField
          label="N.C"
          value={setupData.approvedParams.nc}
          onChange={(e) =>
            handleSetupParamChange("approvedParams", "nc", e.target.value)
          }
          placeholder="No. of Coils"
        />
        <InputField
          label="Ends"
          value={setupData.approvedParams.ends}
          onChange={(e) =>
            handleSetupParamChange("approvedParams", "ends", e.target.value)
          }
          placeholder="Ends"
        />
      </div>
    </Card>

    <Card title="Approval">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Operator Name"
          value={setupData.operatorName}
          onChange={(e) => handleSetupChange("operatorName", e.target.value)}
          placeholder="Operator name"
        />
        <InputField
          label="Operator Time"
          type="time"
          value={setupData.operatorTime}
          onChange={(e) => handleSetupChange("operatorTime", e.target.value)}
        />
        <InputField
          label="Supervisor Name"
          value={setupData.supName}
          onChange={(e) => handleSetupChange("supName", e.target.value)}
          placeholder="Supervisor name"
        />
        <InputField
          label="Supervisor Time"
          type="time"
          value={setupData.supTime}
          onChange={(e) => handleSetupChange("supTime", e.target.value)}
        />
        <SelectField
          label="Result"
          value={setupData.result}
          onChange={(e) => handleSetupChange("result", e.target.value)}
          options={[
            { value: "Approved", label: "Approved" },
            { value: "Rejected", label: "Rejected" },
            { value: "Pending", label: "Pending" },
          ]}
        />
      </div>
    </Card>
  </div>
);

const ProductionComponent = ({
  productionEntries,
  addProductionEntry,
  removeProductionEntry,
  updateProductionEntry,
  updateObservation,
}) => (
  <div className="space-y-6">
    {productionEntries.length > 0 ? (
      productionEntries.map((entry, idx) => (
        <Card
          key={entry.id}
          title={`Production Entry #${idx + 1} - ${
            entry.coilNo || "New Entry"
          }`}
          icon={ClipboardList}
          action={
            <button
              onClick={() => removeProductionEntry(entry.id)}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Delete
            </button>
          }
        >
          {/* Basic Info */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase">
              Material Info
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Coil No
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.coilNo || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Customer
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.customer || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Part No
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.partNo || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Wire Grade
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.wireGrade || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Wire Dia
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.wireDia || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  UTS/Ra
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.utsRa || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Heat No
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.heatNo || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Weight (kg)
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.coilWt || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Observations - 3 Stages */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase">
              Quality Observations (3 Stages)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["start", "middle", "end"].map((stage) => (
                <div
                  key={stage}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                >
                  <h5 className="font-semibold text-gray-800 mb-3 capitalize">
                    {stage} Stage
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        L.O (Length)
                      </p>
                      <p className="text-gray-900 font-medium">
                        {entry.observations[stage]?.lo || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        OD (Diameter)
                      </p>
                      <p className="text-gray-900 font-medium">
                        {entry.observations[stage]?.od || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        N.C (Coils)
                      </p>
                      <p className="text-gray-900 font-medium">
                        {entry.observations[stage]?.nc || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Ends
                      </p>
                      <p className="text-gray-900 font-medium">
                        {entry.observations[stage]?.ends || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approvals */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase">
              Approval Chain
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Quantity
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.qty || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Operator Sign
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.operatorSign || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Supervisor Sign
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.supervisorSign || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Section Head Sign
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {entry.sectionHeadSign || "-"}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  entry.inspectionStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : entry.inspectionStatus === "passed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                Status: {entry.inspectionStatus || "pending"}
              </span>
            </div>
          </div>
        </Card>
      ))
    ) : (
      <Card title="Production Records" icon={ClipboardList}>
        <div className="py-8 text-center text-gray-500">
          No production entries found. Click "Add Entry" to create one.
        </div>
      </Card>
    )}

    <button
      onClick={addProductionEntry}
      className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
    >
      + Add Entry
    </button>
  </div>
);

const VerificationComponent = ({ verificationData }) => (
  <div className="space-y-6">
    <Card title="Machine Verification Details" icon={CheckCircle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-1">MACHINE NO</p>
          <p className="text-lg font-semibold text-gray-900">
            {verificationData.machineNo}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-1">PART NO</p>
          <p className="text-lg font-semibold text-gray-900">
            {verificationData.partNo}
          </p>
        </div>
      </div>
    </Card>

    <Card title="First Off Inspection" icon={CheckCircle}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                FL
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                OD/ID
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                NC
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Ends
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Helix
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Visual
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Time
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Sign
              </th>
            </tr>
          </thead>
          <tbody>
            {verificationData.firstOffEntries?.length > 0 ? (
              verificationData.firstOffEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{entry.fl || "-"}</td>
                  <td className="px-4 py-2">{entry.odId || "-"}</td>
                  <td className="px-4 py-2">{entry.nc || "-"}</td>
                  <td className="px-4 py-2">{entry.ends || "-"}</td>
                  <td className="px-4 py-2">{entry.helix || "-"}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                      {entry.visual || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{entry.time || "-"}</td>
                  <td className="px-4 py-2 font-semibold">
                    {entry.sign || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>

    <Card title="Last Off Inspection" icon={CheckCircle}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                FL
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                OD/ID
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                NC
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Ends
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Helix
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Visual
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Time
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Sign
              </th>
            </tr>
          </thead>
          <tbody>
            {verificationData.lastOffEntries?.length > 0 ? (
              verificationData.lastOffEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{entry.fl || "-"}</td>
                  <td className="px-4 py-2">{entry.odId || "-"}</td>
                  <td className="px-4 py-2">{entry.nc || "-"}</td>
                  <td className="px-4 py-2">{entry.ends || "-"}</td>
                  <td className="px-4 py-2">{entry.helix || "-"}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                      {entry.visual || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{entry.time || "-"}</td>
                  <td className="px-4 py-2 font-semibold">
                    {entry.sign || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>

    <Card title="Retroactive Checks" icon={Zap}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Check #
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Pressure (Bar)
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Temperature
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Voltage
              </th>
            </tr>
          </thead>
          <tbody>
            {verificationData.retroactiveChecks?.length > 0 ? (
              verificationData.retroactiveChecks.map((check, idx) => (
                <tr
                  key={check.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    #{idx + 1}
                  </td>
                  <td className="px-4 py-2">{check.press || "-"}</td>
                  <td className="px-4 py-2">{check.temp || "-"}</td>
                  <td className="px-4 py-2">{check.volt || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No checks recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>

    <Card title="Abnormality Details" icon={AlertTriangle}>
      {verificationData.abnormality ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Abnormality Description:</strong>
          </p>
          <p className="text-gray-700 mt-2">{verificationData.abnormality}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No abnormalities reported</p>
      )}
    </Card>
  </div>
);

const RejectionComponent = ({
  rejectionEntries,
  addRejectionEntry,
  setRejectionEntries,
}) => (
  <div>
    <Card
      title="Rejection Records"
      icon={XCircle}
      action={
        <button
          onClick={addRejectionEntry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + Add Rejection
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Coil No
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Part No
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Machine
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                ID/OD
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                NC
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Wire Bend
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Power Cut
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Total Rej
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {rejectionEntries.length > 0 ? (
              rejectionEntries
                .filter((entry) => entry.coilNo && entry.coilNo.trim() !== "")
                .map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-200 hover:bg-red-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {entry.coilNo}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{entry.partNo}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {entry.jobSetting}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        {entry.causes?.idOd || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        {entry.causes?.nc || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        {entry.causes?.wireBend || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        {entry.causes?.powerCut || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-red-600">
                      {entry.totalRej}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs">
                      {entry.remarks}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                  No rejection entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// Main App Component
const ProcessCardSystem = () => {
  const [activeTab, setActiveTab] = useState("production");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const [filters, setFilters] = useState({
    dateRange: { from: "", to: "" },
    customer: "",
    partNo: "",
    batchNo: "",
    inspectionStatus: "",
    machineNo: "",
  });

  const [setupData, setSetupData] = useState(dummySetupData);

  const [productionEntries, setProductionEntries] = useState(
    dummyProductionEntries
  );

  const [verificationData, setVerificationData] = useState(
    dummyVerificationData
  );

  const [rejectionEntries, setRejectionEntries] = useState(
    dummyRejectionEntries
  );

  const handleSetupChange = (field, value) => {
    setSetupData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetupParamChange = (type, key, value) => {
    setSetupData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [key]: value },
    }));
  };

  const addProductionEntry = () => {
    setProductionEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        coilNo: "",
        customer: "",
        partNo: "",
        wireGrade: "",
        wireDia: "",
        utsRa: "",
        heatNo: "",
        coilWt: "",
        observations: {
          start: { lo: "", od: "", nc: "", ends: "" },
          middle: { lo: "", od: "", nc: "", ends: "" },
          end: { lo: "", od: "", nc: "", ends: "" },
        },
        qty: "",
        operatorSign: "",
        supervisorSign: "",
        sectionHeadSign: "",
        inspectionStatus: "pending",
      },
    ]);
  };

  const removeProductionEntry = (id) => {
    setProductionEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const updateProductionEntry = (id, field, value) => {
    setProductionEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const updateObservation = (id, stage, field, value) => {
    setProductionEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              observations: {
                ...entry.observations,
                [stage]: { ...entry.observations[stage], [field]: value },
              },
            }
          : entry
      )
    );
  };

  const addRejectionEntry = () => {
    setRejectionEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        coilNo: "",
        partNo: "",
        jobSetting: "",
        causes: {
          idOd: "",
          nc: "",
          wireBend: "",
          powerCut: "",
          wireCutFit: "",
        },
        totalRej: "",
        remarks: "",
      },
    ]);
  };

  const resetFilters = () => {
    setFilters({
      dateRange: { from: "", to: "" },
      customer: "",
      partNo: "",
      batchNo: "",
      inspectionStatus: "",
      machineNo: "",
    });
  };

  const getFilteredProductionEntries = () => {
    return productionEntries.filter((entry) => {
      // Date filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const entryDate = setupData.date;
        if (filters.dateRange.from && entryDate < filters.dateRange.from)
          return false;
        if (filters.dateRange.to && entryDate > filters.dateRange.to)
          return false;
      }

      // Customer filter
      if (
        filters.customer &&
        !entry.customer.toLowerCase().includes(filters.customer.toLowerCase())
      ) {
        return false;
      }

      // Part number filter
      if (
        filters.partNo &&
        !entry.partNo.toLowerCase().includes(filters.partNo.toLowerCase())
      ) {
        return false;
      }

      // Batch/Coil number filter
      if (
        filters.batchNo &&
        !entry.coilNo.toLowerCase().includes(filters.batchNo.toLowerCase())
      ) {
        return false;
      }

      // Machine filter
      if (
        filters.machineNo &&
        !setupData.machineNo
          .toLowerCase()
          .includes(filters.machineNo.toLowerCase())
      ) {
        return false;
      }

      // Inspection status filter
      if (
        filters.inspectionStatus &&
        entry.inspectionStatus !== filters.inspectionStatus
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-xl sticky top-0 z-40 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 hover:bg-gray-700 hover:text-white rounded-lg transition-all text-white hover:scale-110"
                title={sidebarOpen ? "Hide filters" : "Show filters"}
              >
                {sidebarOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Coventry Coil-o-Matic (Haryana) Ltd.
                </h1>
                <p className="text-xs text-gray-300 mt-0.5 flex items-center gap-1.5">
                  <Activity size={14} />
                  Process Card Coiling - Digital Management System
                </p>
              </div>
            </div>
            <div className="text-right text-xs bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
              <div className="text-white">
                <span className="text-white font-bold">
                  FORMAT NO: F/PRD/22
                </span>
              </div>
              <div className="text-white mt-1">
                <span className="text-white font-bold">
                  REV DATE: 04-12-2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-72px)]">
        {/* Sidebar with Filters */}
        <div
          className={`transition-all duration-300 overflow-y-auto bg-white border-r border-gray-200 shadow-lg ${
            sidebarOpen ? "w-96" : "w-0"
          }`}
        >
          {sidebarOpen && (
            <div className="p-6 space-y-4">
              {/* Filters Header with Expand/Collapse */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg shadow-lg">
                    <Filter size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <p className="text-xs text-gray-600">Refine your search</p>
                  </div>
                </div>
                <button
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 font-bold text-xl"
                >
                  {filtersExpanded ? "−" : "+"}
                </button>
              </div>

              {/* FilterBar in Sidebar with expand/collapse */}
              {filtersExpanded && (
                <FilterBar
                  filters={filters}
                  setFilters={setFilters}
                  onReset={resetFilters}
                />
              )}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-8">
              <div className="flex gap-2 overflow-x-auto">
                <NavTab
                  id="setup"
                  label="Setup Approval"
                  icon={Settings}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <NavTab
                  id="production"
                  label="Production"
                  icon={ClipboardList}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <NavTab
                  id="verification"
                  label="Verification"
                  icon={CheckCircle}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <NavTab
                  id="rejection"
                  label="Rejection"
                  icon={XCircle}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>

            {/* Results Count */}
            {activeTab === "production" && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  Showing{" "}
                  <span className="font-bold text-gray-900">
                    {getFilteredProductionEntries().length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-900">
                    {productionEntries.length}
                  </span>{" "}
                  entries
                </p>
              </div>
            )}

            {/* Content Area */}
            {activeTab === "setup" && (
              <SetupApprovalComponent
                setupData={setupData}
                handleSetupChange={handleSetupChange}
                handleSetupParamChange={handleSetupParamChange}
              />
            )}

            {activeTab === "production" && (
              <ProductionComponent
                productionEntries={getFilteredProductionEntries()}
                addProductionEntry={addProductionEntry}
                removeProductionEntry={removeProductionEntry}
                updateProductionEntry={updateProductionEntry}
                updateObservation={updateObservation}
              />
            )}

            {activeTab === "verification" && (
              <VerificationComponent
                verificationData={verificationData}
                setVerificationData={setVerificationData}
              />
            )}

            {activeTab === "rejection" && (
              <RejectionComponent
                rejectionEntries={rejectionEntries}
                setRejectionEntries={setRejectionEntries}
                addRejectionEntry={addRejectionEntry}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCardSystem;
