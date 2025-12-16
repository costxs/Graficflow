import React from 'react';

interface DownloadPageProps {
    chartImage: string;
    onBack: () => void;
}

export default function DownloadPage({ chartImage, onBack }: DownloadPageProps) {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = chartImage;
        link.download = 'chart.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Seu Gráfico está Pronto!</h2>

                {chartImage && (
                    <div className="mb-8 border border-slate-200 rounded-lg p-2">
                        <img src={chartImage} alt="Gráfico Gerado" className="max-w-full h-auto mx-auto" />
                    </div>
                )}

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onBack}
                        className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">download</span>
                        Baixar PNG
                    </button>
                </div>
            </div>
        </div>
    );
}
