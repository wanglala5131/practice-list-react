import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { pad, inputStyle, buttonStyle } from 'components/variables';

import { toastAlert, swalAlert, confirmAlert } from 'helpers/alert';
import { SubCategoriesType, CategoriesType } from 'components/data.type';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import {
  getSubcategories,
  getCategories,
  addCategory,
  addSubcategory,
  deleteCategory,
  deleteSubcategory,
  putCategory,
  putSubcategory,
} from 'api/setting';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/setting-page.jpeg';

const SettingContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;
`;

const PageSubtitle = styled.h2`
  margin: 30px 0 20px;
  font-size: 20px;
  font-weight: 500;

  @media ${pad} {
    font-size: 26px;
  }
`;

const CreateArea = styled.div`
  @media ${pad} {
    display: flex;
    justify-content: center;
  }

  input {
    ${inputStyle}

    width: 100%;

    @media ${pad} {
      flex-grow: 1;
      width: 50%;
    }
  }

  select {
    ${inputStyle}

    margin-left: 10px;
  }

  button {
    ${buttonStyle}

    background-color: ${props => props.theme.gray};
    color: ${props => props.theme.darkGray};

    @media ${pad} {
      margin-left: 10px;
    }

    &:disabled {
      opacity: 0.5;
    }

    &:not(:disabled):hover {
      filter: brightness(0.8);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
  }

  * {
    margin-bottom: 10px;
  }
`;

const ListArea = styled.div`
  margin: 0 auto 50px auto;
  padding: 20px 0 40px 0;
`;

const Remind = styled.p`
  padding: 5px;
  font-size: 16px;
  color: ${props => props.theme.darkGray};
  line-height: 1.2;

  @media ${pad} {
    font-size: 18px;
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 62px;
  padding: 0px 30px;
  margin: 10px 0;
  background-color: ${props => props.theme.lightLogoGreen};
  border-radius: 20px;
`;

const ItemTxt = styled.div`
  flex-basis: 80%;
  font-size: 20px;

  p {
    padding: 0 7px 2px 0;
  }

  input {
    ${inputStyle}
    display: none;
    width: 100%;
    font-size: 20px;
  }

  &.editing {
    p {
      display: none;
    }
    input {
      display: block;
    }
  }
`;

const ItemCategory = styled.div`
  flex-basis: 15%;

  @media ${pad} {
    margin-right: 20px;
  }

  select {
    ${inputStyle}

    margin: 15px 10px;
    max-width: 120px;
  }
`;

const ItemButton = styled.div`
  flex-basis: 5%;
  text-align: right;

  &.category {
    flex-basis: 20%;
  }

  button {
    padding: 0;
    font-size: 32px;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.fontGreen};
    }
  }
`;

const pageData = {
  bannerImg,
  title: '類別設定',
  buttons: [
    {
      name: '項目類型',
      url: '/setting/subcategory',
      class: 'default active',
      type: 'link',
      action: 'subcategory',
      disabled: false,
    },
    {
      name: '運動類別',
      url: '/setting/category',
      class: 'default',
      type: 'link',
      action: 'category',
      disabled: false,
    },
  ],
};

type Props = {
  settingType: string;
};

export default function Setting(props: Props) {
  const { settingType } = props;
  const dispatch = useAppDispatch();

  const [pageButtons, setPageButtons] = useState(pageData.buttons);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const addInput = useRef<HTMLInputElement>(null);
  const addSelect = useRef<HTMLSelectElement>(null);

  const [currentData, setCurrentData] = useState<
    SubCategoriesType[] | CategoriesType[]
  >([]);
  const [currentEditId, setCurrentEditId] = useState<number>(0);
  const [createValue, setCreateValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('-1');

  // api
  useEffect(() => {
    getSetting();
  }, []);

  useEffect(() => {
    setPageButtons(
      pageData.buttons.map(button => {
        button.class =
          button.action === settingType ? 'default active' : 'default';
        return button;
      })
    );
    getSetting();
  }, [settingType]);

  const getSetting = () => {
    dispatch(setLoading(true));
    if (settingType === 'subcategory') {
      return getSubcategories()
        .then(res => {
          const { categories: oriCategories, subcategories: oriSubcategories } =
            res;

          setCurrentData(
            oriSubcategories.map(subcategory => ({
              ...subcategory,
              hasItems: subcategory.Items
                ? subcategory.Items?.length > 0
                : false,
            }))
          );
          setCategories(oriCategories);
        })
        .catch(() => {
          swalAlert('發生錯誤，請重試一次');
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      return getCategories()
        .then(res => {
          setCurrentData(
            res.map(category => ({
              ...category,
              hasItems: category.Subcategories
                ? category.Subcategories?.length > 0
                : false,
            }))
          );
          setCategories(res);
        })
        .catch(() => {
          swalAlert('發生錯誤，請重試一次');
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const changeEdit = (id: number) => {
    setCurrentEditId(id);
  };

  const changeCreateValue = (value: string) => {
    setCreateValue(value);
  };

  const submit = () => {
    if (!createValue || (!selectValue && settingType === 'subcategory')) {
      swalAlert('請填入資料');
      return;
    }

    dispatch(setLoading(true));
    addApi(createValue, selectValue)
      .then(res => {
        if (res) {
          getSetting().then(() => {
            toastAlert('新增成功');
            resetAddInput();
          });
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const addApi = (createValue: string, selectValue: string) => {
    if (settingType === 'subcategory') {
      return addSubcategory({
        name: createValue,
        CategoryId: Number(selectValue),
      });
    } else {
      return addCategory({ name: createValue });
    }
  };

  const resetAddInput = () => {
    if (addInput.current) {
      addInput.current.value = '';
    }

    if (addSelect.current) {
      addSelect.current.value = '-1';
    }
  };

  const deleteItem = (id: number, name: string) => {
    confirmAlert(`確定要刪除「${name}」嗎`).then(result => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        const deleteApi =
          settingType === 'subcategory' ? deleteSubcategory : deleteCategory;

        deleteApi(id)
          .then(res => {
            if (res.status === 'success') {
              getSetting().then(() => {
                toastAlert('刪除成功');
              });
            } else {
              swalAlert(res.message || '發生錯誤，請重試一次');
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

  const changeValue = (
    id: number,
    value: { name?: string; CategoryId?: number }
  ) => {
    if (!!value.name && value.name === '') {
      swalAlert('請填入資料');
      return;
    }

    dispatch(setLoading(true));

    putApi(id, value)
      .then(res => {
        if (res.status === 'success') {
          getSetting().then(() => {
            toastAlert('修改成功');
          });
        } else {
          swalAlert(res.message || '發生錯誤，請重試一次');
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        changeEdit(0);
        dispatch(setLoading(false));
      });
  };

  const putApi = (
    id: number,
    value: { name?: string; CategoryId?: number }
  ) => {
    return settingType === 'subcategory'
      ? putSubcategory(id, value)
      : putCategory(id, { name: value.name || '' });
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageButtons}
        hasCart={false}
      ></Banner>

      <SettingContainer>
        <div>
          <PageSubtitle>
            新增{settingType === 'subcategory' ? '項目類型' : '運動類別'}
          </PageSubtitle>
          <CreateArea>
            <input
              ref={addInput}
              type="text"
              placeholder={`填入${
                settingType === 'subcategory' ? '項目類型' : '運動類別'
              }`}
              onChange={e => {
                changeCreateValue(e.target.value);
              }}
            />
            {settingType === 'subcategory' && (
              <select
                name="add-select"
                id="add-select"
                ref={addSelect}
                onChange={e => {
                  setSelectValue(e.target.value);
                }}
              >
                <option value="-1" hidden>
                  選擇運動類別
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={submit}
              disabled={
                !createValue || (!selectValue && settingType === 'subcategory')
              }
            >
              新增
            </button>
          </CreateArea>
        </div>

        <ListArea>
          <div className="setting-table-title">
            <PageSubtitle>
              目前的{settingType === 'subcategory' ? '項目類型' : '運動類別'}
            </PageSubtitle>
            <Remind>
              {settingType === 'subcategory'
                ? '點兩下可編輯名稱，若此項目尚有「運動項目」，則無法改變運動類別與刪除'
                : '點兩下可編輯名稱，若此類別尚有「項目類型」，則無法刪除'}
            </Remind>
          </div>
          {currentData.map(item => (
            <ListItem key={item.id}>
              <ItemTxt
                onDoubleClick={e => {
                  changeEdit(item.id);

                  const target = e.target as HTMLElement;
                  setTimeout(() => {
                    (target.nextElementSibling as HTMLInputElement).focus();
                  }, 0);
                }}
                className={currentEditId === item.id ? 'editing' : ''}
              >
                <p>{item.name}</p>
                <input
                  type="text"
                  name="subcategory"
                  defaultValue={item.name}
                  onBlur={e => {
                    if (item.name !== e.target.value) {
                      changeValue(item.id, { name: e.target.value });
                    } else {
                      changeEdit(0);
                    }
                  }}
                />
              </ItemTxt>

              {settingType === 'subcategory' && (
                <ItemCategory>
                  <select
                    name="edit-select"
                    id="edit-select"
                    disabled={item.hasItems}
                    defaultValue={item.CategoryId}
                    onChange={e => {
                      if (item.hasItems) return;

                      changeValue(item.id, {
                        CategoryId: Number(e.target.value),
                      });
                    }}
                  >
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </ItemCategory>
              )}

              <ItemButton className={settingType}>
                {item.hasItems || (
                  <button onClick={() => deleteItem(item.id, item.name)}>
                    &times;
                  </button>
                )}
              </ItemButton>
            </ListItem>
          ))}
        </ListArea>
      </SettingContainer>
    </>
  );
}
