import { useState } from "react";
import { MapStandalone } from "./components/MapStandalone";
import HallazgosYPropuesta from "./components/HallazgosYPropuesta";
import HydroConsolidado from "./components/HydroConsolidado";
import RiskDataConsolidado from "./components/RiskDataConsolidado";
import CarbonDataConsolidado from "./components/CarbonDataConsolidado";
import EsiDataConsolidado from "./components/EsiDataConsolidado";
import DigitalAssets from "./components/DigitalAssets";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  const [viewMode, setViewMode] = useState<'hydro-mapbox-test' | 'hydro-consolidado' | 'esi-data-consolidado' | 'carbon-data-consolidado' | 'risk-data-consolidado' | 'hallazgos-propuesta' | 'digital-assets'>('hydro-mapbox-test');
  // Estado para guardar desde dónde se navegó al Executive Summary
  const [summaryBackTo, setSummaryBackTo] = useState<'hydro-mapbox-test' | 'digital-asset-card'>('hydro-mapbox-test');
  const [shouldOpenAssetCard, setShouldOpenAssetCard] = useState(false);
  
  // Estados para guardar desde dónde se navegó a cada Data Panel
  const [hydroBackTo, setHydroBackTo] = useState<'hydro-mapbox-test' | 'digital-asset-card'>('hydro-mapbox-test');
  const [esiBackTo, setEsiBackTo] = useState<'hydro-mapbox-test' | 'digital-asset-card'>('hydro-mapbox-test');
  const [riskBackTo, setRiskBackTo] = useState<'hydro-mapbox-test' | 'digital-asset-card'>('hydro-mapbox-test');

  const handleNavigate = (view: typeof viewMode, fromSource?: 'digital-asset-card') => {
    // Executive Summary
    if (view === 'hallazgos-propuesta' && fromSource === 'digital-asset-card') {
      setSummaryBackTo('digital-asset-card');
    } else if (view === 'hallazgos-propuesta') {
      setSummaryBackTo('hydro-mapbox-test');
    }
    
    // Hydro Consolidado
    if (view === 'hydro-consolidado' && fromSource === 'digital-asset-card') {
      setHydroBackTo('digital-asset-card');
    } else if (view === 'hydro-consolidado') {
      setHydroBackTo('hydro-mapbox-test');
    }
    
    // ESI Data Consolidado
    if (view === 'esi-data-consolidado' && fromSource === 'digital-asset-card') {
      setEsiBackTo('digital-asset-card');
    } else if (view === 'esi-data-consolidado') {
      setEsiBackTo('hydro-mapbox-test');
    }
    
    // Risk Data Consolidado
    if (view === 'risk-data-consolidado' && fromSource === 'digital-asset-card') {
      setRiskBackTo('digital-asset-card');
    } else if (view === 'risk-data-consolidado') {
      setRiskBackTo('hydro-mapbox-test');
    }
    
    // Manejo especial: volver desde Summary a la Tarjeta Digital
    if (view === 'hydro-mapbox-test-with-asset-card' as any) {
      setSummaryBackTo('hydro-mapbox-test'); // Reset para futuras navegaciones
      setHydroBackTo('hydro-mapbox-test');
      setEsiBackTo('hydro-mapbox-test');
      setRiskBackTo('hydro-mapbox-test');
      setShouldOpenAssetCard(true); // Indicar que debe abrir la tarjeta
      setViewMode('hydro-mapbox-test');
      return;
    }
    
    setShouldOpenAssetCard(false); // Reset al navegar a otra vista
    setViewMode(view);
  };

  return (
    <LanguageProvider>
      <div className="w-full h-full">
        {viewMode === 'hydro-mapbox-test' && <MapStandalone onBack={() => setViewMode('hydro-mapbox-test')} onNavigate={handleNavigate} shouldOpenAssetCard={shouldOpenAssetCard} onAssetCardClosed={() => setShouldOpenAssetCard(false)} />}
        {viewMode === 'hydro-consolidado' && <HydroConsolidado onNavigate={handleNavigate} backTo={hydroBackTo} />}
        {viewMode === 'esi-data-consolidado' && <EsiDataConsolidado onNavigate={handleNavigate} backTo={esiBackTo} />}
        {viewMode === 'carbon-data-consolidado' && <CarbonDataConsolidado onNavigate={setViewMode} />}
        {viewMode === 'risk-data-consolidado' && <RiskDataConsolidado onNavigate={handleNavigate} backTo={riskBackTo} />}
        {viewMode === 'hallazgos-propuesta' && <HallazgosYPropuesta onNavigate={handleNavigate} backTo={summaryBackTo} />}
        {viewMode === 'digital-assets' && <DigitalAssets onNavigate={setViewMode} />}
      </div>
    </LanguageProvider>
  );
}