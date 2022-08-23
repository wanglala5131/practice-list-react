import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { removeAuth, setAuth } from 'actions/user';
import { getCurrentUser } from 'api/user';

export const LoginAuth = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname;

  const tokenInLocal = localStorage.getItem('token');
  const { isLogin } = useAppSelector(state => state.user);

  const isLoginCannotEnter = ['/login', '/register'].includes(path); // 是否為登入後不可進入的頁面
  const loginRedirect = '/';
  const notLoginRedirect = 'login';

  if (isLogin) {
    return isLoginCannotEnter ? (
      <Navigate to={loginRedirect} replace />
    ) : (
      <Outlet />
    );
  } else {
    if (tokenInLocal) {
      getCurrentUser(tokenInLocal)
        .then(res => {
          if (res) {
            const { name, email, id } = res;
            setAuth({
              token: tokenInLocal,
              isLogin: true,
              user: { id, name, email },
            });

            return isLoginCannotEnter ? (
              <Navigate to={loginRedirect} replace />
            ) : (
              <Outlet />
            );
          }
        })
        .catch(() => {
          dispatch(removeAuth());
          localStorage.removeItem('token');
          return isLoginCannotEnter ? (
            <Outlet />
          ) : (
            <Navigate to={notLoginRedirect} replace />
          );
        });
      return <Outlet />;
    } else {
      dispatch(removeAuth());
      localStorage.removeItem('token');
      return isLoginCannotEnter ? (
        <Outlet />
      ) : (
        <Navigate to={notLoginRedirect} replace />
      );
    }
  }

  //   return <Outlet />;
};

// loginPath
// isLogin = true ，導到 <Outlet />
// isLogin = false ， 看localStorage有沒有token
// >> 有token ，驗證並取回資料，成功就導回 <Outlet />，失敗導到 '/login'
// >> 無token ，導到 '/login'

// isLoginCannotEnter
// isLogin = true ，導到 '/'
// isLogin = false ， 看localStorage有沒有token或比對store裡token是否相同
// >> 有token ， 驗證並取回資料，成功就導回 '/'，失敗導到 <Outlet />
// >> 無token ， 導到 <Outlet />
