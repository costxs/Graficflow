import React, { useState, useRef } from 'react';
import {
    GlobalStyle as DashboardGlobalStyle,
    DashboardGrid,
    Card,
    CardTitle,
    FormGroup,
    Label,
    StyledInput,
    PrimaryButton,
    ChartPlaceholder,
    ChartSourceText
} from './DashboardStyles';
import type { ChartDataItem } from './types';
import ChartComponent from './components/ChartComponent';
import AppHeader from './components/AppHeader';
import styled from 'styled-components';
import { Chart as ChartJS } from 'chart.js';

// Estilo para o corpo da página ABAIXO do header
const PageContentContainer = styled.div`
  background-color: #F4F7FE; // Fundo cinza claro da página
  min-height: calc(100vh - 80px); // Altura total MENOS a altura do header
  padding: 40px;
  display: flex;
  justify-content: center;
`;

// Wrapper para limitar a largura do conteúdo central
const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;

interface ResultPageProps {
    initialData: ChartDataItem[];
    onBackToHome: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ initialData, onBackToHome }) => {
    const [chartTitle, setChartTitle] = useState('Vendas por Categoria');
    const [chartSubtitle, setChartSubtitle] = useState('Ano de 2024');
    const [sourceText, setSourceText] = useState("Fonte: Dados fornecidos pelo usuário.");
    const [slices, setSlices] = useState<ChartDataItem[]>(initialData);
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const chartRef = useRef<ChartJS>(null);

    // Funções de manipulação de dados
    const addSlice = () => {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        setSlices([...slices, { id: crypto.randomUUID(), label: 'Nova Fatia', value: 100, color: colors[slices.length % colors.length] }]);
    };

    const updateSlice = (id: string, field: keyof ChartDataItem, value: string | number) => {
        setSlices(slices.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const removeSlice = (id: string) => {
        if (slices.length > 1) setSlices(slices.filter(s => s.id !== id));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const payload = {
                title: chartTitle,
                subtitle: chartSubtitle,
                slices: slices.map(s => ({
                    label: s.label,
                    value: Number(s.value),
                    color: s.color
                }))
            };
            const response = await fetch('http://localhost:8000/generate-chart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Falha ao gerar gráfico');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data.image_base64) {
                setGeneratedImage(data.image_base64);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao conectar com Python.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = 'grafico.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const downloadChartPNG = () => {
        if (chartRef.current) {
            const titleUrl = chartRef.current.toBase64Image('image/png', 1.0);
            const link = document.createElement('a');
            link.download = 'meu-grafico-exato.png';
            link.href = titleUrl;
            link.click();
            link.remove();
        } else {
            console.error("O gráfico ainda não está pronto para download.");
        }
    };

    return (
        <>
            <DashboardGlobalStyle />
            <AppHeader onHomeClick={onBackToHome} />

            <PageContentContainer>
                <ContentWrapper>
                    <DashboardGrid>

                        {/* --- Coluna 1: Configurações --- */}
                        <Card>
                            <CardTitle>Configurações</CardTitle>

                            <FormGroup>
                                <Label>Título do Gráfico</Label>
                                <StyledInput
                                    type="text"
                                    value={chartTitle}
                                    onChange={(e) => setChartTitle(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Subtítulo</Label>
                                <StyledInput
                                    type="text"
                                    value={chartSubtitle}
                                    onChange={(e) => setChartSubtitle(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Fonte do Gráfico</Label>
                                <StyledInput
                                    type="text"
                                    value={sourceText}
                                    onChange={(e) => setSourceText(e.target.value)}
                                    placeholder="Digite a fonte dos dados..."
                                />
                            </FormGroup>

                            <div style={{ marginTop: '16px' }}>
                                <Label style={{ display: 'block', marginBottom: '8px' }}>Fatias do Gráfico</Label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {slices.map((slice) => (
                                        <div key={slice.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <StyledInput
                                                type="text"
                                                value={slice.label}
                                                onChange={(e) => updateSlice(slice.id, 'label', e.target.value)}
                                                placeholder="Rótulo"
                                                style={{ flex: 2 }}
                                            />
                                            <StyledInput
                                                type="number"
                                                value={slice.value}
                                                onChange={(e) => updateSlice(slice.id, 'value', Number(e.target.value))}
                                                placeholder="Valor"
                                                style={{ flex: 1 }}
                                            />
                                            <input
                                                type="color"
                                                value={slice.color}
                                                onChange={(e) => updateSlice(slice.id, 'color', e.target.value)}
                                                style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            />
                                            <button
                                                onClick={() => removeSlice(slice.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addSlice}
                                    style={{
                                        marginTop: '12px',
                                        background: 'transparent',
                                        border: '1px dashed #a3aed0',
                                        color: '#a3aed0',
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    + Adicionar Fatia
                                </button>
                            </div>

                            <PrimaryButton onClick={handleGenerate} disabled={isLoading}>
                                {isLoading ? 'Gerando...' : 'Gerar Gráfico'}
                            </PrimaryButton>
                        </Card>

                        {/* --- Coluna 2: Visualização Principal --- */}
                        <Card style={{ minHeight: '600px' }}>
                            <CardTitle>Visualização</CardTitle>

                            <ChartPlaceholder style={{ flexDirection: 'column' }}>
                                <ChartComponent ref={chartRef} data={slices} title={chartTitle} />
                                <ChartSourceText>
                                    {sourceText}
                                </ChartSourceText>
                            </ChartPlaceholder>
                        </Card>

                        {/* --- Coluna 3: Dados/Detalhes --- */}
                        <Card>
                            <CardTitle>Detalhes</CardTitle>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {slices.map((slice) => (
                                    <div key={slice.id} style={{
                                        padding: '16px',
                                        background: '#f8f9fc',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: slice.color }}></div>
                                            <span style={{ color: '#2b3674', fontWeight: 600 }}>{slice.label}</span>
                                        </div>
                                        <span style={{ color: '#a3aed0', fontWeight: 500 }}>{slice.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                <PrimaryButton onClick={downloadChartPNG} style={{ backgroundColor: '#4318FF' }}>
                                    Baixar PNG Exato
                                </PrimaryButton>
                            </div>
                        </Card>

                    </DashboardGrid>
                </ContentWrapper>
            </PageContentContainer>
        </>
    );
};

export default ResultPage;
