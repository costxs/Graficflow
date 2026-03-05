import React, { useRef } from 'react';
import { FiFileText, FiBarChart2, FiZap } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import type { ChartDataItem, ExcelRawRow } from './types';
import { getColorByIndex } from './types'; // Import color utility

import {
    QuickStartCard,
    HeroSection,
    TransparentOverlayBox,
    HeroTitle,
    LogoContainer,
    LogoIconWrapper,
    SiteName,
    ActionsContainer,
    SectionTitle,
    ActionGrid,
    ActionCardButton,
    IconWrapper,
    ButtonTextContainer,
    ButtonTitle,
    ButtonDescription
} from './QuickStartStyles';

interface QuickStartBannerProps {
    siteName?: string;
    onExcelDataLoaded?: (data: ChartDataItem[]) => void;
    onBlankClick?: () => void;
}

const QuickStartBanner: React.FC<QuickStartBannerProps> = ({
    siteName = "GraficFlow",
    onExcelDataLoaded,
    onBlankClick
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExcelButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryString = event.target?.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rawData: ExcelRawRow[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const processedData: ChartDataItem[] = rawData.slice(1)
                .filter(row => row[0] != null && row[1] != null)
                .map((row, index) => ({
                    id: uuidv4(),
                    label: String(row[0]),
                    value: Number(row[1]) || 0,
                    color: getColorByIndex(index) // Add color generation
                }));

            if (processedData.length > 0) {
                console.log("Dados do Excel lidos com sucesso:", processedData);
                if (onExcelDataLoaded) {
                    onExcelDataLoaded(processedData);
                }
            } else {
                alert("Não foi possível ler dados válidos. Verifique se a planilha tem duas colunas (Categoria e Valor) e não está vazia.");
            }

            if (fileInputRef.current) fileInputRef.current.value = '';
        };

        reader.readAsBinaryString(file);
    };

    return (
        <QuickStartCard>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                style={{ display: 'none' }}
            />

            <HeroSection>
                <LogoContainer>
                    <LogoIconWrapper>
                        <FiZap />
                    </LogoIconWrapper>
                    <SiteName>{siteName}</SiteName>
                </LogoContainer>

                <TransparentOverlayBox>
                    <HeroTitle>
                        Visualize seus gráficos em segundos.
                    </HeroTitle>
                </TransparentOverlayBox>
            </HeroSection>

            <ActionsContainer>
                <SectionTitle>Iniciar rapidamente</SectionTitle>
                <ActionGrid>
                    <ActionCardButton onClick={handleExcelButtonClick}>
                        <IconWrapper>
                            <FiFileText />
                        </IconWrapper>
                        <ButtonTextContainer>
                            <ButtonTitle>Por planilha do Excel</ButtonTitle>
                            <ButtonDescription>Importe .xlsx ou .csv</ButtonDescription>
                        </ButtonTextContainer>
                    </ActionCardButton>

                    <ActionCardButton onClick={onBlankClick}>
                        <IconWrapper style={{ color: '#05CD99' }}>
                            <FiBarChart2 />
                        </IconWrapper>
                        <ButtonTextContainer>
                            <ButtonTitle>Criar gráfico em branco</ButtonTitle>
                            <ButtonDescription>Comece do zero</ButtonDescription>
                        </ButtonTextContainer>
                    </ActionCardButton>
                </ActionGrid>
            </ActionsContainer>
        </QuickStartCard>
    );
};

export default QuickStartBanner;
