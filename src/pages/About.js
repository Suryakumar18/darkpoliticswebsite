import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, TrendingUp, Brain, Shield } from "lucide-react"

const AboutUs = () => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_BASE_URL = 'https://darkpoliticswebsitebackend.onrender.com/api/aboutus'

  const fetchAboutUsData = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL)
      const result = await response.json()
      
      if (result.success) {
        setAboutData(result.data)
        setError('')
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      console.error('Error fetching about us data:', err)
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAboutUsData()
    setLoaded(true)

    const slideInterval = setInterval(() => {
      if (aboutData && aboutData.carouselImages) {
        setCurrentSlide((prev) => (prev + 1) % aboutData.carouselImages.length)
      }
    }, 4000)

    return () => clearInterval(slideInterval)
  }, [aboutData?.carouselImages?.length])

  const nextSlide = () => {
    if (aboutData && aboutData.carouselImages) {
      setCurrentSlide((prev) => (prev + 1) % aboutData.carouselImages.length)
    }
  }

  const prevSlide = () => {
    if (aboutData && aboutData.carouselImages) {
      setCurrentSlide((prev) => (prev - 1 + aboutData.carouselImages.length) % aboutData.carouselImages.length)
    }
  }

  // Default data in case API fails or is loading
  const defaultCarouselImages = [
    {
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      title: "Strategic Planning",
      description: "Comprehensive political strategy development"
    },
    {
      url: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2131&q=80",
      title: "Campaign Management",
      description: "Full-scale campaign orchestration"
    }
  ]

  const defaultServices = [
    {
      icon: <Brain className="service-icon" />,
      title: "Strategic Consulting",
      description: "Deep political analysis and strategic planning"
    },
    {
      icon: <Users className="service-icon" />,
      title: "Campaign Management", 
      description: "End-to-end campaign execution and oversight"
    }
  ]

  const defaultStats = [
    { number: "150+", label: "Successful Campaigns" },
    { number: "25+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Political Victories" }
  ]

  if (loading) {
    return (
      <div className="about-container">
        <div className="container">
          <div className="header">
            <p className="subtitle">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !aboutData) {
    return (
      <div className="about-container">
        <div className="container">
          <div className="header">
            <p className="subtitle">Error</p>
            <p className="description">{error}</p>
          </div>
        </div>
      </div>
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

        .about-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
          padding: 64px 0;
        }

        .floating-bg-1 {
          position: absolute;
          top: 10%;
          right: 5%;
          width: 128px;
          height: 128px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
        }

        .floating-bg-2 {
          position: absolute;
          bottom: 15%;
          left: 3%;
          width: 96px;
          height: 96px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0.4;
          animation: float 6s ease-in-out infinite reverse;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header {
          text-align: center;
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease-out 0.2s forwards;
        }

        .subtitle {
          color: #60a5fa;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .main-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: bold;
          background: linear-gradient(45deg, #ffffff, #90caf9, #64b5f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 18px;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .left-content {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 1.2s ease-out 0.4s forwards;
        }

        .section-title {
          font-size: 32px;
          font-weight: bold;
          color: white;
          margin-bottom: 24px;
        }

        .mission-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .subsection-title {
          font-size: 24px;
          font-weight: 600;
          color: #60a5fa;
          margin-bottom: 24px;
        }

        .features-list {
          margin-bottom: 32px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 12px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.8s; }
        .feature-item:nth-child(2) { animation-delay: 1.0s; }
        .feature-item:nth-child(3) { animation-delay: 1.2s; }
        .feature-item:nth-child(4) { animation-delay: 1.4s; }

        .feature-item:hover {
          background: rgba(59, 130, 246, 0.15);
          transform: translateX(8px);
        }

        .feature-dot {
          width: 8px;
          height: 8px;
          background: #64b5f6;
          border-radius: 50%;
          margin-right: 16px;
          box-shadow: 0 0 10px rgba(100, 181, 246, 0.5);
          flex-shrink: 0;
        }

        .feature-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .service-card {
          padding: 24px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 16px;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .service-card:nth-child(1) { animation-delay: 1.2s; }
        .service-card:nth-child(2) { animation-delay: 1.35s; }
        .service-card:nth-child(3) { animation-delay: 1.5s; }
        .service-card:nth-child(4) { animation-delay: 1.65s; }

        .service-card:hover {
          background: rgba(59, 130, 246, 0.15);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .service-icon {
          width: 32px;
          height: 32px;
          color: #60a5fa;
          margin-bottom: 12px;
        }

        .service-title {
          color: white;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .service-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.5;
        }

        .right-content {
          opacity: 0;
          transform: translateX(50px);
          animation: slideInRight 1.2s ease-out 0.6s forwards;
        }

        .carousel-container {
          position: relative;
        }

        .carousel {
          position: relative;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 768px) {
          .carousel {
            height: 500px;
          }
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%);
          z-index: 2;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          z-index: 1;
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);
          padding: 24px;
          z-index: 3;
        }

        .carousel-title {
          font-size: 28px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
        }

        .carousel-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(59, 130, 246, 0.8);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 4;
        }

        .carousel-nav:hover {
          background: rgba(59, 130, 246, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav.prev {
          left: 16px;
        }

        .carousel-nav.next {
          right: 16px;
        }

        .carousel-nav svg {
          width: 24px;
          height: 24px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          width: 32px;
          background: #3b82f6;
          border-radius: 6px;
        }

        .indicator:hover:not(.active) {
          background: rgba(255, 255, 255, 0.5);
        }

        .floating-decoration-1 {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 32px;
          height: 32px;
          background: linear-gradient(45deg, #60a5fa, #3b82f6);
          border-radius: 50%;
          opacity: 0.7;
          animation: float 4s ease-in-out infinite;
          z-index: 5;
        }

        .floating-decoration-2 {
          position: absolute;
          bottom: -12px;
          left: -12px;
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite reverse;
          z-index: 5;
        }

        .stats-section {
          margin-top: 80px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 1s forwards;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          text-align: center;
          padding: 32px 24px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 20px;
          transition: all 0.5s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 1.2s; }
        .stat-card:nth-child(2) { animation-delay: 1.3s; }
        .stat-card:nth-child(3) { animation-delay: 1.4s; }
        .stat-card:nth-child(4) { animation-delay: 1.5s; }

        .stat-card:hover {
          background: rgba(59, 130, 246, 0.15);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .stat-number {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: bold;
          background: linear-gradient(45deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          font-size: 14px;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-30px) scale(1.1); 
          }
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @media (max-width: 640px) {
          .container {
            padding: 0 16px;
          }
          
          .carousel {
            height: 300px;
          }
          
          .carousel-content {
            padding: 16px;
          }
          
          .carousel-title {
            font-size: 20px;
          }
          
          .carousel-description {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="about-container">
        <div className="floating-bg-1"></div>
        <div className="floating-bg-2"></div>

        <div className="container">
          <div className="header">
            <p className="subtitle">{aboutData?.header?.subtitle || "About Dark State"}</p>
            <h1 className="main-title">{aboutData?.header?.title || "Redefining Political Excellence"}</h1>
            <p className="description">
              {aboutData?.header?.description || "We are the architects of political transformation, crafting strategies that turn visions into victories."}
            </p>
          </div>

          <div className="content-grid">
            <div className="left-content">
              <h2 className="section-title">{aboutData?.mission?.title || "Our Mission"}</h2>
              <p className="mission-text">
                {aboutData?.mission?.content || "At Dark State Political Consultancy, we believe that great campaigns are born from the perfect fusion of strategic insight, innovative thinking, and relentless execution. Our team of seasoned professionals brings decades of experience in political strategy, digital marketing, and stakeholder engagement."}
              </p>

              <h3 className="subsection-title">{aboutData?.mission?.subsectionTitle || "What Sets Us Apart"}</h3>
              <div className="features-list">
                {(aboutData?.features || [
                  "Data-driven strategies backed by comprehensive research",
                  "Innovative digital solutions for modern campaigns",
                  "Proven track record across diverse political landscapes",
                  "24/7 dedicated support throughout your campaign"
                ]).map((item, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-dot"></div>
                    <p className="feature-text">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="right-content">
              <div className="carousel-container">
                <div className="carousel">
                  <div className="carousel-overlay"></div>
                  
                  {(aboutData?.carouselImages || defaultCarouselImages).map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="carousel-image"
                      />
                    </div>
                  ))}

                  <div className="carousel-content">
                    <h3 className="carousel-title">
                      {(aboutData?.carouselImages || defaultCarouselImages)[currentSlide]?.title}
                    </h3>
                    <p className="carousel-description">
                      {(aboutData?.carouselImages || defaultCarouselImages)[currentSlide]?.description}
                    </p>
                  </div>

                  <button onClick={prevSlide} className="carousel-nav prev">
                    <ChevronLeft />
                  </button>

                  <button onClick={nextSlide} className="carousel-nav next">
                    <ChevronRight />
                  </button>

                  <div className="floating-decoration-1"></div>
                  <div className="floating-decoration-2"></div>
                </div>

                <div className="carousel-indicators">
                  {(aboutData?.carouselImages || defaultCarouselImages).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`indicator ${currentSlide === index ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stats-grid">
              {(aboutData?.stats || defaultStats).map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs