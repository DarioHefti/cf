export type Language = 'de' | 'en';

export const translations = {
  de: {
    // Header
    brandName: '🪑 Custom Furniture Studio',
    step1Label: 'Bild wählen',
    step2Label: 'Design',
    step3Label: '3D-Modell',

    // Footer
    footer: 'Mit ❤️ gebaut • Powered by NanoBananPro AI + Hitem3D',

    // Language switcher
    langDE: 'DE',
    langEN: 'EN',
    langLabel: 'Sprache',

    // StepImageSelection
    chooseTitle: 'Startbild auswählen',
    chooseSubtitle: 'Laden Sie Ihr eigenes Design hoch oder wählen Sie aus unseren kuratierten Beispielen',
    uploadDrop: 'Bild hier ablegen',
    uploadOr: 'oder klicken Sie zum Durchsuchen',
    uploadError: 'Bitte laden Sie eine Bilddatei hoch',
    orChoose: 'oder Beispiel wählen',

    // Inspirations titles & descriptions
    inspirationModernDeskTitle: 'Moderner Schwebeschreibtisch',
    inspirationModernDeskDesc: 'Klare Linien mit wandmontierten Design, ideal für Homeoffice.',
    inspirationCoffeeTableTitle: 'Skandinavischer Couchtisch',
    inspirationCoffeeTableDesc: 'Abgerundete Kanten mit warmen Holztönen und spitz zulaufenden Beinen.',
    inspirationBookshelfTitle: 'Industrielles Bücherregal',
    inspirationBookshelfDesc: 'Offenes Regal mit Metallrahmen und recyceltem Holz.',
    inspirationDiningTableTitle: 'Bauernhaus-Esstisch',
    inspirationDiningTableDesc: 'Massivholzkonstruktion mit rustikalem Charme, Platz für 6–8 Personen.',
    inspirationConsoleTableTitle: 'Mid-Century Konsole',
    inspirationConsoleTableDesc: 'Elegantes Eingangsbereich-Möbel mit Stauraum und Display.',
    inspirationSideTableTitle: 'Marmor-Beistelltisch',
    inspirationSideTableDesc: 'Luxuriöser Akzenttisch mit Marmorplatte und Messinggestell.',

    // Materials names
    materialOakNatural: 'Natureiche',
    materialWalnutDark: 'Dunkles Walnuss',
    materialSteelBrushed: 'Gebürsteter Stahl',
    materialMarbleWhite: 'Weißer Marmor',
    materialLeatherBlack: 'Schwarzes Leder',
    materialBrassPolished: 'Poliertes Messing',

    // StepDesignChat
    refineTitel: 'Ihr Design verfeinern',
    refineSubtitle: 'Chatten Sie mit der KI, um Ihr Möbeldesign zu perfektionieren',
    back: '← Zurück',
    generate3D: '3D-Modell erstellen →',
    noDesignSelected: 'Kein Design ausgewählt',
    versionsLabel: 'Versionen:',
    chatPlaceholder: 'Änderungen beschreiben: „Beine dünner machen" oder „Schublade hinzufügen" ...',
    send: 'Senden',
    sending: '...',
    aiDesigning: 'KI entwirft Ihre Änderungen ...',
    tryLabel: 'Probieren Sie:',
    suggestionModern: 'Moderner gestalten',
    suggestionDrawer: 'Schublade hinzufügen',
    suggestionLegs: 'Dünnere Beine',

    // StepModelViewer
    backToDesign: '← Zurück zum Design',
    modelTitle: '3D-Modell Vorschau',
    modelSubtitle: 'Sehen Sie Ihr Möbelstück in 3D und AR',
    startNew: 'Neues Design starten',
    generatingModel: '3D-Modell wird erstellt ...',
    loadingHint: 'Dies dauert in der Regel 3–5 Sekunden',
    modelFailed: '3D-Modell konnte nicht erstellt werden',
    tryAgain: 'Erneut versuchen',
    referenceDesign: 'Referenzdesign',
    actions: 'Aktionen',
    viewAR: '📱 In AR anzeigen',
    download3D: '💾 3D-Modell herunterladen',
    shareDesign: '🔗 Design teilen',
    tipsTitle: 'Tipps',
    tip1: '🖱️ Ziehen um das Modell zu drehen',
    tip2: '🔍 Scrollen zum Zoomen',
    tip3: '📱 Auf dem Handy: „In AR anzeigen" tippen, um es in Ihrem Raum zu platzieren',
    arNotSupported: '⚠️ AR auf diesem Gerät nicht verfügbar',

    // ChatPanel (legacy)
    chatHint: 'Wählen Sie oben eine Inspiration, beschreiben Sie dann gewünschte Änderungen — passen Sie Maße, Materialien, Stil oder Details an.',

    // MaterialsLibrary
    materialsTitle: '🪵 Materialien',

    // InspirationGallery
    inspirationsTitle: '✨ Inspirationen',

    // VersionHistorySidebar
    versionHistoryTitle: '📚 Versionsverlauf',
    versionEmpty: 'Ihre Design-Versionen erscheinen hier, während Sie iterieren.',
  },

  en: {
    // Header
    brandName: '🪑 Custom Furniture Studio',
    step1Label: 'Choose Image',
    step2Label: 'Design',
    step3Label: '3D Model',

    // Footer
    footer: 'Built with ❤️ • Powered by NanoBananPro AI + Hitem3D',

    // Language switcher
    langDE: 'DE',
    langEN: 'EN',
    langLabel: 'Language',

    // StepImageSelection
    chooseTitle: 'Choose Your Starting Image',
    chooseSubtitle: 'Upload your own design or select from our curated examples',
    uploadDrop: 'Drop your image here',
    uploadOr: 'or click to browse',
    uploadError: 'Please upload an image file',
    orChoose: 'or choose an example',

    // Inspirations titles & descriptions
    inspirationModernDeskTitle: 'Modern Floating Desk',
    inspirationModernDeskDesc: 'Clean lines with wall-mounted design, perfect for home offices.',
    inspirationCoffeeTableTitle: 'Scandinavian Coffee Table',
    inspirationCoffeeTableDesc: 'Rounded edges with warm wood tones and tapered legs.',
    inspirationBookshelfTitle: 'Industrial Bookshelf',
    inspirationBookshelfDesc: 'Open shelving with metal frame and reclaimed wood.',
    inspirationDiningTableTitle: 'Farmhouse Dining Table',
    inspirationDiningTableDesc: 'Solid wood construction with rustic charm, seats 6-8.',
    inspirationConsoleTableTitle: 'Mid-Century Console',
    inspirationConsoleTableDesc: 'Elegant entryway piece with storage and display.',
    inspirationSideTableTitle: 'Marble Side Table',
    inspirationSideTableDesc: 'Luxurious accent table with marble top and brass base.',

    // Materials names
    materialOakNatural: 'Natural Oak',
    materialWalnutDark: 'Dark Walnut',
    materialSteelBrushed: 'Brushed Steel',
    materialMarbleWhite: 'White Marble',
    materialLeatherBlack: 'Black Leather',
    materialBrassPolished: 'Polished Brass',

    // StepDesignChat
    refineTitel: 'Refine Your Design',
    refineSubtitle: 'Chat with AI to perfect your furniture design',
    back: '← Back',
    generate3D: 'Generate 3D Model →',
    noDesignSelected: 'No design selected',
    versionsLabel: 'Versions:',
    chatPlaceholder: "Describe changes: 'Make the legs thinner' or 'Add a drawer'...",
    send: 'Send',
    sending: '...',
    aiDesigning: 'AI is designing your changes...',
    tryLabel: 'Try:',
    suggestionModern: 'More modern',
    suggestionDrawer: 'Add drawer',
    suggestionLegs: 'Thinner legs',

    // StepModelViewer
    backToDesign: '← Back to Design',
    modelTitle: '3D Model Preview',
    modelSubtitle: 'View your furniture in 3D and AR',
    startNew: 'Start New Design',
    generatingModel: 'Generating 3D model...',
    loadingHint: 'This typically takes 3-5 seconds',
    modelFailed: 'Failed to generate 3D model',
    tryAgain: 'Try Again',
    referenceDesign: 'Reference Design',
    actions: 'Actions',
    viewAR: '📱 View in AR',
    download3D: '💾 Download 3D Model',
    shareDesign: '🔗 Share Design',
    tipsTitle: 'Tips',
    tip1: '🖱️ Drag to rotate the model',
    tip2: '🔍 Scroll to zoom in/out',
    tip3: '📱 On mobile, tap "View in AR" to place it in your space',
    arNotSupported: '⚠️ AR is not supported on this device',

    // ChatPanel (legacy)
    chatHint: "Pick an inspiration above, then describe changes you'd like — adjust dimensions, materials, style, or any details.",

    // MaterialsLibrary
    materialsTitle: '🪵 Materials',

    // InspirationGallery
    inspirationsTitle: '✨ Inspirations',

    // VersionHistorySidebar
    versionHistoryTitle: '📚 Version History',
    versionEmpty: 'Your design versions will appear here as you iterate.',
  },
} as const;

export type TranslationKey = keyof typeof translations['en'];
