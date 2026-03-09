import './App.css';
import { ChatPanel } from './components/ChatPanel';
import { ConceptImageViewer } from './components/ConceptImageViewer';
import { InspirationGallery } from './components/InspirationGallery';
import { MaterialsLibrary } from './components/MaterialsLibrary';
import { ThreeDViewer } from './components/ThreeDViewer';
import { VersionHistorySidebar } from './components/VersionHistorySidebar';

export default function App() {
  return (
    <div className="appShell">
      <header className="header">
        <div className="brand">🪑 Custom Furniture Studio</div>
        <div className="sub">
          Design your perfect piece • AI-powered customization • AR preview
        </div>
      </header>

      <main className="layout">
        <section className="col left">
          <InspirationGallery />
          <MaterialsLibrary />
        </section>

        <section className="col center">
          <ConceptImageViewer />
          <ChatPanel />
        </section>

        <section className="col right">
          <VersionHistorySidebar />
          <ThreeDViewer />
        </section>
      </main>

      <footer className="footer">
        Built with ❤️ • Powered by NanoBananPro AI + Hitem3D
      </footer>
    </div>
  );
}
