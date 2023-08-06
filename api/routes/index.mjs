import bookRouter from "../resources/Book/bookRoute.mjs";
import userRouter from "../resources/User/userRoute.mjs";
import borrowBookRouter from "../resources/BorrowedBook/borrowedBookRoute.mjs";

const Routes = [
    {
        path: "/books",
        router: bookRouter
    }, 
    {
        path: "/user",
        router: userRouter
    },
    {
        path: "/borrowbook",
        router: borrowBookRouter
    }
];

export default Routes
