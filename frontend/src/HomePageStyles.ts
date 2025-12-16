import styled from 'styled-components';

// --- Paleta de Cores da Imagem 02 ---
const theme = {
  bgPage: '#f4f7fe',        // Fundo da página
  bgCard: '#ffffff',        // Fundo dos painéis
  textTitle: '#2b3674',     // Azul escuro para títulos
  textBody: '#a3aed0',      // Cinza para textos secundários
  accent: '#4318ff',        // Azul vibrante para o botão
  chartPlaceholder: '#f8f9fc', // Fundo cinza claro para a área do gráfico
  shadow: '0px 18px 40px rgba(112, 144, 176, 0.12)', // Sombra suave
  borderRadius: '24px',     // Bordas bem arredondadas
};

// --- Estrutura Principal ---

// Container que cobre a tela toda e centraliza o conteúdo
export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.bgPage};
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
`;

// O Grid que divide a tela em duas colunas (esquerda menor, direita maior)
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

// --- Componentes de UI Genéricos ---

// O "Cartão" branco base
export const Card = styled.div`
  background-color: ${theme.bgCard};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadow};
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h2`
  color: ${theme.textTitle};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

export const CardText = styled.p`
  color: ${theme.textBody};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 24px 0;
`;

// --- Elementos da Coluna Esquerda ---

// Placeholder para a ilustração/imagem
export const IllustrationContainer = styled.div`
  width: 100%;
  height: 250px; /* Altura fixa para o exemplo */
  background-color: ${theme.bgPage}; /* Cor de fundo temporária */
  border-radius: 16px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.textBody};
  font-weight: 500;
  
  // Quando você tiver a imagem real, use assim:
  // background-image: url('/caminho/da/sua/imagem.svg');
  // background-size: contain;
  // background-repeat: no-repeat;
  // background-position: center;
`;

// O botão de ação
export const ActionButton = styled.button`
  background-color: ${theme.accent};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%; // Ocupa toda a largura do card
  transition: all 0.2s ease;

  &:hover {
    background-color: #3311db; // Cor um pouco mais escura no hover
    transform: translateY(-2px); // Leve efeito de subida
  }
`;

// --- Elementos da Coluna Direita ---

// A área vazia onde o gráfico entrará depois
export const ChartPlaceholderBox = styled.div`
  flex: 1; // Ocupa todo o espaço vertical restante no card
  min-height: 400px; // Garante uma altura mínima
  background-color: ${theme.chartPlaceholder};
  border-radius: 16px;
  /* Borda tracejada para indicar que é um espaço vazio */
  border: 2px dashed ${theme.textBody}40; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.textBody};
  font-weight: 500;
`;
