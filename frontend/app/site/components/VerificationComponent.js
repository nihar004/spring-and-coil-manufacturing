"use client";

import React from "react";
import {
  Save,
  Settings,
  CheckCircle,
  AlertTriangle,
  Plus,
  Zap,
} from "lucide-react";
import { InputField, Card, SectionHeader } from "./SharedComponents";

// Main Verification Component
const VerificationComponent = ({ verificationData, setVerificationData }) => {
  return (
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
                        className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
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
                        className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
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
                    const newChecks = [...verificationData.retroactiveChecks];
                    newChecks[idx].press = e.target.value;
                    setVerificationData((prev) => ({
                      ...prev,
                      retroactiveChecks: newChecks,
                    }));
                  }}
                  placeholder="kg"
                />
              </div>
              <div>
                <InputField
                  label="TEMP (Below 60°C)"
                  value={check.temp}
                  onChange={(e) => {
                    const newChecks = [...verificationData.retroactiveChecks];
                    newChecks[idx].temp = e.target.value;
                    setVerificationData((prev) => ({
                      ...prev,
                      retroactiveChecks: newChecks,
                    }));
                  }}
                  placeholder="°C"
                />
              </div>
              <div>
                <InputField
                  label="VOLT (380-440 V)"
                  value={check.volt}
                  onChange={(e) => {
                    const newChecks = [...verificationData.retroactiveChecks];
                    newChecks[idx].volt = e.target.value;
                    setVerificationData((prev) => ({
                      ...prev,
                      retroactiveChecks: newChecks,
                    }));
                  }}
                  placeholder="V"
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
  );
};

export default VerificationComponent;
