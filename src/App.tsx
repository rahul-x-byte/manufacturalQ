import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SettingsPanel from './components/layout/SettingsPanel';
import ChatPanel from './components/chat/ChatPanel';
import UploadModal from './components/chat/UploadModal';
import NotFoundPage from './components/views/NotFoundPage';
import KnowledgeBaseView from './components/views/KnowledgeBaseView';
import UploadsView from './components/views/UploadsView';
import { usePageMetadata } from './hooks/usePageMetadata';

function AppLayout() {
  usePageMetadata();

  return (
    <div className="flex flex-col h-screen w-screen bg-brand-bg text-brand-navy overflow-hidden font-sans">
      <Header />

      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />

        <main className="flex-1 flex overflow-hidden min-w-0">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex-1 flex overflow-hidden">
                  <ChatPanel />
                </div>
              }
            />
            <Route path="/knowledge-base" element={<KnowledgeBaseView />} />
            <Route path="/uploads" element={<UploadsView />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      <SettingsPanel />
      <UploadModal />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <AppLayout />
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;

