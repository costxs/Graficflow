import { forwardRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import type { ChartDataItem } from '../types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registre os componentes necessários (ArcElement é para Pie/Doughnut)
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

// --- Styled Components ---
export const ChartSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Wrapper Acadêmico para Gráficos
export const AcademicChartWrapper = styled.div`
  /* Define uma largura máxima razoável para uma figura de artigo (ex: meia coluna) */
  max-width: 100%;
  width: 100%;

  /* Define uma ALTURA FIXA. Isso é crucial para o gráfico de pizza não ficar gigante */
  height: 650px;

  /* Centraliza a figura na página ou container pai */
  margin: 20px auto;

  /* Necessário para o Chart.js se comportar bem no redimensionamento */
  position: relative;

  /* Opcional: uma borda sutil para delimitar a área da figura */
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #fff;
`;

interface ChartComponentProps {
    data: ChartDataItem[];
    title?: string;
    externalChartRef?: React.RefObject<HTMLDivElement | null>;
    externalLegendRef?: React.RefObject<HTMLDivElement | null>;
}

const ChartComponent = forwardRef<any, ChartComponentProps>(({ data, title, externalChartRef, externalLegendRef }, ref) => {

    // Preparar dados para o Chart.js
    const chartData = {
        labels: data.map(slice => slice.label),
        datasets: [
            {
                label: '# de Vendas', // Label do dataset (aparece no tooltip)
                data: data.map(slice => slice.value),
                backgroundColor: data.map(slice => slice.color),
                borderColor: data.map(() => '#ffffff'),
                borderWidth: 1, // Bordas mais finas
            },
        ],
    };

    // Desativar a legenda do Chart.js
    const academicOptions: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
            }
        },
        plugins: {
            legend: {
                display: false, // Desativa a legenda interna
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    family: "'Arial', sans-serif",
                }
            },
            tooltip: {
                bodyFont: { family: 'Arial, sans-serif' },
                titleFont: { family: 'Arial, sans-serif', weight: 'bold' }
            },
            datalabels: {
                color: '#FFFFFF',
                font: {
                    family: "'Arial', sans-serif",
                    weight: 'bold' as const,
                    size: 28,
                },
                formatter: (value: number, context: any) => {
                    const datapoints = context.chart.data.datasets[0].data as number[];
                    const total = datapoints.reduce((total, datapoint) => total + datapoint, 0);
                    const percentage = (value / total * 100).toFixed(1);
                    if (parseFloat(percentage) < 2) return '';
                    return `${percentage}%`;
                },
                anchor: 'center' as const,
                align: 'center' as const,
                textStrokeColor: 'rgba(0,0,0,0.3)',
                textStrokeWidth: 2,
            },
        },
        elements: {
            arc: {
                borderWidth: 1,
                borderColor: '#ffffff'
            }
        }
    };

    return (
        <ChartSectionContainer>
            {/* Container Flex para alinhar Gráfico e Legenda lado a lado */}
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>

                {/* 1. Área do Gráfico */}
                <AcademicChartWrapper ref={externalChartRef} style={{ flex: '1 1 300px', height: '400px', maxWidth: '500px' }}>
                    <Pie ref={ref} data={chartData} options={academicOptions} />
                </AcademicChartWrapper>

                {/* 2. Legenda HTML Personalizada */}
                <div ref={externalLegendRef} style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                    {data.map((slice, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: slice.color,
                                flexShrink: 0 // Impede a bolinha de amassar
                            }}></div>
                            <span style={{
                                fontSize: '16px',
                                color: '#333',
                                fontWeight: 500,
                                lineHeight: '1.4'
                            }}>
                                {slice.label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </ChartSectionContainer>
    );
});

ChartComponent.displayName = 'ChartComponent';

export default ChartComponent;
