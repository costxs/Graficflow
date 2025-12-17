import { useState } from 'react';
import type { ChartDataItem } from '../types';

interface ChartEditorProps {
    slices: ChartDataItem[];
    setSlices: (slices: ChartDataItem[]) => void;
    chartTitle: string;
    setChartTitle: (t: string) => void;
    chartSubtitle: string;
    setChartSubtitle: (t: string) => void;
    onChartGenerated: (base64Image: string) => void;
}

export default function ChartEditor({
    slices, setSlices, chartTitle, setChartTitle, chartSubtitle, setChartSubtitle, onChartGenerated
}: ChartEditorProps) {

    const [activeSection, setActiveSection] = useState<string>('data'); // 'data', 'appearance', 'advanced'
    const [isLoading, setIsLoading] = useState(false);

    // Funções auxiliares (adicionar, remover, atualizar)
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
                onChartGenerated(data.image_base64);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao conectar com Python.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* --- ACCORDION 1: DADOS DO GRÁFICO --- */}
            <div className={`border rounded-xl bg-white transition-all duration-200 overflow-hidden ${activeSection === 'data' ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-200'}`}>

                <button
                    onClick={() => setActiveSection(activeSection === 'data' ? '' : 'data')}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-lg flex items-center justify-center ${activeSection === 'data' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                            <span className="material-symbols-outlined text-[20px]">table_chart</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Dados do Gráfico</span>
                    </div>
                    <span className={`material-symbols-outlined text-slate-400 transition-transform ${activeSection === 'data' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {activeSection === 'data' && (
                    <div className="p-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">

                        {/* Botão Importar Pontilhado */}
                        <button className="w-full mb-6 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-bold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex justify-center items-center gap-2 group">
                            <div className="bg-slate-200 p-1 rounded group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                            </div>
                            Importar CSV ou Excel
                        </button>

                        {/* Tabela de Inputs */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-6">Rótulo</div>
                                <div className="col-span-4">Valor</div>
                                <div className="col-span-2 text-center">Cor</div>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto">
                                {slices.map((slice) => (
                                    <div key={slice.id} className="grid grid-cols-12 border-b border-slate-100 px-2 py-2 items-center hover:bg-slate-50 transition-colors group">
                                        <div className="col-span-6 pr-2">
                                            <input
                                                type="text"
                                                value={slice.label}
                                                onChange={(e) => updateSlice(slice.id, 'label', e.target.value)}
                                                className="w-full bg-transparent border-transparent rounded px-2 py-1.5 text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                        <div className="col-span-4 pr-2">
                                            <input
                                                type="number"
                                                value={slice.value}
                                                onChange={(e) => updateSlice(slice.id, 'value', Number(e.target.value))}
                                                className="w-full bg-transparent border-transparent rounded px-2 py-1.5 text-sm text-slate-700 font-mono focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center gap-1 relative">
                                            <input
                                                type="color"
                                                value={slice.color}
                                                onChange={(e) => updateSlice(slice.id, 'color', e.target.value)}
                                                className="size-7 rounded cursor-pointer border-0 p-0 overflow-hidden shadow-sm"
                                            />
                                            <button
                                                onClick={() => removeSlice(slice.id)}
                                                className="absolute -right-6 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 group-hover:right-[-20px]"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={addSlice}
                            className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-1 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Adicionar Fatia
                        </button>
                    </div>
                )}
            </div>

            {/* --- ACCORDION 2: APARÊNCIA --- */}
            <div className={`border rounded-xl bg-white transition-all duration-200 overflow-hidden ${activeSection === 'appearance' ? 'border-purple-200 ring-4 ring-purple-50' : 'border-slate-200'}`}>
                <button
                    onClick={() => setActiveSection(activeSection === 'appearance' ? '' : 'appearance')}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">palette</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Aparência & Títulos</span>
                    </div>
                    <span className={`material-symbols-outlined text-slate-400 transition-transform ${activeSection === 'appearance' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {activeSection === 'appearance' && (
                    <div className="p-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Título Principal</label>
                            <input
                                type="text"
                                value={chartTitle}
                                onChange={(e) => setChartTitle(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-200"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Subtítulo</label>
                            <input
                                type="text"
                                value={chartSubtitle}
                                onChange={(e) => setChartSubtitle(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-200"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* --- ACCORDION 3: OPÇÕES AVANÇADAS --- */}
            <div className={`border rounded-xl bg-white transition-all duration-200 overflow-hidden ${activeSection === 'advanced' ? 'border-orange-200 ring-4 ring-orange-50' : 'border-slate-200'}`}>
                <button
                    onClick={() => setActiveSection(activeSection === 'advanced' ? '' : 'advanced')}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">tune</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Opções Avançadas</span>
                    </div>
                    <span className={`material-symbols-outlined text-slate-400 transition-transform ${activeSection === 'advanced' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
            </div>

            {/* Botão Flutuante (Opcional, se quiser fixar em baixo) */}
            <div className="mt-6">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:scale-[1.01] transition-all flex justify-center items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                            Gerando...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                            Gerar Gráfico Final
                        </>
                    )}
                </button>
            </div>

        </div>
    );
}
