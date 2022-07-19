import styled from 'styled-components';
import background from 'assets/image/background.jpeg';

const Image = styled.div`
  z-index: -100;
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url(${background});
  background-size: cover;
  background-position: right;
  background-attachment: fixed;
  background-repeat: no-repeat;
`;

export default function BackgroundImage() {
  return <Image />;
}
