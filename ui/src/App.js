import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';
import ReportListPage from './pages/ReportListPage';
import InspectPage from './pages/InspectPage';
import AwarenessPage from './pages/AwarenessPage';
import { ChakraProvider } from '@chakra-ui/react';
import Navigator from './components/Navigator';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './components/Footer';





import DashboardPage from './pages/DashboardPage';
import MainDashBoardPage from './pages/MainDashBoardPage';
import DashboardIncidentsPage from './pages/DashboardIncidentsPage';
import DashboardTicketsPage from './pages/DashboardTicketsPage';
import GenerateReportPage from './pages/GenerateReportPage';
import DashboardStatsPage from './pages/DashboardStatsPage';


import { ContextProvider } from 'react';
import userContext from './functions/userContext';

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {/* This element will render either <DashboardMessages> when the URL is
//           "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
//       */}
//       <Outlet />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />}>
//         <Route
//           path="messages"
//           element={<DashboardMessages />}
//         />
//         <Route path="tasks" element={<DashboardTasks />} />
//       </Route>
//     </Routes>


function Navigation() {
  return (
    <>
      <Navigator />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (<ChakraProvider>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route path='/' element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='report' element={<ReportPage />} />
          <Route path='report-list' element={<ReportListPage />} />
          <Route path='awareness' element={<AwarenessPage />} />
          <Route path='inspect' element={<InspectPage />} />
        </Route>
        <Route path='dashboard' element={<DashboardPage />}>
          <Route path='main' element={<MainDashBoardPage />} />
          <Route path='reportpdf' element={<GenerateReportPage />} />
          <Route path='tickets' element={<DashboardTicketsPage />} />
          <Route path='incidents' element={<DashboardIncidentsPage />} />
          <Route path='stats' element={<DashboardStatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
  );
}

export default App;
