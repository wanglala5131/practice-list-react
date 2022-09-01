import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  padding: 10px 5px;
  background-color: ${props => props.theme.darkGreen};
  color: ${props => props.theme.lightLogoGreen};
  text-align: center;
  line-height: 1.4;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <p>個人練習作品，歡迎使用 ：）</p>
      <p>如需聯絡作者，請寄信至 sue4100035045@gmail.com </p>
    </FooterWrapper>
  );
}
