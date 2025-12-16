// Define a estrutura de uma única linha de dados para o gráfico
export interface ChartDataItem {
  id: string; // Identificador único
  label: string; // Categoria (Coluna A do Excel)
  value: number; // Valor/Frequência (Coluna B do Excel)
  color: string; // A cor hexadecimal para o gráfico
}

// Define o formato esperado das linhas cruas do Excel (array de arrays)
export type ExcelRawRow = [string | number | undefined, string | number | undefined];

// Uma paleta de cores iniciais agradáveis
const presetColors = [
  '#4318FF', '#00B8D9', '#36B37E', '#FFAB00', '#FF5630',
  '#6554C0', '#00A3BF', '#22A06B', '#FF991F', '#DE350B'
];

export const getColorByIndex = (index: number): string => {
  // Retorna uma cor da paleta baseada no índice, ciclando se necessário
  return presetColors[index % presetColors.length];
};
