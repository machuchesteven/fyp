import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';
import ReportListPage from './pages/ReportListPage';
import { ChakraProvider } from '@chakra-ui/react';
import Navigator from './components/Navigator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import AwarenessPage from './pages/AwarenessPage';


function App() {
  return (<ChakraProvider>
    <BrowserRouter basename='/'>
      <Navigator />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='report' element={<ReportPage />} />
        <Route path='report-list' element={<ReportListPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='awareness' element={<AwarenessPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </ChakraProvider>
  );
}

export default App;
