import { useState } from 'react';
import HomePage from './HomePage';
import type { ChartDataItem } from './types';
import ResultPage from './ResultPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [slices, setSlices] = useState<ChartDataItem[]>([
    { id: '1', label: 'Eletrônicos', value: 450, color: '#3b82f6' },
    { id: '2', label: 'Roupas', value: 320, color: '#ef4444' },
    { id: '3', label: 'Móveis', value: 210, color: '#10b981' },
  ]);

  const handleDataConfirmed = (data: ChartDataItem[]) => {
    setSlices(data);
    setCurrentView('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'home') {
    return (
      <HomePage onDataImported={handleDataConfirmed} />
    );
  }

  return (
    <ResultPage
      initialData={slices}
      onBackToHome={handleBackToHome}
    />
  );
}
