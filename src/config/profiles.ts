import { Profile } from '@/types/profile';

export const profiles: Record<string, Profile> = {
  oordonhas: {
    id: 'oordonhas',
    name: 'Phelipi Ordonhas',
    username: '@oordonhas',
    bio: 'Conteúdo sobre fitness, suplementação e estilo de vida saudável 💪',
    avatar: '/assets/rezende-profile.png',
    coverImage: '/assets/header.png',
    sectionTitle: 'Suplementação',
    couponCode: 'PH',
    contactLink: 'https://api.whatsapp.com/send?phone=5519998521915&text=Olá,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site.',
    theme: {
      primaryColor: '#FF6B00',
      secondaryColor: '#FF8C00',
      backgroundColor: '#0A0A0A',
      textColor: '#FFFFFF',
      buttonStyle: 'rounded',
    },
    socialLinks: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/oordonhas',
        icon: '/assets/icons/instagram.svg',
        color: '#E4405F',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/@oordonhas',
        icon: '/assets/icons/youtube.svg',
        color: '#FF0000',
      },
      {
        name: 'TikTok',
        url: 'https://tiktok.com/@oordonhas',
        icon: '/assets/icons/titkok.svg',
        color: '#000000',
      },
      {
        name: 'Spotify',
        url: 'https://spotify.com/oordonhas',
        icon: '/assets/icons/spotify.svg',
        color: '#1DB954',
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/5511999999999',
        icon: '/assets/icons/whatsapp.svg',
        color: '#25D366',
      },
    ],
    links: [
      {
        id: '1',
        title: 'Creatina',
        url: 'https://www.gsuplementos.com.br/creatina-100g-creapure-growth-supplements-p985927',
        icon: '/assets/creatina.png',
      },
      {
        id: '2',
        title: 'Whey',
        url: 'https://www.gsuplementos.com.br/bebida-lactea-uht-de-proteinas-growth-supplements',
        icon: '/assets/whey.png',
      },
      {
        id: '3',
        title: 'Glutamina',
        url: 'https://www.gsuplementos.com.br/l-glutamina-250g-growth-supplements-p985843',
        icon: '/assets/glutanima.png',
      },
      {
        id: '4',
        title: 'Arginina',
        url: 'https://www.gsuplementos.com.br/power-arginine-120caps-growth-supplements-p985923',
        icon: '/assets/arginine.png',
      },
      {
        id: '5',
        title: 'BCAA',
        url: 'https://www.gsuplementos.com.br/bcaa-1011-120-comprimidos-growth-supplements',
        icon: '/assets/bcaa.png',
      },
    ],
  },
  lucasmendes: {
    id: 'lucasmendes',
    name: 'Lucas Mendes',
    username: '@lucasmendes',
    bio: 'Desenvolvedor Full Stack | Tech Content Creator 🚀',
    avatar: '/assets/lucas-perfil.png',
    coverImage: '/assets/card-1.jpeg',
    sectionTitle: 'Serviços',
    couponCode: 'LUCAS',
    contactLink: 'https://api.whatsapp.com/send?phone=5519998521915&text=Olá,%20vim%20pelo%20Lucas%20e%20tenho%20interesse%20em%20criar%20um%20site.',
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#60A5FA',
      backgroundColor: '#000000',
      textColor: '#F9FAFB',
      buttonStyle: 'pill',
    },
    socialLinks: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/lucasmendes',
        icon: '/assets/icons/instagram.svg',
        color: '#E4405F',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/@lucasmendes',
        icon: '/assets/icons/youtube.svg',
        color: '#FF0000',
      },
      {
        name: 'TikTok',
        url: 'https://tiktok.com/@lucasmendes',
        icon: '/assets/icons/titkok.svg',
        color: '#000000',
      },
    ],
    links: [
      {
        id: '1',
        title: 'Portfólio',
        url: 'https://example.com/portfolio',
        icon: '/assets/whey.png',
      },
      {
        id: '2',
        title: 'Curso React',
        url: 'https://example.com/curso-react',
        icon: '/assets/creatina.png',
      },
      {
        id: '3',
        title: 'Mentoria 1:1',
        url: 'https://example.com/mentoria',
        icon: '/assets/glutanima.png',
      },
    ],
  },
  mariasantos: {
    id: 'mariasantos',
    name: 'Maria Santos',
    username: '@mariasantos',
    bio: 'Nutricionista | Receitas Saudáveis | Vida Equilibrada 🥗',
    avatar: '/assets/note-perfil.png',
    coverImage: '/assets/card-2.jpeg',
    sectionTitle: 'Consultas',
    couponCode: 'MARIA',
    contactLink: 'https://api.whatsapp.com/send?phone=5511999999999&text=Olá,%20vim%20pelo%20Maria%20e%20tenho%20interesse%20em%20uma%20consulta.',
    theme: {
      primaryColor: '#10B981',
      secondaryColor: '#34D399',
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
      buttonStyle: 'rounded',
    },
    socialLinks: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/mariasantos',
        icon: '/assets/icons/instagram.svg',
        color: '#E4405F',
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/5511888888888',
        icon: '/assets/icons/whatsapp.svg',
        color: '#25D366',
      },
    ],
    links: [
      {
        id: '1',
        title: 'Consulta Online',
        url: 'https://example.com/consulta',
        icon: '/assets/whey.png',
      },
      {
        id: '2',
        title: 'E-book Receitas',
        url: 'https://example.com/ebook',
        icon: '/assets/creatina.png',
      },
      {
        id: '3',
        title: 'Plano Alimentar',
        url: 'https://example.com/plano',
        icon: '/assets/glutanima.png',
      },
    ],
  },
  pedrosilva: {
    id: 'pedrosilva',
    name: 'Pedro Silva',
    username: '@pedrosilva',
    bio: 'Coach de Negócios | Empreendedorismo Digital 💼',
    avatar: '/assets/perfil-instagram.png',
    coverImage: '/assets/card-3.png',
    sectionTitle: 'Mentoria',
    couponCode: 'PEDRO',
    contactLink: 'https://api.whatsapp.com/send?phone=5511888888888&text=Olá,%20vim%20pelo%20Pedro%20e%20tenho%20interesse%20em%20mentoria.',
    theme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#A78BFA',
      backgroundColor: '#000000',
      textColor: '#F5F3FF',
      buttonStyle: 'square',
    },
    socialLinks: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/pedrosilva',
        icon: '/assets/icons/instagram.svg',
        color: '#E4405F',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/@pedrosilva',
        icon: '/assets/icons/youtube.svg',
        color: '#FF0000',
      },
    ],
    links: [
      {
        id: '1',
        title: 'Mentoria Empresarial',
        url: 'https://example.com/mentoria-empresarial',
        icon: '/assets/whey.png',
      },
      {
        id: '2',
        title: 'Livro Best-seller',
        url: 'https://example.com/livro',
        icon: '/assets/creatina.png',
      },
      {
        id: '3',
        title: 'Workshop Gratuito',
        url: 'https://example.com/workshop',
        icon: '/assets/glutanima.png',
      },
    ],
  },
  anacostafit: {
    id: 'anacostafit',
    name: 'Ana Costa Fit',
    username: '@anacostafit',
    bio: 'Personal Trainer | Transformação Corporal | Motivação 🏋️‍♀️',
    avatar: '/assets/lucas-perfil.png',
    coverImage: '/assets/card-4.png',
    sectionTitle: 'Treinos',
    couponCode: 'ANA',
    contactLink: 'https://api.whatsapp.com/send?phone=5511777777777&text=Olá,%20vim%20pelo%20Ana%20e%20tenho%20interesse%20em%20treino.',
    theme: {
      primaryColor: '#EC4899',
      secondaryColor: '#F472B6',
      backgroundColor: '#000000',
      textColor: '#FAFAFA',
      buttonStyle: 'pill',
    },
    socialLinks: [
      {
        name: 'Instagram',
        url: 'https://instagram.com/anacostafit',
        icon: '/assets/icons/instagram.svg',
        color: '#E4405F',
      },
      {
        name: 'TikTok',
        url: 'https://tiktok.com/@anacostafit',
        icon: '/assets/icons/titkok.svg',
        color: '#000000',
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/5511777777777',
        icon: '/assets/icons/whatsapp.svg',
        color: '#25D366',
      },
    ],
    links: [
      {
        id: '1',
        title: 'Treino em Casa',
        url: 'https://example.com/treino-casa',
        icon: '/assets/whey.png',
      },
      {
        id: '2',
        title: 'Consultoria Online',
        url: 'https://example.com/consultoria',
        icon: '/assets/creatina.png',
      },
      {
        id: '3',
        title: 'App Exclusivo',
        url: 'https://example.com/app',
        icon: '/assets/glutanima.png',
      },
    ],
  },
};

export const getProfile = (profileId: string): Profile | null => {
  return profiles[profileId] || null;
};

export const getAllProfileIds = (): string[] => {
  return Object.keys(profiles);
};

