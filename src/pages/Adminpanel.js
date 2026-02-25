"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Home,
  Info,
  Building,
  Briefcase,
  Mail,
  TrendingUp,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  UserCheck,
} from "lucide-react"

// Import all your components
import Homeadmin from "../components/admincomponent/Homeadmin"
import AboutUsAdmin from "../components/admincomponent/AboutUsAdmin"
import Serviceadmin from "../components/admincomponent/Serviceadmin"
import CareerAdmin from "../components/admincomponent/CarrearAdmin"
import OurImpactAdmin from "../components/admincomponent/Ourimpactadmin"
import ContactAdmin from "../components/admincomponent/ContactAdmin"

const AdminPanel = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState("home")
  const [showNotifications, setShowNotifications] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          // No token found, redirect to login
          navigate('/login')
          return
        }
        
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error checking authentication:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  const menuItems = [
    { label: "HOME", icon: <Home size={18} />, id: "home", component: Homeadmin },
    { label: "ABOUT US", icon: <Info size={18} />, id: "about-us", component: AboutUsAdmin },
    { label: "SERVICES", icon: <Building size={18} />, id: "services", component: Serviceadmin },
    { label: "CAREER", icon: <Briefcase size={18} />, id: "career", component: CareerAdmin },
    { label: "CONTACT", icon: <Mail size={18} />, id: "contact", component: ContactAdmin },
    { label: "OUR IMPACT", icon: <TrendingUp size={18} />, id: "impact", component: OurImpactAdmin },
  ]

  const notifications = [
    { id: 1, text: "New user registration from Maharashtra", time: "2 min ago" },
    { id: 2, text: "System backup completed successfully", time: "1 hour ago" },
    { id: 3, text: "Revenue target achieved for this month", time: "3 hours ago" },
  ]

  const handleSignOut = () => {
    try {
      // Clear all localStorage items
      localStorage.clear()
      
      // Or specifically remove auth-related items
      // localStorage.removeItem('authToken')
      // localStorage.removeItem('userData')
      // localStorage.removeItem('userPermissions')
      // localStorage.removeItem('userRole')
      
      // Redirect to login page with replace to prevent going back
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error during sign out:', error)
      // Even if there's an error, try to redirect
      navigate('/login', { replace: true })
    }
  }

  const ActiveComponent = menuItems.find(item => item.id === activeMenuItem)?.component || Homeadmin

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 50%, #0a0f1c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255, 107, 0, 0.3)',
            borderTop: '3px solid #ff6b00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Don't render anything if not authenticated (will be redirected)
  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-panel {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0f1c 0%, #1a1f3a 25%, #2d3561 50%, #1a1f3a 75%, #0a0f1c 100%);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .sidebar {
          width: ${sidebarCollapsed ? "80px" : "280px"};
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(25px);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 100;
          overflow: hidden;
        }

        .sidebar-header {
          padding: 25px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 80px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 700;
          color: white;
          opacity: ${sidebarCollapsed ? "0" : "1"};
          transition: opacity 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .sidebar-subtitle {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          opacity: ${sidebarCollapsed ? "0" : "1"};
          transition: opacity 0.3s ease;
        }

        .sidebar-toggle {
          position: absolute;
          top: 20px;
          right: 15px;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          margin: 2px 10px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 12px 0 0 12px;
          transition: width 0.3s ease;
        }

        .nav-item.active {
          background: rgba(255, 107, 0, 0.15);
          color: #ff9d33;
          border: 1px solid rgba(255, 107, 0, 0.2);
        }

        .nav-item.active::before {
          width: 4px;
        }

        .nav-item:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          transform: translateX(5px);
        }

        .nav-item-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
        }

        .nav-item-label {
          opacity: ${sidebarCollapsed ? "0" : "1"};
          transition: opacity 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 50;
        }

        .navbar {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 80px;
          position: relative;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.5px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .search-box {
          position: relative;
          width: 300px;
        }

        .search-input {
          width: 100%;
          background: rgba(30, 35, 66, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 15px 10px 40px;
          color: white;
          font-size: 13px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #ff9d33;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
        }

        .navbar-btn {
          width: 40px;
          height: 40px;
          background: rgba(30, 35, 66, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar-btn:hover {
          background: rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.3);
          color: #ff9d33;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: white;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #ef4444;
          font-size: 13px;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        }

        .logout-btn svg {
          transition: transform 0.3s ease;
        }

        .logout-btn:hover svg {
          transform: translateX(3px);
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: rgba(30, 35, 66, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .profile-details {
          line-height: 1.4;
        }

        .profile-details h4 {
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .profile-details p {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
        }

        .notifications-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 15px;
          margin-top: 5px;
          opacity: ${showNotifications ? "1" : "0"};
          visibility: ${showNotifications ? "visible" : "hidden"};
          transform: translateY(${showNotifications ? "0" : "-10px"});
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .notification-item {
          padding: 12px;
          background: rgba(30, 35, 66, 0.3);
          border-radius: 8px;
          margin-bottom: 8px;
          border-left: 3px solid #ff9d33;
          transition: all 0.3s ease;
        }

        .notification-item:hover {
          background: rgba(30, 35, 66, 0.5);
        }

        .notification-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
        }

        .notification-time {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
        }

        .content-area {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
        }

        .content-section h2 {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .content-section p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: ${sidebarCollapsed ? "0" : "280px"};
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 1000;
            transform: translateX(${sidebarCollapsed ? "-100%" : "0"});
          }

          .sidebar-toggle {
            right: ${sidebarCollapsed ? "-40px" : "15px"};
            position: ${sidebarCollapsed ? "fixed" : "absolute"};
            top: 20px;
            left: ${sidebarCollapsed ? "20px" : "auto"};
          }

          .main-content {
            margin-left: 0;
          }

          .navbar {
            padding: 0 20px;
          }

          .search-box {
            display: none;
          }

          .profile-details {
            display: none;
          }

          .content-area {
            padding: 20px;
          }
        }
      `}</style>

      <div className="admin-panel">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Shield size={20} />
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="sidebar-title">Political Intel</div>
                <div className="sidebar-subtitle">Admin Dashboard</div>
              </div>
            )}
          </div>

          <div className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeMenuItem === item.id ? "active" : ""}`}
                onClick={() => setActiveMenuItem(item.id)}
              >
                <div className="nav-item-icon">{item.icon}</div>
                <span className="nav-item-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Navbar */}
          <header className="navbar">
            <div className="navbar-left">
              <div className="brand-name">DARK POLITICS</div>
            </div>

            <div className="navbar-right">
              <div className="search-box">
                <Search className="search-icon" size={16} />
                <input type="text" className="search-input" placeholder="Search anything..." />
              </div>

              <div className="profile-info">
                <div className="profile-avatar">AD</div>
                <div className="profile-details">
                  <h4>Admin User</h4>
                  <p>Super Admin</p>
                </div>
              </div>

              <div 
                className="navbar-btn" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={18} />
                <div className="notification-badge">3</div>

                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>Notifications</h4>
                    <span style={{ color: "#ff9d33", fontSize: "11px", cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <div className="notification-text">{notification.text}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="logout-btn" onClick={handleSignOut}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <main className="content-area">
            <ActiveComponent />
          </main>
        </div>

        {/* Click outside handler for notifications */}
        {showNotifications && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
            onClick={() => setShowNotifications(false)}
          />
        )}
      </div>
    </>
  )
}

export default AdminPanel
