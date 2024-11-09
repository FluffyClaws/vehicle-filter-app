import React, { Suspense } from "react";
import ResultPageClient, { fetchVehicleModels } from "./page.client";

// Fetch make name for a given makeId
export async function fetchMakeName(makeId) {
  try {
    console.log(`Fetching make name for makeId: ${makeId}`);

    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${makeId}?format=json`
    );

    if (!res.ok) {
      console.error(`Failed to fetch make name for makeId: ${makeId}`);
      return "Unknown Make";
    }

    const data = await res.json();

    if (data.Results && data.Results.length > 0) {
      return data.Results[0]?.Make_Name || "Unknown Make";
    } else {
      console.warn(`No make found for makeId: ${makeId}`);
      return "Unknown Make";
    }
  } catch (error) {
    console.error(`Error fetching make name for makeId: ${makeId}`, error);
    return "Unknown Make";
  }
}

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  // Fetching available makes
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const makesData = await res.json();
  const makes = makesData.Results;

  const paths = [];

  makes.forEach((make) => {
    years.forEach((year) => {
      paths.push({ makeId: String(make.MakeId), year: String(year) });
    });
  });

  return paths;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = await params;

  // Fetch makeName on the server-side
  const makeName = await fetchMakeName(makeId);

  return <ResultPageClient makeId={makeId} year={year} makeName={makeName} />;
}
