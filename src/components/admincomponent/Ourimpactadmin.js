import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  Globe,
  Users,
  Shield,
  Zap,
  CheckCircle,
  Star,
  MessageSquare,
  Award,
  Trophy,
  BarChart3,
  MapPin,
  Target,
  Loader,
  AlertCircle,
  Type,
  TrendingUp
} from 'lucide-react';

const OurImpactAdmin = () => {
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('stats');
  const [editMode, setEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    location: '',
    result: '',
    year: '',
    description: '',
    metrics: [''],
    image: ''
  });
  const [newStat, setNewStat] = useState({
    icon: 'Trophy',
    number: '',
    label: '',
    description: '',
    color: 'from-yellow-500 to-orange-500'
  });
  const [newAchievement, setNewAchievement] = useState({
    category: '',
    achievements: ['']
  });
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    position: '',
    quote: '',
    rating: 5,
    image: ''
  });

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api/our-impact';

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

  // Load data on component mount
  useEffect(() => {
    fetchImpactData();
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
    setEditingContent({ ...impactData });
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
          mainHeading: editingContent.mainHeading,
          mainDescription: editingContent.mainDescription
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setImpactData(result.data);
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

  // Handle impact stats
  const handleAddStat = async () => {
    if (!newStat.number || !newStat.label) return;

    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStat)
      });

      const result = await response.json();
      
      if (result.success) {
        setImpactData(prev => ({
          ...prev,
          impactStats: result.data
        }));
        setNewStat({
          icon: 'Trophy',
          number: '',
          label: '',
          description: '',
          color: 'from-yellow-500 to-orange-500'
        });
        showSuccess('Statistic added successfully!');
      } else {
        showError(result.message || 'Failed to add statistic');
      }
    } catch (err) {
      console.error('Error adding statistic:', err);
      showError('Failed to add statistic');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteStat = async (statId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/${statId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        setImpactData(prev => ({
          ...prev,
          impactStats: result.data
        }));
        showSuccess('Statistic deleted successfully!');
      } else {
        showError(result.message || 'Failed to delete statistic');
      }
    } catch (err) {
      console.error('Error deleting statistic:', err);
      showError('Failed to delete statistic');
    }
  };

  // Handle success stories
  const handleAddStory = async () => {
    if (!newStory.title || !newStory.location) return;

    try {
      setSubmitLoading(true);
      const response = await fetch(`${API_BASE_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newStory,
          metrics: newStory.metrics.filter(m => m.trim() !== '')
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setImpactData(prev => ({
          ...prev,
          successStories: result.data
        }));
        setNewStory({
          title: '',
          location: '',
          result: '',
          year: '',
          description: '',
          metrics: [''],
          image: ''
        });
        showSuccess('Success story added successfully!');
      } else {
        showError(result.message || 'Failed to add success story');
      }
    } catch (err) {
      console.error('Error adding success story:', err);
      showError('Failed to add success story');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stories/${storyId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        setImpactData(prev => ({
          ...prev,
          successStories: result.data
        }));
        showSuccess('Success story deleted successfully!');
      } else {
        showError(result.message || 'Failed to delete success story');
      }
    } catch (err) {
      console.error('Error deleting success story:', err);
      showError('Failed to delete success story');
    }
  };

  // Handle key achievements
  const handleAddAchievement = () => {
    if (!newAchievement.category) return;

    const updatedAchievements = {
      ...impactData,
      keyAchievements: [
        ...(impactData.keyAchievements || []),
        {
          category: newAchievement.category,
          achievements: newAchievement.achievements.filter(a => a.trim() !== '')
        }
      ]
    };

    setImpactData(updatedAchievements);
    setNewAchievement({
      category: '',
      achievements: ['']
    });
    showSuccess('Achievement category added successfully!');
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievements = {
      ...impactData,
      keyAchievements: impactData.keyAchievements.filter((_, i) => i !== index)
    };

    setImpactData(updatedAchievements);
    showSuccess('Achievement category deleted successfully!');
  };

  const handleAddAchievementItem = (categoryIndex) => {
    const updatedAchievements = { ...impactData };
    updatedAchievements.keyAchievements[categoryIndex].achievements.push('');
    setImpactData(updatedAchievements);
  };

  const handleDeleteAchievementItem = (categoryIndex, itemIndex) => {
    const updatedAchievements = { ...impactData };
    updatedAchievements.keyAchievements[categoryIndex].achievements = 
      updatedAchievements.keyAchievements[categoryIndex].achievements.filter((_, i) => i !== itemIndex);
    setImpactData(updatedAchievements);
  };

  const handleAchievementItemChange = (categoryIndex, itemIndex, value) => {
    const updatedAchievements = { ...impactData };
    updatedAchievements.keyAchievements[categoryIndex].achievements[itemIndex] = value;
    setImpactData(updatedAchievements);
  };

  // Handle client testimonials
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.quote) return;

    const updatedTestimonials = {
      ...impactData,
      clientTestimonials: [
        ...(impactData.clientTestimonials || []),
        { ...newTestimonial }
      ]
    };

    setImpactData(updatedTestimonials);
    setNewTestimonial({
      name: '',
      position: '',
      quote: '',
      rating: 5,
      image: ''
    });
    showSuccess('Testimonial added successfully!');
  };

  const handleDeleteTestimonial = (index) => {
    const updatedTestimonials = {
      ...impactData,
      clientTestimonials: impactData.clientTestimonials.filter((_, i) => i !== index)
    };

    setImpactData(updatedTestimonials);
    showSuccess('Testimonial deleted successfully!');
  };

  const handleAddMetric = () => {
    setNewStory(prev => ({
      ...prev,
      metrics: [...prev.metrics, '']
    }));
  };

  const handleMetricChange = (index, value) => {
    const newMetrics = [...newStory.metrics];
    newMetrics[index] = value;
    setNewStory(prev => ({
      ...prev,
      metrics: newMetrics
    }));
  };

  const handleRemoveMetric = (index) => {
    if (newStory.metrics.length <= 1) return;
    const newMetrics = [...newStory.metrics];
    newMetrics.splice(index, 1);
    setNewStory(prev => ({
      ...prev,
      metrics: newMetrics
    }));
  };

  const handleAddAchievementField = () => {
    setNewAchievement(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const handleAchievementFieldChange = (index, value) => {
    const newAchievements = [...newAchievement.achievements];
    newAchievements[index] = value;
    setNewAchievement(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const handleRemoveAchievementField = (index) => {
    if (newAchievement.achievements.length <= 1) return;
    const newAchievements = [...newAchievement.achievements];
    newAchievements.splice(index, 1);
    setNewAchievement(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  if (loading) {
    return (
      <div className="impact-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff9d33' }}>
          <Loader size={24} className="animate-spin" />
          <span>Loading impact data...</span>
        </div>
      </div>
    );
  }

  if (!impactData) {
    return (
      <div className="impact-admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
          <AlertCircle size={24} />
          <span>Failed to load impact data</span>
        </div>
      </div>
    );
  }

  // Initialize default data structures if they don't exist
  if (!impactData.keyAchievements) {
    impactData.keyAchievements = [
      {
        category: "Digital Innovation",
        achievements: [
          "First to implement AI-driven voter sentiment analysis in South India",
          "Revolutionary micro-targeting strategies with 94% accuracy",
          "Real-time crisis management protocols saving 15+ campaigns"
        ]
      },
      {
        category: "Ground Operations",
        achievements: [
          "Trained 5000+ grassroots workers across multiple states",
          "Established 200+ ground intelligence networks",
          "Mobilized communities in rural and urban constituencies"
        ]
      }
    ];
  }

  if (!impactData.clientTestimonials) {
    impactData.clientTestimonials = [
      {
        name: "Hon. Rajesh Kumar",
        position: "MLA, Tamil Nadu",
        quote: "Darkstate didn't just manage my campaign - they transformed my entire political approach. Their data-driven strategies and ground intelligence were game-changers.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Dr. Priya Sharma",
        position: "Mayor, Bengaluru",
        quote: "The crisis management expertise of Darkstate saved my political career. Their 24/7 monitoring and rapid response team is unmatched in the industry.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=60&h=60&fit=crop&crop=face"
      }
    ];
  }

  return (
    <div className="impact-admin-container">
      <style>{`
        .impact-admin-container {
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
          overflow-x: auto;
        }

        .tab-button {
          flex: 1;
          min-width: 120px;
          padding: 20px 15px;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .stat-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--card-color));
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .stat-icon svg {
          width: 20px;
          height: 20px;
          color: white;
          stroke-width: 2;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 6px;
          display: block;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
        }

        .stat-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.4;
        }

        .stat-actions {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 8px;
        }

        .control-button {
          width: 28px;
          height: 28px;
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

        .add-form {
          background: rgba(30, 35, 66, 0.2);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .add-form:hover {
          border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.02);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
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

        .add-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .stories-grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .story-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          transition: all 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .story-title {
          font-size: 16px;
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
          font-size: 13px;
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

        .story-actions {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 8px;
        }

        .metric-input-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .metric-remove-button {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          padding: 6px 8px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 38px;
        }

        .metric-remove-button:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .metric-add-button {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 6px;
          padding: 6px 8px;
          color: #22c55e;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
        }

        .metric-add-button:hover {
          background: rgba(34, 197, 94, 0.2);
        }

        .achievements-grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .achievement-category {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          position: relative;
        }

        .achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .achievement-title {
          font-size: 16px;
          font-weight: 600;
          color: #ff9d33;
        }

        .achievement-list {
          list-style: none;
        }

        .achievement-list li {
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          padding-left: 20px;
          font-size: 14px;
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
        }

        .testimonials-grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .testimonial-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          position: relative;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 15px;
          left: 15px;
          font-size: 40px;
          color: rgba(255, 107, 0, 0.2);
          font-family: serif;
          line-height: 1;
        }

        .testimonial-content {
          margin-top: 10px;
          margin-bottom: 15px;
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

        .impact-areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .impact-area-card {
          background: rgba(30, 35, 66, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          transition: all 0.3s ease;
        }

        .impact-area-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .impact-area-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff6b00, #ff9d33);
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .impact-area-icon svg {
          width: 20px;
          height: 20px;
          color: white;
          stroke-width: 2;
        }

        .impact-area-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .impact-area-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .impact-area-stats {
          color: #ff9d33;
          font-size: 12px;
          font-weight: 600;
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
        <h1 className="admin-title">Our Impact Management</h1>
        <p className="admin-subtitle">Manage impact statistics, success stories, and achievements</p>
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
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart3 size={16} />
          Statistics
        </button>
        <button
          className={`tab-button ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          <Trophy size={16} />
          Success Stories
        </button>
        <button
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <Award size={16} />
          Key Achievements
        </button>
        <button
          className={`tab-button ${activeTab === 'testimonials' ? 'active' : ''}`}
          onClick={() => setActiveTab('testimonials')}
        >
          <MessageSquare size={16} />
          Testimonials
        </button>
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Eye size={16} />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <Type size={16} />
          Content
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'content' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Type size={18} />
                Main Content
              </h3>
              
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
                  <div className="content-value">{impactData.mainHeading}</div>
                )}
              </div>

              <div className="content-item">
                <div className="content-label">
                  Main Description
                  {editMode !== 'mainDescription' && (
                    <button className="edit-button" onClick={() => handleEditContent('mainDescription')}>
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>
                {editMode === 'mainDescription' ? (
                  <>
                    <textarea
                      className="content-textarea"
                      value={editingContent.mainDescription || ''}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, mainDescription: e.target.value }))}
                      placeholder="Enter main description"
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
                  <div className="content-value">{impactData.mainDescription}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Statistic
              </h3>
              
              <div className="add-form">
                <div className="form-grid">
                  <div>
                    <div className="content-label">Icon</div>
                    <select
                      className="content-input"
                      value={newStat.icon}
                      onChange={(e) => setNewStat(prev => ({ ...prev, icon: e.target.value }))}
                    >
                      <option value="Trophy">Trophy</option>
                      <option value="Users">Users</option>
                      <option value="Target">Target</option>
                      <option value="Award">Award</option>
                      <option value="BarChart3">Bar Chart</option>
                      <option value="MapPin">Map Pin</option>
                    </select>
                  </div>
                  
                  <div>
                    <div className="content-label">Number/Value</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="95%"
                      value={newStat.number}
                      onChange={(e) => setNewStat(prev => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Label</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="Election Success Rate"
                      value={newStat.label}
                      onChange={(e) => setNewStat(prev => ({ ...prev, label: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Color Gradient</div>
                    <select
                      className="content-input"
                      value={newStat.color}
                      onChange={(e) => setNewStat(prev => ({ ...prev, color: e.target.value }))}
                    >
                      <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
                      <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                      <option value="from-green-500 to-teal-500">Green to Teal</option>
                      <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <div className="content-label">Description</div>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Campaigns we've managed to victory"
                    value={newStat.description}
                    onChange={(e) => setNewStat(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <button 
                  className="add-button"
                  onClick={handleAddStat}
                  disabled={!newStat.number || !newStat.label || submitLoading}
                  style={{ marginTop: '15px' }}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Statistic
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <BarChart3 size={18} />
                Impact Statistics ({impactData.impactStats?.length || 0})
              </h3>
              
              <div className="stats-grid">
                {impactData.impactStats?.map((stat, index) => (
                  <div 
                    key={stat._id || index} 
                    className="stat-card"
                    style={{'--card-color': stat.color}}
                  >
                    <div className="stat-icon">
                      {stat.icon === 'Trophy' && <Trophy size={20} />}
                      {stat.icon === 'Users' && <Users size={20} />}
                      {stat.icon === 'Target' && <Target size={20} />}
                      {stat.icon === 'Award' && <Award size={20} />}
                      {stat.icon === 'BarChart3' && <BarChart3 size={20} />}
                      {stat.icon === 'MapPin' && <MapPin size={20} />}
                    </div>
                    
                    <span className="stat-number">{stat.number}</span>
                    <div className="stat-label">{stat.label}</div>
                    <p className="stat-description">{stat.description}</p>
                    
                    <div className="stat-actions">
                      <button 
                        className="control-button danger"
                        onClick={() => handleDeleteStat(stat._id)}
                        title="Delete"
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

        {activeTab === 'stories' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Success Story
              </h3>
              
              <div className="add-form">
                <div className="form-grid">
                  <div>
                    <div className="content-label">Title</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="State Assembly Victory"
                      value={newStory.title}
                      onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Location</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="Tamil Nadu"
                      value={newStory.location}
                      onChange={(e) => setNewStory(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Result</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="Won by 67% margin"
                      value={newStory.result}
                      onChange={(e) => setNewStory(prev => ({ ...prev, result: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Year</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="2024"
                      value={newStory.year}
                      onChange={(e) => setNewStory(prev => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div className="content-label">Description</div>
                  <textarea
                    className="content-textarea"
                    placeholder="Transformed a trailing candidate into a decisive winner..."
                    value={newStory.description}
                    onChange={(e) => setNewStory(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div className="content-label">Metrics</div>
                  {newStory.metrics.map((metric, index) => (
                    <div key={index} className="metric-input-group" style={{ marginBottom: '10px' }}>
                      <input
                        type="text"
                        className="content-input"
                        placeholder="45% voter turnout increase"
                        value={metric}
                        onChange={(e) => handleMetricChange(index, e.target.value)}
                      />
                      <button 
                        className="metric-remove-button"
                        onClick={() => handleRemoveMetric(index)}
                        disabled={newStory.metrics.length <= 1}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button className="metric-add-button" onClick={handleAddMetric}>
                    <Plus size={14} />
                    Add Metric
                  </button>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div className="content-label">Image URL</div>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newStory.image}
                    onChange={(e) => setNewStory(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                
                <button 
                  className="add-button"
                  onClick={handleAddStory}
                  disabled={!newStory.title || !newStory.location || submitLoading}
                >
                  {submitLoading ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  Add Success Story
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Trophy size={18} />
                Success Stories ({impactData.successStories?.length || 0})
              </h3>
              
              <div className="stories-grid">
                {impactData.successStories?.map((story, index) => (
                  <div key={story._id || index} className="story-card">
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
                      {story.metrics.map((metric, idx) => (
                        <span key={idx} className="metric-tag">{metric}</span>
                      ))}
                    </div>
                    
                    <div className="story-actions">
                      <button 
                        className="control-button danger"
                        onClick={() => handleDeleteStory(story._id)}
                        title="Delete"
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

        {activeTab === 'achievements' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Achievement Category
              </h3>
              
              <div className="add-form">
                <div>
                  <div className="content-label">Category Name</div>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="Digital Innovation"
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                
                <div style={{ marginBottom: '15px', marginTop: '15px' }}>
                  <div className="content-label">Achievements</div>
                  {newAchievement.achievements.map((achievement, index) => (
                    <div key={index} className="metric-input-group" style={{ marginBottom: '10px' }}>
                      <input
                        type="text"
                        className="content-input"
                        placeholder="First to implement AI-driven voter sentiment analysis"
                        value={achievement}
                        onChange={(e) => handleAchievementFieldChange(index, e.target.value)}
                      />
                      <button 
                        className="metric-remove-button"
                        onClick={() => handleRemoveAchievementField(index)}
                        disabled={newAchievement.achievements.length <= 1}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button className="metric-add-button" onClick={handleAddAchievementField}>
                    <Plus size={14} />
                    Add Achievement
                  </button>
                </div>
                
                <button 
                  className="add-button"
                  onClick={handleAddAchievement}
                  disabled={!newAchievement.category || submitLoading}
                >
                  <Plus size={16} />
                  Add Category
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <Award size={18} />
                Key Achievements ({impactData.keyAchievements?.length || 0})
              </h3>
              
              <div className="achievements-grid">
                {impactData.keyAchievements?.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="achievement-category">
                    <div className="achievement-header">
                      <h3 className="achievement-title">{category.category}</h3>
                      <button 
                        className="control-button danger"
                        onClick={() => handleDeleteAchievement(categoryIndex)}
                        title="Delete Category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <ul className="achievement-list">
                      {category.achievements.map((achievement, itemIndex) => (
                        <li key={itemIndex}>
                          {achievement}
                          <button 
                            className="control-button danger"
                            style={{ marginLeft: '10px', transform: 'scale(0.8)' }}
                            onClick={() => handleDeleteAchievementItem(categoryIndex, itemIndex)}
                            title="Delete Achievement"
                          >
                            <X size={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      className="metric-add-button"
                      onClick={() => handleAddAchievementItem(categoryIndex)}
                      style={{ marginTop: '10px' }}
                    >
                      <Plus size={14} />
                      Add Achievement
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Plus size={18} />
                Add New Testimonial
              </h3>
              
              <div className="add-form">
                <div className="form-grid">
                  <div>
                    <div className="content-label">Name</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="Hon. Rajesh Kumar"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Position</div>
                    <input
                      type="text"
                      className="content-input"
                      placeholder="MLA, Tamil Nadu"
                      value={newTestimonial.position}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, position: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <div className="content-label">Rating</div>
                    <select
                      className="content-input"
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div className="content-label">Testimonial Quote</div>
                  <textarea
                    className="content-textarea"
                    placeholder="Darkstate didn't just manage my campaign - they transformed my entire political approach..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, quote: e.target.value }))}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div className="content-label">Image URL</div>
                  <input
                    type="text"
                    className="content-input"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newTestimonial.image}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                
                <button 
                  className="add-button"
                  onClick={handleAddTestimonial}
                  disabled={!newTestimonial.name || !newTestimonial.quote}
                >
                  <Plus size={16} />
                  Add Testimonial
                </button>
              </div>
            </div>

            <div className="content-section">
              <h3 className="section-title">
                <MessageSquare size={18} />
                Client Testimonials ({impactData.clientTestimonials?.length || 0})
              </h3>
              
              <div className="testimonials-grid">
                {impactData.clientTestimonials?.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-content">
                      {testimonial.quote}
                    </div>
                    
                    <div className="testimonial-author">
                      <div 
                        className="author-image"
                        style={{ backgroundImage: `url(${testimonial.image})` }}
                      />
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                        <div className="rating">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="story-actions">
                      <button 
                        className="control-button danger"
                        onClick={() => handleDeleteTestimonial(index)}
                        title="Delete"
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

        {activeTab === 'overview' && (
          <div>
            <div className="content-section">
              <h3 className="section-title">
                <Globe size={18} />
                Impact Areas
              </h3>
              
              <div className="impact-areas-grid">
                <div className="impact-area-card">
                  <div className="impact-area-icon">
                    <Globe size={20} />
                  </div>
                  <h3 className="impact-area-title">National Influence</h3>
                  <p className="impact-area-description">
                    Shaping political discourse across India with innovative strategies and deep regional understanding
                  </p>
                  <div className="impact-area-stats">28 States, 180+ Constituencies</div>
                </div>
                
                <div className="impact-area-card">
                  <div className="impact-area-icon">
                    <Users size={20} />
                  </div>
                  <h3 className="impact-area-title">Voter Empowerment</h3>
                  <p className="impact-area-description">
                    Connecting leaders with citizens through authentic messaging and grassroots mobilization
                  </p>
                  <div className="impact-area-stats">2.5M+ Citizens Engaged</div>
                </div>
                
                <div className="impact-area-card">
                  <div className="impact-area-icon">
                    <Shield size={20} />
                  </div>
                  <h3 className="impact-area-title">Electoral Integrity</h3>
                  <p className="impact-area-description">
                    Maintaining highest standards of compliance while delivering exceptional campaign results
                  </p>
                  <div className="impact-area-stats">100% Clean Campaigns</div>
                </div>
                
                <div className="impact-area-card">
                  <div className="impact-area-icon">
                    <Zap size={20} />
                  </div>
                  <h3 className="impact-area-title">Digital Revolution</h3>
                  <p className="impact-area-description">
                    Pioneering technology-driven political consulting in the Indian electoral landscape
                  </p>
                  <div className="impact-area-stats">95% Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="content-section">
              <h3 className="section-title">
                <TrendingUp size={18} />
                Impact Overview
              </h3>
              
              <div className="content-item">
                <div className="content-label">Overview Description</div>
                <div className="content-value">
                  From grassroots movements to high-stakes elections, we've consistently delivered exceptional results that reshape the political landscape across India. Our data-driven strategies and deep regional understanding have transformed campaigns and empowered leaders to connect authentically with voters.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurImpactAdmin;