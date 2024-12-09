'use client';

import { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';
import VehicleMake from '@/types/VehicleMake';
import Link from 'next/link';
import { config } from '@/config/config';

const FilterPage: React.FC = () => {
  const [makes, setMakes] = useState<{ value: number; label: string }[]>([]);
  const [selectedMake, setSelectedMake] = useState<number | string>('');
  const [selectedYear, setSelectedYear] = useState<number | string>('');

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch(config.api.getMakes!);
        const data = await res.json();
        setMakes(
          data.Results.map((make: VehicleMake) => ({
            value: make.MakeId,
            label: make.MakeName,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMakes();
  }, []);

  const years = Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => {
    const year = 2015 + i;
    return { value: year, label: String(year) };
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold text-slate-50">Filter Vehicles</h2>
      <Dropdown
        label="Vehicle Make"
        options={makes}
        value={selectedMake}
        onChange={setSelectedMake}
      />
      <Dropdown
        label="Model Year"
        options={years}
        value={selectedYear}
        onChange={setSelectedYear}
      />
      <button
        className={`mt-6 w-full rounded-lg py-3 text-lg text-white transition duration-200 ${
          selectedMake && selectedYear
            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none'
            : 'cursor-not-allowed bg-gray-300'
        }`}
        disabled={!selectedMake || !selectedYear}
      >
        <Link href={`/result/${selectedMake}/${selectedYear}`}>Next</Link>
      </button>
    </div>
  );
};

export default FilterPage;
