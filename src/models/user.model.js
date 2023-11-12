import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import { jwt } from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String, //cloudinary url
        required : true
    },
    coverImage : {
        type : String //cloudinary url
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true , "password is required"]
    }

},{
    timestamps : true
})


userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordSame = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)