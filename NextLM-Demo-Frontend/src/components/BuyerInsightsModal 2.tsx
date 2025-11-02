import React from 'react';
import { X, TrendingUp, Brain, Target, DollarSign, Heart } from 'lucide-react';

interface BehavioralScore {
  score: number;
  explanation: string;
}

interface BuyerInsightsModalProps {
  isVisible: boolean;
  onClose: () => void;
  candidate: {
    name: string;
    title: string;
    company: string;
    profilePhoto?: string;
    behavioral_scores: {
      cmi: BehavioralScore;
      rbfs: BehavioralScore;
      ias: BehavioralScore;
    };
    personality_types: {
      myers_briggs: string;
      riasec: string[];
      ocean: {
        openness: number;
        conscientiousness: number;
        extraversion: number;
        agreeableness: number;
        neuroticism: number;
      };
      big_four: string;
    };
    buyer_alignment: string[];
    financial_profile?: {
      net_worth: string;
      liquid_assets: string;
      real_estate_portfolio: string;
      investment_portfolio: string;
      luxury_assets: string;
      philanthropic_giving: string;
    };
    interests?: string[];
  };
}

const BuyerInsightsModal: React.FC<BuyerInsightsModalProps> = ({
  isVisible,
  onClose,
  candidate
}) => {
  if (!isVisible) return null;

  const renderRadarPoint = (value: number, label: string, index: number, total: number) => {
    const angle = (index * 360) / total - 90;
    const radius = 80;
    const normalizedValue = value / 100;
    const x = 100 + radius * normalizedValue * Math.cos((angle * Math.PI) / 180);
    const y = 100 + radius * normalizedValue * Math.sin((angle * Math.PI) / 180);
    return { x, y, angle, label };
  };

  const oceanData = [
    { label: 'Openness', value: candidate.personality_types.ocean.openness },
    { label: 'Conscientiousness', value: candidate.personality_types.ocean.conscientiousness },
    { label: 'Extraversion', value: candidate.personality_types.ocean.extraversion },
    { label: 'Agreeableness', value: candidate.personality_types.ocean.agreeableness },
    { label: 'Neuroticism', value: candidate.personality_types.ocean.neuroticism }
  ];

  const radarPoints = oceanData.map((item, idx) =>
    renderRadarPoint(item.value, item.label, idx, oceanData.length)
  );

  const pathData = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gradient-to-br from-[#1a2332]/95 to-[#0f1419]/95 backdrop-blur-md rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto scrollbar-hidden"
        style={{ 
          fontFamily: 'Poppins, sans-serif',
          border: '1px solid #fb4b76',
          boxShadow: '0 0 30px rgba(251, 75, 118, 0.3), 0 0 60px rgba(251, 75, 118, 0.15)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a2332] to-[#0f1419] border-b border-white/10 p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            {candidate.profilePhoto ? (
              <img
                src={candidate.profilePhoto}
                alt={candidate.name}
                className="w-16 h-16 rounded-full border-2 border-[#fb4b76]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center border-2 border-[#fb4b76]">
                <span className="text-white font-semibold text-xl">
                  RA
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Buyer Insights
              </h2>
              <p className="text-white/70">{candidate.name} • {candidate.title}</p>
              <p className="text-white/50 text-sm">{candidate.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Top Section: Financial Profile, Behavioral Scores, and Buyer Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Financial Profile - Left Side */}
            {candidate.financial_profile && (
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="text-[#4ade80]" size={14} />
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Financial Profile
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Net Worth</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.net_worth}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Liquid Assets</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.liquid_assets}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Investment Portfolio</p>
                    <p className="text-white font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.investment_portfolio}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>RE Portfolio</p>
                    <p className="text-white font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.real_estate_portfolio}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Luxury Assets</p>
                    <p className="text-white font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.luxury_assets}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                    <p className="text-white/60 text-xs mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Philanthropy</p>
                    <p className="text-white font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.financial_profile.philanthropic_giving}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Right Side: Behavioral Scores and Buyer Alignment */}
            <div className="lg:col-span-4 space-y-3">
              {/* Behavioral Scores */}
              <div className="backdrop-blur-sm border rounded-xl p-3" style={{ backgroundColor: '#1a2332', borderColor: '#fb4b76', borderWidth: '0.5px' }}>
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="text-[#fb4b76]" size={16} />
                  <h3 className="text-white/90 font-medium text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Behavioral Scores
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
              {/* CMI Score */}
              <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 relative group">
                    <TrendingUp size={12} className="text-blue-400" />
                    <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      CMI
                    </h6>
                  </div>
                  <span className="text-blue-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {candidate.behavioral_scores.cmi.score}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_scores.cmi.score}%` }}></div>
                </div>
                <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {candidate.behavioral_scores.cmi.explanation}
                </p>
              </div>

              {/* RBFS Score */}
              <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 relative group">
                    <Target size={12} className="text-yellow-400" />
                    <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      RBFS
                    </h6>
                  </div>
                  <span className="text-yellow-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {candidate.behavioral_scores.rbfs.score}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_scores.rbfs.score}%` }}></div>
                </div>
                <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {candidate.behavioral_scores.rbfs.explanation}
                </p>
              </div>

              {/* IAS Score */}
              <div className="border border-white/20 rounded-lg p-3" style={{ backgroundColor: '#1a2332' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 relative group">
                    <Heart size={12} className="text-purple-400" />
                    <h6 className="text-white/80 font-medium text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      IAS
                    </h6>
                  </div>
                  <span className="text-purple-400 font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {candidate.behavioral_scores.ias.score}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: `${candidate.behavioral_scores.ias.score}%` }}></div>
                </div>
                <p className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {candidate.behavioral_scores.ias.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Buyer Alignment Section */}
          <div className="bg-gradient-to-br from-[#fb4b76]/20 to-[#fb4b76]/5 rounded-xl p-3 border border-[#fb4b76]/30">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-[#fb4b76]" size={14} />
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Buyer Alignment Analysis
              </h3>
            </div>
            <p className="text-white/70 text-xs mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Why this prospect is an ideal buyer:</p>
            <ul className="space-y-1.5">
              {candidate.buyer_alignment.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#fb4b76] mt-0.5 text-xs">✓</span>
                  <span className="text-white/90 text-xs leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

          {/* Personality Types Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Left Column - Text-based Personality Types */}
            <div className="space-y-3">
              {/* Myers-Briggs */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="text-[#fb4b76]" size={14} />
                  <h4 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Myers-Briggs Type</h4>
                </div>
                <div className="bg-gradient-to-r from-[#fb4b76]/20 to-[#fb4b76]/5 border border-[#fb4b76]/30 rounded-lg p-1.5 mb-2">
                  <p className="text-base font-bold text-white text-center">{candidate.personality_types.myers_briggs}</p>
                </div>
                <p className="text-white/70 text-xs leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong className="text-white/90">Seller Insight:</strong> ENTJ buyers are decisive, strategic, and value efficiency. They make quick decisions when presented with data. Expect direct communication and minimal negotiation.
                </p>
              </div>

              {/* RIASEC */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="text-[#4ade80]" size={14} />
                  <h4 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>RIASEC Profile</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {candidate.personality_types.riasec.map((code, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-[#4ade80]/20 to-[#4ade80]/5 border border-[#4ade80]/30 rounded-lg px-2 py-1 text-white font-medium text-xs"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-xs leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong className="text-white/90">Seller Insight:</strong> Enterprising types seek status opportunities. Conventional buyers value structure. Investigative personalities research thoroughly. Present documented comparables.
                </p>
              </div>

              {/* Big Four */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="text-[#60a5fa]" size={14} />
                  <h4 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Big Four Personality</h4>
                </div>
                <div className="bg-gradient-to-r from-[#60a5fa]/20 to-[#60a5fa]/5 border border-[#60a5fa]/30 rounded-lg p-1.5 mb-2">
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{candidate.personality_types.big_four}</p>
                </div>
                <p className="text-white/70 text-xs leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong className="text-white/90">Seller Insight:</strong> "Resilient" buyers handle stress well and maintain composure. Emotionally stable, not swayed by pressure. Focus on facts over emotions.
                </p>
              </div>
            </div>

            {/* Right Column - Interests and OCEAN */}
            <div className="flex flex-col space-y-3">
              {/* Interests Section */}
              {candidate.interests && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="text-[#60a5fa]" size={14} />
                    <h4 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Interests & Lifestyle</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {candidate.interests.map((interest, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-[#60a5fa] mt-0.5 text-xs">•</span>
                        <span className="text-white/80 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OCEAN Radar Chart */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="text-[#fb4b76]" size={14} />
                  <h4 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>OCEAN Personality Profile</h4>
                </div>
                
                <div className="flex items-center gap-6">
                  {/* Legend on Left */}
                  <div className="flex-shrink-0 space-y-1.5 text-xs pl-2">
                    {oceanData.map((item, idx) => (
                      <div key={idx} className="flex items-center text-white/80" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <span className="w-32">{item.label}:</span>
                        <span className="font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Radar Chart - Right */}
                  <div className="flex-shrink-0 flex items-center justify-center flex-1">
                    <svg viewBox="0 0 200 200" className="w-full max-w-[160px]">
                  {/* Background circles */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  
                  {/* Axis lines */}
                  {radarPoints.map((point, idx) => {
                    const endX = 100 + 80 * Math.cos((point.angle * Math.PI) / 180);
                    const endY = 100 + 80 * Math.sin((point.angle * Math.PI) / 180);
                    return (
                      <line
                        key={idx}
                        x1="100"
                        y1="100"
                        x2={endX}
                        y2={endY}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                      />
                    );
                  })}
                  
                  {/* Data polygon */}
                  <path
                    d={pathData}
                    fill="rgba(251, 75, 118, 0.3)"
                    stroke="#fb4b76"
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  {radarPoints.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#fb4b76"
                    />
                  ))}
                  
                  {/* Labels */}
                  {radarPoints.map((point, idx) => {
                    const labelX = 100 + 95 * Math.cos((point.angle * Math.PI) / 180);
                    const labelY = 100 + 95 * Math.sin((point.angle * Math.PI) / 180);
                    return (
                      <text
                        key={idx}
                        x={labelX}
                        y={labelY}
                        fill="white"
                        fontSize="10"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {oceanData[idx].label.charAt(0)}
                      </text>
                    );
                  })}
                    </svg>
                  </div>
                </div>
                
                {/* Seller Insight */}
                <div className="mt-auto pt-3 border-t border-white/10">
                  <p className="text-white/70 text-xs leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <strong className="text-white/90">Seller Insight:</strong> High Conscientiousness (92%) and Extraversion (85%) = reliable, communicative buyer. Low Neuroticism (22%) = emotionally stable during negotiations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerInsightsModal;

