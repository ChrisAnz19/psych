import React from 'react';
import SearchResults from './SearchResults';

const SearchResultsTest: React.FC = () => {
  const mockSearchResults = {
    request_id: 'test-search-123',
    requestId: 'test-search-123',
    prompt: 'Find me corporate real estate decision-makers showing intent to purchase industrial facilities in the Southeast',
    status: 'completed' as const,
    created_at: new Date().toISOString(),
    candidates: [
      {
        name: "Danielle Brooks",
        title: "Senior Director, Real Estate & Facilities",
        company: "UPS (United Parcel Service, Inc.)",
        email: "d.brooks@ups.com",
        accuracy: 88,
        reasons: [
          "Viewing Class A industrial properties in Georgia, Tennessee, and Texas between 100K–300K sq. ft.",
          "Comparing purchase vs. leaseback structures and long-term operating cost models",
          "Downloading developer marketing packets and environmental impact summaries",
          "Researching municipal incentives for logistics development and tax abatements",
          "Reviewing case studies on automation readiness and high-bay retrofitting for robotics integration"
        ],
        linkedin_url: "https://linkedin.com/in/daniellebrooks",
        profile_photo_url: undefined,
        location: "Atlanta, Georgia, United States",
        linkedin_profile: {
          summary: "Our B2B intent model identified Danielle Brooks, Senior Director of Real Estate & Facilities at UPS, as exhibiting elevated purchase intent around industrial property acquisition and expansion. Over the past six weeks, her tracked corporate IP activity includes 33 signals tied to commercial brokerage listings, warehouse capacity calculators, and developer RFP portals focused on Southeastern U.S. logistics corridors.\n\nRecent session clusters show repeat visits to CBRE Industrial, JLL Commercial, and LoopNet Pro listings in the 100K–300K sq. ft. range near Savannah, Memphis, and Dallas–Fort Worth — with filters consistently set for 'owned facility,' 'temperature controlled,' and 'logistics adjacency.'\n\nCross-domain analysis also surfaced research behavior on zoning compliance, build-to-suit leaseback financing, and logistics park proximity modeling, suggesting UPS is preparing for direct purchase rather than short-term leasing.",
          experience: [],
          education: []
        },
        behavioral_data: {
          behavioral_insight: "Danielle exhibits strong B2B purchase intent with concentrated research activity across industrial property acquisition and logistics infrastructure.",
          scores: {
            cmi: {
              score: 89,
              explanation: "Actively comparing industrial properties and developer proposals"
            },
            rbfs: {
              score: 68,
              explanation: "Open to both purchase and build-to-suit leaseback structures"
            },
            ias: {
              score: 92,
              explanation: "Extensively researching zoning, incentives, and automation readiness"
            }
          }
        },
        personality_types: {
          myers_briggs: "ESTJ",
          riasec: ["Enterprising", "Conventional", "Realistic"],
          ocean: {
            openness: 68,
            conscientiousness: 89,
            extraversion: 72,
            agreeableness: 65,
            neuroticism: 31
          },
          big_four: "Average (Resilient)"
        },
        buyer_alignment: [
          "Senior Director role at UPS indicates direct decision-making authority on facilities acquisition in $50M-$100M+ range",
          "Six-week sustained research across multiple markets suggests board-approved capital allocation and active RFP phase",
          "Focus on owned facility filters rather than leasing indicates strategic long-term asset investment approach",
          "Automation readiness and robotics integration research signals future-proofed facility planning with multi-decade horizon",
          "Municipal incentive research demonstrates sophisticated TCO analysis and expectation of favorable deal structuring",
          "ESTJ personality and high Conscientiousness (89%) predict methodical due diligence and reliable execution on complex transactions"
        ],
        financial_profile: {
          net_worth: "N/A (Corporate buyer)",
          liquid_assets: "N/A (Corporate buyer)",
          real_estate_portfolio: "Corporate decision-maker",
          investment_portfolio: "N/A (Corporate buyer)",
          luxury_assets: "N/A",
          philanthropic_giving: "N/A"
        },
        interests: [
          "Industrial logistics & supply chain optimization",
          "Sustainable warehouse design",
          "Commercial real estate development",
          "Automation & robotics integration",
          "Public-private infrastructure partnerships",
          "Women in commercial real estate leadership"
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
      searchQuery="Find me corporate real estate decision-makers showing intent to purchase industrial facilities in the Southeast"
      searchResults={mockSearchResults}
      apiError={null}
    />
  );
};

export default SearchResultsTest;

