import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { pad } from 'components/variables';

import { getSubcategories } from 'api/setting';
import { useAppSelector } from 'hooks/hooks';

import {
  CategoriesType,
  SubCategoriesType,
  ItemType,
} from 'components/data.type';

const CardsSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: ${props => props.theme.darkGray};
  font-size: 17px;

  @media ${pad} {
    padding-top: 50px;
  }

  > * {
    width: 100%;
  }

  .cards-search-toggle {
    display: none;

    &:checked ~ .cards-search-toggle-label {
      border-radius: 4px 4px 0 0;
    }
    &:checked ~ .cards-search-form {
      display: block;
    }
  }

  .cards-search-toggle-label {
    display: block;
    padding: 5px;
    background-color: ${props => props.theme.logoGreen};
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;

    @media ${pad} {
      max-width: 100%;
      width: 700px;
      padding: 10px;
    }
  }
`;

const CardsSearchForm = styled.div`
  display: none;
  padding: 5px 20px;
  border: 3px solid ${props => props.theme.logoGreen};

  @media ${pad} {
    width: 50%;
    width: 700px;
    border-radius: 0 0 10px 10px;
    padding: 10px 30px 0px 30px;
  }

  h2 {
    display: none;

    @media ${pad} {
      display: block;
      padding-bottom: 20px;
      font-size: 24px;
      letter-spacing: 2px;
      text-align: center;
    }
  }

  span {
    @media ${pad} {
      letter-spacing: 1px;
      font-size: 20px;
    }
  }
`;

const SearchItem = styled.div`
  margin: 15px 0;

  input[type='text'] {
    padding: 6px 5px 3px 5px;
    width: 100%;
    border-radius: 3px;
    border: 1.5px solid ${props => props.theme.logoGreen};
    font-size: 16px;
    color: ${props => props.theme.fontGreen};
  }

  &.one-line {
    display: flex;
    align-items: center;
  }
`;

const CheckboxLabel = styled.div`
  input[type='checkbox'] {
    display: none;

    ~ label {
      padding: 0 5px;
      border: 1px solid ${props => props.theme.lightGray};
      border-radius: 10px;
      color: ${props => props.theme.fontGray};
      cursor: pointer;
    }

    &:checked ~ label {
      border: 1px solid ${props => props.theme.logoGreen};
      color: ${props => props.theme.fontGreen};
    }
  }

  &.has-gap {
    margin-left: 8px;
  }
`;

const CategoriesSelect = styled.select`
  padding: 3px;
  margin-left: 10px;
  width: 20%;
  min-width: 100px;
  border: 1px solid ${props => props.theme.logoGreen};
  border-radius: 4px;
  font-size: 15px;
`;

const SubcategoryItem = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:first-child {
    margin-bottom: 10px;
  }

  .subcategory-checkbox {
    margin: 7px 3px;
  }
`;

const SubcategoryController = styled.div`
  display: flex;

  button {
    padding: 0 5px;
    margin-left: 10px;
    background-color: ${props => props.theme.logoGreen};
    border-radius: 10px;
    color: ${props => props.theme.lightGray};
    letter-spacing: 1px;
    font-size: 15px;
    cursor: pointer;
  }
`;

type Props = {
  oriItems: ItemType[];
  setCurrentShowItems: (value: ItemType[]) => void;
};

export default function searchBar(props: Props) {
  const { oriItems, setCurrentShowItems } = props;
  const { isLogin } = useAppSelector(state => state.user);

  // 原始資料
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoriesType[]>([]);

  // api
  useEffect(() => {
    if (isLogin) {
      getSubcategories().then(res => {
        const { categories: OriCate, subcategories: OriSub } = res;
        setCategories(OriCate);
        setSubcategories(OriSub);
      });
    }
  }, [isLogin]);

  // search bar 顯示的主分類和次分類
  const [currentCate, setCurrentCate] = useState<string>('');
  const [currentShowSub, setCurrentShowSub] = useState<number[]>([]);

  const categoriesHandler = (value: string) => {
    setCurrentCate(value);
  };

  const filterSubcategories = (value: string) => {
    const subArr: number[] =
      value === 'all'
        ? subcategories.map(subcategory => subcategory.id)
        : subcategories.reduce((arr: number[], subcategory) => {
            if (subcategory.CategoryId === Number(value)) {
              return [...arr, subcategory.id];
            } else {
              return arr;
            }
          }, []);
    setCurrentSub(subArr);
    setCurrentShowSub(subArr);
  };

  // 主分類改變時更換次分類
  useEffect(() => {
    filterSubcategories(currentCate);
  }, [currentCate]);

  // api 回傳 subcategories 後設置顯示和勾選的次分類
  useEffect(() => {
    filterSubcategories('all');
  }, [subcategories]);

  // filter items
  const [keyword, setKeyword] = useState<string>('');
  const [currentSub, setCurrentSub] = useState<number[]>([]); // 選取的次分類
  const [isLike, setIsLike] = useState<boolean>(false);

  const subcategoriesChecked = (value: boolean, id: number) => {
    if (value && !currentSub.includes(id)) {
      setCurrentSub([...currentSub, id]);
    } else {
      setCurrentSub(currentSub.filter(item => item !== id));
    }
  };
  const checkedAll = () => {
    setCurrentSub(subcategories.map(subcategory => subcategory.id));
  };
  const checkedNone = () => {
    setCurrentSub([]);
  };

  // TODO: 連接正式站時，觀察是否需要加上loading畫面
  useEffect(() => {
    let filterItems: ItemType[] = oriItems;
    if (isLike) {
      filterItems = filterItems.filter(item => item.isLiked);
    }

    if (keyword) {
      filterItems = filterItems.filter(item => item.name.includes(keyword));
    }

    filterItems = filterItems.filter(item =>
      item.Subcategories.some(subcategory =>
        currentSub.includes(subcategory.id)
      )
    );
    setCurrentShowItems(filterItems);
  }, [currentSub, isLike, keyword]);

  return (
    <>
      <CardsSearch className="container">
        <input
          type="checkbox"
          id="cards-search-toggle"
          className="cards-search-toggle"
        />
        <label
          htmlFor="cards-search-toggle"
          className="cards-search-toggle-label"
        >
          打開篩選列
        </label>

        <CardsSearchForm className="cards-search-form">
          <SearchItem>
            <input
              onChange={e => setKeyword(e.target.value)}
              type="text"
              placeholder="搜尋關鍵字"
            />
          </SearchItem>

          <SearchItem className="one-line">
            <CheckboxLabel>
              <input
                type="checkbox"
                className="like"
                id="like"
                checked={isLike}
                onChange={e => setIsLike(e.target.checked)}
              />
              <label htmlFor="like">只顯示星號項目</label>
            </CheckboxLabel>
          </SearchItem>

          <SearchItem>
            <span>運動類別</span>
            <CategoriesSelect
              value={currentCate}
              onChange={e => categoriesHandler(e.target.value)}
            >
              <option value="all">全部</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </CategoriesSelect>
          </SearchItem>

          <SearchItem className="subcategory">
            <SubcategoryItem>
              <span>項目類型</span>
              <SubcategoryController>
                <button onClick={checkedAll}>全選</button>
                <button onClick={checkedNone}>全不選</button>
              </SubcategoryController>
            </SubcategoryItem>

            <SubcategoryItem>
              {subcategories.map(subcategory => {
                if (currentShowSub.includes(subcategory.id)) {
                  return (
                    <CheckboxLabel
                      key={subcategory.id}
                      className="subcategory-checkbox"
                    >
                      <input
                        type="checkbox"
                        id={`sub-${subcategory.id}`}
                        checked={currentSub.includes(subcategory.id)}
                        onChange={e =>
                          subcategoriesChecked(e.target.checked, subcategory.id)
                        }
                      />
                      <label htmlFor={`sub-${subcategory.id}`}>
                        {subcategory.name}
                      </label>
                    </CheckboxLabel>
                  );
                }
              })}
            </SubcategoryItem>
          </SearchItem>
        </CardsSearchForm>
      </CardsSearch>
    </>
  );
}
