export interface MealSchedule {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface PrimaryCaregiver {
  name: string;
  relationship: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UserInfo {
  name: string;
  age: number;
  dietaryRestrictions: string[];
  medicalConditions: string[];
  mealSchedule: MealSchedule;
  primaryCaregiver: PrimaryCaregiver;
}
