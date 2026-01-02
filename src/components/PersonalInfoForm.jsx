import React from 'react'
import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react'

export default function PersonalInfoForm({
  data = {},
  onChange,
  removeBackground,
  setRemoveBackground,
}) {

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone", icon: Phone, type: "text", required: false },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: false },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", required: false },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "text", required: false },
    { key: "website", label: "Website", icon: Globe, type: "url", required: false },
  ]

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-500">
        Get started with your personal information
      </p>

      {/* Profile Image */}
      <div className="flex items-center gap-4 mt-4">
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 cursor-pointer"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            className="hidden"
            onChange={(e) =>
              handleChange("image", e.target.files?.[0])
            }
          />
        </label>

        {/* Remove background toggle */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-gray-600">Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() =>
                  setRemoveBackground((prev) => !prev)
                }
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-300" />
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4" />
            </label>
          </div>
        )}
      </div>

      {/* Input Fields */}
      {fields.map((field) => {
        const Icon = field.icon
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) =>
                handleChange(field.key, e.target.value)
              }
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />
          </div>
        )
      })}
    </div>
  )
}
