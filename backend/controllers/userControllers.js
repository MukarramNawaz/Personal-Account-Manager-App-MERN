
const User = require("../model/userModel");



const homepage = async (req, res) => {

    res.status(200).json("backend working");
 
};
//
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const newUser = new User({
      username,
      password
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).send('Internal Server Error');
  }
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

// geting user data with user id

const getUserData = async (req, res) => {
  const {id} = req.params;

try {
  const user = await User.findById(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
} catch (error) {
  res.status(500).send('Internal Server Error');
}
}

//for single Income Button
const updateUserIncome = async (req, res) => {
    const { id } = req.params;
    const {transectionType,text, amount } = req.body;
    try {
      const user = await User.findById(id);
      if (user) {
        const newTransaction = { transectionType,text, amount };
        user.transactions.push(newTransaction);
        user.accountBalance += Math.abs(amount);
        user.income += Math.abs(amount);

        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
}

// for single Epenses button
const updateUserExpense = async (req, res) => {
  const { id } = req.params;
  const { transectionType, text, amount } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
        const newTransaction = { transectionType,text, amount };
      user.transactions.push(newTransaction);
      user.accountBalance -= Math.abs(amount);
      user.expenses += Math.abs(amount);
      
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

// for a single transection button
const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { text, amount } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      
      if (amount < 0) {
        user.accountBalance -= Math.abs(amount);
        user.expenses += Math.abs(amount);
        const transectionType = "Expense"
        const newTransaction = { transectionType,text, amount };
      user.transactions.push(newTransaction);
      }
      else
      {
        user.accountBalance += Math.abs(amount);
        user.income += Math.abs(amount);
        const transectionType = "Income"
        const newTransaction = { transectionType,text, amount };
      user.transactions.push(newTransaction);
      }
      

      
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}


module.exports = { homepage, registerUser,loginUser, getUserData, updateUserIncome, updateUserExpense, updateUserData}