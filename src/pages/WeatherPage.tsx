import React, { useState, useEffect } from 'react';
import { fetchLiveWeatherData, tamilNaduDistricts } from '../services/weatherService';
import { WeatherData } from '../types';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  Calendar,
  Compass,
  CheckCircle,
  ShieldAlert,
  RefreshCw,
  Sun
} from 'lucide-react';

export default function WeatherPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Thanjavur');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadWeather = async (district: string) => {
    setLoading(true);
    try {
      const data = await fetchLiveWeatherData(district);
      setWeather(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & District Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Regional Agro-Meteorological Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Weather Intelligence (வானிலை நுண்ணறிவு)</h1>
          <p className="text-sm text-emerald-200/80 mt-1">
            Real-time atmospheric telemetry and 7-day agricultural forecasts across Tamil Nadu agro-climatic zones.
          </p>
        </div>

        {/* District Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-300 font-semibold">Select District:</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[#081f13] border border-emerald-800 rounded-2xl px-4 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-emerald-500 shadow-xl"
          >
            {tamilNaduDistricts.map((d) => (
              <option key={d.district} value={d.district}>
                {d.tamilName} ({d.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="h-96 bg-[#06190f]/60 backdrop-blur-md rounded-3xl border border-emerald-900/60 flex flex-col items-center justify-center text-center p-8">
          <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
          <h3 className="text-lg font-bold text-white">Fetching Live Meteorological Telemetry...</h3>
          <p className="text-xs text-gray-400">Querying Open-Meteo & IMD regional weather grid for {selectedDistrict}</p>
        </div>
      ) : weather ? (
        <div className="space-y-6">
          {/* Main Weather Hero Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Current Conditions Card */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#0c2a19] to-[#06180e] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none">
                <Sun className="w-48 h-48 text-emerald-400 animate-spin-slow" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                    Live Station: {weather.district}, Tamil Nadu
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                    {weather.description}
                  </span>
                </div>

                <div className="flex items-baseline gap-4 my-6">
                  <span className="text-6xl sm:text-7xl font-black text-white">{weather.temperature}°C</span>
                  <div className="text-xs text-gray-400">
                    <span className="block text-emerald-400 font-semibold">Precipitation Chance</span>
                    <span className="text-xl font-bold text-sky-400">{weather.precipitationProbability}%</span>
                  </div>
                </div>

                {/* Sub-metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-900/60">
                  <div className="bg-[#04120a]/60 p-3 rounded-2xl border border-emerald-900/40">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      <span>Humidity</span>
                    </div>
                    <span className="text-lg font-black text-white">{weather.humidity}%</span>
                  </div>

                  <div className="bg-[#04120a]/60 p-3 rounded-2xl border border-emerald-900/40">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                      <Wind className="w-3.5 h-3.5 text-teal-400" />
                      <span>Wind Speed</span>
                    </div>
                    <span className="text-lg font-black text-white">{weather.windSpeed} km/h</span>
                  </div>

                  <div className="bg-[#04120a]/60 p-3 rounded-2xl border border-emerald-900/40">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Rain Gauge</span>
                    </div>
                    <span className="text-lg font-black text-white">{weather.rainfall} mm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Action & Weather Advisory */}
            <div className="lg:col-span-5 bg-[#091f13]/90 backdrop-blur-md border border-emerald-800/60 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Agricultural Weather Advisory (வேளாண் வழிகாட்டல்)</span>
                </h3>

                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed bg-[#05130b] p-4 rounded-2xl border border-emerald-900/50 mb-4">
                  {weather.advisory}
                </p>

                {weather.heatStressWarning && (
                  <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-600/50 text-amber-300 text-xs flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>Heat stress alert: High evapotranspiration rate. Maintain mulch cover over field crops.</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-900/60 text-[11px] text-gray-400 flex items-center justify-between">
                <span>Data Source: Open-Meteo & IMD</span>
                <span className="text-emerald-400">Refreshed Live</span>
              </div>
            </div>
          </div>

          {/* 7-Day Agricultural Forecast Bar */}
          <div className="bg-[#091f13]/80 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>7-Day Farming Weather Forecast</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast.map((f, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition ${
                    idx === 0
                      ? 'bg-emerald-950/80 border-emerald-500/50 shadow-md'
                      : 'bg-[#05140b] border-emerald-900/40 hover:bg-[#0c2b1a]'
                  }`}
                >
                  <span className="text-xs font-bold text-white">{f.day}</span>
                  <span className="text-[11px] text-gray-400 mb-2">{f.date}</span>

                  <span className="text-lg font-black text-emerald-300">{f.tempMax}°</span>
                  <span className="text-xs text-gray-400">{f.tempMin}°</span>

                  <div className="mt-2 text-[10px] text-sky-400 font-semibold">
                    Rain: {f.rainProb}%
                  </div>
                  <span className="text-[10px] text-gray-300 mt-1 line-clamp-1">{f.condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
