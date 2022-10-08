import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { pad, inputStyle, buttonStyle } from 'components/variables';

import { swalAlert, toastAlert, confirmAlert } from 'helpers/alert';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { getLists, changeListStatus, deleteList } from 'api/list';
import { ListType } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/lists-page.jpeg';
import ListDisplay from 'components/lists/ListDIsplay';

const Search = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0;

  @media ${pad} {
    margin-top: 60px;
  }

  label {
    font-size: 18px;
    color: ${props => props.theme.fontGreen};

    @media ${pad} {
      font-size: 21px;
    }
  }

  input {
    ${inputStyle}

    width: 100%;
    max-width: 400px;
    margin: 10px 0 20px 0;
  }
`;

const ListsContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const List = styled.div`
  height: auto;
  margin-bottom: 30px;

  .list-content {
    padding: 0 10px;
    height: 0; // list 會有高度撐起來，需要這個
    background-color: ${props => props.theme.lightLogoGreen};
    border-radius: 0 0 10px 10px;
    transform: scale(1, 0);
    transform-origin: top;
    transition: none;

    @media ${pad} {
      padding: 0 20px;
    }
  }

  input[type='checkbox'] {
    display: none;

    &:checked ~ .list-content {
      height: auto;
      transform: scale(1, 1);
      transition: transform 0.2s ease;
    }

    &:checked ~ label {
      border-radius: 10px 10px 0 0;
    }
  }
`;

const ListHeader = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;
  background-color: ${props => props.theme.darkGreen};
  border-radius: 10px;
  color: ${props => props.theme.white};
  letter-spacing: 1px;
  font-size: 20px;
  cursor: pointer;

  @media ${pad} {
    flex-direction: row;
    font-size: 24px;
  }

  > p {
    margin: 10px 0;

    @media ${pad} {
      margin: 0;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  button,
  a {
    ${buttonStyle}

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px;
    background-color: ${props => props.theme.lightLogoGreen};
    font-size: 16px;
    color: ${props => props.theme.opBlack};
    cursor: pointer;

    @media ${pad} {
      font-size: 19px;
    }

    &.return {
      background-color: ${props => props.theme.red};
    }

    &.done {
      background-color: ${props => props.theme.darkYellow};
    }

    &:hover {
      filter: brightness(0.8);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Title = styled.p`
  margin: 15px 0;

  @media ${pad} {
    font-size: 29px;
  }
`;

const ResultTxt = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 21px;
  color: ${props => props.theme.darkGray};
`;

const ListItem = styled.div`
  padding: 20px;

  &:not(:last-child) {
    border-bottom: 3px solid ${props => props.theme.logoGreen};
  }
`;

const ItemType = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

const Category = styled.span`
  margin-right: 10px;
  font-weight: 700;
  font-size: 19px;
  color: ${props => props.theme.fontGreen};
  letter-spacing: 1px;

  @media ${pad} {
    font-size: 21px;
  }
`;

const SubCategories = styled.div`
  @media ${pad} {
    font-size: 18px;
  }

  span {
    display: inline-block;
    padding: 1px 3px;
    margin: 1px;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 10px;
    color: ${props => props.theme.darkGray};
    font-size: 16px;
  }
`;

const ItemTxt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 5px;
  align-items: center;

  @media ${pad} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
  }

  .name {
    font-size: 20px;
    font-weight: 700;

    @media ${pad} {
      font-size: 24px;
    }

    a {
      color: ${props => props.theme.opBlack};
    }
  }

  .reps {
    font-size: 19px;
  }

  .remark {
    grid-column: 1/3;
    font-size: 18px;
    color: ${props => props.theme.darkGray};

    @media ${pad} {
      grid-column: 3/4;
    }
  }
`;

const pageData = {
  bannerImg,
  title: '已排菜單',
  buttons: [
    {
      name: '未使用的菜單',
      url: '',
      class: 'default',
      type: 'button',
      action: 'list',
      disabled: false,
    },
    {
      name: '已使用的菜單',
      url: '',
      class: 'default',
      type: 'button',
      action: 'list-close',
      disabled: false,
    },
  ],
};

type displayShowType = {
  category: boolean;
  subcategory: boolean;
  reps: boolean;
};

export default function Lists() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams({});
  const queryIsUsed = searchParams.get('isUsed');

  const [pageButtons, setPageButtons] = useState(pageData.buttons);
  const [isUsed, setIsUsed] = useState<boolean>(queryIsUsed === 'true');
  const [lists, setList] = useState<ListType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [filterLists, setFilterLists] = useState<ListType[]>([]);

  // display setting
  const [displayShow, setDisplayShow] = useState<displayShowType>({
    category: true,
    subcategory: true,
    reps: true,
  });

  const buttonAction = (action: string) => {
    const buttonIsUsed = action === 'list-close';

    if (isUsed !== buttonIsUsed) {
      setIsUsed(buttonIsUsed);
    }
  };

  useEffect(() => {
    setList([]);
    setFilterLists([]);
    getListsData();
    setSearchParams({
      isUsed: String(isUsed),
    });

    const activeButton = isUsed ? 'list-close' : 'list';
    setPageButtons(
      pageData.buttons.map(button => ({
        ...button,
        class: button.action === activeButton ? 'default active' : 'default',
      }))
    );
  }, [isUsed]);

  const getListsData = () => {
    dispatch(setLoading(true));
    return getLists({ isUsed })
      .then(res => {
        setList(res);
        setFilterLists(res);
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    setFilterLists(lists.filter(list => list.name.includes(keyword)));
  }, [keyword]);

  const changeStauts = (id: number, name: string) => {
    confirmAlert(
      isUsed ? `確定要退回「${name}」` : `確定要將「${name}」標示為已使用`
    ).then(result => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        changeListStatus(id)
          .then(res => {
            if (res.status === 'success') {
              getListsData().then(() => {
                toastAlert(isUsed ? '已將此菜單退回' : '已標示為已使用');
              });
            }
          })
          .catch(() => {
            swalAlert('發生錯誤，請重試一次');
          })
          .finally(() => {
            dispatch(setLoading(false));
          });
      }
    });
  };

  const listDelete = (id: number, name: string) => {
    confirmAlert(`確定要刪除「${name}」`).then(result => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        deleteList(id)
          .then(res => {
            if (res.status === 'success') {
              getListsData().then(() => {
                toastAlert('已將此菜單刪除');
              });
            }
          })
          .catch(() => {
            swalAlert('發生錯誤，請重試一次');
          })
          .finally(() => {
            dispatch(setLoading(false));
          });
      }
    });
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageButtons}
        buttonAction={buttonAction}
        hasCart={true}
      ></Banner>

      <ListDisplay displayShow={displayShow} setDisplayShow={setDisplayShow} />

      <div className="container">
        <Search>
          <label>搜尋關鍵字：</label>
          <input
            type="text"
            placeholder=""
            onChange={e => setKeyword(e.target.value)}
          />
        </Search>

        <ListsContainer>
          <Title>{isUsed ? '已使用的表單' : '未使用的表單'}</Title>
          <ResultTxt>- 共 {filterLists.length} 個結果 -</ResultTxt>

          {filterLists.map(list => (
            <List key={list.id}>
              <input id={`list-${list.id}`} type="checkbox" />
              <ListHeader htmlFor={`list-${list.id}`}>
                <p>{list.name}</p>
                <div className="buttons">
                  <button
                    onClick={() => {
                      listDelete(list.id, list.name);
                    }}
                  >
                    刪除
                  </button>
                  <Link to={`/lists/${list.id}`}>編輯</Link>
                  <button
                    onClick={() => {
                      changeStauts(list.id, list.name);
                    }}
                    className={isUsed ? 'return' : 'done'}
                  >
                    {isUsed ? '退回' : '標示已使用'}
                  </button>
                </div>
              </ListHeader>

              <div className="list-content">
                {list.Items.map(item => (
                  <ListItem key={item.id}>
                    <ItemType>
                      {displayShow.category && (
                        <Category>{item.Category.name}</Category>
                      )}
                      {displayShow.subcategory && (
                        <SubCategories>
                          {item.Subcategories.map(subcategory => (
                            <span key={subcategory.id}>
                              {subcategory.name}{' '}
                            </span>
                          ))}
                        </SubCategories>
                      )}
                    </ItemType>

                    <ItemTxt>
                      <div className="name">
                        <Link to={`/${item.id}`}>{item.name}</Link>
                      </div>
                      {displayShow.reps ? (
                        <span className="reps">{item.ListItem.reps}</span>
                      ) : (
                        ''
                      )}
                      <span className="remark">{item.ListItem.remark}</span>
                    </ItemTxt>
                  </ListItem>
                ))}
              </div>
            </List>
          ))}
        </ListsContainer>
      </div>
    </>
  );
}
