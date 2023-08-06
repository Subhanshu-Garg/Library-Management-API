export const isUserLibrarian = (req, res, next) => {
    if(!req.user) {
        const err = new Error("Please signIn/Up first.");
        err.status(400);
        next(err);
    } else if (req.user.role !== 'librarian') {
        const err = new Error('Access denied');
        err.status = 403;
        next(err);
    } else {
        next();
    }
}
