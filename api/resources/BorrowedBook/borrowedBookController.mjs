import User from "../User/userModel.mjs";
import Book from "../Book/bookModel.mjs";
import BorrowedBook from "./borrowedBookModel.mjs";


export const issueBook = async (req, res, next) => {
    const { studentEmail, bookIsbn } = req.body;

    try {
        const user = await User.findOne({ email: studentEmail });

        if (!user) {
            const err = new Error("Student not found!");
            err.status = 400;
            next(err);
        }

        const book = await Book.findOne({ isbn: bookIsbn });

        if (!book) {
            const err = new Error("Book not found!");
            err.status = 400;
            next(err);
        }

        if (book.available < 1) {
            const err = new Error('No available copies of the book!');
            err.status = 400;
            next(err);
        }

        const borrowedBook = await BorrowedBook.createOne({
            user : user._id,
            book: book._id
        });

        await User.updateOne({ _id: user._id }, { $push : { borrowedBooks: book._id }});
        await Book.updateById(book._id, { available: book.available - 1});

        res.status(201).json({
            success: true,
            message: 'Book issued successfully',
            borrowedBook,
        });
    } catch (error) {
        next(error);
    }
}

export const returnBook = async (req, res, next) => {
    const { studentEmail, bookIsbn } = req.body;

    try {
        const user = await User.findOne({ email: studentEmail });

        if (!user) {
            const err = new Error('Student not found!');
            err.status = 400;
            next(err);
        }

        const book = await Book.findOne({ isbn: bookIsbn });

        if (!book) {
            const err = new Error('Book not found!');
            err.status = 400;
            next(err);
        }

        const borrowedBook = await BorrowedBook.findOne({
            student: user._id,
            book: book._id,
        });

        if (!borrowedBook) {
            const err = new Error('Borrowed book not found!');
            err.status = 400;
            next(err);
        }

        const rslt = await BorrowedBook.remove({
            student: user._id,
            book: book._id
        })

        await User.updateOne({ _id: user._id }, { $pull: { borrowedBooks: book._id } });


        await Book.updateById(book._id, {
            available: book.available + 1
        })

        res.status(200).json({
            success: true,
            message: 'Book returned successfully',
            borrowedBook,
        });
    } catch (error) {
        next(error);
    }
};


export const allIssuedBooks = async (req, res, next) => {
    try {
        const issuedBooks = await BorrowedBook.findMany();
        res.status(200).json({
            success: true,
            issuedBooks
        })
    } catch (error) {
        next(error);
    }
}

export const overDueBooks = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const overDueBooks = await BorrowedBook.findMany({ dueDate: { $lt: currentDate }});

        res.status(200).json({
            success: true,
            overDueBooks
        })
    } catch (error) {
        next(error)
    }
}