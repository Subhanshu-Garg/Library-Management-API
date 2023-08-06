import mongoose, { mongoConnect, buildSchema, Model } from '@am92/mongo-odm'
await mongoConnect()

const userSchemaObject = {
    name: {
        type: String,
        required: [true, "Please enter name."]
    },
    email: {
        type: String,
        required: [true, "Please enter email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "Password should be greater than 8 characters."],
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    role:{
        type: String,
        enum: ["librarian", "student"],
        default: "student"
    }

}

const userSchemaOptions = {}

const userSchema = buildSchema(userSchemaObject,userSchemaOptions);

const User = new Model('User', userSchema);

export default User;

