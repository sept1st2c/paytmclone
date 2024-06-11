const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

//
//
//
// sign up
//
//

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parseResult = signupSchema.safeParse(req.body);
  //   return body;
  //   console.log(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      errors: parseResult.error.errors,
    });
  }

  const existinguser = await User.findOne({
    username: body.username,
  });

  if (existinguser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstname, // Ensure correct field names
    lastName: body.lastname,
  });
  const userId = user._id;
  console.log("hiiiiiiiiiiiiiiiiiii");

  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

//
//
//
// sign in
//
//

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    return res.json({
      token: token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

//
//
//
// /
//
//

const updateBodySchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);
  console.log(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  console.log(req.body);

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({
    message: "Updated successfully",
  });
});

//
//
//
// /bulk
//
//

router.get("/bulk", async (req, res) => {
  const filter = req.body.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
