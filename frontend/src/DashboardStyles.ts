import styled, { createGlobalStyle } from 'styled-components';

// 1. Definindo a paleta de cores e variáveis baseadas na Imagem 02
const theme = {
  bgBody: '#f4f7fe',       // O fundo cinza-azulado claro
  bgCard: '#ffffff',       // O branco dos cartões
  textPrimary: '#2b3674',  // Azul marinho escuro para títulos
  textSecondary: '#a3aed0',// Cinza azulado para rótulos
  primaryAccent: '#4318ff',// Azul vibrante para botões
  inputBg: '#f8f9fc',      // Fundo bem claro para inputs
  borderRadius: '16px',    // Bordas bem arredondadas
  shadow: '0px 18px 40px rgba(112, 144, 176, 0.12)', // Sombra suave
};

// 2. Estilos Globais (Reset básico e fonte)
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.bgBody};
    /* Importante: Use uma fonte moderna como Inter, Roboto ou Open Sans */
    font-family: 'Inter', sans-serif; 
    color: ${theme.textPrimary};
  }
  * { box-sizing: border-box; }
`;

// --- Componentes de Layout ---

// O container principal que segura as 3 colunas
export const DashboardGrid = styled.div`
  display: grid;
  /* Define as larguras: laterais fixas, meio flexível */
  grid-template-columns: 320px 1fr;
  gap: 24px; /* Espaço generoso entre os cartões */
  padding: 24px;
  align-items: start;
  min-height: 100vh;

  /* Responsividade para telas menores */
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// O "Card" moderno: a base de tudo
export const Card = styled.div`
  background-color: ${theme.bgCard};
  border-radius: ${theme.borderRadius};
  padding: 24px;
  box-shadow: ${theme.shadow};
  /* Removemos as bordas sólidas da sua imagem 01 */
  border: none; 
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento interno entre elementos do card */
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: ${theme.textPrimary};
`;

// --- Componentes de Formulário (Para a coluna da esquerda) ---

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.textSecondary};
`;

// Estilo base para Inputs e Selects
const BaseInputStyles = `
  width: 100%;
  padding: 16px;
  background-color: ${theme.inputBg};
  border: none;
  border-radius: 12px;
  color: ${theme.textPrimary};
  font-size: 0.9rem;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px ${theme.primaryAccent}33; // Sombra azul suave no foco
  }
`;

export const StyledInput = styled.input`
  ${BaseInputStyles}
`;

export const StyledSelect = styled.select`
  ${BaseInputStyles}
  cursor: pointer;
  /* Hack para remover a seta padrão feia em alguns browsers (opcional) */
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A3AED0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-13%205.4A17.6%2017.6%200%200%200%200%2087.2c0%205%201.8%209.3%205.4%2013l128%20128c3.6%203.6%207.8%205.4%2013%205.4s9.3-1.8%2013-5.4l128-128c3.6-3.6%205.4-7.8%205.4-13%200-5-1.8-9.3-5.4-13z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.75rem auto;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${theme.primaryAccent};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 12px;

  &:hover {
    background-color: #3311db; // Um tom um pouco mais escuro no hover
  }
`;

// --- Placeholder para a área do gráfico ---
export const ChartPlaceholder = styled.div`
  flex: 1; /* Ocupa todo o espaço disponível no card */
  min-height: 400px;
  background-color: ${theme.inputBg};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.textSecondary};
  font-weight: 500;
  position: relative;
  /* overflow: hidden; -> Removed to allow full legend visibility */
`;

export const ChartSourceText = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
  color: #666;
`;
