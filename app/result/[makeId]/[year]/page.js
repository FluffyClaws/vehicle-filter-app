import React, { Suspense } from "react";
import ResultPageClient, { fetchVehicleModels } from "./page.client";

export async function fetchMakeName(makeId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VEHICLE_API_URL}/GetModelsForMakeId/${makeId}?format=json`
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

  const res = await fetch(process.env.NEXT_PUBLIC_GET_MAKES_URL);
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

  const makeName = await fetchMakeName(makeId);

  return <ResultPageClient makeId={makeId} year={year} makeName={makeName} />;
}
