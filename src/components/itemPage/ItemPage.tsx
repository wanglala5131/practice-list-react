import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pad } from 'components/variables';

import { toastAlert, swalAlert } from 'helpers/alert';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { CartItem, ItemType } from 'components/data.type';
import { getItem, changeLike } from 'api/item';
import { addToCart, deleteCartItem } from 'api/cart';

import Cart from 'components/Cart';
import Banner from 'components/Banner';
import bannerImg from 'assets/image/item-page.jpeg';

const ItemSection = styled.section`
  padding: 10px 0;
  font-size: 18px;

  &:last-child {
    padding-bottom: 50px;

    @media ${pad} {
      padding-bottom: 100px;
    }
  }

  @media ${pad} {
    padding-bottom: 20px;
    font-size: 22px;
  }

  pre {
    margin: 0;
    padding-top: 10px;
    color: ${props => props.theme.black};
    line-height: 1.5;
    white-space: pre-wrap;
  }

  img {
    padding-top: 10px;
    width: 100%;
    max-width: 600px;
    height: auto;
  }

  &.one-line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;

    pre {
      margin: 10px 0;
    }
  }
`;

const ItemTitle = styled.div`
  margin: 10px 10px 10px 0;
  color: ${props => props.theme.fontGreen};
  font-weight: 500;
`;

const Subcategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 10px;

  span {
    padding: 2px 5px;
    margin: 2px;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 10px;
  }
`;

const CloseTxt = styled.p`
  margin-top: 20px;
  color: ${props => props.theme.darkRed};
  font-size: 18px;
  font-weight: 500;

  @media ${pad} {
    font-size: 22px;
  }
`;

// TODO:星號封存按鈕

export default function Item() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: itemId } = useParams();

  const pageData = {
    bannerImg,
    title: '訓練項目',
    buttons: [
      {
        name: '回首頁',
        url: '/',
        class: 'go-back',
        type: 'link',
        action: 'go-back',
        disabled: false,
      },
      {
        name: '加上星號',
        url: '',
        class: 'default',
        type: 'button',
        action: 'change-star',
        disabled: false,
      },
      {
        name: '編輯',
        url: `/edit/${itemId}`,
        class: 'default',
        type: 'link',
        action: 'edit',
        disabled: false,
      },
      {
        name: '加到暫定菜單',
        url: '',
        class: 'default',
        type: 'button',
        action: 'add-temp',
        disabled: false,
      },
      {
        name: '封存',
        url: '',
        class: 'close',
        type: 'button',
        action: 'close',
        disabled: false,
      },
    ],
  };

  const [item, setItem] = useState<ItemType>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);
  const [pageButtons, setPageButtons] = useState(pageData.buttons);

  useEffect(() => {
    getOriItem();
  }, []);

  const getOriItem = () => {
    return getItem(Number(itemId))
      .then(res => {
        if (res.status === 'success') {
          const {
            item: OriItem,
            cartItems: OriCartItems,
            cartItemsArr: OriCartItemsArr,
          } = res;
          setItem(OriItem);
          setCartItems(OriCartItems);
          setCartItemsArr(OriCartItemsArr);
        } else {
          swalAlert(`${res.message}，將返回上一頁`).then(() => {
            navigate(-1);
          });
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });
  };

  useEffect(() => {
    if (item) {
      setPageButtons(
        pageButtons.map(button => {
          if (button.action === 'close') {
            button.name = item.isClosed ? '解除封存' : '封存';
          }

          if (button.action === 'add-temp') {
            button.disabled = item.isClosed;
          }
          return button;
        })
      );
    }
  }, [item?.isClosed]);

  useEffect(() => {
    if (item) {
      setPageButtons(
        pageButtons.map(button => {
          if (button.action === 'add-temp') {
            button.name = cartItemsArr.includes(item.id)
              ? '自暫定清單移除'
              : '加入暫定清單';
          }

          if (button.action === 'close') {
            button.disabled = cartItemsArr.includes(item.id);
          }
          return button;
        })
      );
    }
  }, [cartItemsArr]);

  useEffect(() => {
    setPageButtons(
      pageButtons.map(button => {
        if (button.action === 'change-star') {
          button.name = item?.isLiked ? '移除星號' : '添加星號';
        }

        return button;
      })
    );
  }, [item?.isLiked]);

  const buttonAction = (action: string) => {
    if (!item) return;

    if (action === 'add-temp') {
      if (cartItemsArr.includes(item?.id)) {
        const itemInCart = cartItems.find(
          cartItem => cartItem.ItemId === item.id
        );

        if (itemInCart) {
          deleteItemInCart(itemInCart.id);
        }
      } else {
        addItemToCart(item.id);
      }
    } else if (action === 'change-star') {
      changeItemLike(item.id);
    }
  };

  const changeItemLike = (id: number) => {
    dispatch(setLoading(true));

    changeLike(id)
      .then(res => {
        if (res.status === 'success') {
          if (!item) return;

          item.isLiked = !item.isLiked;
          toastAlert(item.isLiked ? '加星號成功' : '已移除星號');
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const addItemToCart = (id: number) => {
    dispatch(setLoading(true));

    addToCart(id)
      .then(res => {
        if (res.status === 'success') {
          getOriItem().then(() => {
            dispatch(setLoading(false));
            toastAlert('已加入暫定清單');
          });
        } else {
          dispatch(setLoading(false));
          swalAlert(res.message || '發生錯誤，請重試一次');
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const deleteItemInCart = (id: number) => {
    dispatch(setLoading(true));

    deleteCartItem(id)
      .then(res => {
        if (res.status === 'success') {
          getOriItem().then(() => {
            dispatch(setLoading(false));
            toastAlert('已將此項目自暫定清單中移除');
          });
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        swalAlert('發生錯誤，請重試一次');
      });
  };

  return (
    <>
      <Cart cartItems={cartItems} deleteItemInCart={deleteItemInCart} />
      <Banner
        bannerImg={pageData.bannerImg}
        title={item?.isLiked ? `★ ${item?.name}` : item?.name || '---'}
        buttons={pageButtons}
        buttonAction={buttonAction}
        hasCart={true}
      ></Banner>
      {item && (
        <div className="container">
          {item.isClosed && <CloseTxt>※ 此為封存項目</CloseTxt>}
          <ItemSection className="item-section one-line">
            <ItemTitle>運動類別：</ItemTitle>
            <pre>{item.Category.name}</pre>
          </ItemSection>

          <ItemSection>
            <ItemTitle>項目類型：</ItemTitle>
            <Subcategories>
              {item.Subcategories.map(subcategory => (
                <span key={subcategory.id}>{subcategory.name}</span>
              ))}
            </Subcategories>
          </ItemSection>

          <ItemSection>
            <ItemTitle>描述：</ItemTitle>
            <pre>{item.description}</pre>
          </ItemSection>

          <ItemSection>
            <ItemTitle>限制：</ItemTitle>
            <pre>{item.limit}</pre>
          </ItemSection>

          {item.image && (
            <ItemSection>
              <ItemTitle>相關圖片：</ItemTitle>

              <div className="item-img">
                <img src={item.image} alt={item.name} />
              </div>
            </ItemSection>
          )}
        </div>
      )}
    </>
  );
}
