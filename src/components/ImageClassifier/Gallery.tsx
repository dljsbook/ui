import * as React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
flex: 1;
`;

const Placeholder = styled.div`
display: flex;
height: 100%;
color: rgba(0,0,0,0.5);
text-align: center;
font-size: 16px;
justify-content: center;
align-items: flex-end;
padding-bottom: 20px;
`;

interface IProps {
  images: string[];
}

const Gallery:React.SFC<IProps> = ({
  images,
}) => {
  if (images.length === 0) {
    return (
      <Container>
        <Placeholder>Click and hold capture to record some images</Placeholder>
      </Container>
    );
  }

  return (
    <Container>
      images!
    </Container>
  );
};

export default Gallery;
