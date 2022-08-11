import styled from 'styled-components';
import { Cog } from '@styled-icons/fa-solid';
import { pad } from 'components/variables';

const CogIconBox = styled.label`
  z-index: 30;
  position: fixed;
  display: inline-block;
  margin: 70px 10px 0 10px;

  @media ${pad} {
    margin-left: 20px;
  }
`;

const CogIcon = styled(Cog)`
  width: 25px;
  height: 25px;
  color: ${props => props.theme.fontGreen};
  filter: drop-shadow(0 1px 1px black);

  &:hover {
    filter: drop-shadow(0 2px 2px black);
    transition: all 0.2s ease-in-out;
  }

  @media ${pad} {
    width: 30px;
    height: 30px;
  }
`;

const Container = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0px;

  input[type='checkbox'] {
    display: none;

    &.open-toggle-switches {
      &:checked ~ .toggle-switches {
        transform: scale(1, 1);
      }

      &:checked ~ .list-display-modal {
        display: block;
      }
    }
  }
`;

const Modal = styled.label`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.opLightBlack};
`;

const Title = styled.p`
  margin: 10px 0px 10px 10px;
  padding-bottom: 20px;
  border-bottom: 3px solid ${props => props.theme.gray};
  text-align: center;

  @media ${pad} {
    color: ${props => props.theme.white};
    margin: 10px 0px 10px 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.white};
    text-align: center;
  }
`;

const ToggleSwitchsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  margin: 60px auto;
  padding: 10px 0;
  background-color: ${props => props.theme.white};
  font-size: 18px;
  transform: scale(0, 1);
  transform-origin: left;
  transition: transform 0.2s ease-out;
  z-index: 20;

  @media ${pad} {
    width: 30%;
    min-width: 350px;
    background-color: ${props => props.theme.opBlack};
    border-radius: 0px 10px 10px 0px;
    font-size: 22px;
  }
`;

const ToggleSwitch = styled.div`
  margin: 10px 0;

  label {
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${pad} {
      color: ${props => props.theme.white};
    }
  }

  input[type='checkbox'] {
    display: none;

    &:checked {
      //被點就往右移
      ~ .switch-button-box {
        background-color: ${props => props.theme.lightLogoGreen};

        &::after {
          transform: translateX(20px);
          background-color: ${props => props.theme.logoGreen};
        }
      }
    }
  }
`;

const SwitchButtonBox = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100px;
  background-color: #ccc;

  &::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #aaa;
    transition: all 0.1s ease-in-out;
  }
`;

type displayShowType = {
  category: boolean;
  subcategory: boolean;
  reps: boolean;
};

type Props = {
  displayShow: displayShowType;
  setDisplayShow: (
    value: displayShowType | ((prevVar: displayShowType) => displayShowType)
  ) => void;
};

export default function ListDisplay(props: Props) {
  const { displayShow, setDisplayShow } = props;

  const changeSetting = (value: 'category' | 'subcategory' | 'reps') => {
    setDisplayShow(prevState => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  return (
    <Container>
      <input
        type="checkbox"
        id="open-toggle-switches"
        className="open-toggle-switches"
      />
      <Modal
        htmlFor="open-toggle-switches"
        className="list-display-modal"
      ></Modal>
      <CogIconBox htmlFor="open-toggle-switches">
        <CogIcon />
      </CogIconBox>

      <ToggleSwitchsWrapper className="toggle-switches">
        <Title>請選擇要顯示的內容</Title>

        <ToggleSwitch className="toggle-switch">
          <label>
            <input
              type="checkbox"
              defaultChecked={displayShow.category}
              onChange={() => changeSetting('category')}
            />
            <SwitchButtonBox className="switch-button-box"></SwitchButtonBox>
            <span className="btn-text">運動類別</span>
          </label>
        </ToggleSwitch>

        <ToggleSwitch className="toggle-switch">
          <label>
            <input
              type="checkbox"
              defaultChecked={displayShow.subcategory}
              onChange={() => changeSetting('subcategory')}
            />
            <SwitchButtonBox className="switch-button-box"></SwitchButtonBox>
            <span className="btn-text">項目類型</span>
          </label>
        </ToggleSwitch>

        <ToggleSwitch className="toggle-switch">
          <label>
            <input
              type="checkbox"
              defaultChecked={displayShow.reps}
              onChange={() => changeSetting('reps')}
            />
            <SwitchButtonBox className="switch-button-box"></SwitchButtonBox>
            <span className="btn-text">項目組數</span>
          </label>
        </ToggleSwitch>
      </ToggleSwitchsWrapper>
    </Container>
  );
}
