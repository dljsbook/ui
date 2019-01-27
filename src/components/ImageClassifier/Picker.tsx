import * as React from 'react';
import styled from 'react-emotion';

interface IProps {
}

const Container = styled.div`
width: 300px;
height: 300px;
background: black;
border-radius: 5px;
`;

const Picker:React.SFC<IProps> = ({
}) => {
  return (
    <Container>Picker</Container>
  );
};

export default Picker;
