export interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

export interface ProductLink {
  id: string
  title: string
  url: string
  icon: string
}

export interface Profile {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
  coverImage: string
  sectionTitle: string
  couponCode: string
  contactLink: string
  socialLinks: SocialLink[]
  links: ProductLink[]
}