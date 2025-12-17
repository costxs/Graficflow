import React from 'react';
import { FiHome, FiZap } from 'react-icons/fi';

import {
    HeaderBar,
    LogoArea,
    LogoIconWrapper,
    SiteNameText,
    HomeButton
} from '../HeaderStyles';

interface AppHeaderProps {
    // Prop para a função que navegará de volta para o início
    onHomeClick: () => void;
    siteName?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    onHomeClick,
    siteName = "GraficFlow" // Nome padrão
}) => {
    return (
        <HeaderBar>

            {/* Lado Esquerdo: Logo e Nome */}
            {/* Adicionei onClick na logo também como atalho para home */}
            <LogoArea onClick={onHomeClick}>
                <LogoIconWrapper>
                    <FiZap />
                </LogoIconWrapper>
                <SiteNameText>
                    {siteName}
                </SiteNameText>
            </LogoArea>

            {/* Lado Direito: Botão Home */}
            <HomeButton onClick={onHomeClick}>
                <FiHome /> {/* Ícone de casa */}
                <span>Home</span> {/* Texto (some em mobile) */}
            </HomeButton>

        </HeaderBar>
    );
};

export default AppHeader;
