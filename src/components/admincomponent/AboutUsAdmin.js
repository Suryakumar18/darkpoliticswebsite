import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Type,
  Users,
  BarChart3,
  Settings,
  Loader,
  AlertCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const AboutUsAdmin = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [editMode, setEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [newCarouselImage, setNewCarouselImage] = useState({ url: '', title: '', description: '' });
  const [newFeature, setNewFeature] = useState('');
  const [showImagePreview, setShowImagePreview] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    header: true,
    mission: true,
    features: true,
    services: true
  });

  // API base URL - adjust according to your backend
  const API_BASE_URL = 'https://darkpoliticswebsitebackend.onrender.com/api/aboutus';

  const fetchAboutUsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        setError('');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Error fetching about us data:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle content editing
  const handleEditContent = (field) => {
    setEditMode(field);
    setEditingContent({ ...aboutData });
  };

  const handleSaveContent = async () => {
    try {
      setSubmitLoading(true);
      
      let endpoint = '';
      let data = {};
      
      if (editMode === 'subtitle' || editMode === 'description') {
        endpoint = '/header';
        data = {
          subtitle: editingContent.header?.subtitle,
          title: editingContent.header?.title,
          description: editingContent.header?.description
        };
      } else if (editMode === 'missionTitle' || editMode === 'missionContent' || editMode === 'subsectionTitle') {
        endpoint = '/mission';
        data = {
          title: editingContent.mission?.title,
          content: editingContent.mission?.content,
          subsectionTitle: editingContent.mission?.subsectionTitle
        };
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        setEditMode(false);
        setEditingContent({});
        showSuccess('Content updated successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Error updating content:', err);
      showError('Failed to update content');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingContent({});
    setEditMode(false);
  };

  // Handle carousel image management
  const handleAddCarouselImage = async () => {
    if (!newCarouselImage.url || !newCarouselImage.title) return;

    try {
      setSubmitLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/carousel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarouselImage),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        setNewCarouselImage({ url: '', title: '', description: '' });
        showSuccess('Carousel image added successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to add carousel image');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCarouselImage = async (imageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${imageId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        showSuccess('Carousel image deleted successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to delete carousel image');
    }
  };

  const toggleCarouselImageActive = async (imageId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carousel/${imageId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentStatus }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        showSuccess('Image status updated!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to update image status');
    }
  };

  // Handle features management
  const handleAddFeature = async () => {
    if (!newFeature.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feature: newFeature.trim() }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        setNewFeature('');
        showSuccess('Feature added successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to add feature');
    }
  };

  const handleDeleteFeature = async (index) => {
    try {
      const response = await fetch(`${API_BASE_URL}/features/${index}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        showSuccess('Feature deleted successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to delete feature');
    }
  };

  // Handle stats management
  const handleUpdateStat = async (statId, field, value) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/${statId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAboutData(result.data);
        showSuccess('Statistic updated successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showError('Failed to update statistic');
    }
  };

  if (loading) {
    return (
      <div className="about-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9d33' }}>
          <Loader size={24} className="animate-spin" />
          <span>Loading about us data...</span>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="about-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
          <AlertCircle size={24} />
          <span>Failed to load about us data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="about-admin-container">
      <style>{`
        .about-admin-container {
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
        }

        .content-section {
          background: rgba(30, 35, 66, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          cursor: pointer;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #ff9d33;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .collapse-button {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 6px;
          padding: 6px;
          color: #ff9d33;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .collapse-button:hover {
          background: rgba(255, 107, 0, 0.2);
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

        .content-input, .content-textarea {
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

        .content-input:focus, .content-textarea:focus {
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

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
        }

        .feature-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          flex: 1;
        }

        .feature-actions {
          display: flex;
          gap: 8px;
        }

        .delete-button {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          padding: 6px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-button:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .add-item-form {
          background: rgba(30, 35, 66, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .add-item-form:hover {
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
          margin: 15px auto 0;
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

        .carousel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .carousel-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .carousel-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .carousel-preview {
          width: 100%;
          height: 150px;
          background-size: cover;
          background-position: center;
          position: relative;
          cursor: pointer;
        }

        .carousel-preview.placeholder {
          background: rgba(30, 35, 66, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .carousel-preview:hover .carousel-overlay {
          opacity: 1;
        }

        .carousel-info {
          padding: 15px;
        }

        .carousel-title {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .carousel-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
        }

        .carousel-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .control-buttons {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
        }

        .stat-input {
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 8px;
          color: white;
          font-size: 14px;
          width: 100%;
          margin-bottom: 8px;
        }

        .stat-input:focus {
          border-color: #ff9d33;
          outline: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">About Us Management</h1>
        <p className="admin-subtitle">Manage your About Us page content, images, and statistics</p>
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
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <Type size={16} />
          Content
        </button>
        <button
          className={`tab-button ${activeTab === 'carousel' ? 'active' : ''}`}
          onClick={() => setActiveTab('carousel')}
        >
          <ImageIcon size={16} />
          Carousel
        </button>
        <button
          className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          <Users size={16} />
          Features
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart3 size={16} />
          Statistics
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'content' && (
          <div>
            {/* Header Section */}
            <div className="content-section">
              <div className="section-header" onClick={() => toggleSection('header')}>
                <h3 className="section-title">
                  <Type size={18} />
                  Header Content
                </h3>
                <button className="collapse-button">
                  {expandedSections.header ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              
              {expandedSections.header && (
                <>
                  <div className="content-item">
                    <div className="content-label">
                      Subtitle
                      {editMode !== 'subtitle' && (
                        <button className="edit-button" onClick={() => handleEditContent('subtitle')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'subtitle' ? (
                      <>
                        <input
                          type="text"
                          className="content-input"
                          value={editingContent.header?.subtitle || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            header: { ...prev.header, subtitle: e.target.value }
                          }))}
                          placeholder="Enter subtitle"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.header.subtitle}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Title
                      {editMode !== 'title' && (
                        <button className="edit-button" onClick={() => handleEditContent('title')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'title' ? (
                      <>
                        <input
                          type="text"
                          className="content-input"
                          value={editingContent.header?.title || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            header: { ...prev.header, title: e.target.value }
                          }))}
                          placeholder="Enter title"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.header.title}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Description
                      {editMode !== 'description' && (
                        <button className="edit-button" onClick={() => handleEditContent('description')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'description' ? (
                      <>
                        <textarea
                          className="content-textarea"
                          value={editingContent.header?.description || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            header: { ...prev.header, description: e.target.value }
                          }))}
                          placeholder="Enter description"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.header.description}</div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mission Section */}
            <div className="content-section">
              <div className="section-header" onClick={() => toggleSection('mission')}>
                <h3 className="section-title">
                  <Users size={18} />
                  Mission Content
                </h3>
                <button className="collapse-button">
                  {expandedSections.mission ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              
              {expandedSections.mission && (
                <>
                  <div className="content-item">
                    <div className="content-label">
                      Mission Title
                      {editMode !== 'missionTitle' && (
                        <button className="edit-button" onClick={() => handleEditContent('missionTitle')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'missionTitle' ? (
                      <>
                        <input
                          type="text"
                          className="content-input"
                          value={editingContent.mission?.title || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            mission: { ...prev.mission, title: e.target.value }
                          }))}
                          placeholder="Enter mission title"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.mission.title}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Mission Content
                      {editMode !== 'missionContent' && (
                        <button className="edit-button" onClick={() => handleEditContent('missionContent')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'missionContent' ? (
                      <>
                        <textarea
                          className="content-textarea"
                          value={editingContent.mission?.content || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            mission: { ...prev.mission, content: e.target.value }
                          }))}
                          placeholder="Enter mission content"
                          style={{ minHeight: '120px' }}
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.mission.content}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Subsection Title
                      {editMode !== 'subsectionTitle' && (
                        <button className="edit-button" onClick={() => handleEditContent('subsectionTitle')}>
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    {editMode === 'subsectionTitle' ? (
                      <>
                        <input
                          type="text"
                          className="content-input"
                          value={editingContent.mission?.subsectionTitle || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            mission: { ...prev.mission, subsectionTitle: e.target.value }
                          }))}
                          placeholder="Enter subsection title"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContent} disabled={submitLoading}>
                            {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{aboutData.mission.subsectionTitle}</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'carousel' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Carousel Image
              </h3>
              
              <div className="add-item-form">
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter image URL"
                    value={newCarouselImage.url}
                    onChange={(e) => setNewCarouselImage(prev => ({ ...prev, url: e.target.value }))}
                    style={{ marginBottom: '10px' }}
                  />
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter image title"
                    value={newCarouselImage.title}
                    onChange={(e) => setNewCarouselImage(prev => ({ ...prev, title: e.target.value }))}
                    style={{ marginBottom: '10px' }}
                  />
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter image description"
                    value={newCarouselImage.description}
                    onChange={(e) => setNewCarouselImage(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <button 
                  className="add-button"
                  onClick={handleAddCarouselImage}
                  disabled={!newCarouselImage.url || !newCarouselImage.title || submitLoading}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Carousel Image
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <ImageIcon size={18} />
                Carousel Images ({aboutData.carouselImages?.length || 0})
              </h3>
              
              <div className="carousel-grid">
                {aboutData.carouselImages?.map((image) => (
                  <div key={image._id} className="carousel-card">
                    <div 
                      className="carousel-preview"
                      style={{ 
                        backgroundImage: showImagePreview[image._id] ? `url(${image.url})` : 'none' 
                      }}
                      onClick={() => setShowImagePreview(prev => ({ ...prev, [image._id]: !prev[image._id] }))}
                    >
                      {!showImagePreview[image._id] && (
                        <div className="carousel-preview placeholder">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <div className="carousel-overlay">
                        <div style={{ color: 'white', textAlign: 'center' }}>
                          {showImagePreview[image._id] ? (
                            <>
                              <EyeOff size={24} />
                              <div style={{ fontSize: '12px', marginTop: '5px' }}>Hide Preview</div>
                            </>
                          ) : (
                            <>
                              <Eye size={24} />
                              <div style={{ fontSize: '12px', marginTop: '5px' }}>Show Preview</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="carousel-info">
                      <div className="carousel-title">{image.title}</div>
                      <div className="carousel-description">{image.description}</div>
                      
                      <div className="carousel-actions">
                        <span className={`status-badge ${image.active ? 'active' : 'inactive'}`}>
                          {image.active ? 'Active' : 'Inactive'}
                        </span>
                        
                        <div className="control-buttons">
                          <button 
                            className="control-button"
                            onClick={() => toggleCarouselImageActive(image._id, image.active)}
                            title={image.active ? 'Deactivate' : 'Activate'}
                          >
                            {image.active ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button 
                            className="control-button danger"
                            onClick={() => handleDeleteCarouselImage(image._id)}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Feature
              </h3>
              
              <div className="add-item-form">
                <input
                  type="text"
                  className="content-input"
                  placeholder="Enter new feature description"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  style={{ marginBottom: '15px' }}
                />
                <button 
                  className="add-button"
                  onClick={handleAddFeature}
                  disabled={!newFeature.trim() || submitLoading}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Feature
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Users size={18} />
                Features List ({aboutData.features?.length || 0})
              </h3>
              
              <div className="features-list">
                {aboutData.features?.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-text">{feature}</span>
                    <div className="feature-actions">
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteFeature(index)}
                        title="Delete Feature"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <BarChart3 size={18} />
                Statistics Management
              </h3>
              
              <div className="stats-grid">
                {aboutData.stats?.map((stat) => (
                  <div key={stat._id} className="stat-card">
                    <input
                      type="text"
                      className="stat-input"
                      value={stat.number}
                      onChange={(e) => handleUpdateStat(stat._id, 'number', e.target.value)}
                      placeholder="Number (e.g., 150+)"
                    />
                    <input
                      type="text"
                      className="stat-input"
                      value={stat.label}
                      onChange={(e) => handleUpdateStat(stat._id, 'label', e.target.value)}
                      placeholder="Label (e.g., Successful Campaigns)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AboutUsAdmin;