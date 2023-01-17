const jwts = require("jsonwebtoken");
const jwt = require("../utilities/jwtutilis")
const AUTH_HEADER = "Authorization";
const authschema=require("../api/model/user");
const user_auth=require("../api/model/user")

class Middleware {

    async NormaluserMiddleware_Auth(req, res, next) {
      const auth_header = req.header(AUTH_HEADER);
      if (auth_header) {
          if (auth_header.startsWith("Bearer ")) {
              const token = auth_header.substr(7);
              try {
                  const userpayload = jwts.verify(token, jwt.Jwt_Key);
                  next()
              } catch (error) {

                  res.status(401).json({
                      message: "Authentication Failed. Token Expired or Malformed Token"
                  })

              }

          } else {
              res.status(401).json({
                  message: "Authentication Failed. please send Bearer Token"
              })
          }
      } else {
          res.status(401).json({ message: "You're not authenticated " })
      }


  }
  
  async userMiddleware_Auth(req, res, next) {
    const auth_header = req.header(AUTH_HEADER);
    if (auth_header) {
        if (auth_header.startsWith("Bearer ")) {
            const token = auth_header.substr(7);
            try {
                const userpayload = jwts.verify(token, jwt.jwt_keys);

                next()
            } catch (error) {

                res.status(401).json({
                    message: "Authentication Failed. Token Expired or Malformed Token"
                })

            }

        } else {
            res.status(401).json({
                message: "Authentication Failed. please send Bearer Token"
            })
        }
    } else {
        res.status(401).json({ message: "You're not authenticated " })
    }


}


  
  }
  module.exports = new Middleware();