import * as React from 'react';
import styled from 'react-emotion';
import Button from './Button';
import UI from './UI';
import Picker from './Picker';

interface IProps {
}

interface IState {
  rotate: number;
  input: string | null;
}

const Container = styled.div`
overflow: hidden;
min-height: 440px;
background: #f9f9f9;
box-shadow: 0 3px 2px rgba(0,0,0,0.15);
border-radius: 5px;
margin: 20px 0;
display: flex;
flex-direction: column;

video {
  width: 300px;
  height: 300px;
  background: black;
  border-radius: 5px;
}
`;

const Header = styled.div`
  height: 25px;
  background: rgba(0,0,0,0.05);
  margin-bottom: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 13px;

  span {
    margin: 0 5px 0 0;
    color: rgba(0,0,0,0.5);
  }

  a {
    color: rgba(0,0,0,0.5);
    cursor: pointer;
  }
`;

const Chooser = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 20px;
`;

const Or = styled.div`
  &:after {
    display: block;
    content: "Or";
    width: 100%;
  }
`;

const Left = styled.div`
  text-align: left;
  flex: 1;
`;

const Right = styled.div`
  text-align: right;
  flex: 1;
`;

class ImageClassifier extends React.Component<IProps, IState> {
  state: IState = {
    input: null,
    rotate: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        rotate: parseInt(Math.random() * 180 - 90, 10),
      });
    }, 200);
  }

  back = () => this.setState({
    input: null,
  });

  reset = () => this.setState({
    // input: null,
  });

  setInput = (input: string) => this.setState({
    input,
  })

  render() {
    if (this.state.input === null) {
      return (
        <Container>
          <Header />
          <Chooser>
            <p>Choose your input source</p>
            <Button
              handleClick={() => this.setInput('webcam')}
            >
              <span className='fa fa-camera-retro' />
              Webcam
            </Button>
            <Or />
            <Button
              handleClick={() => this.setInput('images')}
            >
              <span className='fa fa-images' />
              Images
            </Button>
          </Chooser>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <a onClick={this.back}>
              <span className='fa fa-chevron-left' />
              Back
            </a>
          </Left>
          <Right>
            <a onClick={this.reset}>
              <span className='fa fa-undo' />
              Reset
            </a>
          </Right>
        </Header>
        <UI rotate={this.state.rotate}>
          {this.state.input === 'webcam' ? (
            <video />
          ) : (
            <Picker />
          )}
        </UI>
      </Container>
    );
  }
}

export default ImageClassifier;
