const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require('jsonwebtoken')
const { UserModel, accountModel, userModel } = require("../db")
const authMiddleware = require('../middleware/authMiddleware');

const jwt_secret = "ajay"
// signup,signin,update

router.get('/signup', async (req, res, next) => {

    const signupBody = z.object({
        email: z.string().email(),
        firstname: z.string(),
        lastname: z.string().optional(),
        password: z.string()
    })
    try {
        const { success } = signupBody.safeParse(req.body);
        // input validation
        if (!success) {
            return res.json(411).json({ msg: "incorrect inputs" })
        }
        // email verify pre existing in db
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            res.status(411).json("user already exist");
        }
        const newUSER = await userModel.create(req.body);
        const userId = newUSER._id;

        const token = jwt.sign({ userId }, jwt_secret)
        await accountModel.create({
            userId,
            balance: 1 + Math.random() * 10000
        })


        res.status(200).json({ msg: "account has been created ", token: token })

    } catch (error) {
        res.status(500).json("intrenal server error");
    }
})

router.get('/signin', async (req, res) => {

    const signBody = z.object({
        email: z.string().email(),
        password: z.string()

    })
    try {

        const { success } = signBody.safeParse(req.body);
        if (!success) {
            res.status(411).json({ msg: "incorrect input" });
        }

        const user = await userModel.findOne({ email: req.body.email, password: req.body.password });

        if (user) {
            const token = jwt.sign({ userId: user._id }, jwt_secret);
            res.status(200).json({ token: token });
            return;
        }
        res.status(411).json("error occured during loggin")

    } catch (error) {
        res.status(500).json("intrenal server error");
    }
})
router.put('/userUpdate', authMiddleware, async (req, res, next) => {
    try {
        const userUpdate = z.object({
            firstname: z.string().optional(),
            lastname: z.string().optional(),
            password: z.string().optional()
        })

        const id = req.userId;

        const { success } = userUpdate.safeParse(req.body);
        if (!success) {
            res.status(411).json("incorrect input");
        }

        await userModel.findByIdAndUpdate(id, req.body);
        res.status(200).json("record updated successfully");
    } catch (error) {
        res.status(500).json("intrenal server error");
    }
})

router.get('/search', authMiddleware, async (req, res, next) => {
    const filter = req.query.filter || "";
    try {
        const users = await userModel.find({
            $or: [
                { firstname: { $regex: filter, $options: 'i' } },
                { lastname: { $regex: filter, $options: 'i' } }
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;