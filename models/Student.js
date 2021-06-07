const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    regn: {
        type: String,
        required: [true, 'Please provide regn no'],
        unique: true
    },
    name: {
       type: String,
       required: [true, 'Please provide name']
    },
    fname: {
        type: String,
        required: [true, 'Please provide fname']
    },
    address: {
        type: String,
        required: [true, 'Please provide address']
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    datePosted: {
        type: Date,
        default: new Date()
    }
});

//duplicate checker
UserSchema.plugin(uniqueValidator);


//password hash
UserSchema.pre('save', async function(next){
    
  try {
      
      const hashedPassword = await bcrypt.hash(this.password, 10)
        
        this.password = hashedPassword
        
        next()
        
  } catch(error) {
      
      next(error)
  }
  
})

//export model
const Student = mongoose.model('Student', UserSchema)

module.exports = Student