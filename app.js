// Require Packages

require(`dotenv`).config();
const express = require("express");
const mongoose = require(`mongoose`);
const Account = require(`./models/accountModel`);

const app = express();

// import custom modules
const recordsRoutes = require("./routes/recordsRoutes.js");
const accountRoutes = require("./routes/accountRoutes.js");
const MONGO_URI = process.env.MONGO_URI;
const authenticateAccount = require("./middleware/authentication");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom routes
app.use("/auth", accountRoutes);
app.use("/records", authenticateAccount, recordsRoutes);

// Connect database
mongoose
  .connect(MONGO_URI, {})
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      await Account.init(); // Ensure indexes are created
      console.log("Indexes are created");
      await Account.syncIndexes();
      console.log("Indexes are synchronized");
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
    } catch (err) {
      console.error("Error creating indexes:", err);
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Connect to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//////////////////////////////////////////////////////////////////////////////////

// password - QHzGF23kZtaXLuSv -
// user - stefanolteanu1995
// connection strting -
// mongodb+srv://stefanolteanu1995:0ydGt7tvI2oEdA4r@cluster0.hzxxrdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// my updated string -
// MONGO_URI=mongodb+srv://stefanolteanu1995:0ydGt7tvI2oEdA4r@cluster0.hzxxrdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//////////////////////

// PLAN

////////////////////////

// 1) Accounts :

// Get/See all accounts
// update account - opt
// Delete one Account
// Dinamic JWT sa nu mai dau copy paste la fiecare in postman - opt

// 2) Records :

// Post/Create record
// Get all
// get one by id
// patch one by id
// Get by Cathegory
// Get by Type : Expense/Income

// - Optional 1 : Get by date (interval zi/luna/an)
// - Optional 1 : Delete by date (interval zi/luna/an)

///////////////////////////////////////////////////////////////////////////

// - Opțional 2: Situație profit/loss

// !! Îl intreb pe Tomas daca fac asta ca http method in backend sau o lasam xa funcție de front-end

// sum expenses values
// sum incomes values
// Incomes sum - expenses sum
// - sa calculeze asta dinamic in functie de toate records pe utilizator.
// Daca șterg sau adaug record cu different value pe utilizator sa imi calculeze asta dinamic la orice record
