import mongoose, { mongoConnect, buildSchema, Model } from '@am92/mongo-odm'
await mongoConnect()

const borrowedBookSchemaObject = {
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
        default: () => Date.now() + 90 * 86400000
    }
}

const borrowedBookSchemaOptions = {};

const borrowedBookSchema = buildSchema(borrowedBookSchemaObject, borrowedBookSchemaOptions);

const BorrowedBook = new Model('BorrowedBook', borrowedBookSchema);

export default BorrowedBook;