import { Message } from 'element-ui';
export default function ({app, $axios, redirect}) {
  let token = sessionStorage.getItem('pl-token') || '';
  if (token) {
    $axios.defaults.headers.common['pl-token'] = token;
  } else {
    // if (location.href.indexOf('login') === -1) {
    //   location.href = '/login';
    // }
  }

  $axios.interceptors.response.use(function (response) {
    if (response.data.code === 200) {
      return response;
    } else if (response.data.code === 401) {
      Message.error("登录失效,请重新登录")
      app.router.replace({
        path: "/login",
        query: {
          redirect: app.router.currentRoute.fullPath
        }
      })
    } else {
      Message({
        message: response.data.message,
        type: 'error'
      });
      return Promise.reject(response.data.message);
    }
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code == 401) {
      Message({
        message: error.response.data.errMsg,
        type: 'error'
      });
      app.router.replace({
        path: "/login",
        query: {
          redirect: app.router.currentRoute.fullPath
        }
      })
      // setTimeout(() => {
      //   app.router.push('/login')
      // }, 500)
    } else if (code >= 400 && code < 500) {
      Message({
        message: error.response.data.errMsg,
        type: 'error'
      });
    } else if (code == 500) {
      Message({
        message: '服务器内部错误',
        type: 'error'
      });
    }
  })
}
