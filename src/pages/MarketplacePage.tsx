import React, { useState } from 'react';
import { initialMarketListings, mandiRatesTamilNadu } from '../data/marketData';
import { MarketListing } from '../types';
import {
  ShoppingBag,
  TrendingUp,
  Search,
  Filter,
  PlusCircle,
  Phone,
  MessageSquare,
  CheckCircle,
  X,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketListing[]>(initialMarketListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [contactModalListing, setContactModalListing] = useState<MarketListing | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // New Listing Form State
  const [newListing, setNewListing] = useState({
    farmerName: 'செல்வராஜ் முனியப்பன் (Selvaraj)',
    crop: 'Paddy (நெல்)',
    variety: 'Deluxe Ponni (டீலக்ஸ் பொன்னி)',
    quantityKg: 2000,
    pricePerKg: 32,
    district: 'Thanjavur',
    contactNumber: '+91 94431 88201',
    organicCertified: true,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly harvested dry paddy with less than 12% moisture. Ideal for boiled rice mills.'
  });

  const filteredListings = listings.filter((l) => {
    const matchesSearch =
      l.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'All' || l.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MarketListing = {
      id: `list-${Date.now()}`,
      farmerName: newListing.farmerName,
      crop: newListing.crop,
      variety: newListing.variety,
      quantityKg: newListing.quantityKg,
      pricePerKg: newListing.pricePerKg,
      district: newListing.district,
      contactNumber: newListing.contactNumber,
      harvestDate: new Date().toISOString().split('T')[0],
      organicCertified: newListing.organicCertified,
      imageUrl: newListing.imageUrl,
      description: newListing.description
    };

    setListings([created, ...listings]);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Post Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Direct Farmer-to-Buyer Agricultural Trade</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Market Connect (விவசாய சந்தை)</h1>
          <p className="text-sm text-emerald-200/80 mt-1">
            Zero middlemen commission. Buy verified produce directly from farmers across Tamil Nadu.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/50 transition self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Crop Listing (விற்பனை செய்ய)</span>
        </button>
      </div>

      {/* Live Mandi APMC Price Ticker */}
      <div className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Mandi Price Dashboard (நேரடி ஒழுங்குமுறை விற்பனைக் கூடம்)
            </h3>
          </div>
          <span className="text-xs text-gray-400">APMC Tamil Nadu • Refreshed Today</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mandiRatesTamilNadu.map((r) => (
            <div key={r.id} className="bg-[#04120a] p-3 rounded-2xl border border-emerald-900/40 space-y-1">
              <span className="text-[11px] text-gray-400 block line-clamp-1">{r.mandi}</span>
              <h4 className="text-xs font-bold text-white">{r.commodity}</h4>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-base font-black text-emerald-300">₹{r.modalPrice}</span>
                <span className={`text-[10px] font-bold flex items-center ${
                  r.priceTrend === 'up' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {r.priceTrend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {r.changePercent}%
                </span>
              </div>
              <span className="text-[10px] text-gray-500 block">{r.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#091f13]/70 backdrop-blur-md p-4 rounded-2xl border border-emerald-900/60">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search crop, variety, or farmer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05140b] border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="All">All Districts (அனைத்து மாவட்டங்கள்)</option>
            <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
            <option value="Coimbatore">Coimbatore (கோவை)</option>
            <option value="Erode">Erode (ஈரோடு)</option>
            <option value="Tiruchirappalli">Tiruchirappalli (திருச்சி)</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl overflow-hidden shadow-xl hover:border-emerald-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={listing.imageUrl} alt={listing.crop} className="w-full h-full object-cover" />
                {listing.organicCertified && (
                  <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 border border-white/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Organic Certified</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black/80 text-emerald-300 text-xs font-black px-2.5 py-1 rounded-xl">
                  ₹{listing.pricePerKg} / kg
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div>
                  <h3 className="text-base font-bold text-white">{listing.crop}</h3>
                  <p className="text-xs text-emerald-400 font-medium">{listing.variety}</p>
                </div>

                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{listing.district}, Tamil Nadu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Harvested: {listing.harvestDate}</span>
                  </div>
                </div>

                <div className="bg-[#04120a] p-2.5 rounded-xl border border-emerald-900/40 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Available Stock:</span>
                  <span className="font-bold text-white">{listing.quantityKg.toLocaleString()} kg</span>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2">{listing.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  setContactModalListing(listing);
                  setEnquirySuccess(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Farmer (தொடர்புகொள்க)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Post New Crop Listing */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091f13] border border-emerald-700/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-800/60 mb-4">
              <h3 className="text-lg font-bold text-white">Post Crop for Sale (விவசாய விளைபொருள் பதிவு)</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    required
                    value={newListing.farmerName}
                    onChange={(e) => setNewListing({ ...newListing, farmerName: e.target.value })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">District</label>
                  <select
                    value={newListing.district}
                    onChange={(e) => setNewListing({ ...newListing, district: e.target.value })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
                    <option value="Coimbatore">Coimbatore (கோவை)</option>
                    <option value="Erode">Erode (ஈரோடு)</option>
                    <option value="Tiruchirappalli">Tiruchirappalli (திருச்சி)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Crop</label>
                  <input
                    type="text"
                    required
                    value={newListing.crop}
                    onChange={(e) => setNewListing({ ...newListing, crop: e.target.value })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Variety</label>
                  <input
                    type="text"
                    required
                    value={newListing.variety}
                    onChange={(e) => setNewListing({ ...newListing, variety: e.target.value })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Total Quantity (kg)</label>
                  <input
                    type="number"
                    required
                    value={newListing.quantityKg}
                    onChange={(e) => setNewListing({ ...newListing, quantityKg: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Price per kg (₹)</label>
                  <input
                    type="number"
                    required
                    value={newListing.pricePerKg}
                    onChange={(e) => setNewListing({ ...newListing, pricePerKg: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={newListing.contactNumber}
                  onChange={(e) => setNewListing({ ...newListing, contactNumber: e.target.value })}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Description / Quality Details</label>
                <textarea
                  rows={2}
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-emerald-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Contact Farmer */}
      {contactModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091f13] border border-emerald-700/60 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-800/60 mb-4">
              <h3 className="text-base font-bold text-white">Contact Farmer Directly</h3>
              <button onClick={() => setContactModalListing(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {enquirySuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Purchase Enquiry Sent!</h4>
                <p className="text-xs text-gray-300">
                  Farmer {contactModalListing.farmerName} has received your requirement and phone contact.
                </p>
                <button
                  onClick={() => setContactModalListing(null)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-[#05140b] p-3.5 rounded-2xl border border-emerald-900/50 space-y-1">
                  <span className="text-emerald-400 font-bold block">{contactModalListing.crop} ({contactModalListing.variety})</span>
                  <p className="text-gray-300">Farmer: <strong>{contactModalListing.farmerName}</strong></p>
                  <p className="text-gray-400">Location: {contactModalListing.district}, Tamil Nadu</p>
                  <p className="text-white font-bold pt-1">Price: ₹{contactModalListing.pricePerKg} / kg</p>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:${contactModalListing.contactNumber}`}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center block transition shadow-lg shadow-emerald-900/50"
                  >
                    Direct Call: {contactModalListing.contactNumber}
                  </a>

                  <button
                    onClick={() => setEnquirySuccess(true)}
                    className="w-full py-3 rounded-2xl bg-[#05140b] hover:bg-[#0d2e1c] text-emerald-300 border border-emerald-800 font-bold text-center block transition"
                  >
                    Send Instant WhatsApp / SMS Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
