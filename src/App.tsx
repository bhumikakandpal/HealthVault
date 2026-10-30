import { useState } from 'react';
import type { HealthRecord, RecordCategory } from './types';
import { useRecords } from './useRecords';
import { Sidebar } from './components/Sidebar';
import type { TabId } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { UploadPage } from './pages/UploadPage';
import { SummaryPage } from './pages/SummaryPage';
import { RecordDetailModal } from './components/RecordDetailModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PROFILES, DEFAULT_PROFILE_ID } from './data';
import type { UserProfile } from './data';

const TAB_META: Record<TabId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Health Timeline',
    subtitle: 'Your complete medical record history at a glance',
  },
  upload: {
    title: 'Upload New Record',
    subtitle: 'Add a new medical document to your health vault',
  },
  summary: {
    title: 'Appointment Summary Generator',
    subtitle: 'Create a clean summary of your medical history for visits',
  },
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeProfile, setActiveProfile] = useState<UserProfile>(
    PROFILES.find((p) => p.id === DEFAULT_PROFILE_ID) ?? PROFILES[0],
  );
  const { records, addRecord, deleteRecord } = useRecords(activeProfile.id);
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<RecordCategory | 'All'>('All');
  const [dateFilter, setDateFilter] = useState('');
  const [detailRecord, setDetailRecord] = useState<HealthRecord | null>(null);

  const handleProfileChange = (p: UserProfile) => {
    setActiveProfile(p);
    setSearchQuery('');
    setCategoryFilter('All');
    setDateFilter('');
  };

  const tabMeta = TAB_META[activeTab];

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        recordCount={records.length}
        activeProfile={activeProfile}
        onProfileChange={handleProfileChange}
        onShowWelcome={() => setShowWelcome(true)}
      />

      <div className="lg:pl-72">
        <Header
          title={tabMeta.title}
          subtitle={tabMeta.subtitle}
          onOpenMobile={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={activeTab === 'dashboard'}
          activeProfile={activeProfile}
          onProfileChange={handleProfileChange}
          onShowWelcome={() => setShowWelcome(true)}
        />

        <main className="animate-fade-in">
          {activeTab === 'dashboard' && (
            <Dashboard
              records={records}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              onView={setDetailRecord}
            />
          )}
          {activeTab === 'upload' && (
            <UploadPage
              onAddRecord={addRecord}
              onDone={() => {
                setCategoryFilter('All');
                setSearchQuery('');
                setActiveTab('dashboard');
              }}
            />
          )}
          {activeTab === 'summary' && (
            <SummaryPage records={records} allergies={activeProfile.allergies} patientName={activeProfile.name} patientAge={String(activeProfile.age)} patientBloodGroup={activeProfile.bloodGroup} />
          )}
        </main>

        {/* Footer disclaimer */}
        <footer className="no-print px-4 pb-6 pt-2 sm:px-6">
          <div className="rounded-xl bg-navy-100 px-4 py-3 text-center">
            <p className="text-xs text-navy-500">
              HealthVault is a personal organizer and does not provide medical diagnoses or replace
              clinical advice.
            </p>
          </div>
        </footer>
      </div>

      {/* Detail Modal */}
      <RecordDetailModal
        record={detailRecord}
        onClose={() => setDetailRecord(null)}
        onDelete={deleteRecord}
      />
    </div>
  );
}

export default App;
