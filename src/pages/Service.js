import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Share2, 
  BarChart3, 
  Search, 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  Star, 
  Calendar, 
  Vote, 
  Target,
  Loader2,
  AlertCircle
} from 'lucide-react'

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)
  const [servicesData, setServicesData] = useState({
    services: [],
    headerContent: {
      subtitle: "",
      mainTitle: "",
      description: ""
    },
    ctaSection: {
      title: "",
      description: "",
      buttonText: ""
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_BASE_URL = 'http://localhost:5000/api/services'

  // Icon mapping for dynamic icons
  const iconMap = {
    Users: <Users />,
    TrendingUp: <TrendingUp />,
    MessageSquare: <MessageSquare />,
    Share2: <Share2 />,
    BarChart3: <BarChart3 />,
    Search: <Search />,
    DollarSign: <DollarSign />,
    Shield: <Shield />,
    AlertTriangle: <AlertTriangle />,
    Star: <Star />,
    Calendar: <Calendar />,
    Vote: <Vote />,
    Target: <Target />
  }

  const fetchServicesData = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL)
      const data = await response.json()
      
      if (data.success) {
        setServicesData(data.data)
        setError('')
      } else {
        setError(data.message || 'Failed to fetch services data')
        // Initialize with empty data structure
        setServicesData({
          services: [],
          headerContent: {
            subtitle: "",
            mainTitle: "",
            description: ""
          },
          ctaSection: {
            title: "",
            description: "",
            buttonText: ""
          }
        })
      }
    } catch (err) {
      console.error('Error fetching services data:', err)
      setError('Failed to connect to server. Please check if the API is running.')
      // Initialize with empty data structure
      setServicesData({
        services: [],
        headerContent: {
          subtitle: "",
          mainTitle: "",
          description: ""
        },
        ctaSection: {
          title: "",
          description: "",
          buttonText: ""
        }
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServicesData()
  }, [])

  useEffect(() => {
    if (!loading && servicesData.services.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const cardId = entry.target.dataset.cardId
              setVisibleCards(prev => [...new Set([...prev, cardId])])
            }
          })
        },
        { threshold: 0.1 }
      )

      const cards = document.querySelectorAll('.service-card')
      cards.forEach(card => observer.observe(card))

      return () => observer.disconnect()
    }
  }, [loading, servicesData.services])

  // Loading Component
  if (loading) {
    return (
      <>
        <style>{`
          .loading-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .loading-content {
            text-align: center;
            z-index: 10;
            position: relative;
          }

          .loading-spinner {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            color: #60a5fa;
            animation: spin 1s linear infinite;
          }

          .loading-text {
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .loading-subtext {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.08) 0%, transparent 50%);
          }
        `}</style>
        
        <div className="loading-container">
          <div className="background-overlay"></div>
          <div className="loading-content">
            <Loader2 className="loading-spinner" />
            <div className="loading-text">Loading Services</div>
            <div className="loading-subtext">Please wait while we fetch the latest data...</div>
          </div>
        </div>
      </>
    )
  }

  // Error Component
  if (error && servicesData.services.length === 0) {
    return (
      <>
        <style>{`
          .error-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 20px;
          }

          .error-content {
            text-align: center;
            z-index: 10;
            position: relative;
            max-width: 500px;
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 16px;
            padding: 40px 30px;
          }

          .error-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            color: #f87171;
          }

          .error-title {
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 12px;
          }

          .error-message {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 24px;
          }

          .retry-button {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          }

          .retry-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.08) 0%, transparent 50%);
          }
        `}</style>
        
        <div className="error-container">
          <div className="background-overlay"></div>
          <div className="error-content">
            <AlertCircle className="error-icon" />
            <div className="error-title">Unable to Load Services</div>
            <div className="error-message">{error}</div>
            <button className="retry-button" onClick={fetchServicesData}>
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .services-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
          position: relative;
          overflow: hidden;
          padding: 40px 0;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: float-particle 8s ease-in-out infinite;
        }

        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; animation-duration: 6s; }
        .particle:nth-child(2) { top: 40%; left: 80%; animation-delay: 1s; animation-duration: 8s; }
        .particle:nth-child(3) { top: 60%; left: 20%; animation-delay: 2s; animation-duration: 7s; }
        .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; animation-duration: 9s; }

        .floating-bg-element-1 {
          position: absolute;
          top: 15%;
          right: 10%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float-bg 12s ease-in-out infinite;
          filter: blur(30px);
        }

        .floating-bg-element-2 {
          position: absolute;
          bottom: 20%;
          left: 8%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          animation: float-bg 10s ease-in-out infinite reverse;
          filter: blur(25px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
          opacity: 0;
          animation: fade-in-up 1s ease-out 0.2s forwards;
        }

        .subtitle {
          color: #60a5fa;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
        }

        .main-title {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: bold;
          background: linear-gradient(45deg, #ffffff, #90caf9, #64b5f6, #42a5f5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.1;
          opacity: 0;
          animation: fade-in-up 1s ease-out 0.6s forwards;
        }

        .description {
          color: rgba(255, 255, 255, 0.85);
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
          opacity: 0;
          animation: fade-in-up 1s ease-out 0.8s forwards;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .service-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
          cursor: pointer;
        }

        .service-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.05), transparent);
          transform: rotate(45deg);
          transition: transform 0.6s ease;
          opacity: 0;
        }

        .service-card:hover::before {
          opacity: 1;
          transform: rotate(45deg) translateY(-15px);
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          background: rgba(30, 41, 59, 0.6);
        }

        .service-icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 12px;
          margin-bottom: 16px;
          position: relative;
          transition: all 0.4s ease;
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }

        .service-card:hover .service-icon-container {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        .service-icon-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #60a5fa, #3b82f6, #1d4ed8);
          border-radius: 14px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-card:hover .service-icon-container::before {
          opacity: 1;
        }

        .service-icon {
          width: 20px;
          height: 20px;
          color: white;
          stroke-width: 2;
        }

        .service-title {
          font-size: 18px;
          font-weight: bold;
          color: white;
          margin-bottom: 10px;
          transition: color 0.3s ease;
          line-height: 1.3;
        }

        .service-card:hover .service-title {
          color: #93c5fd;
        }

        .service-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 16px;
          transition: color 0.3s ease;
        }

        .service-card:hover .service-description {
          color: rgba(255, 255, 255, 0.9);
        }

        .features-list {
          list-style: none;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .service-card:hover .feature-item {
          opacity: 1;
          transform: translateX(6px);
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          background: #60a5fa;
          border-radius: 50%;
          margin-right: 12px;
          box-shadow: 0 0 8px rgba(96, 165, 250, 0.5);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .service-card:hover .feature-dot {
          background: #3b82f6;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.7);
          transform: scale(1.2);
        }

        .feature-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .service-card:hover .feature-text {
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-section {
          text-align: center;
          background: rgba(30, 41, 59, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 20px;
          padding: 40px 30px;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
        }

        .cta-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: bold;
          color: white;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .cta-description {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          padding: 14px 36px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .no-services {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
        }

        /* Animations */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes float-bg {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-container {
            padding: 30px 0;
          }

          .container {
            padding: 0 15px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .service-card {
            padding: 20px;
          }

          .service-icon-container {
            width: 45px;
            height: 45px;
            border-radius: 10px;
          }

          .service-icon {
            width: 18px;
            height: 18px;
          }

          .service-title {
            font-size: 16px;
          }

          .service-description {
            font-size: 12px;
          }

          .cta-section {
            padding: 30px 20px;
            border-radius: 16px;
          }

          .cta-button {
            padding: 12px 28px;
            font-size: 14px;
          }

          .floating-bg-element-1,
          .floating-bg-element-2 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .service-card {
            padding: 16px;
          }
          
          .main-title {
            font-size: 2rem;
          }

          .service-title {
            font-size: 15px;
          }

          .feature-text {
            font-size: 11px;
          }
        }
      `}</style>

      <div className="services-container">
        <div className="background-overlay"></div>
        
        {/* Floating Background Elements */}
        <div className="floating-bg-element-1"></div>
        <div className="floating-bg-element-2"></div>

        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container">
          {/* Header Section */}
          <div className="header-section">
            <p className="subtitle">{servicesData.headerContent.subtitle || "Our Services"}</p>
            <h1 className="main-title">{servicesData.headerContent.mainTitle || "Complete Political Solutions"}</h1>
            <p className="description">
              {servicesData.headerContent.description || "From strategic planning to crisis management, we provide comprehensive political consulting services that drive success and create lasting impact."}
            </p>
          </div>

          {/* Services Grid */}
          {servicesData.services.length > 0 ? (
            <div className="services-grid">
              {servicesData.services
                .filter(service => service.active)
                .sort((a, b) => a.order - b.order)
                .map((service, index) => (
                <div
                  key={service._id}
                  data-card-id={service._id}
                  className={`service-card ${visibleCards.includes(service._id) ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onMouseEnter={() => setHoveredCard(service._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon */}
                  <div className="service-icon-container">
                    <div className="service-icon">
                      {iconMap[service.icon] || <Target />}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  {/* Features List */}
                  <ul className="features-list">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <div className="feature-dot"></div>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-services">
              <p>No services available at the moment.</p>
            </div>
          )}

          {/* Call to Action Section */}
          <div className="cta-section">
            <h2 className="cta-title">{servicesData.ctaSection.title || "Ready to Transform Your Political Journey?"}</h2>
            <p className="cta-description">
              {servicesData.ctaSection.description || "Let's discuss how our comprehensive services can help you achieve your political goals."}
            </p>
            <button className="cta-button">{servicesData.ctaSection.buttonText || "Get Started Today"}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services