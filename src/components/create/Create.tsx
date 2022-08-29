import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { pad } from 'components/variables';

import { formDataType } from './form.type';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { swalAlert } from 'helpers/alert';
import { getItem } from 'api/item';

import BackgroundImage from 'components/BackgroundImage';
import ItemsForm from './ItemsForm';

const Container = styled.div`
  padding: 30px 10px;

  @media ${pad} {
    padding: 90px 0;
  }

  h2 {
    padding: 20px 0 30px 5px;
    border-bottom: 2px solid ${props => props.theme.darkGray};
    color: ${props => props.theme.darkGray};
    font-weight: 700;
    text-align: center;
    letter-spacing: 2px;
  }
`;

type Props = {
  isCreate: boolean;
};

const initialValues = {
  name: '',
  category: 0,
  subcategories: [],
  limit: '',
  description: '',
  file: undefined,
};

export default function Create(props: Props) {
  const dispatch = useAppDispatch();
  const { isCreate } = props;
  const [currentData, setCurrentData] = useState<formDataType>(initialValues);

  let { id } = useParams();

  useEffect(() => {
    if (!isCreate) {
      dispatch(setLoading(true));
      getItem(Number(id))
        .then(res => {
          const { item } = res;

          const data = {
            name: item.name + id,
            category: item.Category.id,
            subcategories: item.Subcategories.map(subcategory =>
              String(subcategory.id)
            ),
            limit: item.limit,
            description: item.description,
            file: item.image || '',
          };

          setCurrentData(data);
        })
        .catch(() => {
          swalAlert('發生錯誤，請重試一次');
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, []);

  return (
    <>
      <BackgroundImage />
      <Container>
        <ItemsForm item={currentData} isCreate={isCreate} />
      </Container>
    </>
  );
}
