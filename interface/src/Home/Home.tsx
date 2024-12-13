import { Component, FC } from 'react';
import styles from './home.module.css';
import { Box, Button } from '@mui/material';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export const Home: FC = () => {
    const links = [
        { text: "Sobre os dados", link: "/sobre#dados" },
        { text: "Modela relacional dos dados", link: "/sobre#modelo" },
        { text: "Atributos dos dados", link: "/sobre#atributos" },
        { text: "Relatório (Power BI)", link: "/relatorio" },
        { text: "Análises", link: "/analises" },
    ];

    return (
        <Box className={ styles.home }>
            <h2>Trabalho SME0808 - Séries Temporais e Aprendizado Dinâmico</h2>
            <div className={ styles.homeText }>
                Dados e relatório do grupo F, formado por:
                <ul>
                    <li>André Kenji Hidaka Matsumoto</li>
                    <li>Leo Gianotti Andrade Dos Santos</li>
                    <li>Lucas Silva Neves</li>
                    <li>Marco Antônio Ribeiro de Toledo</li>
                    <li>Maria Victoria Brandao Barros</li>
                    <li>Nelson Luiz Serpa de Oliveira</li>
                    <li>Vinícius Rodrigues Ribeiro</li>
                </ul>
                <br />
                <br />
                Links de navegação:
            </div>
            <br />
            <center>
                <div className={ styles.buttonCollection }>
                    {
                        links.map(link => (
                            <Button key={link.link} className={ styles.linkButton }>
                                <Link to={link.link}>
                                    {link.text}
                                </Link>
                            </Button>
                        ))
                    }
                </div>
            </center>
        </Box>
    );
}
