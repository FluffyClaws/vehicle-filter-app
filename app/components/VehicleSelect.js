export default function VehicleSelect({ label, options, value, onChange }) {
  return (
    <div className="mb-6 w-full max-w-md">
      <label className="block text-gray-700 text-lg font-semibold mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      >
        <option value="" className="text-gray-500">
          Select {label}
        </option>
        {options.map((option) =>
          typeof option === "object" ? (
            <option key={option.MakeId} value={option.MakeId}>
              {option.MakeName}
            </option>
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}
