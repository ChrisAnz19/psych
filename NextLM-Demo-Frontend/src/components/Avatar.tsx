import React from 'react';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  imageUrl, 
  size = 'md', 
  className = '' 
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Reset error state when imageUrl changes
  React.useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [imageUrl]);

  // Generate initials from name
  const getInitials = (fullName: string): string => {
    if (!fullName) return '?';
    
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Generate consistent color based on name
  const getBackgroundColor = (fullName: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-cyan-500',
      'bg-emerald-500'
    ];
    
    const hash = fullName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  // Check if image URL is valid and from allowed domains
  const isValidImageUrl = (url?: string): boolean => {
    if (!url) return false;
    
    try {
      const urlObj = new URL(url);
      const allowedDomains = [
        'licdn.com',           // LinkedIn CDN (covers media.licdn.com, cdn.licdn.com, etc.)
        'linkedin.com',        // LinkedIn main domain
        'avatars.githubusercontent.com', // GitHub avatars
        'lh3.googleusercontent.com',     // Google user content
        'gravatar.com',        // Gravatar
        'githubusercontent.com' // GitHub user content
      ];
      
      const isAllowed = allowedDomains.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      );
      
      // Debug logging for rejected URLs
      if (!isAllowed) {
        console.log('Avatar: Rejected image URL from domain:', urlObj.hostname, 'URL:', url);
      }
      
      return isAllowed;
    } catch (error) {
      console.log('Avatar: Invalid URL format:', url, error);
      return false;
    }
  };

  const shouldShowImage = imageUrl && isValidImageUrl(imageUrl) && !imageError;
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  return (
    <div className={`relative ${sizeClasses[size]} flex-shrink-0 ${className}`}>
      {shouldShowImage ? (
        <>
          <img
            src={imageUrl}
            alt={name}
            className={`w-full h-full rounded-full object-cover border-2 border-white/20 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-200`}
            onLoad={() => {
              console.log('Avatar: Image loaded successfully for', name, imageUrl);
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.log('Avatar: Image failed to load for', name, imageUrl, e);
              setImageError(true);
            }}
          />
          {/* Show initials while image is loading */}
          {!imageLoaded && (
            <div className={`absolute inset-0 ${bgColor} rounded-full flex items-center justify-center text-white font-semibold border-2 border-white/20`}>
              {initials}
            </div>
          )}
        </>
      ) : (
        <div className={`${bgColor} rounded-full flex items-center justify-center text-white font-semibold border-2 border-white/20 w-full h-full`}>
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;