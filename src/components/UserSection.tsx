import React, { useState } from 'react';
import type { UserInfo } from '../types';
import { validateEmail, validatePhone, formatPhone } from '../utils/validation';

interface UserSectionProps {
  initialUserInfo?: UserInfo;
  onSave?: (userInfo: UserInfo) => void;
}

const DEFAULT_USER_INFO: UserInfo = {
  name: '',
  age: 65,
  dietaryRestrictions: [],
  medicalConditions: [],
  mealSchedule: {
    breakfast: '8:00 AM',
    lunch: '12:00 PM',
    dinner: '6:00 PM'
  },
  primaryCaregiver: {
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: ''
  }
};

export const UserSection: React.FC<UserSectionProps> = ({
  initialUserInfo = DEFAULT_USER_INFO,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setUserInfo(prev => ({
      ...prev,
      primaryCaregiver: {
        ...prev.primaryCaregiver,
        phone: formatted
      }
    }));
    
    if (validationErrors.phone) {
      setValidationErrors(prev => ({ ...prev, phone: undefined }));
    }
    
    if (value && !validatePhone(value)) {
      setValidationErrors(prev => ({
        ...prev,
        phone: 'Please enter a valid phone number'
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: { email?: string; phone?: string } = {};
    const { email = '', phone = '' } = userInfo.primaryCaregiver;

    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (phone && !validatePhone(phone)) {
      errors.phone = 'Please enter a valid phone number (e.g., (123) 456-7890)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave?.(userInfo);
      setIsEditing(false);
      setValidationErrors({});
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Resident Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">Basic information about the resident's dietary needs</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          {isEditing ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Personal Details</h3>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Resident's Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, age: parseInt(e.target.value) || prev.age }))}
                  placeholder="Age"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-900">{userInfo.name || 'Not specified'}</p>
                <p className="text-gray-600">Age: {userInfo.age}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Meal Schedule</h3>
            {isEditing ? (
              <div className="space-y-2">
                {Object.entries(userInfo.mealSchedule || {}).map(([meal, time]) => (
                  <div key={meal} className="flex items-center gap-2">
                    <span className="w-24 text-sm text-gray-600 capitalize">{meal}:</span>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        mealSchedule: {
                          ...prev.mealSchedule,
                          [meal]: e.target.value
                        }
                      }))}
                      className="flex-1 p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-md space-y-1">
                {Object.entries(userInfo.mealSchedule || {}).map(([meal, time]) => (
                  <div key={meal} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{meal}:</span>
                    <span className="text-gray-900">{time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Primary Caregiver</h3>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={userInfo.primaryCaregiver?.name || ''}
                  onChange={(e) => setUserInfo(prev => ({
                    ...prev,
                    primaryCaregiver: {
                      ...prev.primaryCaregiver,
                      name: e.target.value
                    }
                  }))}
                  placeholder="Caregiver's Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={userInfo.primaryCaregiver?.relationship || ''}
                  onChange={(e) => setUserInfo(prev => ({
                    ...prev,
                    primaryCaregiver: {
                      ...prev.primaryCaregiver,
                      relationship: e.target.value
                    }
                  }))}
                  placeholder="Relationship to Resident"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div>
                  <input
                    type="tel"
                    value={userInfo.primaryCaregiver?.phone || ''}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Phone Number (e.g., (123) 456-7890)"
                    className={`w-full p-2 border ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    value={userInfo.primaryCaregiver?.email || ''}
                    onChange={(e) => {
                      setUserInfo(prev => ({
                        ...prev,
                        primaryCaregiver: {
                          ...prev.primaryCaregiver,
                          email: e.target.value
                        }
                      }));
                      if (validationErrors.email) {
                        setValidationErrors(prev => ({ ...prev, email: undefined }));
                      }
                    }}
                    onBlur={() => {
                      if (userInfo.primaryCaregiver?.email && !validateEmail(userInfo.primaryCaregiver.email)) {
                        setValidationErrors(prev => ({
                          ...prev,
                          email: 'Please enter a valid email address'
                        }));
                      }
                    }}
                    placeholder="Email Address"
                    className={`w-full p-2 border ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>
                <textarea
                  value={userInfo.primaryCaregiver?.address || ''}
                  onChange={(e) => setUserInfo(prev => ({
                    ...prev,
                    primaryCaregiver: {
                      ...prev.primaryCaregiver,
                      address: e.target.value
                    }
                  }))}
                  placeholder="Address"
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-md space-y-2">
                <div>
                  <p className="font-medium text-gray-900">{userInfo.primaryCaregiver?.name || 'Not specified'}</p>
                  <p className="text-gray-600">{userInfo.primaryCaregiver?.relationship || 'Relationship not specified'}</p>
                </div>
                <div className="pt-2 border-t border-gray-200 space-y-1">
                  {userInfo.primaryCaregiver?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-gray-700">{userInfo.primaryCaregiver.phone}</span>
                    </div>
                  )}
                  {userInfo.primaryCaregiver?.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-gray-700">{userInfo.primaryCaregiver.email}</span>
                    </div>
                  )}
                  {userInfo.primaryCaregiver?.address && (
                    <div className="flex items-start gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{userInfo.primaryCaregiver.address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Dietary Restrictions</h3>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={userInfo.dietaryRestrictions?.join('\n') || ''}
                  onChange={(e) => setUserInfo(prev => ({
                    ...prev,
                    dietaryRestrictions: e.target.value.split('\n').filter(Boolean)
                  }))}
                  placeholder="Enter each restriction on a new line"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-md">
                {userInfo.dietaryRestrictions?.length ? (
                  <ul className="list-disc list-inside space-y-1">
                    {userInfo.dietaryRestrictions.map((restriction, index) => (
                      <li key={index} className="text-gray-600">{restriction}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No dietary restrictions specified</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
