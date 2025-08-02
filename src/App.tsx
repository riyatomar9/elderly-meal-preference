import './App.css';
import MealPreferenceForm from './components/MealPreferenceForm';
import { ScrollIndicator } from './components/shared/ScrollIndicator';
import UserSection from './components/UserSection';
import type { UserInfo } from './types';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/elderly-dining 1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Main Content */}
      <div className="relative py-3 w-full max-w-7xl mx-auto px-4 z-10">
        <UserSection 
          initialUserInfo={{
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
              relationship: ''
            }
          }}
          onSave={(userInfo: UserInfo) => {
            console.log('User info saved:', userInfo);
          }}
        />
        <div className="relative px-4 py-10 bg-white/70 shadow-lg sm:rounded-3xl sm:p-20 backdrop-blur-md">
          <div className="w-full">
            <MealPreferenceForm />
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}

export default App;
