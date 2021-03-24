# learn_koajs


### Install package `npm install package`
### Run server `yarn start`

1. Bài 1: đọc data từ file

2. Bài 2: Writing Middleware
   https://github.com/koajs/koa/blob/master/docs/guide.md#writing-middleware
   
3. Bài 3: Middleware Best Practices.
   https://github.com/koajs/koa/blob/master/docs/guide.md#middleware-best-practices

4. Bài 4: Combining multiple middleware with koa-compose
   https://github.com/koajs/koa/blob/master/docs/guide.md#combining-multiple-middleware-with-koa-compose
   
5. Bài 5: sử dụng Koa-router

6. Bài 6: sử dụng Koa-router truyền tham số qua url.

7. Bài 7: truyền tham số JSON
```sh
curl -X POST \
  http://localhost:3000/post \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"name": "tran quang chung"}'
```
8. Bài 8: Logging Requests on Console
   http://polyglot.ninja/koajs-mongodb-rest-api/
   
9. Bài 9: RESTful routes and use MongoDB CRUD operations
   http://polyglot.ninja/rest-api-koajs-and-mongodb-part-2/

10. Bài 10: JWT with KoaJS
    http://polyglot.ninja/rest-api-koajs-mongodb-part-3/
    
11. Bài 11: Sử dụng template html và axios để kết nối server

12. Bài 12: Sử dụng `mongoose` tạo `Schema` và `Model` theo kiểu `Object Data Modeling (ODM)`
    https://mongoosejs.com/docs/
    
 ```shell
 curl -X POST \
   http://localhost:3000/kitten \
   -H 'cache-control: no-cache' \
   -H 'content-type: application/json' \
   -d '{"name": "doremon"}'
 ```
13. Bài 13: Admin page, Password hashing, Authentication
    https://itnext.io/koa-just-got-a-beautiful-auto-generated-admin-panel-f5f89d83e892
    
14. Bài 14: Lập lịch
    https://github.com/agenda/agenda

15. Bài 15: Upload file
    https://laptrinhx.com/simple-file-upload-using-koa-js-4161206947/

16. Bài 16: chuyển đổi định dang mp3 <=> wav sử dụng `child_process`
