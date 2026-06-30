import { Navigate, Route, Routes } from 'react-router'
import { ConfirmProfilePage } from './pages/ConfirmProfilePage'
import { FindProfilePage } from './pages/FindProfilePage'
import { WelcomePage } from './pages/WelcomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/find-profile" element={<FindProfilePage />} />
      <Route path="/confirm-profile/:employeeId" element={<ConfirmProfilePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
