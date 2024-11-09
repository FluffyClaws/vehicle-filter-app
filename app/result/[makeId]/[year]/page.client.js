"use client";

import { useState, useEffect, Suspense } from "react";

async function fetchVehicleModels(makeId, year) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VEHICLE_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();
  return data.Results || [];
}

export default function ResultPageClient({ makeId, year, makeName }) {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const models = await fetchVehicleModels(makeId, year);
        setVehicleModels(models);
      } catch (err) {
        setError("Failed to fetch vehicle models.");
      }
    };

    loadData();
  }, [makeId, year]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  if (vehicleModels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl text-gray-700">Loading vehicle models...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Available Vehicle Models for {year} - {makeName}
        </h2>

        {vehicleModels.length > 0 ? (
          <ul className="space-y-4">
            {vehicleModels.map((model, index) => (
              <li
                key={`${model.Model_ID}-${index}`}
                className="text-lg text-gray-700 border-b pb-2"
              >
                {model.Model_Name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">
            No vehicle models found for this make and year.
          </p>
        )}
      </div>
    </div>
  );
}

export function ResultPageWithSuspense({ makeId, year, makeName }) {
  return (
    <Suspense fallback={<p className="text-2xl text-gray-700">Loading...</p>}>
      <ResultPageClient makeId={makeId} year={year} makeName={makeName} />
    </Suspense>
  );
}
