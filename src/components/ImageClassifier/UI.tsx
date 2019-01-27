import * as React from 'react';
import styled from 'react-emotion';
import Category from './Category';
import Needle from './Needle';

interface IProps {
  children: JSX.Element;
  rotate: number;
}

const Container = styled.div`
display: flex;
height: 360px;
padding: 20px;
flex: 1;
`;

const Center = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
position: relative;
`;

const UI:React.SFC<IProps> = ({
  children,
  rotate,
}) => (
  <Container>
    <Category title="One" />
    <Center>
      {children}
      <Needle rotate={rotate} />
    </Center>
    <Category title="Two" />
  </Container>
);

export default UI;
