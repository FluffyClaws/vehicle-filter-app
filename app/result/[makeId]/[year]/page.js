"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const makeId = pathname.split("/")[2];
  const year = pathname.split("/")[3];

  console.log("Current Pathname:", pathname);
  console.log("Make ID:", makeId, "Year:", year);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Vehicle Information</h1>
      <p className="text-lg">Make ID: {makeId}</p>
      <p className="text-lg">Year: {year}</p>
    </div>
  );
}
