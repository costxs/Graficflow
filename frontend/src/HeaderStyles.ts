import styled from 'styled-components';

// --- Variáveis do tema (para consistência) ---
const theme = {
  white: '#FFFFFF',
  darkBlue: '#2B3674',   // Cor do texto do nome e botão
  vibrantBlue: '#4318FF', // Cor da logo
  bgBody: '#F4F7FE',     // Fundo da página para contraste
  shadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', // Sombra suave
};

// A barra de cabeçalho principal
export const HeaderBar = styled.header`
  width: 100%;
  height: 80px; // Altura fixa para o cabeçalho
  background-color: ${theme.white};
  display: flex;
  justify-content: space-between; // Separa logo (esquerda) e botão (direita)
  align-items: center;
  padding: 0 40px; // Espaçamento lateral
  box-shadow: ${theme.shadow};
  position: sticky; // (Opcional) Mantém o header fixo no topo ao rolar
  top: 0;
  z-index: 100; // Garante que fique acima de outros elementos

  @media (max-width: 768px) {
    padding: 0 20px; // Menos padding em telas menores
    height: 70px;
  }
`;

// --- Área da Esquerda (Logo + Nome) ---
export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; // Espaço entre ícone e texto
  cursor: pointer; // Indica que pode ser clicado (opcional, se quiser que a logo também vá para home)
`;

// Ícone da logo
export const LogoIconWrapper = styled.div`
  color: ${theme.vibrantBlue};
  font-size: 1.8rem; // Tamanho do ícone
  display: flex;
  align-items: center;
  background-color: ${theme.white};
  border-radius: 8px;
  padding: 4px;
`;

// Nome do site
export const SiteNameText = styled.h1`
  color: ${theme.darkBlue};
  font-size: 1.5rem; // ~24px
  font-weight: 800; // Extra negrito
  margin: 0;
  letter-spacing: -0.02em;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.25rem; // Um pouco menor no mobile
  }
`;

// --- Área da Direita (Botão Home) ---
// Botão estilo "fantasma" ou "outline" para não competir com a ação principal da tela
export const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px; // Espaço entre ícone e texto do botão
  
  background-color: transparent; // Fundo transparente
  color: ${theme.darkBlue}; // Cor do texto
  border: 2px solid ${theme.darkBlue}20; // Borda sutil (20% opacidade)
  border-radius: 12px;
  
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  // Ícone dentro do botão
  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${theme.darkBlue}10; // Fundo leve no hover
    border-color: ${theme.darkBlue}; // Borda fica sólida
  }

  &:active {
    transform: translateY(1px); // Efeito de clique
  }

  // Em telas muito pequenas, esconde o texto "Home" e deixa só o ícone
  @media (max-width: 480px) {
    span { display: none; }
    padding: 10px; // Botão quadrado só com ícone
  }
`;
