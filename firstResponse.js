export const firstResponse = {
       "message": "Welcome to the API of Rio color pinturerias",
       "public_routes": [
           {
               "method": "GET",
               "path": [
                   "/category", 
                   "/Products/:id",
                   "/Products",
                   "/recover",
                   "/recover/:token"
               ],
               "description": "Get all products"
           },
           {
               "method": "POST",
               "path": [
                   "/register",
                   "/login",
                   "/recover"
               ],
               "description": "Create user, login, recover password"
           },
           {
               "method": "PATCH",
               "path": "/users",
               "description": "Update user"
           },
           {
               "method": "DELETE",
               "path": "/recover/:token",
               "description": "Verify token and Delete token"
           }
       ]
    }

