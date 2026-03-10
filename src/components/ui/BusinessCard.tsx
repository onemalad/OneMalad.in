'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiX, FiMapPin, FiPhone, FiClock, FiStar, FiInstagram, FiGlobe, FiExternalLink } from 'react-icons/fi';
import { Business, categoryIcons } from '@/data/businesses';

function WhatsAppButton({ whatsapp, name }: { whatsapp: string; name: string }) {
  const message = encodeURIComponent(`Hi! I found ${name} on OneMalad.in and would like to know more.`);
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all text-sm w-full justify-center"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      WhatsApp
    </a>
  );
}

function ZomatoButton({ link }: { link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 bg-[#E23744] text-white font-semibold rounded-xl hover:bg-[#cb2f3d] transition-all text-sm w-full justify-center"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.6 4.8h1.2v7.2h-1.2V4.8zm0 9.6h1.2v1.2h-1.2v-1.2z" />
      </svg>
      View on Zomato
    </a>
  );
}

function SwiggyButton({ link }: { link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#e5730f] transition-all text-sm w-full justify-center"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
      Order on Swiggy
    </a>
  );
}

function BusinessImage({ business }: { business: Business }) {
  const [imgError, setImgError] = useState(false);
  const icon = categoryIcons[business.category] || '📌';

  if (!business.image || imgError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">{icon}</span>
          <p className="text-xs font-bold text-pink-400 mt-2 tracking-wider uppercase">{business.category}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={business.image}
      alt={business.name}
      fill
      className="object-cover"
      onError={() => setImgError(true)}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

function BusinessModal({ business, onClose }: { business: Business; onClose: () => void }) {
  const icon = categoryIcons[business.category] || '📌';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 animate-modal-in">
        <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <FiX className="text-lg" />
          </button>
          <div className="text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-3 capitalize">
              {icon} {business.category}
            </span>
            <h2 className="text-2xl font-extrabold leading-tight">{business.name}</h2>
            <p className="text-sm opacity-90 mt-1 italic">{business.tagline}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-sm ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-1">{business.rating}</span>
            </div>
            <span className="text-sm font-bold text-green-600">{business.priceRange}</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{business.description}</p>

          <div className="flex flex-wrap gap-2">
            {business.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-3 bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{business.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">{business.timing}</span>
            </div>
            {business.phone && (
              <div className="flex items-center gap-3">
                <FiPhone className="text-emerald-500 flex-shrink-0" />
                <a href={`tel:${business.phone}`} className="text-sm text-emerald-600 hover:underline">
                  {business.phone}
                </a>
              </div>
            )}
            {business.instagram && (
              <div className="flex items-center gap-3">
                <FiInstagram className="text-pink-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{business.instagram}</span>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-3">
                <FiGlobe className="text-blue-500 flex-shrink-0" />
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Visit Website
                </a>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {business.whatsapp && (
              <WhatsAppButton whatsapp={business.whatsapp} name={business.name} />
            )}
            {business.zomatoLink && (
              <ZomatoButton link={business.zomatoLink} />
            )}
            {business.swiggyLink && (
              <SwiggyButton link={business.swiggyLink} />
            )}
          </div>

          {business.menuHighlights && business.menuHighlights.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-3">
                {business.category === 'gym' ? 'Plans & Pricing' : 'Menu Highlights'}
              </h3>
              <div className="space-y-2">
                {business.menuHighlights.map((item) => {
                  const parts = item.split(' - ');
                  return (
                    <div key={item} className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg">
                      <span className="text-sm text-gray-700">{parts[0]}</span>
                      {parts[1] && <span className="text-sm font-bold text-orange-600">{parts[1]}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BusinessCard({
  business,
  variant = 'default',
}: {
  business: Business;
  variant?: 'default' | 'hero';
}) {
  const [showModal, setShowModal] = useState(false);
  const icon = categoryIcons[business.category] || '📌';

  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer text-left w-full hover:-translate-y-1"
        >
          <div className="h-40 relative overflow-hidden">
            <BusinessImage business={business} />
            {business.featured && (
              <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {business.zomatoLink && (
                <span className="px-2 py-1 bg-[#E23744] text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                  <FiExternalLink className="text-[10px]" /> Zomato
                </span>
              )}
              {business.swiggyLink && (
                <span className="px-2 py-1 bg-[#FC8019] text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                  <FiExternalLink className="text-[10px]" /> Swiggy
                </span>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-extrabold text-gray-800 text-sm leading-tight group-hover:text-pink-600 transition-colors">
              {business.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 italic">{business.tagline}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 fill-yellow-400 text-xs" />
                <span className="text-xs font-semibold text-gray-600">{business.rating}</span>
              </div>
              <span className="text-xs font-semibold text-green-600">{business.priceRange}</span>
            </div>
          </div>
        </button>
        {showModal && <BusinessModal business={business} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group card card-hover cursor-pointer text-left w-full overflow-hidden"
      >
        {/* Image Header */}
        <div className="h-44 relative overflow-hidden">
          <BusinessImage business={business} />
          {business.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm">
              Featured
            </span>
          )}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {business.zomatoLink && (
              <span className="px-2.5 py-1 bg-[#E23744] text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm">
                <FiExternalLink className="text-[10px]" /> Zomato
              </span>
            )}
            {business.swiggyLink && (
              <span className="px-2.5 py-1 bg-[#FC8019] text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm">
                <FiExternalLink className="text-[10px]" /> Swiggy
              </span>
            )}
          </div>
          <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shadow-sm">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-800 text-base group-hover:text-emerald-600 transition-colors">
              {business.name}
            </h3>
          </div>
          <p className="text-xs text-gray-400 italic mt-0.5">{business.tagline}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-emerald-500" /> {business.area}
            </span>
            <span className="flex items-center gap-1">
              <FiStar className="text-yellow-400 fill-yellow-400" /> {business.rating}
            </span>
            <span className="font-semibold text-green-600">{business.priceRange}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {business.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
      {showModal && <BusinessModal business={business} onClose={() => setShowModal(false)} />}
    </>
  );
}
