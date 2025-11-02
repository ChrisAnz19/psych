import React, { useState } from 'react';
import BuyerInsightsModal from './BuyerInsightsModal';

const BuyerInsightsTest: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  const mockCandidate = {
    name: "Richard Hamilton Ashworth III",
    title: "Chief Executive Officer",
    company: "Ashworth Capital Management",
    profilePhoto: undefined,
    behavioral_scores: {
      cmi: {
        score: 89,
        explanation: "Actively viewing Palm Beach Island oceanfront estates and comparing private marina access"
      },
      rbfs: {
        score: 38,
        explanation: "Open to Mediterranean estate renovations if the property offers prime waterfront positioning"
      },
      ias: {
        score: 91,
        explanation: "Extensively researching Palm Beach Island market trends and off-market estate valuations"
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
      "85ft yacht ownership and marina proximity research indicate genuine need for Palm Beach waterfront access—not aspirational browsing",
      "Existing membership interests at Everglades Club and Mar-a-Lago demonstrate social fit with Palm Beach elite community and long-term commitment intent",
      "High Conscientiousness (92%) and low Neuroticism (22%) psychometric scores predict reliable follow-through on purchase commitments and resistance to buyer's remorse",
      "Multi-property portfolio ownership across 4 states demonstrates experience with complex real estate transactions and comfort managing high-value assets",
      "Educational philanthropy focus and $500K+ annual giving history align with Palm Beach donor culture—indicates values-based community integration beyond transactional residency",
      "ENTJ decisiveness combined with private aviation ownership enables rapid site visits and accelerated closing timelines without logistical friction"
    ],
    financial_profile: {
      net_worth: "$239M",
      liquid_assets: "$12M+",
      real_estate_portfolio: "6 properties across 4 states",
      investment_portfolio: "$18M diversified",
      luxury_assets: "Gulfstream G650, 85ft Azimut yacht",
      philanthropic_giving: "$500K+ annually"
    },
    interests: [
      "Ocean yachting & Palm Beach regatta",
      "Golf (Everglades Club & Mar-a-Lago)",
      "Contemporary art collection (Damien Hirst, Jeff Koons)",
      "Classic car collecting & Cavallino Classic",
      "Fine wine & private cellar curation",
      "Educational philanthropy",
      "Michelin-starred dining (Café Boulud, Buccan)",
      "Patek Philippe & Richard Mille collections"
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

