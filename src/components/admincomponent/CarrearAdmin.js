import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Loader,
  AlertCircle,
  CheckCircle,
  Brain,
  Briefcase,
  Award,
  RefreshCw
} from 'lucide-react';

// Use window.confirm to avoid no-restricted-globals error
const safeConfirm = (msg) => typeof window !== "undefined" ? window.confirm(msg) : false;

const CareerAdmin = () => {
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('expertise');
  const [editMode, setEditMode] = useState('');
  const [editingItem, setEditingItem] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api/career';

  // Fetch career data
  const fetchCareerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCareerData(result.data);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch career data');
      }
    } catch (err) {
      console.error('Error fetching career data:', err);
      setError(`Failed to connect to server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerData();
  }, []);

  // Show success message
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Show error message
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  // Generic API call handler
  const makeApiCall = async (url, method = 'GET', body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (err) {
      console.error('API call error:', err);
      throw err;
    }
  };

  // Handle expertise area operations
  const handleAddExpertise = () => {
    setEditMode('add-expertise');
    setEditingItem({
      title: '',
      description: '',
      details: [''],
      color: 'from-orange-500 to-red-500',
      icon: 'MapPin'
    });
  };

  const handleEditExpertise = (expertise) => {
    setEditMode(`edit-expertise-${expertise._id}`);
    setEditingItem({ 
      ...expertise,
      details: expertise.details && expertise.details.length > 0 ? expertise.details : ['']
    });
  };

  const handleSaveExpertise = async () => {
    if (!editingItem.title?.trim() || !editingItem.description?.trim()) {
      showError('Title and description are required');
      return;
    }

    try {
      setSubmitLoading(true);
      
      const isAdd = editMode.includes('add');
      const url = isAdd 
        ? `${API_BASE_URL}/expertise`
        : `${API_BASE_URL}/expertise/${editingItem._id}`;
      
      const method = isAdd ? 'POST' : 'PUT';
      
      // Filter out empty details
      const cleanedItem = {
        ...editingItem,
        details: editingItem.details?.filter(detail => detail.trim() !== '') || []
      };
      
      const result = await makeApiCall(url, method, cleanedItem);
      
      setCareerData(prev => ({
        ...prev,
        expertiseAreas: result.data
      }));
      
      setEditMode('');
      setEditingItem({});
      showSuccess(`Expertise area ${isAdd ? 'added' : 'updated'} successfully!`);
    } catch (err) {
      showError(err.message || 'Failed to save expertise area');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteExpertise = async (expertiseId) => {
    if (!safeConfirm('Are you sure you want to delete this expertise area?')) return;

    try {
      const result = await makeApiCall(`${API_BASE_URL}/expertise/${expertiseId}`, 'DELETE');
      
      setCareerData(prev => ({
        ...prev,
        expertiseAreas: result.data
      }));
      
      showSuccess('Expertise area deleted successfully!');
    } catch (err) {
      showError(err.message || 'Failed to delete expertise area');
    }
  };

  // Handle career path operations
  const handleAddCareerPath = () => {
    setEditMode('add-career');
    setEditingItem({
      title: '',
      level: '',
      description: '',
      skills: [''],
      growth: '',
      icon: 'BarChart3',
      shape: 'hexagon'
    });
  };

  const handleEditCareerPath = (career) => {
    setEditMode(`edit-career-${career._id}`);
    setEditingItem({ 
      ...career,
      skills: career.skills && career.skills.length > 0 ? career.skills : ['']
    });
  };

  const handleSaveCareerPath = async () => {
    if (!editingItem.title?.trim() || !editingItem.level?.trim() || !editingItem.description?.trim()) {
      showError('Title, level, and description are required');
      return;
    }

    try {
      setSubmitLoading(true);
      
      const isAdd = editMode.includes('add');
      const url = isAdd 
        ? `${API_BASE_URL}/career-paths`
        : `${API_BASE_URL}/career-paths/${editingItem._id}`;
      
      const method = isAdd ? 'POST' : 'PUT';
      
      // Filter out empty skills
      const cleanedItem = {
        ...editingItem,
        skills: editingItem.skills?.filter(skill => skill.trim() !== '') || []
      };
      
      const result = await makeApiCall(url, method, cleanedItem);
      
      setCareerData(prev => ({
        ...prev,
        careerPaths: result.data
      }));
      
      setEditMode('');
      setEditingItem({});
      showSuccess(`Career path ${isAdd ? 'added' : 'updated'} successfully!`);
    } catch (err) {
      showError(err.message || 'Failed to save career path');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCareerPath = async (careerId) => {
    if (!safeConfirm('Are you sure you want to delete this career path?')) return;

    try {
      const result = await makeApiCall(`${API_BASE_URL}/career-paths/${careerId}`, 'DELETE');
      
      setCareerData(prev => ({
        ...prev,
        careerPaths: result.data
      }));
      
      showSuccess('Career path deleted successfully!');
    } catch (err) {
      showError(err.message || 'Failed to delete career path');
    }
  };

  // Handle benefit operations
  const handleAddBenefit = () => {
    setEditMode('add-benefit');
    setEditingItem({
      title: '',
      description: '',
      icon: 'Award',
      accent: 'orange'
    });
  };

  const handleEditBenefit = (benefit) => {
    setEditMode(`edit-benefit-${benefit._id}`);
    setEditingItem({ ...benefit });
  };

  const handleSaveBenefit = async () => {
    if (!editingItem.title?.trim() || !editingItem.description?.trim()) {
      showError('Title and description are required');
      return;
    }

    try {
      setSubmitLoading(true);
      
      const isAdd = editMode.includes('add');
      const url = isAdd 
        ? `${API_BASE_URL}/benefits`
        : `${API_BASE_URL}/benefits/${editingItem._id}`;
      
      const method = isAdd ? 'POST' : 'PUT';
      
      const result = await makeApiCall(url, method, editingItem);
      
      setCareerData(prev => ({
        ...prev,
        benefits: result.data
      }));
      
      setEditMode('');
      setEditingItem({});
      showSuccess(`Benefit ${isAdd ? 'added' : 'updated'} successfully!`);
    } catch (err) {
      showError(err.message || 'Failed to save benefit');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteBenefit = async (benefitId) => {
    if (!safeConfirm('Are you sure you want to delete this benefit?')) return;

    try {
      const result = await makeApiCall(`${API_BASE_URL}/benefits/${benefitId}`, 'DELETE');
      
      setCareerData(prev => ({
        ...prev,
        benefits: result.data
      }));
      
      showSuccess('Benefit deleted successfully!');
    } catch (err) {
      showError(err.message || 'Failed to delete benefit');
    }
  };

  const handleCancelEdit = () => {
    setEditingItem({});
    setEditMode('');
  };

  const handleRefresh = () => {
    fetchCareerData();
  };

  // Helper functions
  const addDetailField = () => {
    setEditingItem(prev => ({
      ...prev,
      details: [...(prev.details || []), '']
    }));
  };

  const removeDetailField = (index) => {
    setEditingItem(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const updateDetail = (index, value) => {
    setEditingItem(prev => ({
      ...prev,
      details: prev.details.map((detail, i) => i === index ? value : detail)
    }));
  };

  const addSkillField = () => {
    setEditingItem(prev => ({
      ...prev,
      skills: [...(prev.skills || []), '']
    }));
  };

  const removeSkillField = (index) => {
    setEditingItem(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index, value) => {
    setEditingItem(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  if (loading) {
    return (
      <div className="career-admin-container">
        <style>{`
          .career-admin-container {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 60px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
          }
          .loading-content {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #ff9d33;
            font-size: 16px;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
        <div className="loading-content">
          <Loader size={24} className="animate-spin" />
          <span>Loading career data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="career-admin-container">
      <style>{`
        .career-admin-container {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 0;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(255, 157, 51, 0.05));
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .refresh-button {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 8px;
          padding: 8px 16px;
          color: #ff9d33;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
        }

        .refresh-button:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: rgba(255, 107, 0, 0.5);
        }

        .alert-banner {
          padding: 12px 20px;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-top: 2px solid rgba(16, 185, 129, 0.3);
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-top: 2px solid rgba(239, 68, 68, 0.3);
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
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #ff9d33;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .item-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          transition: all 0.3s ease;
        }

        .item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 107, 0, 0.3);
        }

        .item-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 10px;
          padding-right: 80px;
        }

        .item-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .item-details {
          list-style: none;
          padding: 0;
          margin-bottom: 15px;
        }

        .detail-item {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 5px;
          padding-left: 15px;
          position: relative;
        }

        .detail-item::before {
          content: '•';
          color: #ff9d33;
          position: absolute;
          left: 0;
        }

        .item-actions {
          display: flex;
          gap: 8px;
          position: absolute;
          top: 15px;
          right: 15px;
        }

        .action-button {
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

        .action-button:hover {
          background: rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.3);
          color: #ff9d33;
        }

        .action-button.danger:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
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
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.3);
        }

        .form-section {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          display: block;
        }

        .form-input, .form-textarea, .form-select {
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
          box-sizing: border-box;
        }

        .form-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: #ff9d33;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-select option {
          background: rgba(30, 35, 66, 0.9);
          color: white;
        }

        .dynamic-list {
          margin-top: 10px;
        }

        .list-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          align-items: center;
        }

        .list-input {
          flex: 1;
          background: rgba(30, 35, 66, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          color: white;
          font-size: 13px;
          outline: none;
          transition: all 0.3s ease;
        }

        .list-input:focus {
          border-color: #ff9d33;
        }

        .remove-button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-button:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .add-field-button {
          background: rgba(255, 107, 0, 0.1);
          border: 1px dashed rgba(255, 107, 0, 0.3);
          border-radius: 6px;
          padding: 8px 16px;
          color: #ff9d33;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          margin-top: 10px;
        }

        .add-field-button:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: rgba(255, 107, 0, 0.5);
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .save-button {
          background: linear-gradient(135deg, #10b981, #059669);
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
        }

        .save-button:hover:not(:disabled) {
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
          padding: 12px 24px;
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
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(30, 35, 66, 0.2);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }

        .career-level {
          font-size: 12px;
          color: #ff9d33;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .skills-container {
          margin-bottom: 10px;
        }

        .skills-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 5px;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .skill-tag {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          color: #ff9d33;
        }

        .growth-path {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }

        .benefit-meta {
          margin-top: 10px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
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
          
          .items-grid {
            grid-template-columns: 1fr;
          }
          
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-header">
        <div>
          <h1 className="admin-title">Career Management</h1>
          <p className="admin-subtitle">Manage career expertise areas, paths, and benefits</p>
        </div>
        <div className="header-actions">
          <button className="refresh-button" onClick={handleRefresh}>
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
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
          className={`tab-button ${activeTab === 'expertise' ? 'active' : ''}`}
          onClick={() => setActiveTab('expertise')}
        >
          <Brain size={16} />
          Expertise Areas
        </button>
        <button
          className={`tab-button ${activeTab === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveTab('careers')}
        >
          <Briefcase size={16} />
          Career Paths
        </button>
        <button
          className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          <Award size={16} />
          Benefits
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'expertise' && (
          <div>
            {careerData && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{careerData.expertiseAreas?.length || 0}</div>
                  <div className="stat-label">Expertise Areas</div>
                </div>
              </div>
            )}

            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <Brain size={18} />
                  Expertise Areas
                </h3>
                
                <button className="add-button" onClick={handleAddExpertise}>
                  <Plus size={16} />
                  Add Expertise Area
                </button>
              </div>

              {editMode.includes('expertise') && (
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter expertise area title"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-textarea"
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter description"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon</label>
                    <select
                      className="form-select"
                      value={editingItem.icon || 'MapPin'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      <option value="MapPin">Map Pin</option>
                      <option value="Users">Users</option>
                      <option value="Globe">Globe</option>
                      <option value="Brain">Brain</option>
                      <option value="TrendingUp">Trending Up</option>
                      <option value="BarChart3">Bar Chart</option>
                      <option value="Target">Target</option>
                      <option value="Briefcase">Briefcase</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Color Gradient</label>
                    <select
                      className="form-select"
                      value={editingItem.color || 'from-orange-500 to-red-500'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, color: e.target.value }))}
                    >
                      <option value="from-orange-500 to-red-500">Orange to Red</option>
                      <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                      <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                      <option value="from-green-500 to-teal-500">Green to Teal</option>
                      <option value="from-indigo-500 to-purple-500">Indigo to Purple</option>
                      <option value="from-pink-500 to-rose-500">Pink to Rose</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Details</label>
                    <div className="dynamic-list">
                      {(editingItem.details || ['']).map((detail, index) => (
                        <div key={index} className="list-item">
                          <input
                            type="text"
                            className="list-input"
                            value={detail}
                            onChange={(e) => updateDetail(index, e.target.value)}
                            placeholder="Enter detail"
                          />
                          {editingItem.details?.length > 1 && (
                            <button
                              type="button"
                              className="remove-button"
                              onClick={() => removeDetailField(index)}
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-field-button"
                        onClick={addDetailField}
                      >
                        <Plus size={12} />
                        Add Detail
                      </button>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveExpertise} disabled={submitLoading}>
                      {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                      {submitLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button className="cancel-button" onClick={handleCancelEdit}>
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {careerData?.expertiseAreas?.length === 0 ? (
                <div className="empty-state">
                  <Brain size={48} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '16px' }} />
                  <p>No expertise areas found. Add your first expertise area to get started.</p>
                </div>
              ) : (
                <div className="items-grid">
                  {careerData?.expertiseAreas?.map((expertise) => (
                    <div key={expertise._id} className="item-card">
                      <div className="item-actions">
                        <button
                          className="action-button"
                          onClick={() => handleEditExpertise(expertise)}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="action-button danger"
                          onClick={() => handleDeleteExpertise(expertise._id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="item-title">{expertise.title}</div>
                      <div className="item-description">{expertise.description}</div>
                      
                      {expertise.details && expertise.details.length > 0 && (
                        <ul className="item-details">
                          {expertise.details.map((detail, index) => (
                            <li key={index} className="detail-item">{detail}</li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="benefit-meta">
                        Icon: {expertise.icon} | Color: {expertise.color}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div>
            {careerData && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{careerData.careerPaths?.length || 0}</div>
                  <div className="stat-label">Career Paths</div>
                </div>
              </div>
            )}

            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <Briefcase size={18} />
                  Career Paths
                </h3>
                
                <button className="add-button" onClick={handleAddCareerPath}>
                  <Plus size={16} />
                  Add Career Path
                </button>
              </div>

              {editMode.includes('career') && (
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter career title"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Level *</label>
                    <select
                      className="form-select"
                      value={editingItem.level || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, level: e.target.value }))}
                    >
                      <option value="">Select Level</option>
                      <option value="Entry to Mid-Level">Entry to Mid-Level</option>
                      <option value="Mid to Senior Level">Mid to Senior Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Specialized Role">Specialized Role</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-textarea"
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter career description"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Growth Path</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.growth || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, growth: e.target.value }))}
                      placeholder="e.g., Analyst → Senior Analyst → Manager"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon</label>
                    <select
                      className="form-select"
                      value={editingItem.icon || 'BarChart3'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      <option value="BarChart3">Bar Chart</option>
                      <option value="Target">Target</option>
                      <option value="Brain">Brain</option>
                      <option value="Users">Users</option>
                      <option value="TrendingUp">Trending Up</option>
                      <option value="Briefcase">Briefcase</option>
                      <option value="Award">Award</option>
                      <option value="Globe">Globe</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shape</label>
                    <select
                      className="form-select"
                      value={editingItem.shape || 'hexagon'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, shape: e.target.value }))}
                    >
                      <option value="hexagon">Hexagon</option>
                      <option value="diamond">Diamond</option>
                      <option value="circle">Circle</option>
                      <option value="octagon">Octagon</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Skills</label>
                    <div className="dynamic-list">
                      {(editingItem.skills || ['']).map((skill, index) => (
                        <div key={index} className="list-item">
                          <input
                            type="text"
                            className="list-input"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            placeholder="Enter skill"
                          />
                          {editingItem.skills?.length > 1 && (
                            <button
                              type="button"
                              className="remove-button"
                              onClick={() => removeSkillField(index)}
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-field-button"
                        onClick={addSkillField}
                      >
                        <Plus size={12} />
                        Add Skill
                      </button>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveCareerPath} disabled={submitLoading}>
                      {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                      {submitLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button className="cancel-button" onClick={handleCancelEdit}>
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {careerData?.careerPaths?.length === 0 ? (
                <div className="empty-state">
                  <Briefcase size={48} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '16px' }} />
                  <p>No career paths found. Add your first career path to get started.</p>
                </div>
              ) : (
                <div className="items-grid">
                  {careerData?.careerPaths?.map((career) => (
                    <div key={career._id} className="item-card">
                      <div className="item-actions">
                        <button
                          className="action-button"
                          onClick={() => handleEditCareerPath(career)}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="action-button danger"
                          onClick={() => handleDeleteCareerPath(career._id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="item-title">{career.title}</div>
                      <div className="career-level">{career.level}</div>
                      <div className="item-description">{career.description}</div>
                      
                      {career.skills && career.skills.length > 0 && (
                        <div className="skills-container">
                          <div className="skills-label">Skills:</div>
                          <div className="skills-list">
                            {career.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {career.growth && (
                        <div className="growth-path">
                          <strong>Growth:</strong> {career.growth}
                        </div>
                      )}
                      
                      <div className="benefit-meta">
                        Icon: {career.icon} | Shape: {career.shape}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div>
            {careerData && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{careerData.benefits?.length || 0}</div>
                  <div className="stat-label">Benefits</div>
                </div>
              </div>
            )}

            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <Award size={18} />
                  Benefits & Perks
                </h3>
                
                <button className="add-button" onClick={handleAddBenefit}>
                  <Plus size={16} />
                  Add Benefit
                </button>
              </div>

              {editMode.includes('benefit') && (
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter benefit title"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-textarea"
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter benefit description"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon</label>
                    <select
                      className="form-select"
                      value={editingItem.icon || 'Award'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      <option value="Award">Award</option>
                      <option value="TrendingUp">Trending Up</option>
                      <option value="Users">Users</option>
                      <option value="Target">Target</option>
                      <option value="Briefcase">Briefcase</option>
                      <option value="Brain">Brain</option>
                      <option value="Globe">Globe</option>
                      <option value="BarChart3">Bar Chart</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Accent Color</label>
                    <select
                      className="form-select"
                      value={editingItem.accent || 'orange'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, accent: e.target.value }))}
                    >
                      <option value="orange">Orange</option>
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="cyan">Cyan</option>
                      <option value="pink">Pink</option>
                      <option value="indigo">Indigo</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveBenefit} disabled={submitLoading}>
                      {submitLoading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                      {submitLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button className="cancel-button" onClick={handleCancelEdit}>
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {careerData?.benefits?.length === 0 ? (
                <div className="empty-state">
                  <Award size={48} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '16px' }} />
                  <p>No benefits found. Add your first benefit to get started.</p>
                </div>
              ) : (
                <div className="items-grid">
                  {careerData?.benefits?.map((benefit) => (
                    <div key={benefit._id} className="item-card">
                      <div className="item-actions">
                        <button
                          className="action-button"
                          onClick={() => handleEditBenefit(benefit)}
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="action-button danger"
                          onClick={() => handleDeleteBenefit(benefit._id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="item-title">{benefit.title}</div>
                      <div className="item-description">{benefit.description}</div>
                      
                      <div className="benefit-meta">
                        Icon: {benefit.icon} | Color: {benefit.accent}
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

export default CareerAdmin;