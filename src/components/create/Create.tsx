import styled from 'styled-components';
import { pad } from 'components/variables';

import BackgroundImage from 'components/BackgroundImage';
import ItemsForm from './ItemsForm';

const Container = styled.div`
  padding: 30px 10px;

  @media ${pad} {
    padding: 90px 0;
  }

  h2 {
    padding: 20px 0 30px 5px;
    border-bottom: 2px solid ${props => props.theme.darkGray};
    color: ${props => props.theme.darkGray};
    font-weight: 700;
    text-align: center;
    letter-spacing: 2px;
  }
`;

export default function Create() {
  return (
    <>
      <BackgroundImage />
      <Container>
        <ItemsForm />
      </Container>
    </>
  );
}
