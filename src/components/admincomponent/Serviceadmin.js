import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Settings,
  Loader,
  AlertCircle,
  CheckCircle,
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
  Globe,
  List,
  Info
} from 'lucide-react';

const Serviceadmin = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    features: [''],
    icon: 'Users',
    active: true
  });

  // Available icons for services
  const availableIcons = [
    { name: 'Users', component: Users },
    { name: 'TrendingUp', component: TrendingUp },
    { name: 'MessageSquare', component: MessageSquare },
    { name: 'Share2', component: Share2 },
    { name: 'BarChart3', component: BarChart3 },
    { name: 'Search', component: Search },
    { name: 'DollarSign', component: DollarSign },
    { name: 'Shield', component: Shield },
    { name: 'AlertTriangle', component: AlertTriangle },
    { name: 'Star', component: Star },
    { name: 'Calendar', component: Calendar },
    { name: 'Vote', component: Vote },
    { name: 'Target', component: Target }
  ];

  const API_BASE_URL = 'http://localhost:5000/api/services';

  // Fetch services data
  const fetchServicesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      
      if (data.success) {
        setServicesData(data.data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch services data');
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
        });
      }
    } catch (err) {
      console.error('Error fetching services data:', err);
      setError('Failed to connect to server. Please check if the API is running.');
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
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchServicesData();
  }, []);

  // Show success message temporarily
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Show error message temporarily
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  // Handle service editing
  const handleEditService = (service) => {
    setEditMode(service._id);
    setEditingService({ ...service });
  };

  const handleSaveService = async () => {
    try {
      setSubmitLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/${editingService._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingService)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setServicesData(prev => ({
          ...prev,
          services: prev.services.map(service => 
            service._id === editingService._id ? data.data : service
          )
        }));
        setEditMode(false);
        setEditingService({});
        showSuccess('Service updated successfully!');
      } else {
        showError(data.message || 'Failed to update service');
      }
    } catch (err) {
      console.error('Error updating service:', err);
      showError('Failed to update service');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingService({});
    setEditMode(false);
  };

  // Handle adding new service
  const handleAddService = async () => {
    if (!newService.title || !newService.description) {
      showError('Title and description are required');
      return;
    }

    try {
      setSubmitLoading(true);
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newService,
          features: newService.features.filter(f => f.trim())
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setServicesData(prev => ({
          ...prev,
          services: [...prev.services, data.data]
        }));
        setNewService({
          title: '',
          description: '',
          features: [''],
          icon: 'Users',
          active: true
        });
        setShowServiceForm(false);
        showSuccess('Service added successfully!');
      } else {
        showError(data.message || 'Failed to add service');
      }
    } catch (err) {
      console.error('Error adding service:', err);
      showError('Failed to add service');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle service deletion
  const handleDeleteService = async (service) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/${service._id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setServicesData(prev => ({
          ...prev,
          services: prev.services.filter(s => s._id !== service._id)
        }));
        showSuccess('Service deleted successfully!');
      } else {
        showError(data.message || 'Failed to delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      showError('Failed to delete service');
    }
  };

  // Toggle service active status
  const toggleServiceActive = async (service) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${service._id}/toggle-active`, {
        method: 'PATCH'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setServicesData(prev => ({
          ...prev,
          services: prev.services.map(s => 
            s._id === service._id ? { ...service, active: !service.active } : s
          )
        }));
        showSuccess('Service status updated!');
      } else {
        showError(data.message || 'Failed to update service status');
      }
    } catch (err) {
      console.error('Error toggling service status:', err);
      showError('Failed to update service status');
    }
  };

  // Handle feature management
  const addFeature = (serviceId = null) => {
    if (serviceId) {
      setEditingService(prev => ({
        ...prev,
        features: [...(prev.features || []), '']
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        features: [...prev.features, '']
      }));
    }
  };

  const removeFeature = (index, serviceId = null) => {
    if (serviceId) {
      setEditingService(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const updateFeature = (index, value, serviceId = null) => {
    if (serviceId) {
      setEditingService(prev => ({
        ...prev,
        features: prev.features.map((feature, i) => i === index ? value : feature)
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        features: prev.features.map((feature, i) => i === index ? value : feature)
      }));
    }
  };

const handleHeaderUpdate = async (field, value) => {
  try {
    const response = await fetch(`http://localhost:5000/api/services-content/header`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [field]: value
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setServicesData(prev => ({
        ...prev,
        headerContent: {
          ...prev.headerContent,
          [field]: value
        }
      }));
      showSuccess('Header content updated!');
    } else {
      showError(data.message || 'Failed to update header content');
    }
  } catch (err) {
    console.error('Error updating header:', err);
    showError('Failed to update header content');
  }
};

  // Handle CTA section update
const handleCTAUpdate = async (field, value) => {
  try {
    const response = await fetch(`http://localhost:5000/api/services-content/cta`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [field]: value
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setServicesData(prev => ({
        ...prev,
        ctaSection: {
          ...prev.ctaSection,
          [field]: value
        }
      }));
      showSuccess('CTA section updated!');
    } else {
      showError(data.message || 'Failed to update CTA section');
    }
  } catch (err) {
    console.error('Error updating CTA:', err);
    showError('Failed to update CTA section');
  }
};

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const iconData = availableIcons.find(icon => icon.name === iconName);
    return iconData ? iconData.component : Users;
  };

  if (loading) {
    return (
      <div className="services-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9d33' }}>
          <Loader size={24} className="animate-spin" />
          <span>Loading services data...</span>
        </div>
      </div>
    );
  }

  if (!servicesData) {
    return (
      <div className="services-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
          <AlertCircle size={24} />
          <span>Failed to load services data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="services-admin-container">
      <style>{`
        .services-admin-container {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 0;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .admin-header {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(255, 157, 51, 0.05));
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 25px 30px;
        }

        .admin-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .admin-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin-top: 5px;
        }

        .alert-banner {
          padding: 12px 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .tab-container {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(30, 35, 66, 0.3);
        }

        .tab-button {
          flex: 1;
          padding: 20px 25px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-bottom: 2px solid transparent;
        }

        .tab-button.active {
          color: #ff9d33;
          border-bottom-color: #ff9d33;
          background: rgba(255, 107, 0, 0.05);
        }

        .tab-button:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .tab-content {
          padding: 30px;
          min-height: 500px;
          max-height: 600px;
          overflow-y: auto;
        }

        .content-section {
          background: rgba(30, 35, 66, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #ff9d33;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .content-item {
          margin-bottom: 20px;
        }

        .content-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .content-value {
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          line-height: 1.5;
        }

        .content-input, .content-textarea, .content-select {
          width: 100%;
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          resize: vertical;
          min-height: 45px;
          box-sizing: border-box;
        }

        .content-textarea {
          min-height: 100px;
        }

        .content-input:focus, .content-textarea:focus, .content-select:focus {
          border-color: #ff9d33;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
        }

        .content-input::placeholder, .content-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .edit-button {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 6px;
          padding: 6px 8px;
          color: #ff9d33;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .edit-button:hover {
          background: rgba(255, 107, 0, 0.2);
          transform: scale(1.05);
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .save-button {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .save-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }

        .save-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .cancel-button {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 10px 20px;
          color: #ef4444;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cancel-button:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .service-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .service-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .service-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .service-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
          flex: 1;
        }

        .service-actions {
          display: flex;
          gap: 8px;
        }

        .control-button {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(30, 35, 66, 0.5);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-button:hover {
          background: rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.3);
          color: #ff9d33;
        }

        .control-button.danger:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .service-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .features-section {
          margin-bottom: 15px;
        }

        .features-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .feature-dot {
          width: 4px;
          height: 4px;
          background: #ff9d33;
          border-radius: 50%;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-badge.inactive {
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.3);
        }

        .add-service-form {
          background: rgba(30, 35, 66, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .add-service-form:hover {
          border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.02);
        }

        .add-button {
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        }

        .add-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .feature-input-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .feature-input {
          flex: 1;
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          color: white;
          font-size: 12px;
          outline: none;
        }

        .remove-feature-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 4px;
          padding: 6px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .remove-feature-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .add-feature-btn {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 6px;
          padding: 6px 12px;
          color: #ff9d33;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }

        .add-feature-btn:hover {
          background: rgba(255, 107, 0, 0.2);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 15px;
          text-align: center;
        }

        .stat-number {
          font-size: 20px;
          font-weight: 700;
          color: #ff9d33;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.6);
        }

        .empty-state-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          opacity: 0.5;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Custom scrollbar */
        .tab-content::-webkit-scrollbar {
          width: 6px;
        }

        .tab-content::-webkit-scrollbar-track {
          background: rgba(30, 35, 66, 0.3);
          border-radius: 3px;
        }

        .tab-content::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 0, 0.5);
          border-radius: 3px;
        }

        .tab-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 0, 0.7);
        }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">Services Management</h1>
        <p className="admin-subtitle">Manage your political consulting services and content</p>
      </div>

      {success && (
        <div className="alert-banner alert-success">
          <CheckCircle size={16} />
          {success}
        </div>
      )}

      {error && (
        <div className="alert-banner alert-error">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <List size={16} />
          Services
        </button>
        <button
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <Info size={16} />
          Page Content
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'services' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{servicesData.services?.length || 0}</div>
                <div className="stat-label">Total Services</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{servicesData.services?.filter(s => s.active).length || 0}</div>
                <div className="stat-label">Active Services</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{servicesData.services?.filter(s => !s.active).length || 0}</div>
                <div className="stat-label">Inactive Services</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{servicesData.services?.filter(s => s.featured).length || 0}</div>
                <div className="stat-label">Featured Services</div>
              </div>
            </div>

            {!showServiceForm ? (
              <div className="add-service-form">
                <button className="add-button" onClick={() => setShowServiceForm(true)}>
                  <Plus size={16} />
                  Add New Service
                </button>
              </div>
            ) : (
              <div className="content-section">
                <h3 className="section-title">
                  <Plus size={18} />
                  Add New Service
                </h3>
                
                <div className="content-item">
                  <div className="content-label">Service Title</div>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter service title"
                    value={newService.title}
                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="content-item">
                  <div className="content-label">Description</div>
                  <textarea
                    className="content-textarea"
                    placeholder="Enter service description"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="content-item">
                  <div className="content-label">Icon</div>
                  <select
                    className="content-select"
                    value={newService.icon}
                    onChange={(e) => setNewService(prev => ({ ...prev, icon: e.target.value }))}
                  >
                    {availableIcons.map(icon => (
                      <option key={icon.name} value={icon.name}>
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="content-item">
                  <div className="content-label">Features</div>
                  {newService.features.map((feature, index) => (
                    <div key={index} className="feature-input-group">
                      <input
                        type="text"
                        className="feature-input"
                        placeholder="Enter feature"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      {newService.features.length > 1 && (
                        <button
                          className="remove-feature-btn"
                          onClick={() => removeFeature(index)}
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button className="add-feature-btn" onClick={() => addFeature()}>
                    <Plus size={12} />
                    Add Feature
                  </button>
                </div>

                <div className="action-buttons">
                  <button className="save-button" onClick={handleAddService} disabled={submitLoading || !newService.title || !newService.description}>
                    {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                    Add Service
                  </button>
                  <button className="cancel-button" onClick={() => {
                    setShowServiceForm(false);
                    setNewService({
                      title: '',
                      description: '',
                      features: [''],
                      icon: 'Users',
                      active: true
                    });
                  }}>
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="content-section">
              <h3 className="section-title">
                <List size={18} />
                Services ({servicesData.services?.length || 0})
              </h3>
              
              {!servicesData.services || servicesData.services.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <List size={64} />
                  </div>
                  <h4>No services available</h4>
                  <p>Add your first service to get started with managing your political consulting offerings.</p>
                </div>
              ) : (
                <div className="service-grid">
                  {servicesData.services.map((service) => (
                    <div key={service._id} className="service-card">
                      {editMode === service._id ? (
                        <div>
                          <div className="content-item">
                            <div className="content-label">Service Title</div>
                            <input
                              type="text"
                              className="content-input"
                              value={editingService.title || ''}
                              onChange={(e) => setEditingService(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>

                          <div className="content-item">
                            <div className="content-label">Description</div>
                            <textarea
                              className="content-textarea"
                              value={editingService.description || ''}
                              onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))}
                            />
                          </div>

                          <div className="content-item">
                            <div className="content-label">Icon</div>
                            <select
                              className="content-select"
                              value={editingService.icon || 'Users'}
                              onChange={(e) => setEditingService(prev => ({ ...prev, icon: e.target.value }))}
                            >
                              {availableIcons.map(icon => (
                                <option key={icon.name} value={icon.name}>
                                  {icon.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="content-item">
                            <div className="content-label">Features</div>
                            {editingService.features?.map((feature, index) => (
                              <div key={index} className="feature-input-group">
                                <input
                                  type="text"
                                  className="feature-input"
                                  value={feature}
                                  onChange={(e) => updateFeature(index, e.target.value, service._id)}
                                />
                                {editingService.features.length > 1 && (
                                  <button
                                    className="remove-feature-btn"
                                    onClick={() => removeFeature(index, service._id)}
                                  >
                                    <X size={12} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button className="add-feature-btn" onClick={() => addFeature(service._id)}>
                              <Plus size={12} />
                              Add Feature
                            </button>
                          </div>

                          <div className="action-buttons">
                            <button className="save-button" onClick={handleSaveService} disabled={submitLoading}>
                              {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                              Save
                            </button>
                            <button className="cancel-button" onClick={handleCancelEdit}>
                              <X size={14} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="service-header">
                            <div className="service-icon">
                              {React.createElement(getIconComponent(service.icon), { size: 18 })}
                            </div>
                            <div className="service-title">{service.title}</div>
                            <div className="service-actions">
                              <button 
                                className="control-button"
                                onClick={() => toggleServiceActive(service)}
                                title={service.active ? 'Deactivate' : 'Activate'}
                              >
                                {service.active ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button 
                                className="control-button"
                                onClick={() => handleEditService(service)}
                                title="Edit"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button 
                                className="control-button danger"
                                onClick={() => handleDeleteService(service)}
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="service-description">
                            {service.description}
                          </div>

                          {service.features && service.features.length > 0 && (
                            <div className="features-section">
                              <div className="features-label">Features:</div>
                              <ul className="feature-list">
                                {service.features.map((feature, index) => (
                                  <li key={index} className="feature-item">
                                    <div className="feature-dot"></div>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className={`status-badge ${service.active ? 'active' : 'inactive'}`}>
                              {service.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Globe size={18} />
                Header Section
              </h3>
              
              <div className="content-item">
                <div className="content-label">Subtitle</div>
                <input
                  type="text"
                  className="content-input"
                  value={servicesData.headerContent?.subtitle || ''}
                  onChange={(e) => handleHeaderUpdate('subtitle', e.target.value)}
                  placeholder="Our Services"
                />
              </div>

              <div className="content-item">
                <div className="content-label">Main Title</div>
                <input
                  type="text"
                  className="content-input"
                  value={servicesData.headerContent?.mainTitle || ''}
                  onChange={(e) => handleHeaderUpdate('mainTitle', e.target.value)}
                  placeholder="Complete Political Solutions"
                />
              </div>

              <div className="content-item">
                <div className="content-label">Description</div>
                <textarea
                  className="content-textarea"
                  value={servicesData.headerContent?.description || ''}
                  onChange={(e) => handleHeaderUpdate('description', e.target.value)}
                  placeholder="Enter header description"
                />
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Target size={18} />
                Call-to-Action Section
              </h3>
              
              <div className="content-item">
                <div className="content-label">CTA Title</div>
                <input
                  type="text"
                  className="content-input"
                  value={servicesData.ctaSection?.title || ''}
                  onChange={(e) => handleCTAUpdate('title', e.target.value)}
                  placeholder="Ready to Transform Your Political Journey?"
                />
              </div>

              <div className="content-item">
                <div className="content-label">CTA Description</div>
                <textarea
                  className="content-textarea"
                  value={servicesData.ctaSection?.description || ''}
                  onChange={(e) => handleCTAUpdate('description', e.target.value)}
                  placeholder="Let's discuss how our services can help..."
                />
              </div>

              <div className="content-item">
                <div className="content-label">Button Text</div>
                <input
                  type="text"
                  className="content-input"
                  value={servicesData.ctaSection?.buttonText || ''}
                  onChange={(e) => handleCTAUpdate('buttonText', e.target.value)}
                  placeholder="Get Started Today"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Settings size={18} />
                Display Settings
              </h3>
              
              <div className="content-item">
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Enable service animations
                </label>
              </div>

              <div className="content-item">
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Show service icons
                </label>
              </div>

              <div className="content-item">
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Enable dark mode
                </label>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Info size={18} />
                Service Management
              </h3>
              
              <div className="content-item">
                <div className="content-label">Services per row</div>
                <select className="content-select">
                  <option value={2}>2 services per row</option>
                  <option value={3} defaultValue>3 services per row</option>
                  <option value={4}>4 services per row</option>
                </select>
              </div>

              <div className="content-item">
                <div className="content-label">Default service status</div>
                <select className="content-select">
                  <option value="active" defaultValue>Active by default</option>
                  <option value="inactive">Inactive by default</option>
                </select>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <AlertCircle size={18} />
                Data Management
              </h3>
              
              <div className="content-item">
                <div className="content-label">Refresh Data</div>
                <button 
                  className="save-button" 
                  onClick={fetchServicesData}
                  disabled={loading}
                >
                  {loading ? <Loader size={14} className="animate-spin" /> : <Settings size={14} />}
                  Refresh Services Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Serviceadmin;