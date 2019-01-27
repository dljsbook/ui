import * as React from 'react';
import styled from 'react-emotion';
import Button from './Button';
import Gallery from './Gallery';
import { colors, lighten } from '../../styles/variables';

const Container = styled.div`
display: flex;
flex: 1;
flex-direction: column;
padding: 0 20px;

&:first-child {
padding-left: 0;
}

&:last-child {
padding-right: 0;
text-align: right;
}

h2 {
border-bottom: 1px solid #CCC;
padding-bottom: 10px;
padding-top: 0;
margin: 0;
}
`;

interface IProps {
  title: string;
}

const Category:React.SFC<IProps> = ({
  title,
}) => {
  const index = title === 'One' ? 0 : 1;
  return (
    <Container>
      <h2
        style={{
          color: `${lighten(colors.categories[index].join(','), 0)}`,
        }}
      >Category {title}</h2>
      <Gallery images={[]} />
      <Button index={index} handleClick={() => 'foo'}>Capture</Button>
    </Container>
  );
};

export default Category;
