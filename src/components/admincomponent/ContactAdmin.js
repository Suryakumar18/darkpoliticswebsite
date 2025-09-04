import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader,
  AlertCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Globe,
  Building
} from 'lucide-react';

const ContactAdmin = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [editMode, setEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [newContactInfo, setNewContactInfo] = useState({ type: 'email', title: '', info: '', subInfo: '', icon: 'Mail' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    office: true,
    social: true
  });

  // Fetch contact data from API
  useEffect(() => {
    fetchContactData();
  }, []);

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
  };

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

  const handleEditContactInfo = (infoId) => {
    const infoToEdit = contactData.contactInfo.find(info => info._id === infoId);
    setEditMode(infoId);
    setEditingContent(infoToEdit);
  };

  const handleSaveContactInfo = async () => {
    try {
      setSubmitLoading(true);
      const response = await fetch(`http://localhost:5000/api/contact/info/${editMode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContent)
      });
      
      if (!response.ok) throw new Error('Failed to update contact info');
      
      await fetchContactData();
      setEditMode(false);
      setEditingContent({});
      showSuccess('Contact information updated successfully!');
    } catch (err) {
      showError('Failed to update contact information');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingContent({});
    setEditMode(false);
  };

  const handleAddContactInfo = async () => {
    if (!newContactInfo.title || !newContactInfo.info) return;
    
    try {
      setSubmitLoading(true);
      const response = await fetch('http://localhost:5000/api/contact/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContactInfo)
      });
      
      if (!response.ok) throw new Error('Failed to add contact info');
      
      await fetchContactData();
      setNewContactInfo({ type: 'email', title: '', info: '', subInfo: '', icon: 'Mail' });
      showSuccess('Contact information added successfully!');
    } catch (err) {
      showError('Failed to add contact information');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteContactInfo = async (infoId) => {
    if (!window.confirm('Are you sure you want to delete this contact information?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/contact/info/${infoId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete contact info');
      
      await fetchContactData();
      showSuccess('Contact information deleted successfully!');
    } catch (err) {
      showError('Failed to delete contact information');
    }
  };

  const toggleContactInfoActive = async (infoId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/info/${infoId}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      await fetchContactData();
      showSuccess('Contact info status updated!');
    } catch (err) {
      showError('Failed to update contact info status');
    }
  };

  const handleUpdateOfficeDetails = async (field, value) => {
    try {
      const response = await fetch('http://localhost:5000/api/contact/office', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });
      
      if (!response.ok) throw new Error('Failed to update office details');
      
      await fetchContactData();
      setEditMode(false);
      showSuccess('Office details updated successfully!');
    } catch (err) {
      showError('Failed to update office details');
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Mail, Phone, MapPin, Clock, Globe, Building
    };
    const IconComponent = icons[iconName] || Mail;
    return <IconComponent size={18} />;
  };

  if (loading) {
    return (
      <div className="contact-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9d33' }}>
          <Loader size={24} className="animate-spin" />
          <span>Loading contact data...</span>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="contact-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
          <AlertCircle size={24} />
          <span>Failed to load contact data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-admin-container">
      <style>{`
        .contact-admin-container {
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
          margin: 0;
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

        .add-item-form {
          background: rgba(30, 35, 66, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .add-item-form:hover {
          border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.02);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .form-grid.full {
          grid-template-columns: 1fr;
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

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .contact-info-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .contact-info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .contact-info-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .contact-info-actions {
          display: flex;
          gap: 8px;
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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .tab-container {
            flex-direction: column;
          }
          
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="admin-header">
        <h1 className="admin-title">Contact Management</h1>
        <p className="admin-subtitle">Manage contact information and office details</p>
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
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <Phone size={16} />
          Contact Info
        </button>
        <button
          className={`tab-button ${activeTab === 'office' ? 'active' : ''}`}
          onClick={() => setActiveTab('office')}
        >
          <Building size={16} />
          Office Details
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'info' && (
          <div>
            {/* Add New Contact Info */}
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Contact Information
              </h3>
              
              <div className="add-item-form">
                <div className="form-grid" style={{ marginBottom: '15px' }}>
                  <div>
                    <label className="content-label">Type</label>
                    <select
                      className="content-select"
                      value={newContactInfo.type}
                      onChange={(e) => setNewContactInfo(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="address">Address</option>
                      <option value="hours">Working Hours</option>
                      <option value="social">Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="content-label">Icon</label>
                    <select
                      className="content-select"
                      value={newContactInfo.icon}
                      onChange={(e) => setNewContactInfo(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      <option value="Mail">Mail</option>
                      <option value="Phone">Phone</option>
                      <option value="MapPin">MapPin</option>
                      <option value="Clock">Clock</option>
                      <option value="Globe">Globe</option>
                      <option value="Building">Building</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-grid" style={{ marginBottom: '15px' }}>
                  <div>
                    <label className="content-label">Title</label>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="e.g., Email Us"
                      value={newContactInfo.title}
                      onChange={(e) => setNewContactInfo(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="content-label">Main Info</label>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="e.g., contact@example.com"
                      value={newContactInfo.info}
                      onChange={(e) => setNewContactInfo(prev => ({ ...prev, info: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="form-grid full">
                  <div>
                    <label className="content-label">Additional Info (Optional)</label>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="e.g., info@example.com"
                      value={newContactInfo.subInfo}
                      onChange={(e) => setNewContactInfo(prev => ({ ...prev, subInfo: e.target.value }))}
                    />
                  </div>
                </div>

                <button 
                  className="add-button"
                  onClick={handleAddContactInfo}
                  disabled={!newContactInfo.title || !newContactInfo.info || submitLoading}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Contact Information
                </button>
              </div>
            </div>

            {/* Contact Information List */}
            <div className="content-section">
              <h3 className="section-title">
                <Phone size={18} />
                Contact Information ({contactData.contactInfo?.length || 0})
              </h3>
              
              <div className="contact-info-grid">
                {contactData.contactInfo?.map((info) => (
                  <div key={info._id} className="contact-info-card">
                    <div className="contact-info-header">
                      <div className="contact-info-icon">
                        {getIconComponent(info.icon)}
                        <span>{info.title}</span>
                      </div>
                      <div className="contact-info-actions">
                        <span className={`status-badge ${info.active ? 'active' : 'inactive'}`}>
                          {info.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {editMode === info._id ? (
                      <div>
                        <div style={{ marginBottom: '15px' }}>
                          <label className="content-label">Title</label>
                          <input
                            type="text"
                            className="content-input"
                            value={editingContent.title || ''}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                          <label className="content-label">Main Info</label>
                          <input
                            type="text"
                            className="content-input"
                            value={editingContent.info || ''}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, info: e.target.value }))}
                          />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                          <label className="content-label">Additional Info</label>
                          <input
                            type="text"
                            className="content-input"
                            value={editingContent.subInfo || ''}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, subInfo: e.target.value }))}
                          />
                        </div>
                        <div className="action-buttons">
                          <button className="save-button" onClick={handleSaveContactInfo} disabled={submitLoading}>
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
                        <div className="content-value" style={{ marginBottom: '8px' }}>
                          <strong>{info.info}</strong>
                        </div>
                        {info.subInfo && (
                          <div className="content-value" style={{ fontSize: '13px', opacity: '0.8' }}>
                            {info.subInfo}
                          </div>
                        )}
                        <div className="action-buttons" style={{ marginTop: '15px' }}>
                          <button className="control-button" onClick={() => handleEditContactInfo(info._id)}>
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="control-button"
                            onClick={() => toggleContactInfoActive(info._id, info.active)}
                          >
                            {info.active ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button 
                            className="control-button danger"
                            onClick={() => handleDeleteContactInfo(info._id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'office' && (
          <div>
            {/* Office Address */}
            <div className="content-section">
              <div className="section-header" onClick={() => toggleSection('basic')}>
                <h3 className="section-title">
                  <MapPin size={18} />
                  Office Address
                </h3>
                <button className="collapse-button">
                  {expandedSections.basic ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {expandedSections.basic && (
                <>
                  <div className="content-item">
                    <div className="content-label">
                      Address
                      <button className="edit-button" onClick={() => setEditMode('address')}>
                        <Edit3 size={14} />
                      </button>
                    </div>
                    {editMode === 'address' ? (
                      <>
                        <textarea
                          className="content-textarea"
                          value={contactData.officeDetails?.address || ''}
                          onChange={(e) => setContactData(prev => ({
                            ...prev,
                            officeDetails: { ...prev.officeDetails, address: e.target.value }
                          }))}
                          placeholder="Enter office address"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={() => handleUpdateOfficeDetails('address', contactData.officeDetails.address)}>
                            <Save size={14} />
                            Save
                          </button>
                          <button className="cancel-button" onClick={() => setEditMode(false)}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{contactData.officeDetails?.address || 'No address set'}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Description
                      <button className="edit-button" onClick={() => setEditMode('description')}>
                        <Edit3 size={14} />
                      </button>
                    </div>
                    {editMode === 'description' ? (
                      <>
                        <input
                          type="text"
                          className="content-input"
                          value={contactData.officeDetails?.description || ''}
                          onChange={(e) => setContactData(prev => ({
                            ...prev,
                            officeDetails: { ...prev.officeDetails, description: e.target.value }
                          }))}
                          placeholder="Enter office description"
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={() => handleUpdateOfficeDetails('description', contactData.officeDetails.description)}>
                            <Save size={14} />
                            Save
                          </button>
                          <button className="cancel-button" onClick={() => setEditMode(false)}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value">{contactData.officeDetails?.description || 'No description set'}</div>
                    )}
                  </div>

                  <div className="content-item">
                    <div className="content-label">
                      Google Maps Embed URL
                      <button className="edit-button" onClick={() => setEditMode('mapUrl')}>
                        <Edit3 size={14} />
                      </button>
                    </div>
                    {editMode === 'mapUrl' ? (
                      <>
                        <textarea
                          className="content-textarea"
                          value={contactData.officeDetails?.mapUrl || ''}
                          onChange={(e) => setContactData(prev => ({
                            ...prev,
                            officeDetails: { ...prev.officeDetails, mapUrl: e.target.value }
                          }))}
                          placeholder="Enter Google Maps embed URL"
                          style={{ minHeight: '80px' }}
                        />
                        <div className="action-buttons">
                          <button className="save-button" onClick={() => handleUpdateOfficeDetails('mapUrl', contactData.officeDetails.mapUrl)}>
                            <Save size={14} />
                            Save
                          </button>
                          <button className="cancel-button" onClick={() => setEditMode(false)}>
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="content-value" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                        {contactData.officeDetails?.mapUrl || 'No map URL set'}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Social Media Links */}
            <div className="content-section">
              <div className="section-header" onClick={() => toggleSection('social')}>
                <h3 className="section-title">
                  <Globe size={18} />
                  Social Media Links
                </h3>
                <button className="collapse-button">
                  {expandedSections.social ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {expandedSections.social && (
                <div className="contact-info-grid">
                  {contactData.socialLinks?.map((social, index) => (
                    <div key={index} className="contact-info-card">
                      <div className="contact-info-header">
                        <div className="contact-info-icon">
                          <Globe size={18} />
                          <span>{social.platform}</span>
                        </div>
                        <span className={`status-badge ${social.active ? 'active' : 'inactive'}`}>
                          {social.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="content-value" style={{ marginBottom: '15px', fontSize: '13px', wordBreak: 'break-all' }}>
                        {social.url}
                      </div>
                      <div className="action-buttons">
                        <button className="control-button" onClick={() => setEditMode(`social-${index}`)}>
                          <Edit3 size={14} />
                        </button>
                        <button 
                          className="control-button"
                          onClick={() => {
                            const updatedSocial = [...contactData.socialLinks];
                            updatedSocial[index].active = !updatedSocial[index].active;
                            setContactData(prev => ({ ...prev, socialLinks: updatedSocial }));
                            showSuccess('Social link status updated!');
                          }}
                        >
                          {social.active ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactAdmin;