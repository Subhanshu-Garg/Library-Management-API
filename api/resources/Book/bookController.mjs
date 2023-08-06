import Book from "./bookModel.mjs";

export const addBook = async (req, res, next) => {
    try {
        const { title, author, isbn, genre, copies } = req.body;

        const book = await Book.createOne({
            title, 
            author, 
            isbn, 
            genre, 
            copies
        });
        
        res.status(201).json({
            success: true,
            book
        })
    } catch (error) {
        return next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const isbn = req.params.isbn;
        const book = await Book.remove({"isbn": isbn});

        if(!book) {
            return next(new Error("Book not found!"));
        }
        
        res.status(202).json({
            success: true,
            book
        })
    } catch (error) {
        return next(error);
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const isbn = req.params.isbn;
        console.log(req.body);
        const updates = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre,
            copies: req.body.copies && Number(req.body.copies),
            available: req.body.available && Number(req.body.available)
        }
        console.log(updates);

        const book = await Book.updateOne({isbn: isbn}, updates, {
            new: true,
            runValidators: true
        });

        if(!book) {
            return next(new Error("Book not found with given isbn."));
        }
        else {
            res.status(200).json({
                success: true,
                message: "Book updated successfully.",
                book
            })
        }
    } catch (error) {
        return next(error);
    }
}

export const getBook = async (req, res, next) => {
    try {
        const isbn = req.params.isbn;

        const book = await Book.findOneBy("isbn", isbn);

        if(!book) {
            next(new Error("Book not found!"));
        }
        else {
            res.status(200).json({
                success: true,
                book
            });
        }
    } catch (error) {
        next(error);
    }
}

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.findMany();

        res.status(200).json({
            success: true,
            books: books
        })
    } catch (error) {
        next(error);
    }
}