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


import html2canvas from 'html2canvas';

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


    const [isLoading, setIsLoading] = useState(false);

    const chartWrapperRef = useRef<HTMLDivElement>(null); // Ref genérico (não usado mais para download direto)
    const chartOnlyRef = useRef<HTMLDivElement>(null);
    const legendOnlyRef = useRef<HTMLDivElement>(null);

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
        // Simulating generation/validation delay if needed, or just immediate generic success
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const downloadElementAsPNG = async (elementRef: React.RefObject<HTMLDivElement | null>, fileName: string) => {
        if (elementRef.current) {
            try {
                const canvas = await html2canvas(elementRef.current, {
                    scale: 2,
                    backgroundColor: null, // Transparente
                    logging: false
                });

                const image = canvas.toDataURL("image/png", 1.0);
                const link = document.createElement('a');
                link.download = fileName;
                link.href = image;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error(`Erro ao gerar imagem (${fileName}):`, error);
                alert("Não foi possível gerar a imagem.");
            }
        } else {
            console.error(`Elemento para ${fileName} não encontrado.`);
            alert(`Erro: Elemento para ${fileName} não encontrado.`);
        }
    };

    const downloadChartOnly = () => downloadElementAsPNG(chartOnlyRef, 'grafico_somente.png');
    const downloadLegendOnly = () => downloadElementAsPNG(legendOnlyRef, 'legenda_somente.png');

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

                            <div style={{ marginTop: '24px', borderTop: '1px solid #e0e0e0', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <PrimaryButton onClick={downloadChartOnly} style={{ backgroundColor: '#2B3674' }}>
                                    Baixar Gráfico
                                </PrimaryButton>
                                <PrimaryButton onClick={downloadLegendOnly} style={{ backgroundColor: '#2B3674' }}>
                                    Baixar Legenda
                                </PrimaryButton>
                            </div>
                        </Card>

                        {/* --- Coluna 2: Visualização Principal --- */}
                        <Card style={{ minHeight: '600px' }}>
                            <CardTitle>Visualização</CardTitle>

                            <ChartPlaceholder ref={chartWrapperRef} style={{ flexDirection: 'column' }}>
                                <ChartComponent
                                    data={slices}
                                    title={chartTitle}
                                    externalChartRef={chartOnlyRef}
                                    externalLegendRef={legendOnlyRef}
                                />
                                <ChartSourceText>
                                    {sourceText}
                                </ChartSourceText>
                            </ChartPlaceholder>
                        </Card>



                    </DashboardGrid>
                </ContentWrapper>
            </PageContentContainer>
        </>
    );
};

export default ResultPage;
