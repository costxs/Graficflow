import styled from 'styled-components';

// --- Variáveis do tema ---
const theme = {
  white: '#FFFFFF',
  darkBlue: '#2B3674',
  vibrantBlue: '#4318FF',
  lightGrayBg: '#F8F9FC',
  softShadow: '0px 20px 50px rgba(112, 144, 176, 0.12)',
  borderRadius: '30px',
  // Cor transparente para o retângulo sobre a imagem
  transparentOverlay: 'rgba(43, 54, 116, 0.85)', // Azul escuro com 85% de opacidade
};

// O container principal do componente (cartão branco base)
export const QuickStartCard = styled.div`
  background-color: ${theme.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.softShadow};
  overflow: hidden;
  width: 100%;
  margin-bottom: 40px;
`;

// --- NOVA Seção "Hero" com Imagem e Transparência ---

// O container que segura a imagem de fundo
export const HeroSection = styled.div`
  position: relative;
  height: 300px; // Altura fixa para o banner
  // Substitua a URL abaixo pela sua imagem real de gráfico
  background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center; // Centraliza o retângulo transparente verticalmente
  align-items: center; // Centraliza horizontalmente
  padding: 30px;
`;

// O retângulo transparente que contém o texto
export const TransparentOverlayBox = styled.div`
  background-color: ${theme.transparentOverlay};
  // Efeito de desfoque no fundo (backdrop-filter) para um visual "vidro" moderno
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); // Suporte para Safari
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); // Sombra suave no vidro
  border: 1px solid rgba(255, 255, 255, 0.18); // Borda sutil
`;

export const HeroTitle = styled.h1`
  color: ${theme.white};
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2); // Sombra no texto para melhor leitura

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// --- Área da Logo e Nome do Site ---
export const LogoContainer = styled.div`
  position: absolute; // Posicionamento absoluto no canto superior esquerdo
  top: 30px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2; // Garante que fique sobre a imagem
`;

export const LogoIconWrapper = styled.div`
  background-color: ${theme.white};
  color: ${theme.vibrantBlue};
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const SiteName = styled.span`
  color: ${theme.white};
  font-size: 1.25rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;


// --- Parte Inferior: Seção de Ações (Mantida do anterior) ---
export const ActionsContainer = styled.div`
  padding: 32px 40px 40px 40px;
  @media (max-width: 768px) { padding: 24px; }
`;

export const SectionTitle = styled.h2`
  color: ${theme.darkBlue};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const ActionCardButton = styled.button`
  background-color: ${theme.lightGrayBg};
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 24px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 20px;
  &:hover {
    background-color: ${theme.white};
    border-color: ${theme.vibrantBlue};
    box-shadow: 0 10px 25px rgba(67, 24, 255, 0.1);
    transform: translateY(-3px);
  }
  &:active { transform: translateY(-1px); }
`;

export const IconWrapper = styled.div`
  background-color: ${theme.white};
  color: ${theme.vibrantBlue};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  flex-shrink: 0;
`;

export const ButtonTextContainer = styled.div` display: flex; flexDirection: column; `;
export const ButtonTitle = styled.span` color: ${theme.darkBlue}; font-size: 1.1rem; font-weight: 700; display: block; margin-bottom: 4px; `;
export const ButtonDescription = styled.span` color: #A3AED0; font-size: 0.9rem; font-weight: 500; `;
