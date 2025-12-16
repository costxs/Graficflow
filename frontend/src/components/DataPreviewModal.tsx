import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { ChartDataItem } from '../types';
import { FiX, FiCheck } from 'react-icons/fi';

// --- Estilos do Modal (Pode mover para um arquivo separado depois) ---
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;
  backdrop-filter: blur(5px);
`;
const ModalContainer = styled.div`
  background: white; padding: 32px; border-radius: 24px; width: 90%; max-width: 600px; max-height: 80vh; display: flex; flexDirection: column; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
`;
const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
`;
const Title = styled.h2` margin: 0; color: #2B3674; `;
const CloseButton = styled.button` background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #A3AED0; `;
const TableContainer = styled.div` flex: 1; overflow-y: auto; margin-bottom: 24px; border: 1px solid #F4F7FE; border-radius: 12px; `;
const Table = styled.table` width: 100%; border-collapse: collapse; `;
const Th = styled.th` text-align: left; padding: 16px; background: #F8F9FC; color: #A3AED0; font-size: 0.9rem; position: sticky; top: 0; `;
const Td = styled.td` padding: 16px; border-bottom: 1px solid #F4F7FE; color: #2B3674; font-weight: 500; `;
const ColorInput = styled.input`
  width: 40px; height: 40px; border: none; border-radius: 8px; cursor: pointer; padding: 0; background: none;
  &::-webkit-color-swatch-wrapper { padding: 0; }
  &::-webkit-color-swatch { border: none; border-radius: 8px; }
`;
const ConfirmButton = styled.button`
  background-color: #4318FF; color: white; width: 100%; padding: 16px; border: none; border-radius: 16px; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 12px; transition: background 0.2s;
  &:hover { background-color: #3311db; }
`;

// --- Componente ---
interface DataPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: ChartDataItem[]) => void;
    initialData: ChartDataItem[];
}

const DataPreviewModal: React.FC<DataPreviewModalProps> = ({ isOpen, onClose, onConfirm, initialData }) => {
    const [localData, setLocalData] = useState<ChartDataItem[]>(initialData);

    // Atualiza o estado local quando novos dados chegam
    useEffect(() => {
        setLocalData(initialData);
    }, [initialData]);

    if (!isOpen) return null;

    const handleColorChange = (id: string, newColor: string) => {
        setLocalData(prev =>
            prev.map(item => item.id === id ? { ...item, color: newColor } : item)
        );
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <Title>Verificar Dados</Title>
                    <CloseButton onClick={onClose}><FiX /></CloseButton>
                </ModalHeader>

                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Categoria</Th>
                                <Th>Frequência</Th>
                                <Th>Cor</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {localData.map((item) => (
                                <tr key={item.id}>
                                    <Td>{item.label}</Td>
                                    <Td>{item.value}</Td>
                                    <Td>
                                        <ColorInput
                                            type="color"
                                            value={item.color}
                                            onChange={(e) => handleColorChange(item.id, e.target.value)}
                                        />
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>

                <ConfirmButton onClick={() => onConfirm(localData)}>
                    <FiCheck /> Confirmar e Gerar Gráfico
                </ConfirmButton>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default DataPreviewModal;
