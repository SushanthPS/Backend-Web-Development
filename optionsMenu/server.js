const readline = require('readline');

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let books = ['Tower of God', 'One Piece', 'Hunter x Hunter'];


function readInput() {

    readline1.question(`
1 - Show all books
2 - Add a new book
3 - Quit
Enter Option: `, (key) => {
        if (key == 1) {
            console.log(books);
            readInput();
        } else if (key == 2) {
            readline1.question("Enter book name: ", (book) => {
                books.push(book);
                readInput();
            })
        } else if (key == 3) {
            readline1.question("Are you sure you want to quit - press Y to quit: ", (op) => {
                if (op == 'Y') {
                    readline1.close();
                } else
                    readInput();
            })
        } else {
            console.log("You have selected an invalid entry so please press 1, 2 or 3");
            readInput();

        }
    })
}

readInput()

readline1.on("close", () => {
    console.log("Bye Bye");
})