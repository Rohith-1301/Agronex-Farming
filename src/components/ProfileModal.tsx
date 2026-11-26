import React, { useState } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { X, User, Phone, MapPin, Award, Layers, Save } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile, updateProfile, fields } = useFarmer();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [village, setVillage] = useState(profile.village);
  const [district, setDistrict] = useState(profile.district);
  const [state, setState] = useState(profile.state);
  const [experience, setExperience] = useState(profile.farmingExperienceYears);

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile({
      name,
      phone,
      village,
      district,
      state,
      farmingExperienceYears: experience
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#05140b] border border-emerald-500/50 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{profile.name}</h3>
            <span className="text-xs text-emerald-400 font-mono">Kisan ID: {profile.kisanId}</span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Farmer Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Mobile Contact</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Village</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Farming Experience (Years)</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(parseInt(e.target.value) || 1)}
                className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="bg-[#030e07] p-3 rounded-2xl border border-emerald-900/60 text-gray-300 space-y-1">
            <div className="flex items-center justify-between">
              <span>Total Landholding:</span>
              <strong className="text-white">{profile.totalLandAreaAcres} Acres</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Operational Fields:</span>
              <strong className="text-emerald-400">{fields.length} Active Plots</strong>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
