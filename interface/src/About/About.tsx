import { FC } from 'react';
import { Box } from '@mui/material';
import styles from './About.module.css';

interface AtributoData {
    name: string;
    description: string;
}

export const About: FC = () => {
    const atributos: AtributoData[] = [
        {
            name: 'Data',
            description: "O atributo ’Data’ da tabela ’Dado’ corresponde ao atributo ’DATA (YYYY-MM-DD)’ descrito nos cabeçalhos das tabelas dos dados históricos e representa a data respectiva às informações medidas registradas na tupla. Esse atributo caracteriza o tipo DATE."
        },
        {
            name: 'Hora',
            description: "'Hora’ da tabela ’Dado’ corresponde ao atributo ’HORA (UTC)’ descrito nos cabeçalhos das tabelas dos dados históricos, refere-se a hora respectiva a data em que às informações medidas foram registradas e caracteriza o tipo TIME."
        },
        {
            name: 'Precipitação Total',
            description: "’Precipitação Total’ da tabela ’Dado’ corresponde ao atributo ’PRECIPITAÇÃO TOTAL, HORÁRIO (mm)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações automáticas é a medida total de precipitação (chuva), ocorrida na última hora antes de cada mensagem de dados."
        },
        {
            name: 'Pressão Atmosférica ao Nível da Estação',
            description: `’Pressão Atmosférica ao Nível da Estação’ da tabela ’Dado’ corresponde ao atributo
’PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)’ descrito
nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações
automáticas é a medida média da pressão atmosférica, também ao nível da estação, ocorrida
na última hora antes de cada mensagem de dados. Equivale ao peso de uma coluna de ar
de corte transversal unitário, que se estende desde um nível dado até o limite superior da
atmosfera.`,
        },
        {
            name: 'Pressão Atmosférica Máxima na Hora Anterior',
            description: `’Pressão Atmosférica Máxima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’PRESSÃO ATMOSFERICA MAX.NA HORA ANT. (AUT) (mB)’ descrito
nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações
automáticas é a medida da pressão atmosférica máxima, ocorrida na última hora antes de
cada mensagem de dados.`,
        },
        {
            name: 'Pressão Atmosférica Mínima na Hora Anterior',
            description: `’Pressão Atmosférica Mínima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’PRESSÃO ATMOSFERICA MIN. NA HORA ANT. (AUT) (mB)’ descrito
nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações
automáticas é medida da pressão atmosférica mínima, ocorrida na última hora antes de
cada mensagem de dados.`,
        },
        {
            name: 'Radiação Global',
            description: `’Radiação Global’ da tabela ’Dado’ corresponde ao atributo ’RADIACAO GLOBAL
(KJ/m2)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo
FLOAT. Nas estações automáticas é a medida de toda radiação solar que chegou a superfície
terrestre, na última hora antes de cada mensagem de dados. Radiação é a energia propagada
sob forma de ondas. Pode ser exemplificada pela radiação eletromagnética, que reflete calor
e luz.`,
        },
        {
            name: 'Temperatura do Ar - Bulbo Seco',
            description: `’Temperatura do Ar - Bulbo Seco’ da tabela ’Dado’ corresponde ao atributo ’TEMPERATURA
DO AR - BULBO SECO, HORARIA (°C)’ descrito nos cabeçalhos das tabelas dos
dados históricos, e caracteriza o tipo FLOAT. Nas estações automáticas é a medida média
da temperatura do ar, ocorrida na última hora antes de cada mensagem de dados.`,
        },
        {
            name: 'Temperatura do Ar Máxima na Hora Anterior',
            description: `’Temperatura do Ar Máxima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’TEMPERATURA MÁXIMA NA HORA ANT. (AUT) (°C)’ descrito nos
cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações
automáticas é a medida máxima da temperatura do ar, ocorrida na última hora antes de
cada mensagem de dados.`,
        },
        {
            name: 'Temperatura do Ar Mínima na Hora Anterior',
            description: `'Temperatura do Ar Mínima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’TEMPERATURA MÍNIMA NA HORA ANT. (AUT) (°C)’ descrito nos
cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Nas estações
automáticas é a medida mínima da temperatura do ar, ocorrida na última hora antes de
cada mensagem de dados.`,
        },
        {
            name: 'Temperatura do Ponto de Orvalho na Última Hora',
            description: `’Temperatura do Ponto de Orvalho na Última Hora’ da tabela ’Dado’ corresponde ao
atributo ’TEMPERATURA DO PONTO DE ORVALHO (°C)’ descrito nos cabeçalhos
das tabelas dos dados históricos, e caracteriza o tipo FLOAT. Indica a temperatura que o
ar deveria ter, para que ele se tornasse saturado, e assim produzir orvalho. Nas estações
automáticas este parâmetro é calculado a partir dos valores de temperatura do ar e da
umidade relativa, ocorridos na última hora antes de cada mensagem de dados`,
        },
        {
            name: 'Temperatura do Ponto de Orvalho Máxima na Hora Anterior',
            description: `’Temperatura do Ponto de Orvalho Máxima na Hora Anterior’ da tabela ’Dado’
corresponde ao atributo ’TEMPERATURA ORVALHO MAX. NA HORA ANT.
(AUT) (°C)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza o
tipo FLOAT. Nas estações automáticas este parâmetro é calculado a partir dos valores
máximos de temperatura do ar e da umidade relativa, ocorridos na última hora antes de
cada mensagem de dados.`,
        },
        {
            name: 'Temperatura do Ponto de Orvalho Mínima na Hora Anterior',
            description: `Temperatura do Ponto de Orvalho Mínima na Hora Anterior’ da tabela ’Dado’
corresponde ao atributo ’TEMPERATURA ORVALHO MIN. NA HORA ANT. (AUT)
(°C)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT.
Nas estações automáticas este parâmetro é calculado a partir dos valores mínimos de
temperatura do ar e da umidade relativa, ocorridos na última hora antes de cada mensagem
de dados.`,
        },
        {
            name: 'Umidade Relativa do Ar na Última Hora',
            description: `’Umidade Relativa do Ar na Última Hora’ da tabela ’Dado’ corresponde ao atributo
’UMIDADE RELATIVA DO AR, HORARIA (%)’ descrito nos cabeçalhos das tabelas
dos dados históricos, e caracteriza o tipo INT. Nas estações automáticas é a medida da
umidade relativa do ar, ocorrida na última hora antes de cada mensagem de dados.`,
        },
        {
            name: 'Umidade Relativa do Ar Máxima na Hora Anterior',
            description: `Umidade Relativa do Ar Máxima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’UMIDADE REL. MAX. NA HORA ANT. (AUT) (%)’ descrito nos cabeçalhos
das tabelas dos dados históricos, e caracteriza o tipo INT. Nas estações automáticas é a
medida máxima da umidade relativa do ar, ocorrida na última hora antes de cada mensagem
de dados.`,
        },
        {
            name: 'Umidade Relativa do Ar Mínima na Hora Anterior',
            description: `’Umidade Relativa do Ar Mínima na Hora Anterior’ da tabela ’Dado’ corresponde ao
atributo ’UMIDADE REL. MIN. NA HORA ANT. (AUT) (%)’ descrito nos cabeçalhos
das tabelas dos dados históricos, e caracteriza o tipo INT. Nas estações automáticas é a
medida mínima da umidade relativa do ar, ocorrida na última hora antes de cada mensagem
de dados.`,
        },
        {
            name: 'Vento - Direção',
            description: `’Vento - Direção’ da tabela ’Dado’ corresponde ao atributo ’VENTO, DIREÇÃO
HORARIA (gr) (° (gr))’ descrito nos cabeçalhos das tabelas dos dados históricos, e
caracteriza o tipo INT. Nas estações automáticas é a medida em graus angulares da direção
do vento (de onde o vento vem). Este valor é a média dos últimos 10 minutos antes de
cada hora, de envio da mensagem de dados.`,
        },
        {
            name: 'Vento - Rajada',
            description: `’Vento - Rajada’ da tabela ’Dado’ corresponde ao atributo ’VENTO, RAJADA MAXIMA
(m/s)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza o tipo FLOAT.
Nas estações automáticas é a medida máxima da velocidade do vento, ocorrida na última
hora antes de cada mensagem de dados. Rajadas de vento são definidas como mudanças
bruscas na velocidade do vento em um pequeno intervalo de tempo. De acordo com a
Escala Beaufort, as rajadas de vento ocorrem quando essa variação é superior a 10 km/h
ou 3,6 m/s.`,
        },
        {
            name: 'Vento - Velocidade',
            description: `’Vento - Velocidade’ da tabela ’Dado’ corresponde ao atributo ’VENTO, VELOCIDADE
HORARIA (m/s)’ descrito nos cabeçalhos das tabelas dos dados históricos, e caracteriza
o tipo FLOAT. Nas estações automáticas é a medida da velocidade do vento. Este valor é
a média dos últimos 10 minutos antes de cada hora, de envio da mensagem de dados`,
        },
    ];

    return (
        <Box component="div" className={ styles.about }>
            <h2><a id="dados"/> Sobre os dados</h2>
            <div>
                A principal finalidade da base de dados é documentar, anualmente, as características climáticas dos municípios brasileiros. Ela armazena informações meteorológicas captadas pelas estações meteorológicas automáticas e convencionais do INMET.
                <br />
                <br />
                Além das estações automáticas (equipadas com sensores e instrumentos que medem as condições meteorológicas de forma contínua e automática), o INMET fornece dados meteorológicos medidos por estações convencionais (que dependem da intervenção humana para a coleta e registro dos dados). O catálogo das estações automáticas pode ser acessado na <a href="https://portal.inmet.gov.br/paginas/catalogoaut">página do Instituto Nacional de Meteorologia</a> e o catálogo das estações convencionais pode ser acessado na <a href="https://portal.inmet.gov.br/paginas/catalogoman">página específica</a>.
            </div>

            <br />
            <h2><a id="modelo"/>Modelo dos dados</h2>
            <div>
                Os históricos de dados meteorológicos anuais das estações automáticas em conjunto com o catálogo das estações automáticas, podem ser descritos por um modelo relacional. O diagrama entidade relacionamento dos dados é o seguinte:
                <br />
                <br />
                <center>
                    <img src={ require('../assets/diagramaER.png') } alt="Diagrama Entidade-Relacionamento" />
                    <br />
                    <i>
                        Diagrama Entidade-relacionamento dos dados.
                    </i>
                </center>
            </div>

            <br />
            <h2><a id="atributos"/>Atributos dos dados</h2>
            <div>
                Os dados contidos na base de dados contém os seguintes atributos:
                <br />
                <br />
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Atributo</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                atributos.map(atributo => (
                                    <tr key={ atributo.name }>
                                        <td><i>{ atributo.name }</i></td>
                                        <td>{ atributo.description }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </center>
            </div>
        </Box>
    );
}
