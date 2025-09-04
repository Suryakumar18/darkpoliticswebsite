import React, { useState, useEffect } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  Clock,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Heart,
  Loader,
  AlertCircle
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [focusedField, setFocusedField] = useState('')
  const [contactData, setContactData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Icon mapping for dynamic icons
  const iconMap = {
    Mail,
    Phone,
    MapPin,
    Clock,
    Building,
    Globe,
    User
  }

  // Color mapping for different contact info types
  const colorMap = {
    email: "from-blue-500 to-cyan-500",
    phone: "from-green-500 to-teal-500", 
    address: "from-orange-500 to-red-500",
    hours: "from-purple-500 to-pink-500",
    default: "from-indigo-500 to-blue-500"
  }

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(''), 5000)
  }

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/contact');
      if (!response.ok) throw new Error('Failed to fetch contact data');
      const data = await response.json();
      setContactData(data.data);
    } catch (err) {
      showError('Failed to load contact data');
      console.error('Error fetching contact data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContactData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setSubmitStatus('')
      }, 3000)
    }, 2000)
  }

  const features = [
    { icon: <Shield />, text: "Secure & Confidential" },
    { icon: <Zap />, text: "Quick Response" },
    { icon: <Heart />, text: "Expert Guidance" }
  ]

  if (loading) {
    return (
      <>
        <style>{`
          .loading-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
          }
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 153, 51, 0.2);
            border-top: 3px solid #ff9d33;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .loading-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-weight: 500;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading contact information...</div>
        </div>
      </>
    )
  }

  if (error && !contactData) {
    return (
      <>
        <style>{`
          .error-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            text-align: center;
          }
          .error-icon {
            color: #ef4444;
            margin-bottom: 10px;
          }
          .error-title {
            color: #ef4444;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .error-message {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            max-width: 400px;
            line-height: 1.5;
          }
          .retry-button {
            background: linear-gradient(135deg, #ff6b00, #ff9d33);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s ease;
          }
          .retry-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 107, 0, 0.3);
          }
        `}</style>
        <div className="error-container">
          <AlertCircle size={50} className="error-icon" />
          <div className="error-title">Failed to Load Contact Data</div>
          <div className="error-message">
            We're having trouble loading the contact information. Please check your connection and try again.
          </div>
          <button className="retry-button" onClick={fetchContactData}>
            Try Again
          </button>
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

        .contact-container {
          min-height: 100vh;
          background: 
            linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.1) 0%, transparent 50%);
          position: relative;
          overflow: hidden;
          padding: 80px 0;
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

        .particle:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 85%; animation-delay: 2s; }
        .particle:nth-child(3) { top: 80%; left: 25%; animation-delay: 4s; }
        .particle:nth-child(4) { top: 25%; left: 75%; animation-delay: 1s; }
        .particle:nth-child(5) { top: 70%; left: 55%; animation-delay: 3s; }
        .particle:nth-child(6) { top: 40%; left: 15%; animation-delay: 5s; }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        .error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 20px;
          color: #fca5a5;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 60px;
          opacity: 0;
          animation: slide-up 1s ease-out 0.2s forwards;
        }

        .contact-badge {
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

        .contact-badge::before {
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

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        /* Contact Info Cards */
        .contact-info {
          opacity: 0;
          animation: slide-left 1s ease-out 0.4s forwards;
        }

        .info-cards {
          display: grid;
          gap: 25px;
          margin-bottom: 40px;
        }

        .info-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--card-color-start), var(--card-color-end));
          border-radius: 20px 20px 0 0;
        }

        .info-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(255, 107, 0, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--card-color-start), var(--card-color-end));
          border-radius: 16px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card:hover .info-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .info-icon::before {
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

        .info-card:hover .info-icon::before {
          transform: rotate(45deg) translate(50px, 50px);
        }

        .info-icon svg {
          width: 24px;
          height: 24px;
          color: white;
          stroke-width: 2;
          z-index: 1;
          position: relative;
        }

        .info-title {
          font-size: 18px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
        }

        .info-main {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .info-sub {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        /* Contact Form */
        .contact-form-container {
          opacity: 0;
          animation: slide-right 1s ease-out 0.6s forwards;
        }

        .form-header {
          margin-bottom: 30px;
        }

        .form-title {
          font-size: 28px;
          font-weight: bold;
          color: white;
          margin-bottom: 12px;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.5;
        }

        .contact-form {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .contact-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .form-group {
          margin-bottom: 25px;
          position: relative;
        }

        .form-group.half {
          width: calc(50% - 10px);
          display: inline-block;
          margin-right: 20px;
        }

        .form-group.half:nth-child(even) {
          margin-right: 0;
        }

        .form-label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 16px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: rgba(255, 107, 0, 0.6);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 107, 0, 0.1);
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-features {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .form-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-weight: 500;
        }

        .form-feature svg {
          width: 16px;
          height: 16px;
          color: #ff9d33;
          stroke-width: 2;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(255, 107, 0, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-button.success {
          background: linear-gradient(135deg, #10b981, #34d399);
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Google Maps Section */
        .maps-section {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: fade-in 1s ease-out 0.8s forwards;
        }

        .maps-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .maps-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin-bottom: 12px;
        }

        .maps-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .maps-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 400px;
          border: 2px solid rgba(255, 107, 0, 0.2);
          transition: all 0.3s ease;
        }

        .maps-container:hover {
          border-color: rgba(255, 107, 0, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .maps-iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: hue-rotate(200deg) saturate(0.8) brightness(0.9);
          transition: filter 0.3s ease;
        }

        .maps-container:hover .maps-iframe {
          filter: hue-rotate(200deg) saturate(1) brightness(1);
        }

        /* Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
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

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-container { padding: 60px 0; }
          .container { padding: 0 15px; }
          
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .form-group.half {
            width: 100%;
            display: block;
            margin-right: 0;
          }
          
          .contact-form {
            padding: 30px 20px;
          }
          
          .maps-section {
            padding: 30px 20px;
          }
          
          .maps-container {
            height: 300px;
          }
          
          .form-features {
            flex-direction: column;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .main-heading {
            font-size: 2rem;
          }
          
          .contact-form, .maps-section {
            padding: 25px 15px;
          }
          
          .info-card {
            padding: 20px;
          }
          
          .maps-container {
            height: 250px;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="bg-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container">
          {error && (
            <div className="error-banner">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Header Section */}
          <div className="header-section">
            <div className="contact-badge">
              <Mail size={16} style={{ marginRight: '8px' }} />
              Get In Touch
            </div>
            <h1 className="main-heading">Contact Our Team</h1>
            <p className="main-description">
              Ready to start your political career journey? Have questions about our services? 
              We're here to help you navigate your path to political success.
            </p>
          </div>

          {/* Contact Content */}
          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-info">
              <div className="info-cards">
                {contactData?.contactInfo?.filter(info => info.active).map((info, index) => {
                  const IconComponent = iconMap[info.icon] || iconMap.Mail
                  const colorClass = colorMap[info.type] || colorMap.default
                  const [startColor, endColor] = colorClass.replace('from-', '').replace(' to-', ',').split(',')
                  
                  return (
                    <div 
                      key={info._id || index}
                      className="info-card"
                      style={{
                        '--card-color-start': `var(--${startColor.replace('-500', '')})`,
                        '--card-color-end': `var(--${endColor.replace('-500', '')})`
                      }}
                    >
                      <div className="info-icon">
                        <IconComponent />
                      </div>
                      <h3 className="info-title">{info.title}</h3>
                      <div className="info-main">{info.info}</div>
                      {info.subInfo && <div className="info-sub">{info.subInfo}</div>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="contact-form">
                <div className="form-group half">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group half">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group half">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group half">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    className="form-textarea"
                    placeholder="Tell us more about your inquiry, career goals, or how we can help you..."
                    required
                  />
                </div>

                <div className="form-features">
                  {features.map((feature, index) => (
                    <div key={index} className="form-feature">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={handleSubmit}
                  className={`submit-button ${submitStatus === 'success' ? 'success' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          {contactData?.officeDetails && (
            <div className="maps-section">
              <div className="maps-header">
                <h2 className="maps-title">Visit Our Office</h2>
                <p className="maps-subtitle">
                  {contactData.officeDetails.description}
                </p>
              </div>
              
              <div className="maps-container">
                <iframe
                  className="maps-iframe"
                  src={contactData.officeDetails.mapUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Office Location"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Contact