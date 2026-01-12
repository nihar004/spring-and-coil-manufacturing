"use client";

import React from "react";
import { Zap } from "lucide-react";

// Reusable Input Component
export const InputField = ({
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
export const SelectField = ({ label, value, onChange, options, required }) => (
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
export const Card = ({ children, title, icon: Icon, action }) => (
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
export const SectionHeader = ({ title, subtitle, badge }) => (
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
