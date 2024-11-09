"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import VehicleSelect from "./VehicleSelect";

export default function FilterForm() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setMakes(data.Results);
    }
    fetchMakes();
  }, []);

  const isNextEnabled = selectedMake && selectedYear;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Select Vehicle Make and Model Year
      </h1>

      <div className="w-full max-w-md space-y-6">
        <VehicleSelect
          label="Vehicle Make"
          options={makes}
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        />

        <VehicleSelect
          label="Model Year"
          options={years}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />

        <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
          <button
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg focus:outline-none transition-all duration-200 mt-6 ${
              isNextEnabled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isNextEnabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
