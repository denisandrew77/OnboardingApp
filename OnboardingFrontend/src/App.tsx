import { Navigate, Route, Routes } from 'react-router'
import { ConfirmProfilePage } from './pages/ConfirmProfilePage'
import { FindProfilePage } from './pages/FindProfilePage'
import { WelcomePage } from './pages/WelcomePage'
import { AmenitiesPage } from './pages/onboarding/AmenitiesPage'
import { CompanyPage } from './pages/onboarding/CompanyPage'
import { CompletePage } from './pages/onboarding/CompletePage'
import { FirstDayPage } from './pages/onboarding/FirstDayPage'
import { OnboardingWelcomePage } from './pages/onboarding/OnboardingWelcomePage'
import { ResourcesPage } from './pages/onboarding/ResourcesPage'
import { RolePage } from './pages/onboarding/RolePage'
import { SchedulePage } from './pages/onboarding/SchedulePage'
import { TeamPage } from './pages/onboarding/TeamPage'
import { ToolsPage } from './pages/onboarding/ToolsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/find-profile" element={<FindProfilePage />} />
      <Route path="/confirm-profile/:employeeId" element={<ConfirmProfilePage />} />
      <Route path="/onboarding/welcome" element={<OnboardingWelcomePage />} />
      <Route path="/onboarding/company" element={<CompanyPage />} />
      <Route path="/onboarding/first-day" element={<FirstDayPage />} />
      <Route path="/onboarding/team" element={<TeamPage />} />
      <Route path="/onboarding/role" element={<RolePage />} />
      <Route path="/onboarding/schedule" element={<SchedulePage />} />
      <Route path="/onboarding/tools" element={<ToolsPage />} />
      <Route path="/onboarding/resources" element={<ResourcesPage />} />
      <Route path="/onboarding/amenities" element={<AmenitiesPage />} />
      <Route path="/onboarding/complete" element={<CompletePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
