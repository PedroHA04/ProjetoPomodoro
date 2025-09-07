import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router";

type avalaibleThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<avalaibleThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as avalaibleThemes || 'dark';
        return storageTheme; 
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    }

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
        event.preventDefault(); // Não segue o link

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme]);

    return(
        <nav className={styles.menu}>
            <Link className={styles.menuLink} to="/" aria-label="Ir para Home" title='Ir para Home'>
                <HouseIcon />
            </Link>
            <Link className={styles.menuLink} to="/history/" aria-label='Ver Histórico' title='Ver histórico'>
                <HistoryIcon />
            </Link>
            <Link className={styles.menuLink} to="/settings/" aria-label='Configuraçõs' title='Configurações'>
                <SettingsIcon />
            </Link>
            <Link className={styles.menuLink} to="#" aria-label='Mudar Tema' title='Mudar Tema' onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </Link>
        </nav>
    )
}