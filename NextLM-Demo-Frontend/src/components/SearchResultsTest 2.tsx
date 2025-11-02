import React from 'react';
import SearchResults from './SearchResults';

const SearchResultsTest: React.FC = () => {
  const mockSearchResults = {
    requestId: 'test-search-123',
    status: 'completed' as const,
    candidates: [
      {
        name: "Ethan Calder",
        title: "Founder & Former CEO",
        company: "Aperture Systems (Acquired by Oracle in 2024)",
        email: "e.calder@aperturelabs.io",
        accuracy: 93,
        reasons: [
          "Researching boutique wealth-advisory firms and independent RIAs specializing in post-liquidity founders",
          "Reviewing AUM-fee comparisons, custodian platform integrations, and fiduciary disclosures",
          "Reading about 2025 capital-gain deferral programs and charitable giving frameworks",
          "Evaluating family office formation versus third-party advisory partnerships",
          "Exploring content on long-term trust management, estate planning, and structured philanthropy"
        ],
        linkedin_url: "https://linkedin.com/in/ethancalder",
        profile_photo_url: null,
        location: "Austin, Texas, United States",
        linkedin_profile: {
          summary: "Our behavioral inference engine identified Ethan Calder, Founder and former CEO of Aperture Systems, as a high-net-worth individual ($47M) exhibiting strong intent to secure new wealth-advisory relationships following a liquidity event. Over the past five weeks, Ethan's browsing patterns show repeated engagement with RIA firm comparison tools, estate-planning whitepapers, and post-acquisition tax strategy resources.\n\nHe has viewed multi-family office sites based in Texas, Florida, and New York, including several with a focus on entrepreneur liquidity management and philanthropic structuring. In the last 10 days, Ethan downloaded documents on charitable foundations, family governance models, and second-home trust design, suggesting active movement toward long-term portfolio oversight and succession planning.\n\nThe combination of sustained research frequency, cross-domain engagement, and content depth places Ethan in a conversion-ready stage for wealth-advisory outreach within the next 30–60 days.",
          experience: [],
          education: []
        },
        behavioral_data: {
          behavioral_insight: "Ethan exhibits strong wealth-advisory intent following a liquidity event, with concentrated research across estate planning and family office structures.",
          scores: {
            cmi: {
              score: 94,
              explanation: "Actively comparing wealth-advisory firms and RIA platforms"
            },
            rbfs: {
              score: 78,
              explanation: "Open to both family office formation and third-party advisory partnerships"
            },
            ias: {
              score: 96,
              explanation: "Extensively researching post-liquidity tax strategy and philanthropic structuring"
            }
          }
        },
        personality_types: {
          myers_briggs: "ENTJ",
          riasec: ["Enterprising", "Investigative", "Conventional"],
          ocean: {
            openness: 82,
            conscientiousness: 91,
            extraversion: 76,
            agreeableness: 58,
            neuroticism: 24
          },
          big_four: "Average (Resilient)"
        },
        buyer_alignment: [
          "Recent $47M liquidity event from Oracle acquisition creates immediate need for sophisticated wealth management",
          "Active research across multiple RIA firms indicates serious advisory partnership intent within 30-60 days",
          "Downloaded estate-planning and family governance documents suggest advanced stage of decision-making",
          "Multi-state advisory firm research (Texas, Florida, New York) indicates geographic flexibility and high-touch expectations",
          "Focus on post-liquidity founder specialists shows self-awareness and desire for experienced guidance",
          "Charitable foundation and structured philanthropy research indicates values alignment and long-term planning mindset"
        ],
        financial_profile: {
          net_worth: "$47M",
          liquid_assets: "$38M+",
          real_estate_portfolio: "Primary residence in Austin, vacation property in Colorado",
          investment_portfolio: "$42M post-acquisition (seeking advisory)",
          luxury_assets: "N/A",
          philanthropic_giving: "Exploring foundation structure"
        },
        interests: [
          "Entrepreneurship & startup ecosystem",
          "Technology innovation trends",
          "Family governance & succession planning",
          "Impact investing",
          "Educational philanthropy",
          "Outdoor recreation & hiking"
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
      searchQuery="Find me founders who recently exited showing intent to engage a wealth advisor"
      searchResults={mockSearchResults}
      apiError={null}
    />
  );
};

export default SearchResultsTest;

