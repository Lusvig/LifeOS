import { useState } from 'react';
import TitleBar from './components/TitleBar';
import Dashboard from './pages/Dashboard';
import ZenMode from './pages/ZenMode';
import Finance from './pages/Finance';

export default function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="h-screen flex flex-col bg-background text-white">
      <TitleBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-hidden">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'zen' && <ZenMode />}
        {currentPage === 'finance' && <Finance />}
      </div>
    </div>
  );
}
