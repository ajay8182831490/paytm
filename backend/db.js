const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ajay8182831490:Ajay%4016052003@blogapi.dstwlyr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, },
    password: { type: String, required: true }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);
const accountModel = mongoose.model('Account', accountSchema);

module.exports = { userModel, accountModel };
