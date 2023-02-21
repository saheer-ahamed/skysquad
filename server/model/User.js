import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import {isEmail} from "validator"
const userSchema = new mongoose.Schema({
    
    phoneNumber: {
        type: String,
        required: [true,"Please enter an Phone Number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Please enter password"],
        minlength:[6,'Minimum password length is 6 characters']
    },
    fullName: {
        type: String,
        required: [true,"Please enter a full name"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    recordStatus: {
        type: Number,
        default:0
    }
    
})

//mongoose hooks

//fire a function after doc saved to db
userSchema.post('save', (doc, next) => {
    //doc have the saved value
    console.log('new user created & save') 
    next()
})

//fire a function before doc saved to db
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)

    console.log('user about to be saved &created ',this)
    next()
})

const User = mongoose.model('User', userSchema);
export default User;