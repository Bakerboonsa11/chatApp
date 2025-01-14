const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Simple email validation
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: 'Please provide a valid email',
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'A user must have a phone number'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false, // Exclude password from query results
  },
  avatar: {
    type: String,
    default: 'default-avatar.png', // A default avatar image
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified

  this.password = await bcrypt.hash(this.password, 12); // Hash the password
  next();
});

// Instance method to check password validity
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.ispasswordUpdated=function(iat){

  if(this.changedPasswordAt){
       const newchangedPasswordAt= parseInt(this.changedPasswordAt.getTime()/1000,10)

       return newchangedPasswordAt>iat
  }
  else{
      return false
  }
    
}
// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;






{{{{{{{{}}}}}}}