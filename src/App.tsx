import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetStyle, GlobalStyle } from 'components/globalStyle';
import { theme } from 'components/variables';

import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { removeAuth, setAuth } from 'actions/user';
import { getCurrentUser } from 'api/user';

// loading
import Loading from 'components/Loading';

// router
import Header from 'components/header/Header';
import UserCard from 'components/user/UserCard'; // 登入註冊頁面
import Home from 'components/home/Home';
import Create from 'components/create/Create';
import Item from 'components/itemPage/ItemPage';
import Close from 'components/close/Close';
import Setting from 'components/setting/Setting';
import HowToUse from 'components/howToUse/HowToUse';
import Lists from 'components/lists/Lists';
import ListItems from 'components/listItems/ListItems';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const path = location.pathname;
  const tokenInLocal = localStorage.getItem('token');
  const { isLogin } = useAppSelector(state => state.user);
  const { isLoading } = useAppSelector(state => state.loading);

  const isLoginCannotEnter = ['/login', '/register'].includes(path); // 是否為登入後不可進入的頁面
  const loginRedirect = '/';
  const notLoginRedirect = 'login';

  // 權限驗證
  useEffect(() => {
    if (path === '/how-to-use') {
      return;
    }

    if (isLogin) {
      if (isLoginCannotEnter) {
        navigate(loginRedirect, { replace: true });
      }
    } else {
      if (tokenInLocal) {
        getCurrentUser(tokenInLocal)
          .then(res => {
            if (res) {
              const { name, email, id } = res;
              dispatch(
                setAuth({
                  token: tokenInLocal,
                  isLogin: true,
                  user: { id, name, email },
                })
              );

              if (isLoginCannotEnter) {
                navigate(loginRedirect, { replace: true });
              }
            }
          })
          .catch(() => {
            dispatch(removeAuth());
            localStorage.removeItem('token');

            if (!isLoginCannotEnter) {
              navigate(notLoginRedirect, { replace: true });
            }
          });
      } else {
        dispatch(removeAuth());
        localStorage.removeItem('token');

        if (!isLoginCannotEnter) {
          navigate(notLoginRedirect, { replace: true });
        }
      }
    }
  }, [path]);

  return (
    <div className="App">
      <ResetStyle />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserCard isLogin={true} />} />
            <Route path="/register" element={<UserCard isLogin={false} />} />
            <Route path="/create" element={<Create isCreate={true} />} />
            <Route path="/edit/:id" element={<Create isCreate={false} />} />
            <Route path="/:id" element={<Item />} />
            <Route path="/close" element={<Close />} />
            <Route
              path="/setting/category"
              element={<Setting settingType={'category'} />}
            />
            <Route
              path="/setting/subcategory"
              element={<Setting settingType={'subcategory'} />}
            />
            <Route path="/lists" element={<Lists />} />
            <Route path="/lists/:id" element={<ListItems isCart={false} />} />
            <Route path="/cart" element={<ListItems isCart={true} />} />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Routes>
        </div>
        {isLoading && <Loading />}
      </ThemeProvider>
    </div>
  );
}

export default App;
