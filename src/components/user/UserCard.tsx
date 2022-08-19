import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pad } from 'components/variables';
import { string } from 'yup';

import BackgroundImage from 'components/BackgroundImage';
import UserForm from 'components/user/UserForm';

const FormCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 10px 0;

  @media ${pad} {
    padding-top: 100px;
  }
`;

const FormContainer = styled.div`
  padding: 40px 20px;
  width: 550px;
  min-width: 320px;
  background-color: ${props => props.theme.opBlack};
  border-radius: 5px;
  color: ${props => props.theme.logoGreen};
  backdrop-filter: blur(4px);

  h1 {
    padding-bottom: 20px;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;

    @media ${pad} {
      font-size: 27px;
    }
  }

  h3 {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;

    @media ${pad} {
      font-size: 23px;
    }

    &::before,
    &::after {
      content: '';
      flex-grow: 1;
      display: inline-block;
      height: 1px;
      margin: 0 10px;
      background-color: ${props => props.theme.logoGreen};
      vertical-align: middle;
    }
  }
`;

const FormText = styled.p`
  padding-left: 20px;
  color: ${props => props.theme.lightGray};
  font-size: 16px;

  @media ${pad} {
    font-size: 18px;
  }

  &:first-child {
    margin-top: 30px;
  }

  &:not(:first-child) {
    margin-top: 10px;
  }

  a {
    color: ${props => props.theme.logoGreen};

    &:hover {
      color: ${props => props.theme.darkGreen};
      transition: all 0.2s ease-out;
    }
  }
`;

type Props = {
  isLogin: boolean;
};

export default function Login(props: Props) {
  const { isLogin } = props;

  const loginData = [
    {
      key: 'email',
      label: '信箱',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'text',
    },
    {
      key: 'password',
      label: '密碼',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'password',
    },
  ];

  const registerData = [
    {
      key: 'name',
      label: '姓名',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'text',
    },
    {
      key: 'email',
      label: '信箱',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'text',
    },
    {
      key: 'password',
      label: '密碼',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: '再次確認密碼',
      initialValue: '',
      validation: string().required('此欄位為必填'),
      type: 'password',
    },
  ];

  const renderData = {
    title: isLogin ? '登入' : '註冊',
    formData: isLogin ? loginData : registerData,
    bottomTxt: isLogin ? '沒有帳號？' : '已有帳號？',
    bottomLinkTxt: isLogin ? '點此註冊' : '回到登入',
    bottomLink: isLogin ? '/register' : '/login',
  };

  return (
    <>
      <BackgroundImage />
      <FormCard>
        <FormContainer>
          <h1>練習菜單 Practice-list</h1>
          <h3>{renderData.title}</h3>
          <UserForm data={renderData.formData} isLogin={isLogin} />
          <FormText>
            {renderData.bottomTxt}
            <Link to={renderData.bottomLink}>{renderData.bottomLinkTxt}</Link>
          </FormText>
          <FormText>
            該怎麼使用？<Link to="/how-to-use">介紹</Link>
          </FormText>
        </FormContainer>
      </FormCard>
    </>
  );
}
