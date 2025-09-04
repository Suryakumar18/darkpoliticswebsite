import React, { useState } from 'react'
import { Phone, MessageCircle, X, Plus } from 'lucide-react'

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (include country code without + sign)
    const phoneNumber = "1234567890"
    const message = "Hello! I'm interested in your services."
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handlePhoneCall = () => {
    // Replace with your phone number
    window.open('tel:+1234567890', '_self')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating action button */}
      <div className="relative">
        {/* Contact options - show when open */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-300">
            {/* WhatsApp Button */}
            <div className="group relative">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle size={24} />
              </button>
              {/* Tooltip */}
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                WhatsApp
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>

            {/* Phone Call Button */}
            <div className="group relative">
              <button
                onClick={handlePhoneCall}
                className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl"
                aria-label="Make a phone call"
              >
                <Phone size={24} />
              </button>
              {/* Tooltip */}
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Call Now
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </div>
        )}

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          }`}
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        >
          {isOpen ? <X size={28} /> : <Plus size={28} />}
        </button>
      </div>

      {/* Background overlay for mobile - optional */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 -z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}