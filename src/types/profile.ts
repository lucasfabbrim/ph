export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  coverImage?: string;
  sectionTitle?: string;
  couponCode?: string;
  contactLink?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    buttonStyle: 'rounded' | 'square' | 'pill';
  };
  socialLinks: SocialLink[];
  links: Link[];
}

