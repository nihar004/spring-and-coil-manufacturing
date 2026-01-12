"use client";

import React from "react";
import { Save, AlertCircle, Plus, Trash2, XCircle } from "lucide-react";
import {
  InputField,
  SelectField,
  Card,
  SectionHeader,
} from "./SharedComponents";

// Main Rejection Component
const RejectionComponent = ({
  rejectionEntries,
  setRejectionEntries,
  addRejectionEntry,
}) => {
  return (
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
              Record all rejected coils including reasons such as dimensional
              defects, power cuts, wire issues, or other abnormal situations
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
  );
};

export default RejectionComponent;
