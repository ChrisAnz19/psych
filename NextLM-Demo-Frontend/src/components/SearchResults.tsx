import React from 'react';
import { useState } from 'react';
import { X, Target, Mail, Linkedin, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Eye, EyeOff, Phone, TrendingUp, Shield, Heart, ChevronRight, Brain, Gift, Loader2, BarChart3, FileDown } from 'lucide-react';
import { SearchResponse, Candidate } from '../hooks/useKnowledgeGPT';
import { usePrismatic } from '../hooks/usePrismatic';
import { useAuth } from '../context/AuthContext';
import DOMPurify from 'dompurify';
import Avatar from './Avatar';
import BuyerInsightsModal from './BuyerInsightsModal';

interface SearchResultsProps {
  isVisible: boolean;
  onClose: () => void;
  searchQuery: string;
  searchResults: SearchResponse | null;
  apiError: string | null;
  onPushToCrm?: () => void;
  onToggleTracking?: (candidate: Candidate) => void;
  getTrackingStatus?: (candidate: Candidate) => boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isVisible,
  onClose,
  searchQuery,
  searchResults,
  apiError,
  onPushToCrm,
  onToggleTracking,
  getTrackingStatus
}) => {
  const { currentUser } = useAuth();
  const { 
    hubspot, 
    pushContactsToHubSpot, 
    isPushingToHubSpot, 
    hubspotPushResult 
  } = usePrismatic();

  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showPhoneNumbers, setShowPhoneNumbers] = useState<Set<string>>(new Set());
  const [expandedBehavioralSections, setExpandedBehavioralSections] = useState<Set<string>>(new Set());
  const [showReferralSection, setShowReferralSection] = useState<boolean>(true);
  const [showBuyerInsights, setShowBuyerInsights] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Security utility functions
  const sanitizeText = (text: string): string => {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const openSafeLink = (url: string): void => {
    if (!isValidUrl(url)) {
      console.warn('Invalid URL blocked:', url);
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  // Reset all expanded states when modal opens or search results change
  React.useEffect(() => {
    if (isVisible) {
      setExpandedCards(new Set());
      setShowPhoneNumbers(new Set());
      setExpandedBehavioralSections(new Set());
      setShowReferralSection(true); // Always show referral section when modal opens
    }
  }, [isVisible, searchResults]);

  if (!isVisible) return null;

  const toggleCard = (candidateEmail: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(candidateEmail)) {
      newExpanded.delete(candidateEmail);
    } else {
      newExpanded.add(candidateEmail);
    }
    setExpandedCards(newExpanded);
  };

  const handleFeedback = (candidateEmail: string, feedback: 'positive' | 'negative') => {
    // TODO: Implement secure feedback handling with proper API call
    // Removed console.log for security - sensitive data should not be logged to console
    // Consider implementing proper analytics/logging service for production
  };

  const handlePushToHubSpot = async () => {
    if (!candidates.length) {
      return;
    }

    try {
      // Convert candidates to the format expected by Prismatic
      const candidatesData = candidates.map(candidate => ({
        name: candidate.name,
        title: candidate.title,
        company: candidate.company,
        email: candidate.email || '',
        accuracy: candidate.accuracy,
        reasons: candidate.reasons || [],
        linkedin_url: candidate.linkedin_url,
        profile_photo_url: candidate.profile_photo_url,
        location: candidate.location,
        behavioral_data: candidate.behavioral_data
      }));

      await pushContactsToHubSpot(candidatesData);
    } catch (error) {
      console.error('Failed to push contacts to HubSpot:', error);
    }
  };

  const handleToggleTrackingLocal = (candidate: Candidate) => {
    if (onToggleTracking) {
      onToggleTracking(candidate);
    }
  };

  const handleTogglePhone = (candidateEmail: string) => {
    const newShowPhone = new Set(showPhoneNumbers);
    if (newShowPhone.has(candidateEmail)) {
      newShowPhone.delete(candidateEmail);
    } else {
      newShowPhone.add(candidateEmail);
    }
    setShowPhoneNumbers(newShowPhone);
  };

  const toggleBehavioralSection = (candidateKey: string) => {
    const newExpanded = new Set(expandedBehavioralSections);
    if (newExpanded.has(candidateKey)) {
      newExpanded.delete(candidateKey);
    } else {
      newExpanded.add(candidateKey);
    }
    setExpandedBehavioralSections(newExpanded);
  };

  const handleOpenBuyerInsights = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowBuyerInsights(true);
  };

  const handleCloseBuyerInsights = () => {
    setShowBuyerInsights(false);
    setSelectedCandidate(null);
  };

  // Get candidates from API results or use empty array
  const candidates: Candidate[] = searchResults?.candidates || [];



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: '#0D0F1A', fontFamily: 'Inter, sans-serif' }}>
      <div className="border overflow-y-auto scrollbar-hidden" style={{ 
        backgroundColor: '#151726', 
        borderColor: '#fb4b76', 
        borderWidth: '1px',
        borderRadius: '16px',
        boxShadow: '0 0 18px rgba(251,75,118,0.2)',
        width: '100%',
        maxWidth: '1120px',
        maxHeight: '90vh',
        padding: '48px'
      }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-white mb-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 600, lineHeight: '32px' }}>
              Search Results
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#A3A3B5' }}>
              {apiError ? (
                <span className="text-red-400">Error: {sanitizeText(apiError)}</span>
              ) : candidates.length > 0 ? (
                <>
                  Selected {candidates.length} prospects from the following query: "{sanitizeText(searchQuery)}"
                </>
              ) : (
                `No matches found for "${sanitizeText(searchQuery)}"`
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center mb-6" style={{ gap: '12px' }}>
          <button className="flex items-center" style={{ 
            fontFamily: 'Inter, sans-serif',
            height: '36px',
            borderRadius: '6px',
            padding: '0 16px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#E8E8F0',
            fontSize: '13px',
            gap: '8px'
          }}>
            <FileDown size={14} />
            Export CSV
          </button>
          <button 
            onClick={handlePushToHubSpot}
            disabled={isPushingToHubSpot}
            className="flex items-center disabled:opacity-50" 
            style={{ 
              fontFamily: 'Inter, sans-serif',
              height: '36px',
              borderRadius: '6px',
              padding: '0 16px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#E8E8F0',
              fontSize: '13px',
              gap: '8px'
            }}
          >
            {isPushingToHubSpot ? (
              'Exporting...'
            ) : (
              <>
                <img src="/hubspot.png" alt="HubSpot" style={{ width: '14px', height: '14px' }} />
                Export to HubSpot
              </>
            )}
          </button>
          <button className="flex items-center" style={{ 
            fontFamily: 'Inter, sans-serif',
            height: '36px',
            borderRadius: '6px',
            padding: '0 16px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#E8E8F0',
            fontSize: '13px',
            gap: '8px'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Give Feedback
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px' }}></div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {apiError ? (
            <div className="text-center py-8">
              <div className="text-red-400 mx-auto mb-4 text-4xl">⚠️</div>
              <p className="text-white/80 text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Search failed
              </p>
              <p className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {apiError}
              </p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-white/40 mx-auto mb-4 text-4xl">🔍</div>
              <p className="text-white/80 text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                No people found
              </p>
              <p className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            candidates.map((candidate, index) => (
              <div 
                key={candidate.email || candidate.name} 
                className="transition-all duration-200" 
                style={{ 
                  backgroundColor: '#151726', 
                  borderColor: '#fb4b76', 
                  borderWidth: '1px',
                  borderRadius: '16px',
                  boxShadow: '0 0 18px rgba(251,75,118,0.2)',
                  padding: '24px',
                  width: '100%',
                  border: '1px solid #fb4b76'
                }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between" style={{ marginBottom: '16px' }}>
                  <div className="flex items-center flex-1" style={{ gap: '12px' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      {candidate.name === 'Richard Hamilton Ashworth III' ? 'RA' : candidate.name === 'Danielle Brooks' ? 'DB' : candidate.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'MC'}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px', lineHeight: '1.3' }}>
                        <span>{sanitizeText(candidate.name || '')}</span>
                        <span style={{ color: '#9FA0B5', fontWeight: 400 }}> — {sanitizeText(candidate.title || '')}</span>
                      </h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C0C0D0', marginBottom: '3px' }}>
                        {sanitizeText(candidate.company || '')}
                      </p>
                      {candidate.location && (
                        <p className="flex items-center" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#7A7A8E', gap: '4px' }}>
                          <span style={{ opacity: 0.7 }}>📍</span>
                          {sanitizeText(candidate.location || '')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <div 
                      className="flex items-center"
                      style={{ 
                        backgroundColor: '#442a47',
                        color: '#f472b6',
                        fontSize: '20px',
                        fontWeight: 700,
                        padding: '10px 20px',
                        borderRadius: '18px',
                        gap: '8px',
                        border: '1px solid #f472b6'
                      }}
                    >
                      <Target size={20} style={{ color: '#f472b6' }} />
                      <span>{candidate.accuracy}%</span>
                    </div>
                    <button style={{ color: '#9FA0B5' }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12" y2="8"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex items-center" style={{ gap: '12px', marginBottom: '20px' }}>
                  <button
                    onClick={() => candidate.linkedin_url && openSafeLink(candidate.linkedin_url)}
                    disabled={!candidate.linkedin_url}
                    className="flex items-center transition-all duration-200 disabled:opacity-50"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      height: '36px',
                      borderRadius: '6px',
                      padding: '0 12px',
                      backgroundColor: '#2C2C40',
                      color: '#E8E8F0',
                      gap: '8px'
                    }}
                  >
                    <Linkedin size={16} style={{ color: '#0077B5' }} />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => candidate.email && openSafeLink(`mailto:${candidate.email}`)}
                    disabled={!candidate.email}
                    className="flex items-center transition-all duration-200 disabled:opacity-50"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      height: '36px',
                      borderRadius: '6px',
                      padding: '0 12px',
                      backgroundColor: '#2C2C40',
                      color: '#E8E8F0',
                      gap: '8px'
                    }}
                  >
                    <Mail size={16} style={{ color: '#f472b6' }} />
                    <span>{candidate.email}</span>
                  </button>
                  <button
                    className="flex items-center transition-all duration-200"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '13px',
                      height: '36px',
                      borderRadius: '6px',
                      padding: '0 12px',
                      backgroundColor: '#2C2C40',
                      color: '#E8E8F0',
                      gap: '8px'
                    }}
                  >
                    <Phone size={16} style={{ color: '#4DBE6B' }} />
                    <span>{index === 0 ? '(404) 555-6281' : index === 1 ? '(646) 555-0874' : index === 2 ? '(646) 555-0192' : '(203) 637-3988'}</span>
                  </button>
                </div>

                {/* Why This Match */}
                {candidate.linkedin_profile?.summary && (
                  <div style={{ 
                    backgroundColor: '#282846',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginBottom: '16px',
                    border: '1px solid #4f367b'
                  }}>
                    <h4 style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#d8b4fe',
                      marginBottom: '12px'
                    }}>
                      Why This Match:
                    </h4>
                    <p style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      lineHeight: '24px',
                      color: '#cacad1'
                    }}>
                      {sanitizeText(candidate.linkedin_profile.summary)}
                    </p>
                  </div>
                )}

                {/* Buying Intent Detected */}
                {candidate.reasons && candidate.reasons.length > 0 && (
                  <div style={{ paddingTop: '16px', paddingBottom: '24px' }}>
                    <h4 style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#d8b4fe',
                      marginBottom: '12px'
                    }}>
                      Buying Intent Detected:
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {candidate.reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start" style={{ gap: '18px' }}>
                          <span style={{ color: '#f472b6', fontSize: '13.5px', marginTop: '2px', flexShrink: 0 }}>●</span>
                          <span style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13.5px',
                            lineHeight: '20px',
                            color: '#cacad1'
                          }}>
                            {sanitizeText(reason)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Track Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleToggleTrackingLocal(candidate)}
                    className="flex items-center transition-all duration-200"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      height: '38px',
                      padding: '0 16px',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#E8E8F0',
                      gap: '8px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                      <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2"/>
                      <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Track (2/25)</span>
                  </button>
                </div>

                {/* Expandable Content */}
                {expandedCards.has(candidate.email || candidate.name) && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/10 mt-4">
                    <div className="pt-4 mb-6">
                      {/* Real Time Tracking Box */}
                      <div className="mb-6">
                        <div className="border rounded-lg p-4" style={{ backgroundColor: '#1a2332', borderColor: '#fb4b76', borderWidth: '0.5px' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-white/90 font-medium text-sm mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Real Time Tracking
                              </h4>
                              <p className="text-white/70 text-xs leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Get notified in Slack when this prospect engages with related content
                              </p>
                            </div>
                            <button
                              onClick={() => handleToggleTrackingLocal(candidate)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${getTrackingStatus?.(candidate)
                                ? 'bg-green-500/20 border-green-500/30 text-green-400'
                                : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                                }`}
                            >
                              {getTrackingStatus?.(candidate) ? (
                                <>
                                  <Eye size={14} />
                                  <span className="text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Tracking
                                  </span>
                                </>
                              ) : (
                                <>
                                  <EyeOff size={14} />
                                  <span className="text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Track
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Contact Icons - Left */}
                      <div className="flex items-center space-x-3 mb-4">
                        <button
                          onClick={() => candidate.linkedin_url && openSafeLink(candidate.linkedin_url)}
                          disabled={!candidate.linkedin_url}
                          className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Linkedin size={16} className="text-white/70 group-hover:text-white" />
                        </button>
                        <button
                          onClick={() => candidate.email && openSafeLink(`mailto:${candidate.email}`)}
                          disabled={!candidate.email}
                          className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mail size={16} className="text-white/70 group-hover:text-white" />
                        </button>
                        <button
                          onClick={() => handleTogglePhone(candidate.email || candidate.name)}
                          className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-200 group"
                        >
                          <Phone size={16} className="text-white/70 group-hover:text-white" />
                        </button>

                        {/* Phone Numbers - Inline */}
                        {showPhoneNumbers.has(candidate.email || candidate.name) && (
                          <div className="flex flex-col space-y-1 ml-4 min-w-[220px]">
                            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex justify-between items-center">
                              <span className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Direct:
                              </span>
                              <span className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                +1 (555) 123-4567
                              </span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex justify-between items-center">
                              <span className="text-white/60 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Mobile:
                              </span>
                              <span className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                +1 (555) 987-6543
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Reasons */}
                      <div className="mb-6">
                        <h4 className="text-white/90 font-medium text-sm mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Why this person matches:
                        </h4>
                        <ul className="space-y-3">
                          {candidate.reasons.map((reason, reasonIndex) => (
                            <li key={reasonIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#fb4b76' }}></div>
                              <span className="text-white/70 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {sanitizeText(reason || '')}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Candidate Behavioral Data */}
                      {candidate.behavioral_data && (
                        <div className="mb-6 backdrop-blur-sm border rounded-xl p-3" style={{ backgroundColor: '#1a2332', borderColor: '#fb4b76', borderWidth: '0.5px' }}>
                          <button
                            onClick={() => toggleBehavioralSection(candidate.email || candidate.name)}
                            className="w-full flex items-center justify-between rounded-lg py-3 px-3 -m-2"
                          >
                            <div className="flex items-center space-x-2">
                              <Brain size={16} className="text-blue-400" />
                              <h4 className="text-white/90 font-medium text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Behavioral Analysis
                              </h4>
                            </div>
                            <div className="text-white/50">
                              {expandedBehavioralSections.has(candidate.email || candidate.name) ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </div>
                          </button>

                          {expandedBehavioralSections.has(candidate.email || candidate.name) && (
                            <>
                              {/* Behavioral Intelligence Gauges */}
                              <div className="mb-6">
                                <h5 className="text-white/90 font-medium text-sm mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                  Behavioral Scores:
                                </h5>
                                <div className="grid grid-cols-1 gap-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {/* Communication Maturity Index */}
                                    <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-1 relative group">
                                          <TrendingUp size={12} className="text-blue-400" />
                                          <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                            CMI
                                          </h6>
                                          {/* Tooltip */}
                                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                                            <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700 w-64">
                                              <div className="font-semibold mb-1">Commitment Momentum Index (CMI)</div>
                                              <div className="text-gray-300">Forward motion vs. idle curiosity—i.e., is the person merely researching or already lining up next steps?</div>
                                              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <span className="text-blue-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                          {candidate.behavioral_data?.scores?.cmi?.score || 0}
                                        </span>
                                      </div>
                                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_data?.scores?.cmi?.score || 0}%` }}></div>
                                      </div>
                                      <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {sanitizeText(candidate.behavioral_data?.scores?.cmi?.explanation || 'No data available')}
                                      </p>
                                    </div>

                                    {/* Risk-Barrier Focus Score */}
                                    <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-1 relative group">
                                          <Shield size={12} className="text-yellow-400" />
                                          <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                            RBFS
                                          </h6>
                                          {/* Tooltip */}
                                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                                            <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700 w-64">
                                              <div className="font-semibold mb-1">Risk-Barrier Focus Score (RBFS)</div>
                                              <div className="text-gray-300">How sensitive the person is to downside and friction.</div>
                                              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <span className="text-yellow-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                          {candidate.behavioral_data?.scores?.rbfs?.score || 0}
                                        </span>
                                      </div>
                                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_data?.scores?.rbfs?.score || 0}%` }}></div>
                                      </div>
                                      <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {sanitizeText(candidate.behavioral_data?.scores?.rbfs?.explanation || 'No data available')}
                                      </p>
                                    </div>

                                    {/* Identity Alignment Signal */}
                                    <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-1 relative group">
                                          <Heart size={12} className="text-purple-400" />
                                          <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                            IAS
                                          </h6>
                                          {/* Tooltip */}
                                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-50">
                                            <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700 w-64">
                                              <div className="font-semibold mb-1">Identity Alignment Signal (IAS)</div>
                                              <div className="text-gray-300">Whether the choice aligns with their self-image and personal goals.</div>
                                              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <span className="text-purple-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                          {candidate.behavioral_data?.scores?.ias?.score || 0}
                                        </span>
                                      </div>
                                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_data?.scores?.ias?.score || 0}%` }}></div>
                                      </div>
                                      <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {sanitizeText(candidate.behavioral_data?.scores?.ias?.explanation || 'No data available')}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Buyer Insights Button */}
                              {candidate.personality_types && candidate.buyer_alignment && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                  <button
                                    onClick={() => handleOpenBuyerInsights(candidate)}
                                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#fb4b76] to-[#fb4b76]/80 hover:from-[#fb4b76]/90 hover:to-[#fb4b76]/70 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                  >
                                    <BarChart3 size={18} />
                                    <span>View Complete Buyer Insights</span>
                                  </button>
                                </div>
                              )}
                            </>
                          )}


                        </div>
                      )}

                      {/* Feedback Buttons */}
                      <div className="flex items-center justify-end space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(candidate.email || candidate.name, 'positive');
                          }}
                          className="flex items-center space-x-2 bg-white/10 hover:bg-green-500/20 border border-white/20 hover:border-green-500/30 rounded-full px-3 py-2 transition-all duration-200 group"
                        >
                          <ThumbsUp size={14} className="text-white/70 group-hover:text-green-400" />
                          <span className="text-white/70 group-hover:text-green-400 text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Good match
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(candidate.email || candidate.name, 'negative');
                          }}
                          className="flex items-center space-x-2 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/30 rounded-full px-3 py-2 transition-all duration-200 group"
                        >
                          <ThumbsDown size={14} className="text-white/70 group-hover:text-red-400" />
                          <span className="text-white/70 group-hover:text-red-400 text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Poor match
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

        </div>

        {/* Footer */}
        {candidates.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-white/10 space-y-4">
            {/* HubSpot Push Result */}
            {hubspotPushResult && (
              <div className={`p-3 rounded-lg text-sm ${
                hubspotPushResult.includes('Successfully') || hubspotPushResult.includes('Pushed')
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}>
                {hubspotPushResult}
              </div>
            )}

            {/* Push to HubSpot Button */}
            <button
              onClick={handlePushToHubSpot}
              disabled={isPushingToHubSpot}
              className="group relative overflow-hidden w-full text-white font-medium py-2.5 sm:py-3 px-4 rounded-xl border border-white/20 hover:border-pink-500/50 transition-all duration-200 text-sm sm:text-base flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-500"></div>
              {isPushingToHubSpot ? (
                <>
                  <Loader2 size={16} className="animate-spin relative z-10" />
                  <span className="relative z-10">Pushing to HubSpot...</span>
                </>
              ) : (
                <span className="relative z-10">Push to HubSpot</span>
              )}
            </button>


          </div>
        )}
      </div>

      {/* Buyer Insights Modal */}
      {selectedCandidate && selectedCandidate.personality_types && selectedCandidate.buyer_alignment && (
        <BuyerInsightsModal
          isVisible={showBuyerInsights}
          onClose={handleCloseBuyerInsights}
          candidate={{
            name: selectedCandidate.name,
            title: selectedCandidate.title,
            company: selectedCandidate.company,
            profilePhoto: selectedCandidate.profile_photo_url,
            behavioral_scores: {
              cmi: selectedCandidate.behavioral_data?.scores.cmi || { score: 0, explanation: '' },
              rbfs: selectedCandidate.behavioral_data?.scores.rbfs || { score: 0, explanation: '' },
              ias: selectedCandidate.behavioral_data?.scores.ias || { score: 0, explanation: '' }
            },
            personality_types: selectedCandidate.personality_types,
            buyer_alignment: selectedCandidate.buyer_alignment,
            financial_profile: selectedCandidate.financial_profile
          }}
        />
      )}
    </div>
  );
};

export default SearchResults;