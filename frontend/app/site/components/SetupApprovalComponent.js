"use client";

import React from "react";
import { Save, Settings, CheckCircle, Activity } from "lucide-react";
import {
  InputField,
  SelectField,
  Card,
  SectionHeader,
} from "./SharedComponents";

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

// Main Setup Approval Component
const SetupApprovalComponent = ({
  setupData,
  handleSetupChange,
  handleSetupParamChange,
}) => {
  return (
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
            onChange={(e) => handleSetupChange("workCentre", e.target.value)}
            required
          />
          <InputField
            label="Machine No."
            value={setupData.machineNo}
            onChange={(e) => handleSetupChange("machineNo", e.target.value)}
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
            <strong>Note:</strong> Supervisor verifies setup and approves these
            values before production starts
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
  );
};

export default SetupApprovalComponent;
