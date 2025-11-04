import React from 'react';
import SearchResults from './SearchResults';

const SearchResultsTest: React.FC = () => {
  const mockSearchResults = {
    request_id: 'test-search-123',
    requestId: 'test-search-123',
    prompt: 'Find me ultra-high-net-worth individuals relocating from New York to Palm Beach Island with intent to purchase oceanfront estates in the $25M-$35M range',
    status: 'completed' as const,
    created_at: new Date().toISOString(),
    candidates: [
      {
        name: "Richard Hamilton Ashworth III",
        title: "Chief Executive Officer",
        company: "Ashworth Capital Management (Private Wealth & Strategic Investments Group)",
        email: "r.ashworth@ashworthcapital.com",
        accuracy: 96,
        reasons: [
          "Viewing off-market Palm Beach Island listings priced between $28M–$32M with privacy and waterfront amenities",
          "Comparing Florida tax residency frameworks and homestead protections for high-net-worth individuals",
          "Downloading content from private law firms specializing in wealth transfer and large-asset closing coordination",
          "Researching private aviation access, marina proximity, and yacht slip availability tied to luxury estates",
          "Reading about escrow verification, property title transfer, and cash acquisition compliance procedures"
        ],
        linkedin_url: "https://linkedin.com/in/richardashworth",
        profile_photo_url: undefined,
        location: "New York, New York, United States",
        linkedin_profile: {
          summary: "Our intelligence engine identified Richard Hamilton Ashworth III, Chief Executive Officer of Ashworth Capital Management, as an exceptionally high-confidence luxury buyer currently planning relocation from New York to Palm Beach Island. Over the past 21 days, his digital behavior shows sustained engagement with gated property networks and off-market estate listings between $28M and $32M. His browsing history includes interactions with pages on Palm Beach architectural firms, wealth advisory services for relocation, and multiple private-aviation and marina-access property filters.\n\nBehavioral clustering reveals activity engaging with content focused on Florida tax residency establishment, high-value insurance underwriting portals, and wire verification policy documentation—signaling preparation for a large cash acquisition rather than exploratory browsing. He also accessed resources outlining Florida homestead exemptions, escrow security best practices, and logistical services for multi-asset relocation from New York, all within a compressed two-week period.\n\nTogether, these behavioral patterns indicate a motivated, liquid buyer targeting an ultra-luxury oceanfront estate purchase on Palm Beach Island within the next 60 days as part of a permanent relocation from New York.",
          experience: [],
          education: []
        },
        behavioral_data: {
          behavioral_insight: "Richard exhibits exceptional decision-making authority and financial capacity. His profile indicates readiness for significant luxury purchases aligned with lifestyle and status.",
          scores: {
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
          "Net worth of $239M and demonstrated cash transfer protocol research indicate capacity for all-cash $28M-$32M acquisition without financing contingencies",
          "21-day sustained engagement with off-market Palm Beach Island listings shows serious, focused intent beyond casual browsing",
          "Engagement with content on wire verification and cash acquisition protocols signals advanced transaction planning stage",
          "Research into Florida homestead exemptions and tax residency frameworks indicates committed long-term relocation strategy from New York, not speculative purchase",
          "Coordination of yacht slip availability and private aviation access demonstrates comprehensive lifestyle integration—reducing deal fall-through risk",
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
      },
      {
        name: "Rachel Donovan",
        title: "Chief Marketing Officer",
        company: "VeraNova Health Systems (Integrated Digital Health & Wellness Platform)",
        email: "r.donovan@veranovahealth.com",
        accuracy: 89,
        reasons: [
          "Comparing newly built luxury properties near Riverside and Old Greenwich with open layouts and private outdoor spaces",
          "Submitting prequalification requests through two major private lenders within the past three weeks",
          "Researching relocation and property management firms with experience supporting executive families",
          "Reviewing private school options and recreational club memberships near downtown Greenwich",
          "Saving content related to energy-efficient upgrades and personalized home wellness systems"
        ],
        linkedin_url: "https://linkedin.com/in/racheldonovan",
        profile_photo_url: "https://i.pravatar.cc/150?img=45",
        location: "New York, New York, United States",
        linkedin_profile: {
          summary: "Our behavioral model identified Rachel Donovan, Chief Marketing Officer at VeraNova Health Systems, as a high-probability buyer currently evaluating luxury homes in Greenwich, Connecticut. Rachel's digital activity over the past 30 days includes 14 sessions viewing listings for newly constructed residences in Riverside and mid-country Greenwich, multiple inquiries with mortgage preapproval portals for high-value properties, and consistent engagement with relocation-focused content emphasizing space, privacy, and hybrid work balance.\n\nCross-referenced psychographic data show sustained interest in community amenities, family-oriented neighborhoods, and interior design themes emphasizing wellness and biophilic layouts. Rachel has also interacted with tax optimization and dual-state residency articles—an early step that typically precedes financial commitment for C-suite relocations.\n\nThis cluster of behaviors positions her as a strong near-term prospect, likely to enter contract discussions within 60–90 days.",
          experience: [],
          education: []
        },
        behavioral_data: {
          behavioral_insight: "Rachel demonstrates strong relocation intent with focused research on Greenwich neighborhoods, commuting logistics, and property features aligned with wellness lifestyle priorities.",
          scores: {
            cmi: {
              score: 87,
              explanation: "Actively viewing new-construction homes in Riverside and Old Greenwich with specific focus on water access and outdoor spaces"
            },
            rbfs: {
              score: 82,
              explanation: "Comparing express rail schedules and hybrid commuting options between Manhattan office and Greenwich neighborhoods"
            },
            ias: {
              score: 89,
              explanation: "Researching wellness-oriented home layouts, property tax advantages, and school districts in Fairfield County"
            }
          }
        }
      },
      {
        name: "Michael Cortez",
        title: "Chief Growth Officer",
        company: "Aurelia Capital Partners",
        email: "m.cortez@aureliacap.com",
        accuracy: 92,
        reasons: [
          "Viewing luxury properties in Upper East Side and Tribeca with multiple broker appointments scheduled in next 2 weeks",
          "Actively comparing jumbo mortgage rates and preapproval terms across Chase Private Client, Citi Private Bank, and local lenders",
          "Researching top-rated private schools and commute times from shortlisted neighborhoods to Midtown office",
          "Engaging with interior designers and architects for potential renovations on properties of interest",
          "Consulting with wealth advisors on optimal financing structure and property purchase timing for tax efficiency"
        ],
        linkedin_url: "https://linkedin.com/in/michaelcortez",
        profile_photo_url: "https://i.pravatar.cc/150?img=33",
        location: "New York, New York, United States",
        linkedin_profile: {
          summary: "Our intelligence engine identified Michael Cortez as Chief Growth Officer at Aurelia Capital Partners, located in New York, with 76 behavioral signals across 28 research topics showing active home purchasing intent in the last 45 days. Behavioral analysis detected intensive research patterns in luxury residential properties, with repeated visits to listings in Upper East Side, Tribeca, and Westchester County. Strong signals include multiple mortgage calculator sessions, engagement with interior designers specializing in luxury renovations, and consultation requests with private wealth advisors about real estate asset allocation. Data shows concurrent activity across real estate platforms, mortgage providers, and home service categories, indicating serious buying stage activity within 60-90 day timeline. As a C-suite executive at a private capital firm actively house hunting in premium NYC markets, Michael represents a high-intent prospect for luxury real estate agents, mortgage brokers, and high-end home services.",
          experience: [],
          education: []
        },
        behavioral_data: {
          behavioral_insight: "Michael exhibits exceptional purchasing readiness with coordinated activity across property search, financing, and move planning. Timeline indicators suggest purchase decision within 60-90 days.",
          scores: {
            cmi: {
              score: 94,
              explanation: "Viewing 3-4 bedroom luxury properties in Upper East Side and Tribeca with 6 broker appointments scheduled"
            },
            rbfs: {
              score: 88,
              explanation: "Submitted mortgage prequalification applications to multiple lenders for $3-4M purchase range"
            },
            ias: {
              score: 92,
              explanation: "Active engagement with interior designers, private school admissions, and wealth management for purchase planning"
            }
          }
        }
      },
      {
        name: "Sarah Thompson",
        title: "Managing Director",
        company: "Goldman Sachs",
        email: "s.thompson@gs.com",
        accuracy: 94,
        reasons: [
          "Managing Director at top investment bank",
          "Recently promoted with significant compensation increase",
          "Actively searching for luxury properties in Greenwich area",
          "Strong financial position for high-value purchase"
        ],
        linkedin_url: "https://linkedin.com/in/sarahthompson",
        profile_photo_url: "https://i.pravatar.cc/150?img=45",
        location: "Greenwich, CT",
        linkedin_profile: {
          summary: "Investment banking executive specializing in mergers and acquisitions.",
          experience: [],
          education: []
        }
      },
      {
        name: "Jennifer Liu",
        title: "Senior Partner",
        company: "Accenture",
        email: "j.liu@accenture.com",
        accuracy: 85,
        reasons: [
          "Senior Partner with 20+ years at top consulting firm",
          "Children in Greenwich school district",
          "Active in local community organizations",
          "Strong interest in luxury real estate"
        ],
        linkedin_url: "https://linkedin.com/in/jenniferliu",
        profile_photo_url: "https://i.pravatar.cc/150?img=25",
        location: "Greenwich, CT"
      }
    ]
  };

  return (
    <SearchResults
      isVisible={true}
      onClose={() => console.log('Close clicked')}
      searchQuery="Find me ultra-high-net-worth individuals relocating from New York to Palm Beach Island with intent to purchase oceanfront estates in the $25M-$35M range"
      searchResults={mockSearchResults}
      apiError={null}
    />
  );
};

export default SearchResultsTest;

