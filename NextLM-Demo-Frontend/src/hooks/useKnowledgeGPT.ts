import { useState } from 'react';

// TypeScript interfaces based on API documentation
export interface SearchRequest {
  prompt: string;
  max_candidates?: number;
  include_linkedin?: boolean;
  include_posts?: boolean;
}

export interface Candidate {
  name: string;
  title: string;
  company: string;
  email?: string;
  accuracy: number; // 0-100
  reasons: string[];
  linkedin_url?: string;
  profile_photo_url?: string;
  location?: string;
  linkedin_profile?: {
    summary?: string;
    experience?: any[];
    education?: any[];
  };
  behavioral_data?: BehavioralData;
  personality_types?: {
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
  buyer_alignment?: string[];
  financial_profile?: {
    net_worth: string;
    liquid_assets: string;
    real_estate_portfolio: string;
    investment_portfolio: string;
    luxury_assets: string;
    philanthropic_giving: string;
  };
  interests?: string[];
}

export interface BehavioralData {
  behavioral_insight: string;
  scores: {
    cmi: {
      score: number;
      explanation: string;
    };
    rbfs: {
      score: number;
      explanation: string;
    };
    ias: {
      score: number;
      explanation: string;
    };
  };
}

export interface SearchResponse {
  request_id: string;
  status: "processing" | "completed" | "failed";
  prompt: string;
  filters?: {
    person_filters: {
      person_titles?: string[];
      include_similar_titles?: boolean;
      person_seniorities?: string[];
      person_locations?: string[];
    };
    organization_filters: {
      q_organization_keyword_tags?: string[];
    };
    reasoning: string;
  };
  candidates?: Candidate[];
  estimated_count?: number;
  error?: string;
  created_at: string;
  completed_at?: string;
}

export interface UseKnowledgeGPT {
  createSearch: (prompt: string, maxCandidates?: number) => Promise<string>;
  getSearchResult: (requestId: string) => Promise<SearchResponse>;
  pollSearchResult: (requestId: string) => Promise<SearchResponse>;
  isLoading: boolean;
  error: string | null;
}

export const useKnowledgeGPT = (): UseKnowledgeGPT => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use the live API
  const API_BASE = 'https://knowledge-gpt-siuq.onrender.com';
  
  // Demo mode - use mock data
  const DEMO_MODE = true; // Set to false to use real API

  const createSearch = async (prompt: string, maxCandidates: number = 2): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    // Demo mode - return mock request ID
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      const mockRequestId = `demo-${Date.now()}`;
      setIsLoading(false);
      return mockRequestId;
    }
    
    try {
      const response = await fetch(`${API_BASE}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          max_candidates: maxCandidates,
          include_linkedin: true,
          include_posts: false
        })
      });
      
      if (!response.ok) {
        // Try to get the response text first
        const responseText = await response.text();
        console.error('API Error Response Text:', responseText);
        
        // Try to parse as JSON
        let errorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          errorData = { error: responseText || `HTTP error! status: ${response.status}` };
        }
        
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
          url: response.url,
          responseText: responseText
        });
        throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.request_id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getSearchResult = async (requestId: string): Promise<SearchResponse> => {
    try {
      const response = await fetch(`${API_BASE}/api/search/${requestId}`);
      
      if (!response.ok) {
        // Try to get the response text first
        const responseText = await response.text();
        console.error('API Error Response Text:', responseText);
        
        // Try to parse as JSON
        let errorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          errorData = { error: responseText || `HTTP error! status: ${response.status}` };
        }
        
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
          url: response.url,
          responseText: responseText
        });
        throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get search result';
      setError(errorMessage);
      throw err;
    }
  };

  const pollSearchResult = async (requestId: string): Promise<SearchResponse> => {
    // Demo mode - return mock completed search with candidates
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      const mockCandidates: Candidate[] = [
        {
            name: "Richard Hamilton Ashworth III",
            title: "Chief Executive Officer",
            company: "Ashworth Capital Management",
            email: "r.ashworth@ashworthcapital.com",
            accuracy: 96,
            reasons: [
              "CEO of $2.4B private equity firm with 25+ years experience",
              "Recently relocated corporate headquarters to Connecticut",
              "Active in Greenwich country club and social circles",
              "Portfolio includes significant real estate holdings",
              "Known for making decisive, high-value purchases"
            ],
            linkedin_url: "https://linkedin.com/in/richardashworth",
            profile_photo_url: "https://i.pravatar.cc/150?img=12",
          location: "Greenwich, CT",
          linkedin_profile: {
            summary: "Seasoned financial executive with extensive experience in private equity, wealth management, and strategic investments. Led multiple successful exits and maintains a diverse portfolio of real estate and business holdings.",
            experience: [],
            education: []
          },
          behavioral_data: {
            behavioral_insight: "Richard exhibits exceptional decision-making authority and financial capacity. His profile indicates readiness for significant luxury purchases aligned with lifestyle and status.",
            scores: {
              cmi: {
                score: 89,
                explanation: "Actively touring Greenwich properties and comparing neighborhood amenities"
              },
              rbfs: {
                score: 38,
                explanation: "Open to various architectural styles if the property meets investment criteria"
              },
              ias: {
                score: 91,
                explanation: "Extensively researching Greenwich market trends and property values"
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
              "Recent corporate headquarters relocation to Connecticut demonstrates strong commitment to the region and need for executive residence",
              "Has open applications at Greenwich Country Club and Round Hill Club - actively seeking integration into local elite social circles and prestigious address",
              "History of decisive luxury purchases - acquired $8M vacation property in Nantucket within 3 weeks of first viewing",
              "Children enrolled in Brunswick School and Greenwich Academy - family firmly rooted in community, indicating long-term housing needs",
              "Recent Forbes profile highlighting business success creates motivation for residence befitting status and public image",
              "Personality profile (ENTJ) indicates preference for efficiency, quality, and working with top-tier professionals - ideal for luxury agent partnerships",
              "Current 6-month corporate housing lease expires in 90 days - creating urgency and clear timeline for purchase decision"
            ],
            financial_profile: {
              net_worth: "$45M+",
              liquid_assets: "$12M+",
              real_estate_portfolio: "6 properties across 4 states",
              investment_portfolio: "$18M diversified",
              luxury_assets: "Gulfstream G650, 85ft Azimut yacht",
              philanthropic_giving: "$500K+ annually"
            },
            interests: [
              "Sailing & yachting",
              "Golf (member of 3 private clubs)",
              "Fine art collection (contemporary)",
              "Vintage cars & motorsports",
              "Wine collecting",
              "Educational philanthropy",
              "Michelin-starred dining",
              "Skiing in Aspen & Gstaad",
              "Follows Patek Philippe & luxury watches"
            ]
        },
        {
          name: "Michael Chen",
          title: "VP of Engineering",
          company: "InnovateLabs",
          email: "m.chen@innovatelabs.io",
          accuracy: 88,
          reasons: [
            "15+ years of engineering leadership",
            "Built and scaled teams from 5 to 100+ engineers",
            "Deep expertise in cloud architecture",
            "Track record of successful product delivery"
          ],
          linkedin_url: "https://linkedin.com/in/michaelchen",
          profile_photo_url: "https://i.pravatar.cc/150?img=12",
          location: "New York, NY",
          linkedin_profile: {
            summary: "Engineering leader passionate about building high-performing teams and scalable systems. Specializing in cloud-native architectures and DevOps practices.",
            experience: [],
            education: []
          },
          behavioral_data: {
            behavioral_insight: "Michael shows exceptional leadership capabilities with consistent team growth and successful delivery of complex projects.",
            scores: {
              cmi: {
                score: 90,
                explanation: "Outstanding career trajectory with steady advancement to executive leadership roles and successful company exits."
              },
              rbfs: {
                score: 65,
                explanation: "Moderate job-seeking signals with some recent LinkedIn activity updates and profile optimizations."
              },
              ias: {
                score: 88,
                explanation: "High initiative demonstrated through multiple technical publications, open-source contributions, and thought leadership."
              }
            }
          }
        }
      ];
      
      const mockResponse: SearchResponse = {
        request_id: requestId,
        status: "completed",
        prompt: "High net worth executives looking for luxury homes in Greenwich, Connecticut",
        filters: {
          person_filters: {
            person_titles: ["CEO", "Chief Executive Officer", "Managing Partner"],
            include_similar_titles: true,
            person_seniorities: ["C-Suite", "Executive"],
            person_locations: ["Greenwich", "Connecticut", "New York"]
          },
          organization_filters: {
            q_organization_keyword_tags: ["finance", "private equity", "wealth management"]
          },
          reasoning: "Filtered for C-suite executives in finance with Greenwich area connections and luxury real estate purchase indicators"
        },
        candidates: mockCandidates,
        estimated_count: 2,
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      };
      
      return mockResponse;
    }
    
    return new Promise((resolve, reject) => {
      let pollCount = 0;
      const maxPolls = 60; // Maximum 2 minutes of polling (60 * 2 seconds)
      
      const poll = async () => {
        try {
          pollCount++;
          
          if (pollCount > maxPolls) {
            reject(new Error('Search timeout - please try again'));
            return;
          }
          
          const result = await getSearchResult(requestId);
          
          if (result.status === 'completed') {
            resolve(result);
          } else if (result.status === 'failed') {
            reject(new Error(result.error || 'Search failed'));
          } else {
            // Still processing, poll again in 2 seconds
            setTimeout(poll, 2000);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  };

  return { createSearch, getSearchResult, pollSearchResult, isLoading, error };
};