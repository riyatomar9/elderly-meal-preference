import React from 'react';
import type { Allergy, AllergySeverity } from '../types';
import { COMMON_ALLERGIES } from '../types';
import { LoadMore } from './shared/LoadMore';

type CommonAllergy = typeof COMMON_ALLERGIES[number];

interface AllergiesSectionProps {
  allergies: Allergy[];
  onAdd: (name: string, severity: AllergySeverity) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, name: string, severity: AllergySeverity) => void;
}

const ITEMS_PER_PAGE = 5;

const AllergiesSection: React.FC<AllergiesSectionProps> = ({
  allergies,
  onAdd,
  onRemove,
  onEdit,
}) => {
  const [newAllergy, setNewAllergy] = React.useState<{ name: string; severity: AllergySeverity }>({
    name: '',
    severity: 'mild',
  });
  const [editingAllergy, setEditingAllergy] = React.useState<Allergy | null>(null);
  const [visibleItems, setVisibleItems] = React.useState(ITEMS_PER_PAGE);

  const handleAdd = (name: string = newAllergy.name) => {
    if (name.trim()) {
      const severity = COMMON_ALLERGIES.includes(name as CommonAllergy) ? 'severe' : newAllergy.severity;
      onAdd(name, severity);
      setNewAllergy({ name: '', severity: 'mild' });
    }
  };

  return (
    <section className="bg-red-50 p-4 sm:p-6 rounded-2xl shadow-sm border-2 border-red-300">
      <div className="inline-block px-4 py-1.5 bg-red-100 text-red-900 rounded-full text-sm font-medium mb-4">⚠️ Important: Medical Information</div>
      <h2 className="text-lg sm:text-xl font-semibold text-red-900 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Food Allergies & Intolerances
      </h2>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="allergyName" className="block text-sm font-medium text-gray-700 mb-1">Allergy or Intolerance</label>
            <input
              id="allergyName"
              type="text"
              value={newAllergy.name}
              onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
              placeholder="E.g., Peanuts"
              className="w-full p-2.5 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="sm:w-40">
            <label htmlFor="allergySeverity" className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              id="allergySeverity"
              value={newAllergy.severity}
              onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value as AllergySeverity })}
              className="w-full p-2.5 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white text-gray-900"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => handleAdd()}
          className="w-full sm:w-auto sm:self-end bg-red-100 text-red-700 px-6 py-2.5 rounded-lg hover:bg-red-200 transition-all duration-200 focus:ring-2 focus:ring-red-200 focus:ring-offset-2 font-medium text-sm"
        >
          Add Allergy
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Quick Add Common Allergies:</h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map(allergy => (
            <button
              key={allergy}
              onClick={() => handleAdd(allergy)}
              className="bg-white/80 text-red-700 px-4 py-1.5 rounded-full hover:bg-red-100 transition-all duration-200 text-sm border border-red-100"
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      {allergies.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {allergies.slice(0, visibleItems).map(allergy => (
              <li
                key={allergy.id}
                className={`flex items-center gap-2 p-3 rounded-lg flex-[1_1_200px] min-w-[180px] max-w-[300px] ${
                  allergy.severity === 'severe'
                    ? 'bg-red-100/80 border border-red-200'
                    : allergy.severity === 'moderate'
                    ? 'bg-white/90 border border-red-200'
                    : 'bg-white/80 border border-red-100'
                }`}
              >
                {editingAllergy?.id === allergy.id ? (
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingAllergy.name}
                      onChange={(e) => setEditingAllergy({ ...editingAllergy, name: e.target.value })}
                      className="w-full p-1.5 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white text-gray-900"
                    />
                    <select
                      value={editingAllergy.severity}
                      onChange={(e) => setEditingAllergy({ ...editingAllergy, severity: e.target.value as AllergySeverity })}
                      className="w-full p-1.5 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white text-gray-900"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onEdit(editingAllergy.id, editingAllergy.name, editingAllergy.severity);
                          setEditingAllergy(null);
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingAllergy(null)}
                        className="flex-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {allergy.severity === 'severe' && (
                        <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                      <span className="truncate">{allergy.name}</span>
                    </div>
                    <div className={`text-sm mt-0.5 ${
                      allergy.severity === 'severe'
                        ? 'text-red-700 font-medium'
                        : allergy.severity === 'moderate'
                        ? 'text-red-600'
                        : 'text-red-500'
                    }`}>{allergy.severity}</div>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setEditingAllergy(allergy)}
                    className="shrink-0 text-red-600 hover:text-red-800 transition-colors duration-200"
                    aria-label="Edit allergy"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onRemove(allergy.id)}
                    className="shrink-0 text-red-600 hover:text-red-800 transition-colors duration-200"
                    aria-label="Remove allergy"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </div>
          <LoadMore 
            itemCount={Math.min(visibleItems, allergies.length)}
            totalCount={allergies.length}
            hasMore={visibleItems < allergies.length}
            onLoadMore={() => setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, allergies.length))}
          />
        </>
      )}
    </section>
  );
};

export default AllergiesSection;
