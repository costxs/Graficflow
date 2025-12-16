import React, { useState } from 'react';
import {
    PageContainer,
    MainGrid,
    Card,
    CardTitle,
    ChartPlaceholderBox,
    LeftColumn,
    RightColumn
} from './HomePageStyles';
import type { ChartDataItem } from './types';
import DataPreviewModal from './components/DataPreviewModal';
import QuickStartBanner from './QuickStartBanner';

interface HomePageProps {
    onDataImported: (data: ChartDataItem[]) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onDataImported }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewData, setPreviewData] = useState<ChartDataItem[]>([]);

    const handleExcelDataLoaded = (data: ChartDataItem[]) => {
        setPreviewData(data);
        setIsModalOpen(true);
    };

    const handleBlankClick = () => {
        // For now, just navigate with empty data or handle as needed
        console.log("Blank chart clicked");
        onDataImported([]);
    };

    return (
        <PageContainer>
            <MainGrid>
                <QuickStartBanner
                    onExcelDataLoaded={handleExcelDataLoaded}
                    onBlankClick={handleBlankClick}
                />
            </MainGrid>

            <DataPreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={previewData}
                onConfirm={(finalData) => {
                    setIsModalOpen(false);
                    onDataImported(finalData);
                }}
            />
        </PageContainer>
    );
};

export default HomePage;
