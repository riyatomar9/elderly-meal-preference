export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export type DislikeSeverity = 'mild' | 'moderate' | 'won\'t eat';

export type AllergySeverity = 'mild' | 'moderate' | 'severe';

export * from './user';

export interface FoodItem {
  id: string;
  name: string;
  category: MealCategory;
}

export interface DislikedFood {
  id: string;
  name: string;
  severity: DislikeSeverity;
}

export interface Allergy {
  id: string;
  name: string;
  severity: AllergySeverity;
  isCommon: boolean;
}

export interface MealPreferences {
  favoriteFoods: FoodItem[];
  dislikedFoods: DislikedFood[];
  allergies: Allergy[];
  specialInstructions: string;
}

export const COMMON_ALLERGIES = [
  'Nuts',
  'Dairy',
  'Gluten',
  'Eggs',
  'Soy',
  'Shellfish',
  'Fish',
  'Wheat'
] as const;
