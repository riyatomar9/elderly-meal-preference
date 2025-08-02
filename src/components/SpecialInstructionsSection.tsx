import React from 'react';

interface SpecialInstructionsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const SpecialInstructionsSection: React.FC<SpecialInstructionsSectionProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      onChange(e.target.value);
    }
  };

  return (
    <section className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-300">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Additional Notes
      </h2>
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Please add any other important information about food preferences (e.g., preferred food texture, temperature preferences, cultural or religious restrictions)"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none bg-white text-gray-900 placeholder-gray-500"
          maxLength={500}
        />
        <p className="text-sm text-gray-600">
          {value.length}/500 characters remaining
        </p>
      </div>
    </section>
  );
};

export default SpecialInstructionsSection;
