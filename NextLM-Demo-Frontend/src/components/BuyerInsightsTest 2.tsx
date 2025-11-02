import React, { useState } from 'react';
import BuyerInsightsModal from './BuyerInsightsModal';

const BuyerInsightsTest: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  const mockCandidate = {
    name: "Richard Hamilton Ashworth III",
    title: "Chief Executive Officer",
    company: "Ashworth Capital Management",
    profilePhoto: null,
    behavioral_scores: {
      cmi: {
        score: 94,
        explanation: "Actively viewing Palm Beach Island oceanfront estates and engaging with luxury brokers"
      },
      rbfs: {
        score: 42,
        explanation: "Flexible on architectural style but requires waterfront access and privacy"
      },
      ias: {
        score: 96,
        explanation: "Extensively researching ultra-luxury Palm Beach market, tax implications, and estate services"
      }
    },
    personality_types: {
      myers_briggs: "ENTJ",
      riasec: ["Enterprising", "Conventional", "Investigative"],
      ocean: {
        openness: 78,
        conscientiousness: 92,
        extraversion: 85,
        agreeableness: 68,
        neuroticism: 22
      },
      big_four: "Average (Resilient)"
    },
    buyer_alignment: [
      "Recent decision to relocate from New York to Florida demonstrates commitment to lifestyle upgrade and tax optimization strategy",
      "Active engagement with Palm Beach Island brokers and private estate tours shows serious intent within 60-90 day timeline",
      "History of decisive ultra-luxury purchases - acquired $12M penthouse in Manhattan within 2 weeks of first viewing",
      "Research into Florida homestead exemptions and wealth protection indicates sophisticated financial planning mindset",
      "Net worth of $239M provides immediate liquidity for $30M+ cash purchase without financing contingencies",
      "Personality profile (ENTJ) indicates preference for exclusivity, efficiency, and working with top-tier professionals",
      "Concurrent research into yacht moorings, private aviation access, and club memberships signals comprehensive relocation planning"
    ],
    financial_profile: {
      net_worth: "$239M",
      liquid_assets: "$45M+",
      real_estate_portfolio: "Manhattan penthouse, Aspen estate, Nantucket vacation home",
      investment_portfolio: "$120M diversified across PE and hedge funds",
      luxury_assets: "Gulfstream G650, 85ft Azimut yacht",
      philanthropic_giving: "$2M+ annually"
    },
    interests: [
      "Sailing & yachting",
      "Palm Beach social circuit & charity galas",
      "Fine art collection (contemporary)",
      "Vintage cars & motorsports",
      "Wine collecting",
      "Educational philanthropy",
      "Michelin-starred dining",
      "Golf at exclusive Florida clubs",
      "Luxury watches (Patek Philippe collector)"
    ]
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #1a2332, #0f1419)'
    }}>
      <div style={{ textAlign: 'center', padding: '32px' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Buyer Insights Modal Test
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.7)', 
          marginBottom: '24px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {showModal ? 'Modal is open!' : 'Click to reopen the modal'}
        </p>
        {!showModal && (
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #fb4b76, rgba(251, 75, 118, 0.8))',
              color: 'white',
              fontWeight: '500',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Open Buyer Insights Modal
          </button>
        )}
      </div>

      <BuyerInsightsModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        candidate={mockCandidate}
      />
    </div>
  );
};

export default BuyerInsightsTest;

