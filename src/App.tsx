import './App.css';
import { useProjectStore } from './state/projectStore';
import { StepImageSelection } from './components/StepImageSelection';
import { StepDesignChat } from './components/StepDesignChat';
import { StepModelViewer } from './components/StepModelViewer';
import { useLanguage } from './i18n/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${language === 'de' ? 'lang-btn--active' : ''}`}
        onClick={() => setLanguage('de')}
        aria-label="Deutsch"
      >
        DE
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn ${language === 'en' ? 'lang-btn--active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

export default function App() {
  const { currentStep } = useProjectStore();
  const { t } = useLanguage();

  return (
    <div className="appShell">
      <header className="header">
        <div className="brand">{t('brandName')}</div>
        <div className="step-indicator">
          <div className={`step-dot ${currentStep >= 1 ? 'active' : ''} ${currentStep === 1 ? 'current' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">{t('step1Label')}</span>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${currentStep >= 2 ? 'active' : ''} ${currentStep === 2 ? 'current' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">{t('step2Label')}</span>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${currentStep >= 3 ? 'active' : ''} ${currentStep === 3 ? 'current' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">{t('step3Label')}</span>
          </div>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="main-content">
        {currentStep === 1 && <StepImageSelection />}
        {currentStep === 2 && <StepDesignChat />}
        {currentStep === 3 && <StepModelViewer />}
      </main>

      <footer className="footer">
        {t('footer')}
      </footer>
    </div>
  );
}
