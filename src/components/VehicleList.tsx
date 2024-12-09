import { config } from '@/config/config';
import VehicleModel from '@/types/VehicleModel';

interface Params {
  makeId: string;
  year: string;
}

const fetchModels = async (makeId: string, year: string): Promise<VehicleModel[]> => {
  try {
    const res = await fetch(
      `${config.api.getModelsYear}/makeId/${makeId}/modelyear/${year}?format=json`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch models: ${res.statusText}`);
    }

    const data = await res.json();
    return data.Results || [];
  } catch (error) {
    console.error(`Error fetching models for make ${makeId} and year ${year}:`, error);
    return [];
  }
};

const VehicleList: React.FC<Params> = async ({ makeId, year }) => {
  const models = await fetchModels(makeId, year);

  if (!models || models.length === 0) {
    return (
      <p className="mt-6 text-center text-slate-50">
        No models available for the selected make and year.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
      {models.map((model) => (
        <div
          key={model.Model_ID}
          className="transform rounded-lg border-2 border-gray-300 bg-white p-6 shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl"
        >
          <h3 className="mb-2 text-xl font-semibold text-gray-800">{model.Model_Name}</h3>
          <p className="text-gray-500">Model ID: {model.Model_ID}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
