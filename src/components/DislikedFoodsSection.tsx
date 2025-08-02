import React from 'react';
import type { DislikedFood, DislikeSeverity } from '../types';
import { LoadMore } from './shared/LoadMore';

interface DislikedFoodsSectionProps {
  foods: DislikedFood[];
  onAdd: (name: string, severity: DislikeSeverity) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, name: string, severity: DislikeSeverity) => void;
}

const ITEMS_PER_PAGE = 5;

const DislikedFoodsSection: React.FC<DislikedFoodsSectionProps> = ({
  foods,
  onAdd,
  onRemove,
  onEdit,
}) => {
  const [newFood, setNewFood] = React.useState<{ name: string; severity: DislikeSeverity }>({
    name: '',
    severity: 'mild',
  });
  const [editingFood, setEditingFood] = React.useState<DislikedFood | null>(null);
  const [visibleItems, setVisibleItems] = React.useState(ITEMS_PER_PAGE);

  const handleAdd = () => {
    if (newFood.name.trim()) {
      onAdd(newFood.name, newFood.severity);
      setNewFood({ name: '', severity: 'mild' });
    }
  };

  return (
    <section className="bg-rose-50 p-4 sm:p-6 rounded-2xl shadow-sm border border-rose-200">
      <h2 className="text-lg sm:text-xl font-semibold text-rose-800 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
        </svg>
        Disliked Foods
      </h2>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="dislikedFoodName" className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
            <input
              id="dislikedFoodName"
              type="text"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              placeholder="E.g., Brussels Sprouts"
              className="w-full p-2.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="sm:w-40">
            <label htmlFor="dislikeSeverity" className="block text-sm font-medium text-gray-700 mb-1">How Much?</label>
            <select
              id="dislikeSeverity"
              value={newFood.severity}
              onChange={(e) => setNewFood({ ...newFood, severity: e.target.value as DislikeSeverity })}
              className="w-full p-2.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-gray-900"
            >
              <option value="mild">Mild dislike</option>
              <option value="moderate">Moderate dislike</option>
              <option value="won't eat">Won't eat</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto sm:self-end bg-rose-600 text-white px-6 py-2.5 rounded-lg hover:bg-rose-700 transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 font-medium text-sm disabled:bg-rose-300"
        >
          Add Disliked Food
        </button>
      </div>
      {foods.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {foods.slice(0, visibleItems).map(food => (
              <li key={food.id} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-rose-300 list-none flex-[1_1_200px] min-w-[180px] max-w-[300px]">
                {editingFood?.id === food.id ? (
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingFood.name}
                      onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
                      className="w-full p-1.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-gray-900"
                    />
                    <select
                      value={editingFood.severity}
                      onChange={(e) => setEditingFood({ ...editingFood, severity: e.target.value as DislikeSeverity })}
                      className="w-full p-1.5 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none bg-white text-gray-900"
                    >
                      <option value="mild">Mild dislike</option>
                      <option value="moderate">Moderate dislike</option>
                      <option value="won't eat">Won't eat</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onEdit(editingFood.id, editingFood.name, editingFood.severity);
                          setEditingFood(null);
                        }}
                        className="flex-1 bg-rose-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-rose-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingFood(null)}
                        className="flex-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{food.name}</div>
                    <div className="text-sm text-rose-800">{food.severity}</div>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setEditingFood(food)}
                    className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Edit food"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onRemove(food.id)}
                    className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Remove food"
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
            itemCount={Math.min(visibleItems, foods.length)}
            totalCount={foods.length}
            hasMore={visibleItems < foods.length}
            onLoadMore={() => setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, foods.length))}
          />
        </>
      )}
    </section>
  );
};

export default DislikedFoodsSection;
