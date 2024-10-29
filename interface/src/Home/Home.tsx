import { Component } from 'react';
import styles from './home.module.css';
import { Box, Button } from '@mui/material';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export class Home extends Component {
    render() {
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
                        <Button className={ styles.linkButton }>
                            <Link to="/sobre#dados">
                                Sobre os dados
                            </Link>
                        </Button>
                        <Button className={ styles.linkButton }>
                            <Link to="/sobre#modelo">
                                Modelo relacional dos dados
                            </Link>
                        </Button>
                        <Button className={ styles.linkButton }>
                            <Link to="/sobre#atributos">
                                Atributos dos dados
                            </Link>
                        </Button>
                        <Button className={ styles.linkButton }>
                            <Link to="/relatorio">
                                Relatório (Power BI)
                            </Link>
                        </Button>
                    </div>
                </center>
            </Box>
        );
    }
}
