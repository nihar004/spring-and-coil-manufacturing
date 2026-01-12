"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  ClipboardList,
  AlertTriangle,
  XCircle,
  Plus,
  Trash2,
  Activity,
  Zap,
} from "lucide-react";

// Reusable Input Component
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  iotEnabled,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-black mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
      {iotEnabled && (
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          <Zap size={12} className="mr-1" />
          IoT
        </span>
      )}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
        iotEnabled ? "border-green-300 bg-green-50" : "border-gray-300 bg-white"
      }`}
    />
  </div>
);

// Reusable Select Component
const SelectField = ({ label, value, onChange, options, required }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

// Card Container Component
const Card = ({ children, title, icon: Icon, action }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    {title && (
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-blue-600" size={22} />}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, subtitle, badge }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {badge && (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {badge}
        </span>
      )}
    </div>
    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
  </div>
);

// Setup Parameters Component
const SetupParameters = ({ params, onParamChange, title }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {Object.entries(params).map(([key, value]) => (
      <InputField
        key={key}
        label={key.toUpperCase()}
        value={value}
        onChange={(e) => onParamChange(key, e.target.value)}
        placeholder={`Enter ${key}`}
      />
    ))}
  </div>
);

// Observation Block Component
const ObservationBlock = ({ stage, data, onChange, stageLabel }) => (
  <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
      <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
        {stageLabel}
      </h5>
    </div>
    <div className="space-y-3">
      <InputField
        label="Lo (Length)"
        value={data.lo}
        onChange={(e) => onChange(stage, "lo", e.target.value)}
        iotEnabled
      />
      <InputField
        label="OD (Diameter)"
        value={data.od}
        onChange={(e) => onChange(stage, "od", e.target.value)}
        iotEnabled
      />
      <InputField
        label="Nc (Coil Count)"
        value={data.nc}
        onChange={(e) => onChange(stage, "nc", e.target.value)}
        iotEnabled
      />
      <InputField
        label="Ends"
        value={data.ends}
        onChange={(e) => onChange(stage, "ends", e.target.value)}
      />
    </div>
  </div>
);

// Approval Section Component
const ApprovalSection = ({
  operatorName,
  operatorTime,
  supName,
  supTime,
  result,
  onChange,
}) => (
  <Card title="Approval & Verification" icon={CheckCircle}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">1</span>
          </div>
          <span className="font-semibold text-gray-900">Operator</span>
        </div>
        <InputField
          label="Operator Name"
          value={operatorName}
          onChange={(e) => onChange("operatorName", e.target.value)}
          required
        />
        <InputField
          label="Time"
          type="time"
          value={operatorTime}
          onChange={(e) => onChange("operatorTime", e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">2</span>
          </div>
          <span className="font-semibold text-gray-900">Supervisor</span>
        </div>
        <InputField
          label="Supervisor Name"
          value={supName}
          onChange={(e) => onChange("supName", e.target.value)}
          required
        />
        <InputField
          label="Time"
          type="time"
          value={supTime}
          onChange={(e) => onChange("supTime", e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <CheckCircle className="text-purple-600" size={16} />
          </div>
          <span className="font-semibold text-gray-900">Result</span>
        </div>
        <SelectField
          label="Setup Result"
          value={result}
          onChange={(e) => onChange("result", e.target.value)}
          options={[
            { value: "OK", label: "✓ OK - Production Can Start" },
            { value: "NOT OK", label: "✗ NOT OK - Adjustment Needed" },
          ]}
          required
        />
        {result && (
          <div
            className={`p-3 rounded-lg ${
              result === "OK"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                result === "OK" ? "text-green-800" : "text-red-800"
              }`}
            >
              {result === "OK"
                ? "✓ Setup Approved"
                : "✗ Setup Requires Adjustment"}
            </p>
          </div>
        )}
      </div>
    </div>
  </Card>
);

// Main App Component
const ProcessCardSystem = () => {
  const [activeTab, setActiveTab] = useState("setup");

  const [setupData, setSetupData] = useState({
    workCentre: "Coiling",
    machineNo: "",
    date: "",
    shift: "",
    setupCardIssueDate: "",
    setupParams: { helix: "", lo: "", odId: "", nc: "", ends: "" },
    approvedParams: { helix: "", lo: "", odId: "", nc: "", ends: "" },
    operatorName: "",
    operatorTime: "",
    result: "",
    supName: "",
    supTime: "",
  });

  const [productionEntries, setProductionEntries] = useState([
    {
      id: 1,
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
    },
  ]);

  const [verificationData, setVerificationData] = useState({
    machineNo: "",
    partNo: "",
    firstOffEntries: [
      {
        id: 1,
        fl: "",
        odId: "",
        nc: "",
        ends: "",
        helix: "",
        visual: "",
        time: "",
        sign: "",
      },
    ],
    lastOffEntries: [
      {
        id: 1,
        fl: "",
        odId: "",
        nc: "",
        ends: "",
        helix: "",
        visual: "",
        time: "",
        sign: "",
      },
    ],
    abnormality: "",
    retroactiveChecks: [{ id: 1, press: "", temp: "", volt: "" }],
  });

  const [rejectionEntries, setRejectionEntries] = useState([
    {
      id: 1,
      coilNo: "",
      partNo: "",
      jobSetting: "",
      causes: { idOd: "", nc: "", wireBend: "", powerCut: "", wireCutFit: "" },
      totalRej: "",
      remarks: "",
    },
  ]);

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

  const NavTab = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
          : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
      }`}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Coventry Coil-o-Matic (Haryana) Ltd.
              </h1>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <Activity size={16} />
                Process Card Coiling - Digital Management System
              </p>
            </div>
            <div className="text-right text-xs bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <div className="text-gray-500">
                FORMAT NO:{" "}
                <span className="font-semibold text-gray-700">F/PRD/22</span>
              </div>
              <div className="text-gray-500">
                REV. NO: <span className="font-semibold text-gray-700">03</span>
              </div>
              <div className="text-gray-500">
                REV DATE:{" "}
                <span className="font-semibold text-gray-700">04-12-2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          <NavTab id="setup" label="Setup Approval" icon={Settings} />
          <NavTab id="production" label="Production" icon={ClipboardList} />
          <NavTab id="verification" label="Verification" icon={CheckCircle} />
          <NavTab id="rejection" label="Rejection" icon={XCircle} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* SETUP TAB */}
        {activeTab === "setup" && (
          <div className="space-y-6">
            <SectionHeader
              title="Machine Setup & Approval"
              subtitle="Configure machine parameters and get supervisor approval before production"
              badge="Step 1"
            />

            {/* Basic Info */}
            <Card title="Basic Information" icon={Settings}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InputField
                  label="Work Centre"
                  value={setupData.workCentre}
                  onChange={(e) =>
                    handleSetupChange("workCentre", e.target.value)
                  }
                  required
                />
                <InputField
                  label="Machine No."
                  value={setupData.machineNo}
                  onChange={(e) =>
                    handleSetupChange("machineNo", e.target.value)
                  }
                  placeholder="e.g., S-02"
                  required
                />
                <InputField
                  label="Date"
                  type="date"
                  value={setupData.date}
                  onChange={(e) => handleSetupChange("date", e.target.value)}
                  required
                />
                <SelectField
                  label="Shift"
                  value={setupData.shift}
                  onChange={(e) => handleSetupChange("shift", e.target.value)}
                  options={[
                    { value: "A", label: "A - Morning" },
                    { value: "B", label: "B - Evening" },
                    { value: "C", label: "C - Night" },
                  ]}
                  required
                />
              </div>
            </Card>

            {/* Setup Parameters */}
            <Card title="Setup Card Parameters" icon={Activity}>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Setup Card Issue Date:
                    </span>
                    <input
                      type="date"
                      value={setupData.setupCardIssueDate}
                      onChange={(e) =>
                        handleSetupChange("setupCardIssueDate", e.target.value)
                      }
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <SetupParameters
                    params={setupData.setupParams}
                    onParamChange={(key, value) =>
                      handleSetupParamChange("setupParams", key, value)
                    }
                    title="Target Parameters"
                  />
                </div>
              </div>
            </Card>

            {/* Approved Parameters */}
            <Card title="Approved Setup Parameters" icon={CheckCircle}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Supervisor verifies setup and approves
                  these values before production starts
                </p>
              </div>
              <SetupParameters
                params={setupData.approvedParams}
                onParamChange={(key, value) =>
                  handleSetupParamChange("approvedParams", key, value)
                }
                title="Approved Parameters"
              />
            </Card>

            {/* Approval */}
            <ApprovalSection
              operatorName={setupData.operatorName}
              operatorTime={setupData.operatorTime}
              supName={setupData.supName}
              supTime={setupData.supTime}
              result={setupData.result}
              onChange={handleSetupChange}
            />

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Reset Form
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200">
                <Save size={18} />
                Save Setup
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTION TAB */}
        {activeTab === "production" && (
          <div className="space-y-6">
            <SectionHeader
              title="Production Observation"
              subtitle="Record quality checks at Start, Middle, and End of production"
              badge="Step 2"
            />

            {productionEntries.map((entry, index) => (
              <Card
                key={entry.id}
                title={`Production Entry #${index + 1}`}
                icon={ClipboardList}
                action={
                  productionEntries.length > 1 && (
                    <button
                      onClick={() => removeProductionEntry(entry.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  )
                }
              >
                {/* Material Info */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Material Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InputField
                      label="Coil No."
                      value={entry.coilNo}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "coilNo",
                          e.target.value
                        )
                      }
                      required
                    />
                    <InputField
                      label="Customer"
                      value={entry.customer}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "customer",
                          e.target.value
                        )
                      }
                      required
                    />
                    <InputField
                      label="Part No."
                      value={entry.partNo}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "partNo",
                          e.target.value
                        )
                      }
                      required
                    />
                    <InputField
                      label="Wire Grade"
                      value={entry.wireGrade}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "wireGrade",
                          e.target.value
                        )
                      }
                      placeholder="e.g., EN10270"
                    />
                    <InputField
                      label="Wire Dia."
                      value={entry.wireDia}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "wireDia",
                          e.target.value
                        )
                      }
                      placeholder="mm"
                    />
                    <InputField
                      label="UTS / Ra%"
                      value={entry.utsRa}
                      onChange={(e) =>
                        updateProductionEntry(entry.id, "utsRa", e.target.value)
                      }
                    />
                    <InputField
                      label="Heat No."
                      value={entry.heatNo}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "heatNo",
                          e.target.value
                        )
                      }
                    />
                    <InputField
                      label="Coil Wt."
                      value={entry.coilWt}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "coilWt",
                          e.target.value
                        )
                      }
                      placeholder="kg"
                    />
                  </div>
                </div>

                {/* Observations */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Quality Observations
                    </h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      <Zap size={12} className="inline mr-1" />
                      IoT Enabled
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ObservationBlock
                      stage="start"
                      stageLabel="Start"
                      data={entry.observations.start}
                      onChange={(stage, field, value) =>
                        updateObservation(entry.id, stage, field, value)
                      }
                    />
                    <ObservationBlock
                      stage="middle"
                      stageLabel="Middle"
                      data={entry.observations.middle}
                      onChange={(stage, field, value) =>
                        updateObservation(entry.id, stage, field, value)
                      }
                    />
                    <ObservationBlock
                      stage="end"
                      stageLabel="End"
                      data={entry.observations.end}
                      onChange={(stage, field, value) =>
                        updateObservation(entry.id, stage, field, value)
                      }
                    />
                  </div>
                </div>

                {/* Signatures */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Approval Chain
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InputField
                      label="Quantity"
                      value={entry.qty}
                      onChange={(e) =>
                        updateProductionEntry(entry.id, "qty", e.target.value)
                      }
                      placeholder="pcs"
                      iotEnabled
                    />
                    <InputField
                      label="Operator Sign"
                      value={entry.operatorSign}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "operatorSign",
                          e.target.value
                        )
                      }
                    />
                    <InputField
                      label="Supervisor Sign"
                      value={entry.supervisorSign}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "supervisorSign",
                          e.target.value
                        )
                      }
                    />
                    <InputField
                      label="Section Head Sign"
                      value={entry.sectionHeadSign}
                      onChange={(e) =>
                        updateProductionEntry(
                          entry.id,
                          "sectionHeadSign",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-between">
              <button
                onClick={addProductionEntry}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg shadow-green-200"
              >
                <Plus size={18} />
                Add New Entry
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200">
                <Save size={18} />
                Save All Entries
              </button>
            </div>
          </div>
        )}

        {/* VERIFICATION TAB */}
        {activeTab === "verification" && (
          <div className="space-y-6">
            <SectionHeader
              title="First-off / Last-off Verification"
              subtitle="Verify first and last production samples with abnormality tracking"
              badge="Step 3"
            />

            <Card title="Machine & Part Details" icon={Settings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Machine No."
                  value={verificationData.machineNo}
                  onChange={(e) =>
                    setVerificationData((prev) => ({
                      ...prev,
                      machineNo: e.target.value,
                    }))
                  }
                  required
                />
                <InputField
                  label="Part No."
                  value={verificationData.partNo}
                  onChange={(e) =>
                    setVerificationData((prev) => ({
                      ...prev,
                      partNo: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First-off */}
              <Card title="First-off / Running" icon={CheckCircle}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          S.No
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          F/L
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          OD/ID
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          NC
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          <td className="px-3 py-2 font-medium text-gray-700">
                            {idx}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs bg-green-50"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="time"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Last-off */}
              <Card title="Last-off" icon={CheckCircle}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          S.No
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          F/L
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          OD/ID
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          NC
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          <td className="px-3 py-2 font-medium text-gray-700">
                            {idx}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs bg-green-50"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="time"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Abnormality Section */}
            <Card title="Unplanned Abnormality" icon={AlertTriangle}>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-amber-800">
                  <strong>Use this section only when:</strong> Machine jam, wire
                  break, power failure, or sudden parameter drift occurs
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abnormality Description
                </label>
                <textarea
                  value={verificationData.abnormality}
                  onChange={(e) =>
                    setVerificationData((prev) => ({
                      ...prev,
                      abnormality: e.target.value,
                    }))
                  }
                  rows="4"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what abnormality occurred, when it happened, and initial observations..."
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
                  Retroactive Verification
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    <Zap size={12} className="inline mr-1" />
                    IoT Enabled
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  After fixing the problem, verify machine conditions are within
                  acceptable ranges
                </p>

                {verificationData.retroactiveChecks.map((check, idx) => (
                  <div
                    key={check.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                  >
                    <div>
                      <InputField
                        label="PRESS (120-160 kg)"
                        value={check.press}
                        onChange={(e) => {
                          const newChecks = [
                            ...verificationData.retroactiveChecks,
                          ];
                          newChecks[idx].press = e.target.value;
                          setVerificationData((prev) => ({
                            ...prev,
                            retroactiveChecks: newChecks,
                          }));
                        }}
                        placeholder="kg"
                        iotEnabled
                      />
                    </div>
                    <div>
                      <InputField
                        label="TEMP (Below 60°C)"
                        value={check.temp}
                        onChange={(e) => {
                          const newChecks = [
                            ...verificationData.retroactiveChecks,
                          ];
                          newChecks[idx].temp = e.target.value;
                          setVerificationData((prev) => ({
                            ...prev,
                            retroactiveChecks: newChecks,
                          }));
                        }}
                        placeholder="°C"
                        iotEnabled
                      />
                    </div>
                    <div>
                      <InputField
                        label="VOLT (380-440 V)"
                        value={check.volt}
                        onChange={(e) => {
                          const newChecks = [
                            ...verificationData.retroactiveChecks,
                          ];
                          newChecks[idx].volt = e.target.value;
                          setVerificationData((prev) => ({
                            ...prev,
                            retroactiveChecks: newChecks,
                          }));
                        }}
                        placeholder="V"
                        iotEnabled
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setVerificationData((prev) => ({
                      ...prev,
                      retroactiveChecks: [
                        ...prev.retroactiveChecks,
                        { id: Date.now(), press: "", temp: "", volt: "" },
                      ],
                    }))
                  }
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Another Check
                </button>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Reset Form
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200">
                <Save size={18} />
                Save Verification
              </button>
            </div>
          </div>
        )}

        {/* REJECTION TAB */}
        {activeTab === "rejection" && (
          <div className="space-y-6">
            <SectionHeader
              title="Rejection Details"
              subtitle="Document rejected coils with causes and corrective actions"
              badge="Step 4"
            />

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">
                    When to use this section
                  </h4>
                  <p className="text-sm text-red-800">
                    Record all rejected coils including reasons such as
                    dimensional defects, power cuts, wire issues, or other
                    abnormal situations
                  </p>
                </div>
              </div>
            </div>

            {rejectionEntries.map((entry, index) => (
              <Card
                key={entry.id}
                title={`Rejection Entry #${index + 1}`}
                icon={XCircle}
                action={
                  rejectionEntries.length > 1 && (
                    <button
                      onClick={() =>
                        setRejectionEntries((prev) =>
                          prev.filter((e) => e.id !== entry.id)
                        )
                      }
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  )
                }
              >
                {/* Basic Info */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Identification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="CCHL Coil No."
                      value={entry.coilNo}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].coilNo = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      required
                    />
                    <InputField
                      label="Part No."
                      value={entry.partNo}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].partNo = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      required
                    />
                    <SelectField
                      label="Job Setting"
                      value={entry.jobSetting}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].jobSetting = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      options={[
                        { value: "setup", label: "During Setup" },
                        { value: "running", label: "During Running" },
                      ]}
                      required
                    />
                  </div>
                </div>

                {/* Causes of Rejection */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Cause of Rejection (Quantity)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <InputField
                      label="ID/OD"
                      value={entry.causes.idOd}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].causes.idOd = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      placeholder="pcs"
                    />
                    <InputField
                      label="N/C"
                      value={entry.causes.nc}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].causes.nc = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      placeholder="pcs"
                    />
                    <InputField
                      label="Wire Bend"
                      value={entry.causes.wireBend}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].causes.wireBend = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      placeholder="pcs"
                    />
                    <InputField
                      label="Power Cut"
                      value={entry.causes.powerCut}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].causes.powerCut = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      placeholder="pcs"
                      iotEnabled
                    />
                    <InputField
                      label="Wire Cut (FIT)"
                      value={entry.causes.wireCutFit}
                      onChange={(e) => {
                        const newEntries = [...rejectionEntries];
                        newEntries[index].causes.wireCutFit = e.target.value;
                        setRejectionEntries(newEntries);
                      }}
                      placeholder="pcs"
                    />
                  </div>
                </div>

                {/* Total & Remarks */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <InputField
                        label="Total Rejection"
                        value={entry.totalRej}
                        onChange={(e) => {
                          const newEntries = [...rejectionEntries];
                          newEntries[index].totalRej = e.target.value;
                          setRejectionEntries(newEntries);
                        }}
                        placeholder="Total pcs rejected"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Remarks <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={entry.remarks}
                        onChange={(e) => {
                          const newEntries = [...rejectionEntries];
                          newEntries[index].remarks = e.target.value;
                          setRejectionEntries(newEntries);
                        }}
                        rows="3"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the rejection reason, corrective action taken, and any relevant observations..."
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Unplanned Changes / Abnormal Situations Include:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                <li>Tool / Jig / Fixture breakage</li>
                <li>Power failure during production</li>
                <li>Operator sickness / emergency</li>
                <li>Machine breakdown or malfunction</li>
                <li>Sudden change in environment or climate</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={addRejectionEntry}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-lg shadow-orange-200"
              >
                <Plus size={18} />
                Add Rejection Entry
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Reset Form
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200">
                  <Save size={18} />
                  Save Rejections
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessCardSystem;
