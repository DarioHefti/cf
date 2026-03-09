import './App.css';
import { useProjectStore } from './state/projectStore';
import { StepImageSelection } from './components/StepImageSelection';
import { StepDesignChat } from './components/StepDesignChat';
import { StepModelViewer } from './components/StepModelViewer';

export default function App() {
  const { currentStep } = useProjectStore();

  return (
    <div className="appShell">
      <header className="header">
        <div className="brand">🪑 Custom Furniture Studio</div>
        <div className="step-indicator">
          <div className={`step-dot ${currentStep >= 1 ? 'active' : ''} ${currentStep === 1 ? 'current' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">Choose Image</span>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${currentStep >= 2 ? 'active' : ''} ${currentStep === 2 ? 'current' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Design</span>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${currentStep >= 3 ? 'active' : ''} ${currentStep === 3 ? 'current' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">3D Model</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {currentStep === 1 && <StepImageSelection />}
        {currentStep === 2 && <StepDesignChat />}
        {currentStep === 3 && <StepModelViewer />}
      </main>

      <footer className="footer">
        Built with ❤️ • Powered by NanoBananPro AI + Hitem3D
      </footer>
    </div>
  );
}
