import styled from 'styled-components';
import useDocumentTitle from '../../shared/utils/useDocumentTitle';

export default function AboutPage(): JSX.Element {
    useDocumentTitle('Sobre - Slogs');
    
    return (
        <>
            <h2 style={{ display: 'grid', justifyContent: 'center' }}>Sobre</h2>
            <Container>
                <Body>
                    <AboutText>
                        <p>
                            Slogs é um serviço de registros de segurança no qual os usuários podem
                            mapear possíveis problemas que podem ser de diferentes níveis de
                            gravidade, nosso serviço consiste em oferecer uma poderosa ferramenta
                            para as organizações poderem evitar acidentes de trabalho futuros.
                        </p>
                    </AboutText>

                    <DevelopersAbout>
                        <h4>Desenvolvedores: </h4>
                        <p>Leonardo Teixeira</p>
                        <p>Luís Miguel Amorim</p>
                        <p>Victor Vianna</p>
                        <p>Alexandre</p>
                    </DevelopersAbout>
                </Body>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 85%;
    justify-content: flex-start;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;

const Body = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: 130px;
    row-gap: 70px;
`;

const AboutText = styled.section`
    display: flex;
    max-width: 70%;
    text-align: justify;

    @media only screen and (max-width: 768) {
        max-width: 100%;
    }
`;
const DevelopersAbout = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    row-gap: 5px;
`;
