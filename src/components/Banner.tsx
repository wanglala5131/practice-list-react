import styled from 'styled-components';
import { pad } from './variables';
import { Link } from 'react-router-dom';

const BannerContainer = styled.div`
  height: auto;
  position: relative;

  @media ${pad} {
    display: block;
    width: 100%;
    height: 350px;
  }

  img {
    display: none;

    @media ${pad} {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  }
`;

const TitleBox = styled.div`
  position: relative;
  padding-top: 30px;
  z-index: 2;

  &.has-cart {
    padding-top: 45px;

    @media ${pad} {
      padding-top: 80px;
    }
  }

  @media ${pad} {
    padding-top: 80px;
  }
`;

const PageTitle = styled.h1`
  border-bottom: 3px solid ${props => props.theme.logoGreen};
  color: ${props => props.theme.fontGreen};
  font-weight: 700;
  font-size: 25px;
  padding-bottom: 5px;

  @media ${pad} {
    padding-bottom: 0;
    border: none;
    color: ${props => props.theme.white};
    font-size: 48px;
    letter-spacing: 2px;
    text-shadow: 0px 8px 5px rgba(0, 0, 0, 0.8);
  }
`;

const PageLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;

  @media ${pad} {
    padding-top: 50px;
    padding-left: 20px;
  }

  a,
  button {
    margin: 5px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.white};
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;

    @media ${pad} {
      background-color: rgba(0, 0, 0, 0.8);
      font-size: 20px;
      line-height: 20px;
    }

    &:not(:disabled):hover {
      transition: all 0.2s ease-out;
      color: ${props => props.theme.white};
      cursor: pointer;

      @media ${pad} {
        color: ${props => props.theme.opWhite};
      }
    }

    &:disabled {
      opacity: 0.5;

      @media ${pad} {
        opacity: 1;
        filter: brightness(0.6);
      }
    }

    // type
    &.default {
      background-color: ${props => props.theme.white};
      border: 2px solid ${props => props.theme.logoGreen};
      color: ${props => props.theme.fontGreen};

      @media ${pad} {
        background-color: rgba(0, 0, 0, 0.8);
        border-color: ${props => props.theme.opWhite};
        color: ${props => props.theme.opWhite};
      }

      &.active,
      &:not(:disabled):hover {
        background-color: ${props => props.theme.logoGreen};
        color: ${props => props.theme.white};
      }
    }

    &.add-link {
      position: relative;
      padding-left: 25px;

      @media ${pad} {
        padding-left: 30px;
      }

      &::before {
        position: absolute;
        left: 10px;
        top: 8px;
        padding-right: 10px;
        content: '+';
        font-size: 20px;

        @media ${pad} {
          top: 7px;
          font-size: 30px;
        }
      }
    }

    &.go-back {
      border: 2px solid ${props => props.theme.black};
      color: ${props => props.theme.black};

      @media ${pad} {
        border-color: ${props => props.theme.darkYellow};
        color: ${props => props.theme.darkYellow};
      }

      &:hover {
        background-color: ${props => props.theme.black};
        color: ${props => props.theme.white};

        @media ${pad} {
          background-color: ${props => props.theme.darkYellow};
          color: ${props => props.theme.opBlack};
        }
      }
    }

    &.close {
      border: 2px solid ${props => props.theme.red};
      color: ${props => props.theme.red};

      @media ${pad} {
        border-color: ${props => props.theme.red};
        color: ${props => props.theme.red};
      }

      &:not(:disabled):hover {
        background-color: ${props => props.theme.red};
        color: ${props => props.theme.white};
      }
    }
  }
`;

type Props = {
  bannerImg: string;
  title: string;
  buttons?: {
    name: string;
    url: string;
    class: string;
    type: string;
    action: string;
    disabled: boolean;
  }[];
  buttonAction?: (value: string) => void;
  hasCart?: boolean;
};

export default function Banner(props: Props) {
  const { bannerImg, title, buttons, hasCart, buttonAction } = props;
  return (
    <BannerContainer>
      <img src={bannerImg} alt="練習菜單banner" />
      <TitleBox className={`container ${hasCart ? 'has-cart' : ''}`}>
        <PageTitle>{title}</PageTitle>
        <PageLinks>
          {buttons?.map(button =>
            button.type === 'link' ? (
              <Link
                key={button.action}
                to={button.url}
                className={button.class}
              >
                {button.name}
              </Link>
            ) : (
              <button
                key={button.action}
                className={button.class}
                disabled={button.disabled}
                onClick={() => {
                  if (buttonAction) {
                    buttonAction(button.action);
                  }
                }}
              >
                {button.name}
              </button>
            )
          )}
        </PageLinks>
      </TitleBox>
    </BannerContainer>
  );
}
