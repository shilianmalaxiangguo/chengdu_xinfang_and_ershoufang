// 在其他组件或服务中使用
import http from '@/utils/http';


//
// // POST 请求
// http.post('/users', { name: 'John', age: 30 }).then(response => {
//   console.log(response);
// }).catch(error => {
//   console.error(error);
// });


export const getErFangZiList = (params) => {
  return http.get('news/list?page=1&category=lk:xinfangzixun', { params });
}
