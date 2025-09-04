import React, { useState, useEffect } from 'react'
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  Users,
  Zap,
  Globe,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const closeNotification = () => {
    setNotification(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      showNotification('Please fill in all fields', 'error')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('https://darkpoliticswebsitebackend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage (you can use sessionStorage or cookies instead)
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        showNotification('Login successful! Welcome back.', 'success')
        
        // Redirect to dashboard or main app after successful login
        setTimeout(() => {
          // Replace this with your routing logic
          console.log('Redirecting to dashboard...')
        window.location.href = '/adminpanel'
        }, 2000)
      } else {
        showNotification(data.message || 'Login failed', 'error')
      }
    } catch (error) {
      console.error('Login error:', error)
      showNotification('Network error. Please check your connection and try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const features = [
    { icon: <Shield />, text: "Secure Auth" },
    { icon: <Users />, text: "Network Access" },
    { icon: <Zap />, text: "Real-time Updates" },
    { icon: <Globe />, text: "Pan-India Coverage" }
  ]

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          background: 
            linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.1) 0%, transparent 50%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
        }

        .bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 119, 48, 0.08), transparent);
          animation: float-orb 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 120px;
          height: 120px;
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 100px;
          height: 100px;
          top: 70%;
          right: 20%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 80px;
          height: 80px;
          bottom: 25%;
          left: 25%;
          animation-delay: 4s;
        }

        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-slide 20s linear infinite;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1100px;
          width: 100%;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-section {
          padding: 25px 0;
          opacity: 0;
          animation: slide-up 1s ease-out 0.3s forwards;
        }

        .brand-logo {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(255, 153, 51, 0.08));
          backdrop-filter: blur(10px);
          border: 1px solid;
          border-image: linear-gradient(45deg, #ff6b00, #ff9d33, #ffb366) 1;
          border-radius: 25px;
          padding: 8px 16px;
          margin-bottom: 20px;
          color: #ff9d33;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }

        .brand-logo::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 107, 0, 0.08), transparent);
          animation: rotate 4s linear infinite;
        }

        .hero-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: bold;
          background: linear-gradient(135deg, #ffffff, #ff9d33, #ff6b00, #ffffff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.2;
          animation: gradient-shift 3s ease infinite;
        }

        .hero-description {
          color: rgba(255, 255, 255, 0.75);
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 25px;
          max-width: 420px;
        }

        .features-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 25px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-item:hover {
          background: rgba(255, 107, 0, 0.08);
          border-color: rgba(255, 107, 0, 0.25);
          transform: translateX(4px);
        }

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 6px;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 14px;
          height: 14px;
          color: white;
          stroke-width: 2;
        }

        .feature-text {
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          font-weight: 600;
        }

        .stats-section {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 20px;
          font-weight: bold;
          color: #ff9d33;
          display: block;
          margin-bottom: 2px;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.65);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .login-section {
          opacity: 0;
          animation: slide-up 1s ease-out 0.5s forwards;
        }

        .login-card {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 30px 25px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b00, #ff9d33, #ffb366);
          border-radius: 20px 20px 0 0;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 107, 0, 0.03), transparent);
          animation: rotate-slow 15s linear infinite;
          pointer-events: none;
        }

        .login-header {
          text-align: center;
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }

        .login-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
        }

        .login-subtitle {
          color: rgba(255, 255, 255, 0.65);
          font-size: 14px;
        }

        .login-form {
          position: relative;
          z-index: 1;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-label {
          display: block;
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
          transition: color 0.3s ease;
        }

        .form-group.focused .form-label {
          color: #ff9d33;
        }

        .input-wrapper {
          position: relative;
          transition: all 0.3s ease;
        }

        .input-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.08), rgba(255, 153, 51, 0.04));
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }

        .form-group.focused .input-wrapper::before {
          opacity: 1;
        }

        .form-input {
          width: 100%;
          background: rgba(30, 35, 66, 0.3);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 16px 12px 40px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
          font-size: 13px;
        }

        .form-input:focus {
          border-color: #ff9d33;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.08);
          transform: translateY(-1px);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .input-icon svg {
          width: 16px;
          height: 16px;
        }

        .form-group.focused .input-icon {
          color: #ff9d33;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          padding: 3px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .password-toggle svg {
          width: 16px;
          height: 16px;
        }

        .password-toggle:hover {
          color: #ff9d33;
          background: rgba(255, 107, 0, 0.08);
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 24px;
        }

        .forgot-link {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 12px;
          transition: all 0.3s ease;
          position: relative;
        }

        .forgot-link:hover {
          color: #ff9d33;
        }

        .forgot-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ff9d33;
          transition: width 0.3s ease;
        }

        .forgot-link:hover::after {
          width: 100%;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 20px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 107, 0, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 20px 0;
          color: rgba(255, 255, 255, 0.45);
          font-size: 12px;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
        }

        .divider span {
          padding: 0 15px;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .social-btn {
          background: rgba(30, 35, 66, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 8px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .social-btn svg {
          width: 14px;
          height: 14px;
        }

        .social-btn:hover {
          background: rgba(255, 107, 0, 0.08);
          border-color: rgba(255, 107, 0, 0.25);
          transform: translateY(-1px);
          color: white;
        }

        .footer-text {
          text-align: center;
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 11px;
        }

        .footer-link {
          color: #ff9d33;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #ff6b00;
          text-decoration: underline;
        }

        /* Notification Styles */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          min-width: 300px;
          max-width: 500px;
          padding: 16px 20px;
          border-radius: 12px;
          backdrop-filter: blur(20px);
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 12px;
          transform: translateX(100%);
          opacity: 0;
          animation: slide-in-notification 0.3s ease-out forwards;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .notification.success {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }

        .notification.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .notification-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
        }

        .notification-content {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
        }

        .notification-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 2px;
          border-radius: 4px;
          transition: all 0.2s ease;
          opacity: 0.7;
        }

        .notification-close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        .notification-close svg {
          width: 16px;
          height: 16px;
        }

        /* Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-15px) scale(1.08); opacity: 0.8; }
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

        @keyframes grid-slide {
          from { transform: translateX(0px) translateY(0px); }
          to { transform: translateX(40px) translateY(40px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slide-in-notification {
          to { transform: translateX(0); opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }
          
          .hero-section {
            order: 2;
          }
          
          .login-section {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 0 10px;
          }
          
          .login-card {
            padding: 25px 20px;
          }
          
          .features-list {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .stats-section {
            justify-content: center;
            gap: 25px;
          }

          .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 20px 15px;
          }
          
          .hero-title {
            font-size: 1.6rem;
          }
          
          .social-login {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="bg-elements">
          <div className="grid-pattern"></div>
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`notification ${notification.type}`}>
            <div className="notification-icon">
              {notification.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </div>
            <div className="notification-content">
              {notification.message}
            </div>
            <button className="notification-close" onClick={closeNotification}>
              <X size={16} />
            </button>
          </div>
        )}

        <div className="main-content">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="brand-logo">
              <Shield size={14} style={{ marginRight: '6px' }} />
              Political Intelligence Platform
            </div>
            
            <h1 className="hero-title">
              Access India's Political Intelligence Network
            </h1>
            
            <p className="hero-description">
              Join thousands of political professionals leveraging our comprehensive 
              analysis of ground-level movements, voter psychology, and party dynamics 
              across all Indian states.
            </p>

            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Political Experts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50M+</span>
                <span className="stat-label">Voter Insights</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">28</span>
                <span className="stat-label">States Covered</span>
              </div>
            </div>
          </div>

          {/* Login Section */}
          <div className="login-section">
            <div className="login-card">
              <div className="card-glow"></div>
              
              <div className="login-header">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">
                  Access your political intelligence dashboard
                </p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={16} />
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-input"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="forgot-password">
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="social-login">
                  <button type="button" className="social-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="social-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>

              <div className="footer-text">
                Don't have an account? <a href="#" className="footer-link">Contact Admin</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login