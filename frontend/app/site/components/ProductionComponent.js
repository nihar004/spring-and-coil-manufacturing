"use client";

import React from "react";
import { Plus, Trash2, Save, ClipboardList, Zap } from "lucide-react";
import { InputField, Card, SectionHeader } from "./SharedComponents";

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
      />
      <InputField
        label="OD (Diameter)"
        value={data.od}
        onChange={(e) => onChange(stage, "od", e.target.value)}
      />
      <InputField
        label="Nc (Coil Count)"
        value={data.nc}
        onChange={(e) => onChange(stage, "nc", e.target.value)}
      />
      <InputField
        label="Ends"
        value={data.ends}
        onChange={(e) => onChange(stage, "ends", e.target.value)}
      />
    </div>
  </div>
);

// Main Production Component
const ProductionComponent = ({
  productionEntries,
  addProductionEntry,
  removeProductionEntry,
  updateProductionEntry,
  updateObservation,
}) => {
  return (
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
                  updateProductionEntry(entry.id, "coilNo", e.target.value)
                }
                required
              />
              <InputField
                label="Customer"
                value={entry.customer}
                onChange={(e) =>
                  updateProductionEntry(entry.id, "customer", e.target.value)
                }
                required
              />
              <InputField
                label="Part No."
                value={entry.partNo}
                onChange={(e) =>
                  updateProductionEntry(entry.id, "partNo", e.target.value)
                }
                required
              />
              <InputField
                label="Wire Grade"
                value={entry.wireGrade}
                onChange={(e) =>
                  updateProductionEntry(entry.id, "wireGrade", e.target.value)
                }
                placeholder="e.g., EN10270"
              />
              <InputField
                label="Wire Dia."
                value={entry.wireDia}
                onChange={(e) =>
                  updateProductionEntry(entry.id, "wireDia", e.target.value)
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
                  updateProductionEntry(entry.id, "heatNo", e.target.value)
                }
              />
              <InputField
                label="Coil Wt."
                value={entry.coilWt}
                onChange={(e) =>
                  updateProductionEntry(entry.id, "coilWt", e.target.value)
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
  );
};

export default ProductionComponent;
