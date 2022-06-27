const mongoose = require("mongoose");

const db = "mongodb+srv://kolonel:pwn2mds@typescript-app.pipmc0g.mongodb.net/todos?retryWrites=true&w=majority" //connector Mongo deleted for github

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB este conectat");
  } catch (err:any) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
