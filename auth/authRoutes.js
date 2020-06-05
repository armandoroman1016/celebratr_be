const bcrypt = require("bcryptjs");
const router = require("express").Router();
const uuid = require("uuid/v4");
const Users = require("../helpers/authHelpers");
const generateToken = require("../middleware/generateToken");
const capitalize = require("../utils/capitalize");

router.get("/", (req, res) => {
  return Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
});

/**
 * @api {post} /api/auth/register Register Request
 * @apiName Register
 * @apiGroup Auth
 *
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} token Token
 *
 * @apiParamExample Example Body:
 * {
 *	"fistName": "John",
 *  "lastName": "Doe",
 *  "email": "example1@example1.com",
 *	"password": "password"
 * }
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 CREATED
 * {
 *  "user": {
 *    "id": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "email": "John",
 *    "first_name": "Doe",
 *    "last_name": "example1@example1.com",
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/register", (req, res) => {
  let packet = req.body;
  // if any required fields are missing respond with 400 status code
  if (
    !packet.firstName ||
    !packet.lastName ||
    !packet.password ||
    !packet.email
  ) {
    res.status(400).json({ message: "Missing at least one required field" });

    // else try to register user
  } else {
    Users.findByEmail(packet.email)
      .then((user) => {
        // if account is created with email provided then respond with 403 status code
        if (user) {
          res.status(403).json({ message: "Email is already in use" });

          // else register and submit user data
        } else {
          // normalizing names
          packet.firstName = capitalize(packet.firstName.trim());
          packet.lastName = capitalize(packet.lastName.trim());
          const id = uuid();

          finalPacket = {
            id: id,
            email: packet.email,
            first_name: packet.firstName,
            last_name: packet.lastName,
            password: packet.password,
          };

          bcrypt.genSalt(14, (err, salt) => {
            bcrypt.hash(finalPacket.password, salt, (err, hash) => {
              finalPacket.password = hash;
              add(finalPacket);
            });
          });

          const add = (data) => {
            Users.add(data)
              .then((newUser) => {
                if (newUser) {
                  const token = generateToken(newUser);
                  delete newUser.password;
                  res.status(201).json({ user: newUser, token: token });
                } else {
                  res.status(500).json({
                    message: "Unexpected error occurred, try logging in",
                  });
                }
              })
              .catch((err) => res.status(500));
          };
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "Unexpected error occurred" })
      );
  }
});

/**
 * @api {post} /api/auth/login Login Request
 * @apiName Login
 * @apiGroup Auth
 *
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} token Token
 *
 * @apiParamExample Example Body:
 * {
 *	"email": "example1@example1.com",
 *	"password": "password"
 * }
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "user": {
 *    "id": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "email": "John",
 *    "first_name": "Doe",
 *    "last_name": "example1@example1.com",
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing required credentials." });
  } else {
    Users.findByEmail(email)
      .then((user) => {
        return bcrypt.compare(password, user.password).then((result) => {
          if (!user || !result) {
            res.status(406).json({ message: "Invalid email or password" });
          } else {
            const token = generateToken(user);
            delete user.password;
            res.status(200).json({ user: user, token: token });
          }
        });
      })
      .catch((err) => {
        res.status(406).json({ message: "Invalid email or password" });
      });
  }
});

module.exports = router;
