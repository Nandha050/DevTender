const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nandh8008_db_user:GMRs4E5GvpieqxGx@devtinder.ipk8znd.mongodb.net/devtinderdb'
    );
    
};

module.exports = connectDB;