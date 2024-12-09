import SuspenseFallback from '@/components/SuspenseFallback';
import VehicleList from '@/components/VehicleList';
import { config } from '@/config/config';
import { Suspense, FC } from 'react';

interface Params {
  params: Promise<{
    makeId: string;
    year: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await fetch(config.api.getMakes!);

    if (!res.ok) {
      throw new Error(`Failed to fetch makes: ${res.statusText}`);
    }

    const data = await res.json();

    const makes = data.Results.map((make: { MakeId: string }) => make.MakeId);
    const years = Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i);

    const params = makes.flatMap((makeId: string) =>
      years.map((year) => ({
        makeId: String(makeId),
        year: String(year),
      })),
    );

    return params;
  } catch (error) {
    console.error('Error fetching makes or years:', error);
    return [];
  }
}

const ResultPage: FC<Params> = async ({ params }: Params) => {
  const { makeId, year } = await params;

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-3xl font-bold text-slate-100">
        Models for {makeId} and Year {year}
      </h2>
      <Suspense fallback={<SuspenseFallback />}>
        <VehicleList makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
};

export default ResultPage;
