import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pad, inputStyle, buttonStyle } from 'components/variables';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number, array } from 'yup';

import { SubCategoriesType, CategoriesType } from 'components/data.type';
import { formDataType } from './form.type';

// fake
import { categories, subcategories } from 'assets/fake-data/fake';

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;

  @media ${pad} {
    padding: 10px 20px;
  }

  h2 {
    padding: 10px 0 10px 5px;
    border-bottom: 2px solid ${props => props.theme.darkGray};
    color: ${props => props.theme.darkGray};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 2px;

    @media ${pad} {
      padding: 20px 0 30px 5px;
      font-size: 24px;
    }
  }
`;

const SubcategriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const Subcategories = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  label {
    padding: 0 3px;
    margin: 3px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    color: rgba(0, 0, 0, 0.2);
    line-height: 2;

    &.active {
      border: 2px solid ${props => props.theme.darkGreen};
      color: ${props => props.theme.darkGreen};
    }
  }
`;

const InputBox = styled.div`
  padding: 20px 10px;
  border-bottom: 1px solid ${props => props.theme.gray};
  font-size: 18px;

  @media ${pad} {
    padding: 30px 20px;
    font-size: 21px;
  }

  textarea {
    ${inputStyle}

    margin: 10px 0;
    width: 100%;
    height: 100px;
    line-height: 1.4;
    resize: none;
  }

  input[type='text'] {
    ${inputStyle}

    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }

  input[type='file'] {
    display: block;
    margin-top: 10px;
    font-size: 14px;

    @media ${pad} {
      font-size: 18px;
    }
  }

  select {
    ${inputStyle}

    margin-left: 10px;
  }

  .error-txt {
    color: ${props => props.theme.red};
    font-size: 16px;
  }
`;

const ItemLabel = styled.label`
  &.required {
    &::after {
      content: '*';
      color: ${props => props.theme.red};
    }
  }
`;

const ImgBox = styled.div`
  margin: 10px 0;
  width: 100%;
  img {
    width: 100%;
  }
`;

const FormButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;

  @media ${pad} {
    padding: 10px 20px;
  }

  > * {
    ${buttonStyle}

    margin-top: 10px;
    color: ${props => props.theme.black};
    font-size: 15px;
    cursor: pointer;

    @media ${pad} {
      font-size: 17px;
    }

    &:hover {
      filter: brightness(0.9);
      transition: all 0.2s ease-out;
    }
  }

  .back,
  .delete {
    background-color: ${props => props.theme.gray};
  }

  .submit {
    background-color: ${props => props.theme.logoGreen};
  }
`;

const validationSchema = {
  name: string().required('此欄位為必填').max(255, '最多 255 字'),
  category: number().required('此欄位為必填'),
  subcategories: array().of(number()).min(1, '請至少選擇一項'),
  limit: string().max(255, '最多 255 字'),
  description: string().max(255, '最多 255 字'),
};

type Props = {
  item: formDataType;
  isCreate: boolean;
};

export default function ItemsForm(props: Props) {
  const { item, isCreate } = props;
  const [oriCategories, setOriCategories] = useState<CategoriesType[]>([]);
  const [oriSubcategories, setOriSubcategories] = useState<SubCategoriesType[]>(
    []
  );
  const [category, setCategory] = useState<number>(0);

  const [currentShowSub, setCurrentShowSub] = useState<SubCategoriesType[]>([]);
  const [currentImg, setCurrentImg] = useState<File>();
  const [currentImgUrl, setCurrentImgUrl] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      setOriCategories(categories);
      setOriSubcategories(subcategories);
    }, 800);
  }, []);

  useEffect(() => {
    setCategory(item.category);

    if (item.file) {
      setCurrentImgUrl(item.file);
    }

    //  oriSubcategories 有值才 set
    if (oriSubcategories.length > 0 && currentShowSub.length === 0) {
      setCurrentShowSub(
        oriSubcategories.filter(
          subcategory => subcategory.CategoryId === item.category
        )
      );
    }
  }, [item.category]);

  // 防止 oriSubcategories 較晚拿到值
  useEffect(() => {
    if (currentShowSub.length === 0) {
      setCurrentShowSub(
        oriSubcategories.filter(
          subcategory => subcategory.CategoryId === item.category
        )
      );
    }
  }, [oriSubcategories]);

  type setFieldValueType = (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;

  // 修改 category
  const changeCategory = (
    categoryId: number,
    setFieldValue: setFieldValueType
  ) => {
    setFieldValue('category', categoryId);
    setFieldValue('subcategories', []);
    setCategory(categoryId);
  };
  useEffect(() => {
    setCurrentShowSub(
      oriSubcategories.filter(
        subcategory => subcategory.CategoryId === category
      )
    );
  }, [category]);

  const uploadImg = (imgFile: File) => {
    const imageURL = window.URL.createObjectURL(imgFile);
    setCurrentImg(imgFile);
    setCurrentImgUrl(imageURL);
  };

  return (
    <Formik
      initialValues={item}
      validationSchema={object(validationSchema)}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          console.log(currentImg);
          setSubmitting(false);
        }, 500);
      }}
      enableReinitialize={true}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FormContainer>
            <h2>{isCreate ? '新增' : '編輯'}項目</h2>
            <InputBox>
              <ItemLabel htmlFor="name" className="required">
                項目名稱
              </ItemLabel>
              <Field id="name" name="name" type="text" />
              <ErrorMessage
                name="name"
                render={msg => <p className="error-txt">⚠ {msg}</p>}
              />
            </InputBox>

            <InputBox>
              <ItemLabel htmlFor="category" className="required">
                運動種類
              </ItemLabel>
              <select
                id="category"
                name="category"
                value={category}
                onChange={e =>
                  changeCategory(Number(e.target.value), setFieldValue)
                }
              >
                <option value="0" disabled>
                  請選擇
                </option>
                {oriCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="category"
                render={msg => <p className="error-txt">⚠ {msg}</p>}
              />
            </InputBox>

            <InputBox>
              <ItemLabel className="required">運動類別</ItemLabel>
              <SubcategriesWrapper>
                {currentShowSub.map(subcategory => (
                  <Subcategories key={subcategory.id}>
                    <Field
                      type="checkbox"
                      id={`sub-${subcategory.id}`}
                      name="subcategories"
                      value={subcategory.id}
                    />
                    <label
                      htmlFor={`sub-${subcategory.id}`}
                      className={
                        values.subcategories.includes(String(subcategory.id))
                          ? 'active'
                          : ''
                      }
                    >
                      {subcategory.name}
                    </label>
                  </Subcategories>
                ))}
              </SubcategriesWrapper>
              <ErrorMessage
                name="subcategories"
                render={msg => <p className="error-txt">⚠ {msg}</p>}
              />
            </InputBox>

            <InputBox>
              <ItemLabel htmlFor="limit">限制</ItemLabel>
              <Field id="limit" name="limit" type="text" />
              <ErrorMessage
                name="limit"
                render={msg => <p className="error-txt">⚠ {msg}</p>}
              />
            </InputBox>

            <InputBox>
              <ItemLabel htmlFor="description">項目描述</ItemLabel>
              <Field id="description" name="description" as="textarea" />
              <ErrorMessage
                name="description"
                render={msg => <p className="error-txt">⚠ {msg}</p>}
              />
            </InputBox>

            <InputBox>
              <ItemLabel htmlFor="image">相關圖片</ItemLabel>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files) {
                    uploadImg(e.target.files[0]);
                  }
                }}
              />
              {currentImgUrl && (
                <ImgBox>
                  <img src={currentImgUrl} />
                </ImgBox>
              )}
            </InputBox>
            <FormButton>
              <Link className="back" to="/">
                回首頁
              </Link>
              {item.file && <button className="delete">只刪除圖片</button>}
              <button className="submit" type="submit">
                送出表單
              </button>
            </FormButton>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
}
