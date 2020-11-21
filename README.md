# fgn-report
the test version of the fgn-report web application

To start the server
--------------------
npm run devStart
  

Admin endpoints
---------------
- to login to the dashboard => [/admin]
- to change the posts shown in the webpage => [/dashboard] (authentication required)

mainly there are two endpoints in the API
-----------------------------------------
1. /getPosts => method: GET, parameters: categories=[number], return: the selected posts in the category[JSON], authentication: none
2. /addPost => method: POST, parameters: none, body: JSON String, return: 200(OK), 304(post already in the database), authentication: required