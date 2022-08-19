import styled from 'styled-components';
import { pad } from 'components/variables';
import { StringSchema, NumberSchema, object } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// import { useAppSelector, useAppDispatch } from 'hooks/hooks';
// import { setAuth, RemoveAuth } from 'actions/user';

const FormContainer = styled.div`
  padding: 10px 20px 30px 20px;
  border-bottom: 1px solid ${props => props.theme.logoGreen};

  .input-box {
    padding: 10px 0;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    letter-spacing: 1px;

    @media ${pad} {
      font-size: 20px;
    }
  }

  input {
    padding: 4px 7px;
    width: 100%;
    border-radius: 3px;
    font-size: 17px;
  }

  .error-txt {
    margin-top: 5px;
    margin-left: 5px;
    color: ${props => props.theme.red};
    font-size: 15px;
  }
`;

const FormButton = styled.div`
  padding: 20px;

  button {
    height: 40px;
    width: 100%;
    background-color: ${props => props.theme.darkGreen};
    border-radius: 2px;
    color: ${props => props.theme.white};
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 3px;
    cursor: pointer;

    @media ${pad} {
      font-size: 20px;
    }

    &:hover,
    &.submitting {
      opacity: 0.7;
      transition: all 0.2s ease-out;
    }
  }
`;

type Obj = {
  initialValues: {
    [key: string]: string | number;
  };
  validationSchema: {
    [key: string]: StringSchema | NumberSchema;
  };
};

type Props = {
  data: {
    key: string;
    label: string;
    initialValue: string;
    validation: StringSchema | NumberSchema;
    type: string;
  }[];
  isLogin: boolean;
};

export default function UserForm(props: Props) {
  const { data, isLogin } = props;

  // const userInfo = useAppSelector(state => state.user);
  // const dispatch = useAppDispatch();

  let initialObj: Obj = {
    initialValues: {},
    validationSchema: {},
  };

  const dataFormat = data.reduce((obj, item) => {
    const { initialValues, validationSchema } = obj;

    initialValues[item.key] = item.initialValue;
    validationSchema[item.key] = item.validation;

    return {
      initialValues,
      validationSchema,
    };
  }, initialObj);

  return (
    <Formik
      initialValues={dataFormat.initialValues}
      validationSchema={object(dataFormat.validationSchema)}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 500);
      }}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form>
          <FormContainer>
            {data.map(item => (
              <div className="input-box" key={item.key}>
                <label htmlFor={item.key}>{item.label}：</label>
                <Field
                  name={item.key}
                  id={item.key}
                  type={item.type}
                  value={values[item.key] || ''}
                />

                <ErrorMessage
                  name={item.key}
                  render={msg => <p className="error-txt">⚠ {msg}</p>}
                />
              </div>
            ))}
          </FormContainer>
          <FormButton>
            <button type="submit">{isLogin ? '登入' : '註冊'}</button>
          </FormButton>
        </Form>
      )}
    </Formik>
  );
}
