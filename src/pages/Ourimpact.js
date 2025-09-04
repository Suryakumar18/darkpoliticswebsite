import React, { useState, useEffect } from 'react'
import { 
  TrendingUp,
  Users,
  Target,
  Award,
  BarChart3,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Zap,
  Shield,
  Heart,
  Trophy,
  Vote,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  Activity
} from 'lucide-react'

const OurImpact = () => {
  const API_BASE_URL = 'https://darkpoliticswebsitebackend.onrender.com/api/our-impact';
  const [visibleStats, setVisibleStats] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [impactData, setImpactData] = useState(null)

  // Fetch impact data
  const fetchImpactData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      
      if (result.success) {
        setImpactData(result.data);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch impact data');
      }
    } catch (err) {
      console.error('Error fetching impact data:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImpactData();
    const timer = setTimeout(() => {
      setVisibleStats([0, 1, 2, 3])
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Icon mapping function
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Trophy': <Trophy />,
      'Users': <Users />,
      'Target': <Target />,
      'Award': <Award />,
      'BarChart3': <BarChart3 />,
      'MapPin': <MapPin />,
      'Globe': <Globe />,
      'Zap': <Zap />,
      'Shield': <Shield />,
      'Heart': <Heart />,
      'Vote': <Vote />,
      'Eye': <Eye />,
      'Activity': <Activity />
    };
    
    return iconMap[iconName] || <Activity />;
  };

  // Color generator for stats cards
  const getColorForIndex = (index) => {
    const colors = [
      "from-yellow-500 to-orange-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-teal-500",
      "from-purple-500 to-pink-500"
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="impact-container">
        <div className="container">
          <div className="header-section">
            <div className="impact-badge">
              <TrendingUp size={16} style={{ marginRight: '8px' }} />
              Our Impact
            </div>
            <div className="main-description">Loading impact data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="impact-container">
        <div className="container">
          <div className="header-section">
            <div className="impact-badge">
              <TrendingUp size={16} style={{ marginRight: '8px' }} />
              Our Impact
            </div>
            <div className="main-description" style={{color: '#ff6b6b'}}>{error}</div>
            <button 
              className="cta-button" 
              onClick={fetchImpactData}
              style={{marginTop: '20px'}}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!impactData) {
    return (
      <div className="impact-container">
        <div className="container">
          <div className="header-section">
            <div className="impact-badge">
              <TrendingUp size={16} style={{ marginRight: '8px' }} />
              Our Impact
            </div>
            <div className="main-description">No impact data available</div>
          </div>
        </div>
      </div>
    );
  }

  const impactAreas = [
    {
      icon: <Globe />,
      title: "National Influence",
      description: "Shaping political discourse across India with innovative strategies and deep regional understanding",
      stats: "28 States, 180+ Constituencies"
    },
    {
      icon: <Users />,
      title: "Voter Empowerment",
      description: "Connecting leaders with citizens through authentic messaging and grassroots mobilization",
      stats: "2.5M+ Citizens Engaged"
    },
    {
      icon: <Shield />,
      title: "Electoral Integrity",
      description: "Maintaining highest standards of compliance while delivering exceptional campaign results",
      stats: "100% Clean Campaigns"
    },
    {
      icon: <Zap />,
      title: "Digital Revolution",
      description: "Pioneering technology-driven political consulting in the Indian electoral landscape",
      stats: "95% Success Rate"
    }
  ]

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .impact-container {
          min-height: 80vh;
          background: 
            linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%),
            radial-gradient(circle at 20% 80%, rgba(255, 107, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.08) 0%, transparent 50%);
          position: relative;
          overflow: hidden;
          padding: 40px 0;
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
          background: #ff6b00;
          border-radius: 50%;
          animation: float-particle 6s ease-in-out infinite;
          opacity: 0.5;
        }

        .particle:nth-child(1) { top: 10%; left: 15%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 70%; left: 85%; animation-delay: 1.5s; }
        .particle:nth-child(3) { top: 85%; left: 20%; animation-delay: 3s; }
        .particle:nth-child(4) { top: 30%; left: 80%; animation-delay: 0.5s; }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 16px;
          position: relative;
          z-index: 10;
        }

        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 40px;
          opacity: 0;
          animation: slide-up 0.8s ease-out 0.2s forwards;
        }

        .impact-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(255, 153, 51, 0.08));
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 107, 0, 0.2);
          border-radius: 30px;
          padding: 8px 16px;
          margin-bottom: 16px;
          color: #ff9d33;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .main-heading {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #ff9d33, #ff6b00, #ffffff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.1;
          animation: gradient-shift 3s ease infinite;
        }

        .main-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.5;
          font-weight: 300;
        }

        /* Stats Section */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .stat-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--card-color));
          border-radius: 16px 16px 0 0;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.03);
          border-color: rgba(255, 107, 0, 0.2);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--card-color));
          border-radius: 12px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.1);
        }

        .stat-icon svg {
          width: 24px;
          height: 24px;
          color: white;
          stroke-width: 2;
        }

        .stat-number {
          font-size: 2.4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 6px;
          display: block;
        }

        .stat-label {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
        }

        .stat-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.4;
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
          gap: 4px;
          flex-wrap: wrap;
        }

        .tab-button {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          padding: 10px 18px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-color: rgba(255, 107, 0, 0.2);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(255, 107, 0, 0.25);
        }

        .tab-button:hover:not(.active) {
          border-color: rgba(255, 107, 0, 0.15);
          color: rgba(255, 255, 255, 0.9);
        }

        /* Content Sections */
        .content-section {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }

        /* Success Stories */
        .success-stories {
          display: grid;
          gap: 24px;
          margin-bottom: 40px;
        }

        .story-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 107, 0, 0.2);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
        }

        .story-image {
          width: 100%;
          height: 120px;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .story-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.15), transparent);
          border-radius: 12px;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .story-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }

        .story-location {
          color: #ff9d33;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .story-result {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.08));
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 30px;
          padding: 4px 12px;
          color: #22c55e;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          min-width: 100px;
        }

        .story-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .story-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .metric-tag {
          background: rgba(255, 107, 0, 0.08);
          border: 1px solid rgba(255, 107, 0, 0.15);
          border-radius: 16px;
          padding: 4px 10px;
          color: #ff9d33;
          font-size: 11px;
          font-weight: 500;
        }

        /* Key Achievements */
        .achievements-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 40px;
        }

        .achievement-category {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .achievement-category:hover {
          border-color: rgba(255, 107, 0, 0.15);
          transform: translateY(-2px);
        }

        .category-title {
          font-size: 18px;
          font-weight: 600;
          color: #ff9d33;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .achievement-list {
          list-style: none;
        }

        .achievement-list li {
          color: rgba(255, 255, 255, 0.8);
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          padding-left: 16px;
          font-size: 14px;
          line-height: 1.5;
        }

        .achievement-list li:last-child {
          border-bottom: none;
        }

        .achievement-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
          font-size: 12px;
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .testimonial-card {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          position: relative;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px;
          left: 20px;
          font-size: 40px;
          color: rgba(255, 107, 0, 0.2);
          font-family: serif;
          line-height: 1;
        }

        .testimonial-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 107, 0, 0.15);
        }

        .testimonial-content {
          margin-top: 16px;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          font-style: italic;
          font-size: 14px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          border: 2px solid rgba(255, 107, 0, 0.2);
        }

        .author-info h4 {
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .author-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }

        .rating {
          display: flex;
          gap: 2px;
          margin-top: 6px;
        }

        .rating svg {
          width: 14px;
          height: 14px;
          fill: #fbbf24;
          color: #fbbf24;
        }

        /* Impact Areas */
        .impact-areas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .impact-area {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .impact-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b00, #ff9d33);
        }

        .impact-area:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 107, 0, 0.2);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .impact-area-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 12px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .impact-area:hover .impact-area-icon {
          transform: scale(1.1);
        }

        .impact-area-icon svg {
          width: 24px;
          height: 24px;
          color: white;
          stroke-width: 2;
        }

        .impact-area h3 {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 10px;
        }

        .impact-area p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin-bottom: 12px;
          font-size: 13px;
        }

        .impact-area-stats {
          color: #ff9d33;
          font-size: 12px;
          font-weight: 600;
        }

        /* Call to Action */
        .cta-section {
          text-align: center;
          margin-top: 50px;
          opacity: 0;
          animation: fade-in 1s ease-out 1s forwards;
        }

        .cta-card {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b00, #ff9d33);
          border-radius: 20px 20px 0 0;
        }

        .cta-heading {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff, #ff9d33);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin-bottom: 20px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .cta-button {
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border: none;
          border-radius: 30px;
          padding: 12px 28px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 107, 0, 0.3);
        }

        /* Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .impact-container { padding: 32px 0; }
          .container { padding: 0 12px; }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
          }
          
          .story-card {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }
          
          .story-image {
            height: 140px;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .impact-areas {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .tab-button {
            padding: 8px 12px;
            font-size: 12px;
          }

          .main-heading {
            font-size: 2rem;
          }

          .stat-card, .achievement-category, .testimonial-card, .impact-area {
            padding: 20px 16px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          
          .stat-card {
            padding: 16px 12px;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .story-card {
            padding: 16px;
          }
        }
      `}</style>

      <div className="impact-container">
        <div className="bg-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container">
          {/* Header Section */}
          <div className="header-section">
            <div className="impact-badge">
              <TrendingUp size={16} style={{ marginRight: '8px' }} />
              Our Impact
            </div>
            <h1 className="main-heading">{impactData.mainHeading || "Transforming Indian Politics"}</h1>
            <p className="main-description">
              {impactData.mainDescription || "From grassroots movements to high-stakes elections, we've consistently delivered exceptional results that reshape the political landscape across India."}
            </p>
          </div>

          {/* Impact Statistics */}
          <div className="stats-grid">
            {impactData.impactStats && impactData.impactStats.map((stat, index) => (
              <div 
                key={index}
                className={`stat-card ${visibleStats.includes(index) ? 'visible' : ''}`}
                style={{'--card-color': getColorForIndex(index)}}
              >
                <div className="stat-icon">
                  {getIconComponent(stat.icon)}
                </div>
                <span className="stat-number">{stat.number}</span>
                <div className="stat-label">{stat.label}</div>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Eye size={14} style={{ marginRight: '4px' }} />
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'success' ? 'active' : ''}`}
              onClick={() => setActiveTab('success')}
            >
              <Trophy size={14} style={{ marginRight: '4px' }} />
              Success Stories
            </button>
            <button 
              className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award size={14} style={{ marginRight: '4px' }} />
              Key Achievements
            </button>
            <button 
              className={`tab-button ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <MessageSquare size={14} style={{ marginRight: '4px' }} />
              Client Testimonials
            </button>
          </div>

          {/* Tab Content */}
          <div className="content-section">
            {activeTab === 'overview' && (
              <div className="impact-areas">
                {impactAreas.map((area, index) => (
                  <div key={index} className="impact-area">
                    <div className="impact-area-icon">
                      {area.icon}
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                    <div className="impact-area-stats">{area.stats}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'success' && (
              <div className="success-stories">
                {impactData.successStories && impactData.successStories.map((story, index) => (
                  <div key={index} className="story-card">
                    <div 
                      className="story-image"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&h=200&fit=crop)` }}
                    />
                    <div className="story-content">
                      <div className="story-header">
                        <div>
                          <h3 className="story-title">{story.title}</h3>
                          <div className="story-location">
                            <MapPin size={12} />
                            {story.location} • {story.year}
                          </div>
                        </div>
                        <div className="story-result">{story.result}</div>
                      </div>
                      <p className="story-description">{story.description}</p>
                      <div className="story-metrics">
                        {story.metrics && story.metrics.map((metric, idx) => (
                          <span key={idx} className="metric-tag">{metric}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="achievements-grid">
                {impactData.achievements && impactData.achievements.length > 0 ? (
                  impactData.achievements.map((category, index) => (
                    <div key={index} className="achievement-category">
                      <h3 className="category-title">
                        <CheckCircle size={18} />
                        {category.category}
                      </h3>
                      <ul className="achievement-list">
                        {category.achievements && category.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="achievement-category">
                    <h3 className="category-title">
                      <CheckCircle size={18} />
                      Achievements
                    </h3>
                    <p style={{color: 'rgba(255,255,255,0.7)'}}>No achievement data available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="testimonials-grid">
                {impactData.testimonials && impactData.testimonials.length > 0 ? (
                  impactData.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="testimonial-content">
                        {testimonial.quote}
                      </div>
                      <div className="testimonial-author">
                        <div 
                          className="author-image"
                          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face)` }}
                        />
                        <div className="author-info">
                          <h4>{testimonial.name}</h4>
                          <p>{testimonial.position}</p>
                          <div className="rating">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} size={14} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      No testimonials available at the moment.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <div className="cta-card">
              <h2 className="cta-heading">Ready to Transform Your Political Journey?</h2>
              <p className="cta-description">
                Join the ranks of successful leaders who've trusted DARKSTATE with their political ambitions. 
                Let's create your success story together.
              </p>
              <button className="cta-button">
                Start Your Campaign
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurImpact