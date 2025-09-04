import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  Brain, 
  MapPin, 
  BarChart3, 
  Target, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Globe,
  UserCheck,
  Zap,
  Shield,
  Loader
} from 'lucide-react'

const Career = () => {
  const [activeTab, setActiveTab] = useState('expertise')
  const [visibleCards, setVisibleCards] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [careerData, setCareerData] = useState({
    expertiseAreas: [],
    careerPaths: [],
    benefits: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_BASE_URL = 'http://localhost:5000/api/career'

  // Icon mapping for dynamic icons
  const iconMap = {
    MapPin: <MapPin />,
    Users: <Users />,
    Globe: <Globe />,
    Brain: <Brain />,
    BarChart3: <BarChart3 />,
    Target: <Target />,
    Award: <Award />,
    TrendingUp: <TrendingUp />,
    GraduationCap: <GraduationCap />,
    Briefcase: <Briefcase />,
    UserCheck: <UserCheck />,
    Zap: <Zap />,
    Shield: <Shield />
  }

  // Fetch career data from API
  const fetchCareerData = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setCareerData(result.data)
        setError('')
      } else {
        setError(result.message || 'Failed to fetch career data')
      }
    } catch (err) {
      console.error('Error fetching career data:', err)
      setError(`Failed to connect to server: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCareerData()
  }, [])

  // Initialize visibility for career cards when data loads or tab changes
  useEffect(() => {
    // Remove all animation logic, cards are always visible
    if (activeTab === 'careers' && careerData.careerPaths.length > 0) {
      // Set all cards as visible immediately
      const newVisibleCards = {};
      careerData.careerPaths.forEach((career, index) => {
        newVisibleCards[career._id || index] = true;
      });
      setVisibleCards(newVisibleCards);
    } else if (activeTab !== 'careers') {
      setVisibleCards({});
    }
  }, [activeTab, careerData.careerPaths])

  // Intersection Observer for general scroll animations (optional enhancement)
  useEffect(() => {
    // Remove observer logic for card animations
    return () => {};
  }, [activeTab, careerData.careerPaths])

  if (loading) {
    return (
      <div className="career-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Loader className="animate-spin" size={48} style={{ margin: '0 auto 20px', color: '#ff9d33' }} />
          <p style={{ fontSize: '18px', opacity: 0.8 }}>Loading career opportunities...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="career-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: 'white', padding: '40px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <p style={{ fontSize: '18px', marginBottom: '20px', color: '#ff6b6b' }}>Error: {error}</p>
          <button 
            onClick={fetchCareerData}
            style={{
              background: 'linear-gradient(135deg, #ff6b00, #ff9d33)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Retry
          </button>
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

        .career-container {
          min-height: 100vh;
          background: 
            linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.1) 0%, transparent 50%);
          position: relative;
          overflow: hidden;
          padding: 60px 0;
        }

        .bg-particles {
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
          width: 2px;
          height: 2px;
          background: #ff9d33;
          border-radius: 50%;
          animation: float-particle 6s ease-in-out infinite;
          opacity: 0.6;
        }

        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 50%; left: 80%; animation-delay: 2s; }
        .particle:nth-child(3) { top: 70%; left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { top: 30%; left: 70%; animation-delay: 1s; }
        .particle:nth-child(5) { top: 80%; left: 60%; animation-delay: 3s; }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .header-section {
          text-align: center;
          margin-bottom: 60px;
          opacity: 0;
          animation: slide-up 1s ease-out 0.2s forwards;
        }

        .career-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.15), rgba(255, 153, 51, 0.1));
          backdrop-filter: blur(10px);
          border: 2px solid;
          border-image: linear-gradient(45deg, #ff6b00, #ff9d33, #ffb366) 1;
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 20px;
          color: #ff9d33;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }

        .career-badge::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 107, 0, 0.1), transparent);
          animation: rotate 4s linear infinite;
        }

        .main-heading {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: bold;
          background: linear-gradient(135deg, #ffffff, #ff9d33, #ff6b00, #ffffff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          line-height: 1.1;
          animation: gradient-shift 3s ease infinite;
        }

        .main-description {
          color: rgba(255, 255, 255, 0.85);
          font-size: 18px;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          gap: 0;
          position: relative;
          background: rgba(30, 35, 66, 0.3);
          backdrop-filter: blur(15px);
          border-radius: 50px;
          padding: 8px;
          border: 1px solid rgba(255, 107, 0, 0.2);
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .tab-button {
          background: transparent;
          border: none;
          border-radius: 40px;
          padding: 12px 24px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          color: white;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 107, 0, 0.3);
        }

        .tab-button:hover:not(.active) {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 107, 0, 0.1);
        }

        .content-section {
          opacity: 0;
          animation: fade-in 0.5s ease-out forwards;
        }

        /* Expertise Section - Tilted Cards */
        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .expertise-card {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          transform: rotate(-2deg);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .expertise-card:nth-child(even) {
          transform: rotate(2deg);
        }

        .expertise-card:hover {
          transform: rotate(0deg) scale(1.05) translateY(-10px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(255, 107, 0, 0.2);
        }

        .expertise-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--card-color, #ff6b00));
          border-radius: 24px 24px 0 0;
        }

        .expertise-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--card-color, #ff6b00));
          border-radius: 20px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .expertise-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          transition: transform 0.6s ease;
        }

        .expertise-card:hover .expertise-icon::before {
          transform: rotate(45deg) translate(50px, 50px);
        }

        .expertise-icon svg {
          width: 28px;
          height: 28px;
          color: white;
          stroke-width: 2;
          z-index: 1;
          position: relative;
        }

        .expertise-title {
          font-size: 22px;
          font-weight: bold;
          color: white;
          margin-bottom: 16px;
          transition: color 0.3s ease;
        }

        .expertise-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .expertise-details {
          list-style: none;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .expertise-card:hover .detail-item {
          opacity: 1;
          transform: translateX(8px);
        }

        .detail-bullet {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, var(--card-color, #ff6b00));
          border-radius: 50%;
          margin-right: 16px;
          margin-top: 6px;
          box-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
          flex-shrink: 0;
        }

        .detail-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }

        /* Career Paths - Rectangle Cards with Enhanced Animations */
        .career-paths-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .career-card {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          opacity: 1; /* Always visible */
          transform: none; /* No animation transform */
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .career-card.visible {
          /* No animation */
        }

        /* Remove animation keyframes and delays for career cards */
        .career-card {
          animation: none !important;
        }

        /* Different color schemes for cards */
        .career-card:nth-child(1) { 
          --gradient-start: #3b82f6; 
          --gradient-end: #93c5fd; 
          --glow-color: rgba(59, 130, 246, 0.3);
        }
        .career-card:nth-child(2) { 
          --gradient-start: #ec4899; 
          --gradient-end: #fb7185; 
          --glow-color: rgba(236, 72, 153, 0.3);
        }
        .career-card:nth-child(3) { 
          --gradient-start: #22c55e; 
          --gradient-end: #4ade80; 
          --glow-color: rgba(34, 197, 94, 0.3);
        }
        .career-card:nth-child(4) { 
          --gradient-start: #f59e0b; 
          --gradient-end: #fbbf24; 
          --glow-color: rgba(245, 158, 11, 0.3);
        }
        .career-card:nth-child(5) { 
          --gradient-start: #8b5cf6; 
          --gradient-end: #a78bfa; 
          --glow-color: rgba(139, 92, 246, 0.3);
        }
        .career-card:nth-child(6) { 
          --gradient-start: #ef4444; 
          --gradient-end: #f87171; 
          --glow-color: rgba(239, 68, 68, 0.3);
        }

        .career-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--gradient-start, #3b82f6), var(--gradient-end, #93c5fd));
          border-radius: 20px;
          margin-bottom: 24px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px var(--glow-color, rgba(59, 130, 246, 0.3));
          position: relative;
          overflow: hidden;
        }

        .career-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: rotate(45deg);
          transition: transform 0.6s ease;
        }

        .career-card:hover .career-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 15px 40px var(--glow-color, rgba(59, 130, 246, 0.4));
        }

        .career-card:hover .career-icon::before {
          transform: rotate(45deg) translate(50px, 50px);
        }

        .career-icon svg {
          width: 28px;
          height: 28px;
          color: white;
          stroke-width: 2;
          z-index: 1;
          position: relative;
        }

        .career-level {
          display: inline-block;
          background: linear-gradient(135deg, var(--gradient-start, #3b82f6)20, var(--gradient-end, #93c5fd)20);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 8px 16px;
          color: white;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .career-level::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .career-card:hover .career-level::before {
          left: 100%;
        }

        .career-title {
          font-size: 22px;
          font-weight: bold;
          color: white;
          margin-bottom: 16px;
          line-height: 1.2;
          transition: color 0.3s ease;
          position: relative;
        }

        .career-card:hover .career-title {
          color: var(--gradient-start, #3b82f6);
        }

        .career-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .career-card:hover .career-description {
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .skill-tag {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 14px;
          padding: 6px 12px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 11px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .skill-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--gradient-start, #3b82f6)30, var(--gradient-end, #93c5fd)30);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .career-card:hover .skill-tag::before {
          opacity: 1;
        }

        .skill-tag span {
          position: relative;
          z-index: 1;
        }

        .career-card:hover .skill-tag {
          transform: scale(1.05);
          color: white;
          border-color: var(--gradient-start, #3b82f6);
        }

        .growth-info {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border-left: 4px solid var(--gradient-start, #3b82f6);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .growth-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, var(--gradient-start, #3b82f6), var(--gradient-end, #93c5fd));
          transition: width 0.3s ease;
        }

        .career-card:hover .growth-info::before {
          width: 8px;
        }

        .career-card:hover .growth-info {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          transform: translateX(4px);
        }

        /* Benefits - Floating Cards */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
        }

        .benefit-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--accent-color, #ff6b00) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .benefit-card:hover::before {
          opacity: 0.1;
        }

        .benefit-card:hover {
          transform: translateY(-10px) rotate(1deg);
          border-color: var(--accent-color, #ff6b00);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .benefit-card.orange { --accent-color: #ff6b00; }
        .benefit-card.blue { --accent-color: #3b82f6; }
        .benefit-card.purple { --accent-color: #8b5cf6; }
        .benefit-card.green { --accent-color: #10b981; }
        .benefit-card.red { --accent-color: #ef4444; }
        .benefit-card.cyan { --accent-color: #06b6d4; }

        .benefit-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, var(--accent-color, #ff6b00), var(--accent-color, #ff6b00)88);
          border-radius: 18px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .benefit-card:hover .benefit-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .benefit-icon svg {
          width: 22px;
          height: 22px;
          color: white;
          stroke-width: 2;
        }

        .benefit-title {
          font-size: 16px;
          font-weight: bold;
          color: white;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .benefit-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }

        /* CTA Section - Glassmorphism */
        .cta-section {
          text-align: center;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 60px 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 107, 0, 0.1), transparent, rgba(147, 197, 253, 0.1), transparent);
          animation: rotate-slow 20s linear infinite;
        }

        .cta-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: bold;
          color: white;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-description {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
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

        .cta-button.secondary {
          background: transparent;
          border: 2px solid rgba(255, 107, 0, 0.5);
          color: #ff9d33;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(255, 107, 0, 0.4);
        }

        .cta-button.secondary:hover {
          background: rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.8);
        }

        /* Enhanced Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px var(--glow-color, rgba(59, 130, 246, 0.3)); }
          50% { box-shadow: 0 0 40px var(--glow-color, rgba(59, 130, 246, 0.5)), 0 0 60px var(--glow-color, rgba(59, 130, 246, 0.2)); }
        }

        .career-card:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .career-container { padding: 40px 0; }
          .container { padding: 0 15px; }
          .expertise-grid, .career-paths-grid, .benefits-grid { 
            grid-template-columns: 1fr; 
            gap: 20px; 
          }
          
          .content-tabs {
            flex-direction: column;
            gap: 8px;
            border-radius: 20px;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .expertise-card, .career-card {
            padding: 20px;
          }
          
          .main-heading {
            font-size: 2rem;
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Additional Career Card Animations */
        .career-card {
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .career-card:nth-child(1) { animation-delay: 0.1s; }
        .career-card:nth-child(2) { animation-delay: 0.2s; }
        .career-card:nth-child(3) { animation-delay: 0.3s; }
        .career-card:nth-child(4) { animation-delay: 0.4s; }
        .career-card:nth-child(5) { animation-delay: 0.5s; }
        .career-card:nth-child(6) { animation-delay: 0.6s; }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(50px) rotateX(15deg);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0deg);
          }
        }

        .career-card.visible {
          animation-name: slideInUp;
        }

        /* Staggered text animations */
        .career-card:hover .career-title,
        .career-card:hover .career-description,
        .career-card:hover .skill-tag,
        .career-card:hover .growth-info {
          animation: textFloat 0.6s ease-out forwards;
        }

        .career-card:hover .career-title { animation-delay: 0.1s; }
        .career-card:hover .career-description { animation-delay: 0.2s; }
        .career-card:hover .skill-tag { animation-delay: 0.3s; }
        .career-card:hover .growth-info { animation-delay: 0.4s; }

        @keyframes textFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }

        /* Debug styles - remove these in production */
        .debug-info {
          position: fixed;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 10px;
          border-radius: 8px;
          font-size: 12px;
          z-index: 1000;
        }
      `}</style>

      <div className="career-container">
        <div className="bg-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container">
        

          {/* Header Section */}
          <div className="header-section">
            <div className="career-badge">
              <Briefcase size={16} style={{ marginRight: '8px' }} />
              Career Opportunities
            </div>
            <h1 className="main-heading">Build Your Political Career</h1>
            <p className="main-description">
              We have analyzed ground-level political movements across India, understanding people's political 
              perspectives, party characteristics nationwide, and voter psychology to create comprehensive career paths.
            </p>
          </div>

          {/* Content Tabs */}
          <div className="content-tabs">
            <button 
              className={`tab-button ${activeTab === 'expertise' ? 'active' : ''}`}
              onClick={() => setActiveTab('expertise')}
            >
              Our Expertise
            </button>
            <button 
              className={`tab-button ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveTab('careers')}
            >
              Career Paths
            </button>
            <button 
              className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits & Growth
            </button>
          </div>

          {/* Expertise Section */}
          {activeTab === 'expertise' && (
            <div className="content-section">
              <div className="expertise-grid">
                {careerData.expertiseAreas && careerData.expertiseAreas.length > 0 ? (
                  careerData.expertiseAreas.map((area, index) => (
                    <div 
                      key={area._id || index} 
                      className="expertise-card"
                      style={{'--card-color': area.color || '#ff6b00'}}
                    >
                      <div className="expertise-icon">
                        {iconMap[area.icon] || <Brain />}
                      </div>
                      <h3 className="expertise-title">{area.title}</h3>
                      <p className="expertise-description">{area.description}</p>
                      <ul className="expertise-details">
                        {area.details && area.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="detail-item">
                            <div className="detail-bullet"></div>
                            <span className="detail-text">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '40px' }}>
                    <Brain size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                    <p>No expertise areas available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Career Paths Section */}
          {activeTab === 'careers' && (
            <div className="content-section">
              <div className="career-paths-grid">
                {careerData.careerPaths && careerData.careerPaths.length > 0 ? (
                  careerData.careerPaths.map((career, index) => (
                    <div
                      key={career._id || index}
                      data-card-id={career._id || index}
                      className={`career-card animated-card ${visibleCards[career._id || index] ? 'visible' : ''}`}
                      onMouseEnter={() => setHoveredCard(career._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="career-icon">
                        {iconMap[career.icon] || <Target />}
                      </div>
                      <div className="career-level">{career.level}</div>
                      <h3 className="career-title">{career.title}</h3>
                      <p className="career-description">{career.description}</p>
                      
                      <div className="skills-tags">
                        {career.skills && career.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>

                      <div className="growth-info">
                        <strong>Growth Path:</strong> {career.growth}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '40px' }}>
                    <Target size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                    <p>No career paths available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {activeTab === 'benefits' && (
            <div className="content-section">
              <div className="benefits-grid">
                {careerData.benefits && careerData.benefits.length > 0 ? (
                  careerData.benefits.map((benefit, index) => (
                    <div key={benefit._id || index} className={`benefit-card ${benefit.accent || 'orange'}`}>
                      <div className="benefit-icon">
                        {iconMap[benefit.icon] || <Award />}
                      </div>
                      <h3 className="benefit-title">{benefit.title}</h3>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '40px' }}>
                    <Award size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                    <p>No benefits information available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="cta-section">
            <h2 className="cta-title">Ready to Shape India's Political Future?</h2>
            <p className="cta-description">
              Join our team of political experts and be part of transforming India's democratic landscape. 
              Apply your skills to real-world political challenges and build a meaningful career.
            </p>
            <div className="cta-buttons">
              <button className="cta-button">
                Apply Now
                <ArrowRight size={18} />
              </button>
              <button className="cta-button secondary">
                Learn More
                <UserCheck size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Career