import styled from 'styled-components';

// --- Variáveis do tema ---
const theme = {
  white: '#FFFFFF',
  darkBlue: '#1B2559', // Deep blue for text
  secondaryText: '#A3AED0', // Grey for secondary text
  vibrantPurple: '#7551FF', // Primary purple accent
  lightGrayBg: '#F4F7FE', // Page/Section background
  softShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
  borderRadius: '20px',
  // Gradient for the specific "Visualize" card
  heroCardGradient: 'linear-gradient(135deg, #2B3674 0%, #30419e 100%)',
};

// O container principal do componente (cartão branco base)
export const QuickStartCard = styled.div`
  background-color: ${theme.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.softShadow};
  overflow: hidden;
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 20px;
`;

// --- NOVA Seção "Hero" com Imagem e Transparência ---

// O container que segura a imagem de fundo
export const HeroSection = styled.div`
  position: relative;
  height: 380px; // Taller hero section
  // Using a dark dashboard background image similar to the mockup
  background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  
  // Dark overlay on the background image itself to make it recede
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

// O retângulo central que contém o texto (Dark Blue Card)
export const TransparentOverlayBox = styled.div`
  position: relative;
  z-index: 2;
  background: ${theme.heroCardGradient};
  padding: 50px 80px;
  border-radius: 24px;
  text-align: center;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const HeroTitle = styled.h1`
  color: ${theme.white};
  font-size: 2.8rem;
  font-weight: 800; // Extra bold
  margin: 0;
  letter-spacing: -0.02em;
  font-family: 'DM Sans', sans-serif; // Assuming a modern sans-serif
`;

// --- Área da Logo e Nome do Site ---
export const LogoContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
`;

export const LogoIconWrapper = styled.div`
  background-color: ${theme.white};
  color: ${theme.vibrantPurple};
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const SiteName = styled.span`
  color: ${theme.white};
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
`;


// --- Parte Inferior: Seção de Ações ---
export const ActionsContainer = styled.div`
  padding: 40px 50px;
  @media (max-width: 768px) { padding: 24px; }
`;

export const SectionTitle = styled.h2`
  color: ${theme.darkBlue};
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 30px 0;
  letter-spacing: -0.02em;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const ActionCardButton = styled.button`
  background-color: ${theme.lightGrayBg}; // Light grey background for cards
  border: none;
  border-radius: 24px; // More rounded
  padding: 30px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 120px;

  &:hover {
    background-color: #ECEFF8;
    transform: translateY(-4px);
  }
`;

export const IconWrapper = styled.div`
  background-color: ${theme.white};
  color: ${theme.vibrantPurple}; // Default purple
  width: 64px;
  height: 64px;
  border-radius: 50%; // Circle
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  box-shadow: 0 8px 16px rgba(112, 144, 176, 0.08);
  flex-shrink: 0;
`;

export const ButtonTextContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 4px;
`;

export const ButtonTitle = styled.span` 
  color: ${theme.darkBlue}; 
  font-size: 1.2rem; 
  font-weight: 700; 
`;

export const ButtonDescription = styled.span` 
  color: ${theme.secondaryText}; 
  font-size: 0.95rem; 
  font-weight: 500; 
`;
