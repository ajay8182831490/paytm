const express = require("express");
const z = require("zod");
const authMiddleware = require('../middleware/authMiddleware');
const { accountModel } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// account transcation

router.get('/transcation', authMiddleware, async (req, res, next) => {

    // ammountt,to;// we will get from the body;
    // firstly we will check the balance of sender that sufficent balance avialble or not
    //if balance avialble then we will deduct from the sender and credit into the reciver account
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { ammount, to } = req.body;

        const account = await accountModel.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < ammount) {
            await session.abortTransaction();
            res.status(411).json({ message: "insufficent balance" });
        }

        const accountTo = await accountModel.findOne({ userId: to }).session(session);
        if (!accountTo) {

            await session.abortTransaction();
            res.status(411).json({ msg: "invalid account" });
        }

        await accountModel.findOneAndUpdate({ userId: req.userId }, { $inc: { balance: -ammount } }).session(session);
        await accountModel.findOneAndUpdate({ userId: to }, { $inc: { balance: ammount } }).session(session);
        await session.commitTransaction();
        res.status(200).json("amount transfer successfully");
    } catch (error) {
        res.status(500).json("intrenal sever err");
    }



})

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await accountModel.findOne({ userId: req.userId });
        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json("intrenal server error");
    }
})
module.exports = router;