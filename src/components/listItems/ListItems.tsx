import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pad, buttonStyle, inputStyle } from 'components/variables';
import { CartItem } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/cart-page.jpeg';

// fake data
import { cartItems as oriCartItems } from 'assets/fake-data/fake';

const Container = styled.div`
  margin: 0 auto 80px auto;
  padding-top: 20px;
  width: 100%;
  max-width: 900px;
  font-size: 18px;

  @media ${pad} {
    margin-top: 40px;
    font-size: 20px;
  }

  input[type='text'] {
    ${inputStyle}

    width: 100%;
    margin-top: 10px;
  }
`;

const ListNote = styled.p`
  margin: 50px 0 10px;
  font-size: 16px;
  color: ${props => props.theme.darkGray};

  @media ${pad} {
    font-size: 20px;
  }
`;

const ListItem = styled.div`
  &:first-child {
    margin-top: 20px;
  }

  input[type='checkbox'] {
    display: none;

    &:checked ~ .list-footer {
      height: auto;
      transform: scale(1, 1);
      transition: transform 0.2s ease-out;
    }
  }
`;

const ListItemHeader = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${props => props.theme.lightLogoGreen};

  > * {
    margin: 0 10px;
  }
`;

const ItemContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 5px 10px;
  }
`;

const ItemName = styled.p`
  display: flex;
  align-items: center;

  a {
    margin-left: 5px;
    font-size: 14px;
    background-color: ${props => props.theme.darkGreen};
    border-radius: 10px;
    padding: 3px;
    color: ${props => props.theme.white};
    line-height: 1;

    @media ${pad} {
      font-size: 16px;
    }
  }
`;

const Category = styled.span`
  margin-right: 10px;
  color: ${props => props.theme.fontGreen};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  white-space: nowrap;

  @media ${pad} {
    font-size: 20px;
  }
`;

const Subcategories = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  @media ${pad} {
    margin-top: 3px;
    font-size: 18px;
  }

  span {
    display: inline-block;
    padding: 1px 3px;
    margin: 0 1px;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 10px;
    color: ${props => props.theme.darkGray};
  }
`;

const ItemButton = styled.button`
  margin-right: 10px;
  font-size: 40px;
  color: ${props => props.theme.darkRed};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.red};
    text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
  }
`;

const ListItemFooter = styled.div`
  padding: 5px 30px;
  height: 0;
  transform: scale(1, 0);
  transform-origin: top;
  transition: none;

  > div {
    padding: 10px;

    &:last-child {
      padding-bottom: 30px;
    }
  }
`;

const ListButtons = styled.div`
  margin-top: 30px;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-top: 2px solid ${props => props.theme.gray};

  @media ${pad} {
    flex-direction: row;
  }

  button {
    ${buttonStyle}

    margin: 10px;
    font-size: 21px;

    &.submit {
      background-color: ${props => props.theme.logoGreen};
    }

    &.save {
      background-color: ${props => props.theme.gray};
    }

    &:not(:disabled):hover {
      filter: brightness(0.8);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
    }
  }
`;

const pageData = {
  bannerImg,
  title: '暫定菜單',
  buttons: [
    {
      name: '回首頁',
      url: '/',
      class: 'default',
      type: 'link',
      action: 'back',
      disabled: false,
    },
  ],
};
export default function ListItems() {
  const [cartItems, setCateItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCateItems(oriCartItems);
    }, 1000);
  }, []);

  const submit = () => {
    console.log(cartItems);
  };

  const changeValue = (
    itemId: number,
    type: 'reps' | 'remark',
    value: string
  ) => {
    console.log(itemId, type, value);
    setCateItems(
      cartItems.map(item => {
        if (item.id === itemId) {
          item[type] = value;
        }
        return item;
      })
    );
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
      ></Banner>

      <Container className="container">
        <div>
          <label htmlFor="name-input">菜單名稱*：</label>
          <input type="text" placeholder="填入菜單名稱" id="name-input" />
        </div>
        <ListNote>請打開項目填入資料以及排列項目順序(拖曳)</ListNote>
        <div>
          {cartItems.map(item => (
            <ListItem key={item.id}>
              <ListItemHeader htmlFor={`list-${item.id}`}>
                <ItemContent>
                  <ItemName>
                    {item.Item.name}
                    <Link to={`/${item.ItemId}`}>查看項目</Link>
                  </ItemName>

                  <Category>{item.Item.Category.name}</Category>
                  <Subcategories>
                    {item.Item.Subcategories.map(subcategory => (
                      <span key={subcategory.id}>{subcategory.name}</span>
                    ))}
                  </Subcategories>
                </ItemContent>

                <ItemButton>&times;</ItemButton>
              </ListItemHeader>

              <input type="checkbox" id={`list-${item.id}`} />
              <ListItemFooter className="list-footer">
                <div>
                  <label>組數：</label>
                  <input
                    type="text"
                    placeholder="e.g.三組各10次、持續5分鐘"
                    onChange={e => changeValue(item.id, 'reps', e.target.value)}
                  />
                </div>
                <div>
                  <label>備註：</label>
                  <input
                    type="text"
                    onChange={e =>
                      changeValue(item.id, 'remark', e.target.value)
                    }
                  />
                </div>
              </ListItemFooter>
            </ListItem>
          ))}
        </div>
        <ListButtons>
          <button className="save">儲存菜單名稱/項目資料</button>
          {/* TODO:save只有cart有 */}
          <button className="submit" onClick={submit}>
            送出
          </button>
          {/* TODO:有個modal可以在編輯已有菜單時增加項目 */}
        </ListButtons>
      </Container>
    </>
  );
}
