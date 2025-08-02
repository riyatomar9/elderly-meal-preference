import React, { useState } from 'react';
import type { MealPreferences, MealCategory, DislikeSeverity, AllergySeverity } from '../types';
import Toast from './shared/Toast';
import FavoriteFoodsSection from './FavoriteFoodsSection';
import DislikedFoodsSection from './DislikedFoodsSection';
import AllergiesSection from './AllergiesSection';
import SpecialInstructionsSection from './SpecialInstructionsSection';

const MealPreferenceForm: React.FC = () => {
  const [preferences, setPreferences] = useState<MealPreferences>({
    favoriteFoods: [],
    dislikedFoods: [],
    allergies: [],
    specialInstructions: ''
  });

  const [error, setError] = useState<string>('');

  const clearError = () => {
    setTimeout(() => setError(''), 3000);
  };

  const handleEditFavoriteFood = (id: string, name: string, category: MealCategory) => {
    setPreferences(prev => ({
      ...prev,
      favoriteFoods: prev.favoriteFoods.map(food => 
        food.id === id ? { ...food, name, category } : food
      )
    }));
  };

  const handleEditDislikedFood = (id: string, name: string, severity: DislikeSeverity) => {
    setPreferences(prev => ({
      ...prev,
      dislikedFoods: prev.dislikedFoods.map(food => 
        food.id === id ? { ...food, name, severity } : food
      )
    }));
  };

  const handleEditAllergy = (id: string, name: string, severity: AllergySeverity) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.map(allergy => 
        allergy.id === id ? { ...allergy, name, severity } : allergy
      )
    }));
  };

  const handleAddItem = <T extends { id: string; name: string }>(
    itemType: keyof Omit<MealPreferences, 'specialInstructions'>,
    name: string,
    createItem: (trimmedName: string) => T
  ) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const items = preferences[itemType] as Array<{ name: string }>;
    
    const isDuplicate = items.some(
      item => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setError(`"${trimmedName}" is already in your ${itemType} list`);
      clearError();
      return;
    }
    if (itemType === 'dislikedFoods') {
      const isInFavorites = preferences.favoriteFoods.some(
        food => food.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (isInFavorites) {
        setError(`"${trimmedName}" is in your favorite foods list. Please remove it from favorites first.`);
        clearError();
        return;
      }
    }

    setPreferences(prev => ({
      ...prev,
      [itemType]: [...prev[itemType], createItem(trimmedName)]
    }));
  };

  const handleRemoveItem = (
    itemType: keyof Omit<MealPreferences, 'specialInstructions'>,
    id: string
  ) => {
    setPreferences(prev => ({
      ...prev,
      [itemType]: (prev[itemType] as Array<{ id: string }>).filter(item => item.id !== id)
    }));
  };

  const handleSubmit = () => {
    if (preferences.favoriteFoods.length === 0) {
      setError('Please add at least one favorite food');
      clearError();
      return;
    }

    console.log('Submitting preferences:', preferences);
    setError('');
    alert('Preferences saved successfully!');
  };

  return (
    <div className="w-full">
      <Toast message={error} onClose={() => setError('')} />
      
      <header className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meal Preferences Form</h1>
        <p className="text-gray-600 text-sm sm:text-base">Please help us understand your loved one's food preferences</p>
      </header>

      <div className="space-y-16">
        <FavoriteFoodsSection
          foods={preferences.favoriteFoods}
          onAdd={(name, category) => {
            handleAddItem(
              'favoriteFoods',
              name,
              (trimmedName) => ({
                id: crypto.randomUUID(),
                name: trimmedName,
                category
              })
            );
          }}
          onRemove={(id) => handleRemoveItem('favoriteFoods', id)}
          onEdit={handleEditFavoriteFood}
        />

        <DislikedFoodsSection
          foods={preferences.dislikedFoods}
          onAdd={(name, severity) => {
            handleAddItem(
              'dislikedFoods',
              name,
              (trimmedName) => ({
                id: crypto.randomUUID(),
                name: trimmedName,
                severity
              })
            );
          }}
          onRemove={(id) => handleRemoveItem('dislikedFoods', id)}
          onEdit={handleEditDislikedFood}
        />

        <AllergiesSection
          allergies={preferences.allergies}
          onAdd={(name, severity) => {
            handleAddItem(
              'allergies',
              name,
              (trimmedName) => ({
                id: crypto.randomUUID(),
                name: trimmedName,
                severity,
                isCommon: false
              })
            );
          }}
          onEdit={handleEditAllergy}
          onRemove={(id) => handleRemoveItem('allergies', id)}
        />

        <SpecialInstructionsSection
          value={preferences.specialInstructions}
          onChange={(value) => {
            setPreferences(prev => ({
              ...prev,
              specialInstructions: value
            }));
          }}
        />

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPreferenceForm;
