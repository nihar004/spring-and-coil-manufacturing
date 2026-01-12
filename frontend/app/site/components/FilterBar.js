"use client";

import React from "react";
import { Filter, X } from "lucide-react";

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
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Date Range */}
        <div className="xl:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            📅 Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateRange.from}
              onChange={(e) => handleDateRangeChange("from", e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="From"
            />
            <input
              type="date"
              value={filters.dateRange.to}
              onChange={(e) => handleDateRangeChange("to", e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="To"
            />
          </div>
        </div>

        {/* Customer */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            👤 Customer
          </label>
          <input
            type="text"
            value={filters.customer}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, customer: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search customer..."
          />
        </div>

        {/* Product/Part No */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            🔧 Product/Part
          </label>
          <input
            type="text"
            value={filters.partNo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, partNo: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Part number..."
          />
        </div>

        {/* Batch/Order Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            📦 Batch/Order
          </label>
          <input
            type="text"
            value={filters.batchNo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, batchNo: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Batch/Order..."
          />
        </div>

        {/* Inspection Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
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
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="passed">✓ Passed</option>
            <option value="failed">✗ Failed</option>
            <option value="pending">⏳ Pending</option>
          </select>
        </div>

        {/* Machine */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            ⚙️ Machine
          </label>
          <input
            type="text"
            value={filters.machineNo}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, machineNo: e.target.value }))
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Machine ID..."
          />
        </div>
      </div>

      {/* Quick Date Presets */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <span className="text-xs font-semibold text-gray-600 mr-2">Quick:</span>
        <button
          onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            handleDateRangeChange("from", today);
            handleDateRangeChange("to", today);
          }}
          className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
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
          className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
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
          className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          This Month
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
