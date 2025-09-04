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
  Globe,
  Palette,
  Settings,
  Loader,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Homeadmin = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [editMode, setEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [showImagePreview, setShowImagePreview] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api/homepage';

  // Fetch homepage data
  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      
      if (result.success) {
        setHomeData(result.data);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch homepage data');
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchHomepageData();
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

  // Handle content editing
  const handleEditContent = (field) => {
    setEditMode(field);
    setEditingContent({ ...homeData });
  };

  const handleSaveContent = async () => {
    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName: editingContent.brandName,
          tagline: editingContent.tagline,
          mainHeading: editingContent.mainHeading,
          description: editingContent.description,
          ctaButton: editingContent.ctaButton
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(result.data);
        setEditMode(false);
        setEditingContent({});
        showSuccess('Content updated successfully!');
      } else {
        showError(result.message || 'Failed to update content');
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

  // Handle social links update
  const handleSocialLinksUpdate = async (field, value) => {
    try {
      const updateData = { [field]: value };
      const response = await fetch(`${API_BASE_URL}/social-links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(prev => ({
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            [field]: value
          }
        }));
        showSuccess('Social links updated!');
      } else {
        showError(result.message || 'Failed to update social links');
      }
    } catch (err) {
      console.error('Error updating social links:', err);
      showError('Failed to update social links');
    }
  };

  // Handle image management
  const handleAddImage = async () => {
    if (!newImageUrl || !newImageAlt) return;

    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: newImageUrl,
          alt: newImageAlt,
          active: true
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(prev => ({
          ...prev,
          backgroundImages: result.data
        }));
        setNewImageUrl('');
        setNewImageAlt('');
        showSuccess('Image added successfully!');
      } else {
        showError(result.message || 'Failed to add image');
      }
    } catch (err) {
      console.error('Error adding image:', err);
      showError('Failed to add image');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(prev => ({
          ...prev,
          backgroundImages: result.data
        }));
        showSuccess('Image deleted successfully!');
      } else {
        showError(result.message || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      showError('Failed to delete image');
    }
  };

  const toggleImageActive = async (imageId) => {
    try {
      const image = homeData.backgroundImages.find(img => img._id === imageId);
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !image.active
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(prev => ({
          ...prev,
          backgroundImages: prev.backgroundImages.map(img => 
            img._id === imageId ? { ...img, active: !img.active } : img
          )
        }));
        showSuccess(`Image ${!image.active ? 'activated' : 'deactivated'}!`);
      } else {
        showError(result.message || 'Failed to update image status');
      }
    } catch (err) {
      console.error('Error toggling image status:', err);
      showError('Failed to update image status');
    }
  };

  const toggleImagePreview = (imageId) => {
    setShowImagePreview(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  // Handle display settings update
  const handleSettingsUpdate = async (settings) => {
    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });

      const result = await response.json();
      
      if (result.success) {
        setHomeData(prev => ({
          ...prev,
          displaySettings: { ...prev.displaySettings, ...settings }
        }));
        showSuccess('Settings updated successfully!');
      } else {
        showError(result.message || 'Failed to update settings');
      }
    } catch (err) {
      console.error('Error updating settings:', err);
      showError('Failed to update settings');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9d33' }}>
          <Loader size={24} className="animate-spin" />
          <span>Loading homepage data...</span>
        </div>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="home-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
          <AlertCircle size={24} />
          <span>Failed to load homepage data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-admin-container">
      <style>{`
        .home-admin-container {
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

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .image-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .image-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .image-preview {
          width: 100%;
          height: 150px;
          background-size: cover;
          background-position: center;
          position: relative;
          cursor: pointer;
        }

        .image-preview.placeholder {
          background: rgba(30, 35, 66, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
        }

        .image-overlay {
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

        .image-preview:hover .image-overlay {
          opacity: 1;
        }

        .image-info {
          padding: 15px;
        }

        .image-url {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          word-break: break-all;
          margin-bottom: 8px;
        }

        .image-alt {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 12px;
        }

        .image-actions {
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

        .image-control-buttons {
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

        .add-image-form {
          background: rgba(30, 35, 66, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .add-image-form:hover {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #ff9d33;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
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
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">Homepage Management</h1>
        <p className="admin-subtitle">Manage your website's homepage content and background images</p>
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
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          <ImageIcon size={16} />
          Images
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
        {activeTab === 'content' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Type size={18} />
                Brand & Messaging
              </h3>
              
              <div className="content-item">
                <div className="content-label">
                  Brand Name
                  {editMode !== 'brandName' && (
                    <button className="edit-button" onClick={() => handleEditContent('brandName')}>
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
                {editMode === 'brandName' ? (
                  <>
                    <input
                      type="text"
                      className="content-input"
                      value={editingContent.brandName || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, brandName: e.target.value }))}
                      placeholder="Enter brand name"
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
                  <div className="content-value">{homeData.brandName}</div>
                )}
              </div>

              <div className="content-item">
                <div className="content-label">
                  Tagline
                  {editMode !== 'tagline' && (
                    <button className="edit-button" onClick={() => handleEditContent('tagline')}>
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
                {editMode === 'tagline' ? (
                  <>
                    <input
                      type="text"
                      className="content-input"
                      value={editingContent.tagline || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="Enter tagline"
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
                  <div className="content-value">{homeData.tagline}</div>
                )}
              </div>

              <div className="content-item">
                <div className="content-label">
                  Main Heading
                  {editMode !== 'mainHeading' && (
                    <button className="edit-button" onClick={() => handleEditContent('mainHeading')}>
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
                {editMode === 'mainHeading' ? (
                  <>
                    <input
                      type="text"
                      className="content-input"
                      value={editingContent.mainHeading || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, mainHeading: e.target.value }))}
                      placeholder="Enter main heading"
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
                  <div className="content-value">{homeData.mainHeading}</div>
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
                      value={editingContent.description || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, description: e.target.value }))}
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
                  <div className="content-value">{homeData.description}</div>
                )}
              </div>

              <div className="content-item">
                <div className="content-label">
                  Call-to-Action Button
                  {editMode !== 'ctaButton' && (
                    <button className="edit-button" onClick={() => handleEditContent('ctaButton')}>
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
                {editMode === 'ctaButton' ? (
                  <>
                    <input
                      type="text"
                      className="content-input"
                      value={editingContent.ctaButton || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, ctaButton: e.target.value }))}
                      placeholder="Enter button text"
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
                  <div className="content-value">{homeData.ctaButton}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{homeData.backgroundImages?.length || 0}</div>
                <div className="stat-label">Total Images</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{homeData.backgroundImages?.filter(img => img.active).length || 0}</div>
                <div className="stat-label">Active Images</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{homeData.backgroundImages?.filter(img => !img.active).length || 0}</div>
                <div className="stat-label">Inactive Images</div>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Background Image
              </h3>
              
              <div className="add-image-form">
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Enter image description/alt text"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                  />
                </div>
                <button 
                  className="add-button"
                  onClick={handleAddImage}
                  disabled={!newImageUrl || !newImageAlt || submitLoading}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Image
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <ImageIcon size={18} />
                Background Images ({homeData.backgroundImages?.length || 0})
              </h3>
              
              <div className="image-grid">
                {homeData.backgroundImages?.map((image) => (
                  <div key={image._id} className="image-card">
                    <div 
                      className="image-preview"
                      style={{ 
                        backgroundImage: showImagePreview[image._id] ? `url(${image.url})` : 'none' 
                      }}
                      onClick={() => toggleImagePreview(image._id)}
                    >
                      {!showImagePreview[image._id] && (
                        <div className="image-preview placeholder">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <div className="image-overlay">
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
                    
                    <div className="image-info">
                      <div className="image-url">{image.url}</div>
                      <div className="image-alt">{image.alt}</div>
                      
                      <div className="image-actions">
                        <span className={`status-badge ${image.active ? 'active' : 'inactive'}`}>
                          {image.active ? 'Active' : 'Inactive'}
                        </span>
                        
                        <div className="image-control-buttons">
                          <button 
                            className="control-button"
                            onClick={() => toggleImageActive(image._id)}
                            title={image.active ? 'Deactivate' : 'Activate'}
                          >
                            {image.active ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button 
                            className="control-button danger"
                            onClick={() => handleDeleteImage(image._id)}
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

        {activeTab === 'settings' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Globe size={18} />
                Social Links
              </h3>
              
              <div className="content-item">
                <div className="content-label">LinkedIn URL</div>
                <input
                  type="text"
                  className="content-input"
                  value={homeData.socialLinks?.linkedin || ''}
                  onChange={(e) => handleSocialLinksUpdate('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="content-item">
                <div className="content-label">Twitter URL</div>
                <input
                  type="text"
                  className="content-input"
                  value={homeData.socialLinks?.twitter || ''}
                  onChange={(e) => handleSocialLinksUpdate('twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="content-item">
                <div className="content-label">Email Contact</div>
                <input
                  type="email"
                  className="content-input"
                  value={homeData.socialLinks?.email || ''}
                  onChange={(e) => handleSocialLinksUpdate('email', e.target.value)}
                  placeholder="contact@darkstate.com"
                />
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Palette size={18} />
                Display Settings
              </h3>
              
              <div className="content-item">
                <div className="content-label">Image Rotation Interval (seconds)</div>
                <input
                  type="number"
                  className="content-input"
                  value={homeData.displaySettings?.imageRotationInterval || 5}
                  onChange={(e) => handleSettingsUpdate({ imageRotationInterval: parseInt(e.target.value) })}
                  min={2}
                  max={30}
                  placeholder="5"
                />
              </div>

              <div className="content-item">
                <div className="content-label">Animation Duration (seconds)</div>
                <input
                  type="number"
                  className="content-input"
                  value={homeData.displaySettings?.animationDuration || 2}
                  onChange={(e) => handleSettingsUpdate({ animationDuration: parseFloat(e.target.value) })}
                  min={1}
                  max={10}
                  step={0.1}
                  placeholder="2.0"
                />
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Settings size={18} />
                Advanced Settings
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
                    checked={homeData.displaySettings?.enableFloatingAnimations || false}
                    onChange={(e) => handleSettingsUpdate({ enableFloatingAnimations: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Enable floating animations
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
                    checked={homeData.displaySettings?.autoRotateImages || false}
                    onChange={(e) => handleSettingsUpdate({ autoRotateImages: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Auto-rotate background images
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
                    checked={homeData.displaySettings?.maintenanceMode || false}
                    onChange={(e) => handleSettingsUpdate({ maintenanceMode: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#ff9d33'
                    }}
                  />
                  Enable maintenance mode
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homeadmin;