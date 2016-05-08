// Describe variables
  var administratorPassword = "";
  var administratorRecord = {"username": "admin","password": "password"};
  var administratorUsername = "";
  var books = [ // Hash to store our books
    {
      "isbn": "123", 
      "title": "Starwars", 
      "availability": 1,
      "checkedOutBy": ""
    },
    {
     "isbn": "456", 
      "title": "Starwars II", 
      "availability": 0,
      "checkedOutBy": "larybird@gmail.com"
    },
  ];

  var bookCheckin = "";
  var bookCheckout = "";
  var bookISBN = 0;
  var output = "";
  var patronEmail = "";
  var patronFirstName = "";
  var patronLastName = "";
  var patronUsername = "";
  var patronRecords = [ // Hash to store customer records
    {
      "firstName": "Michael", 
      "lastName": "Jordan", 
      "email": "michaeljordan@gmail.com"
    },
    {
      "firstName": "Larry", 
      "lastName": "Bird", 
      "email": "larrybird@gmail.com"
    }
  ];


/* This function looks up a username by email and compares the input
   with what's stored in our user hash. If the username is in the system
   then the program will proceed, otherwise, we need to create a user.
   before proceeding. 
*/

function lookupUsername(username) {
  // Describe Variables
  var currentUser;
  var userEmail;

  // Verifying user record exists in our storage
  for (var searchPatron = 0; searchPatron < patronRecords.length; searchPatron++) {
    currentUser = patronRecords[searchPatron];
    userEmail = currentUser["email"];

    if (userEmail === username) {
      return ("First Name: " + currentUser["firstName"] + "\n" + "Last Name: " +
                                currentUser["lastName"] + "\n" + "Email: " + userEmail);
    } 
  }
      // This block of code creates a new user when a username doesn't exist
      alert("User is not in the system" + "\n\n" + "Please add the user");
      patronFirstName = prompt("Enter patron's first name: ", "Magic"); // Provides an example user first name input
      currentUser["firstName"] = patronFirstName; // Stores first name input into hash
      patronLastName = prompt("Enter patron's last name: ", "Johnson"); // Provides an example user last name input
      currentUser["lastName"] = patronLastName; // Stores last name input into hash
      patronEmail = prompt("Enter patron's email", "magicjohnson@gmail.com"); // Provides an example user email input
      currentUser["email"] = patronFirstName + patronLastName + "@gmail.com"; // Email is equal to first name and last name,
      patronRecords.push( {                                                    // and we concatenate @gmail.com.
        "firstName": patronFirstName,
        "lastName": patronLastName,
        "email": patronEmail
      // Send our newly added user to the patronRecords hash table
      } );

      return("Patron is added to the system: " + "\n\n" + "First Name: " + currentUser["firstName"] + "\n" + 
                          "Last Name: " + currentUser["lastName"] + "\n" + "Email: " + currentUser["email"]);
}


/* This function takes the ISBN of a book, and performs a search
   for the book. When the book is available a user can check it out. 
   Otherwise, report it's unavailable.
*/

function lookupByISBN(ISBN) {
  // Describe Variables
  var currentBook;
  var isbnOfBook;

  for (var searchBooks = 0; searchBooks < books.length; searchBooks++) {
    currentBook = books[searchBooks];
    isbnOfBook = currentBook["isbn"];

    // Checking if book is available
    if (isbnOfBook === ISBN) {
      if (currentBook["availability"] > 0) { // A book is available when 1, 0 means book is unavailable
        alert("The book " + currentBook["title"] + " is available");
        currentBook["availability"] = 0; // Updating book availability to unavailable
        currentBook["checkedOutBy"] = patronUsername; // Updating who the book is checked out by
        return("Successfully checked out: " + currentBook["title"] + "\n");
      }
        else if (currentBook["availability"] === 0) { // Cannot check out book if it's already taken
          return "The book " + currentBook["title"] + " is unavailable";
        }
    }
    return("Book is not in stock");
  }
}


/* This function processes checkins by book ISBN. 
   Then we return who checked in the book, and updates the book's hash
   accordingly.
*/

function checkinBook(checkin) {
  // Declare variables
  var isbnOfBook;
  var currentBook;

  for (var checkinCounter = 0; checkinCounter < books.length; checkinCounter++) {
    currentBook = books[checkinCounter];
    isbnOfBook = currentBook["isbn"];

    if (isbnOfBook === checkin) {
      alert("Processing book checkin for: " + currentBook["title"]);
      currentBook["availability"] = 1;
      currentBook["checkedOutBy"] = "";
      return("Successfully checked in book: " + currentBook["title"] + "\n");
    }
    return("This book is not from our store");
  }
}

function main() { 
  // Administrator Login
  // Input administrator username to login
  administratorUsername = prompt("Enter administrator username", "admin");

  // Process administrator username
  while (administratorUsername !== administratorRecord["username"]) {
    alert("Invalid username. Click OK to try again");
    administratorUsername = prompt("Enter administrator username");
  } 

  // Input administrator password to login
  administratorPassword = prompt("Enter administrator password", "password");

  // Process administrator password
  while (administratorPassword !== administratorRecord["password"]) {
    alert("Invalid password. Click OK to try again");
    administratorPassword = prompt("Enter administrator password");
  }

  // Access library system when administrator credentials are valid
  if ((administratorUsername === administratorRecord["username"]) && (administratorPassword === administratorRecord["password"]) ) {
    alert("Welcome to the Library System!");
  }

  // Input customer username to verify they're in the system
  patronUsername = prompt("Enter patron's username", "michaeljordan@gmail.com");
  lookupResult = lookupUsername(patronUsername); // Call function lookupUsername to validate user
  alert(lookupResult);

  // Input for book checkout
  bookCheckout = prompt("Check-out book? (Yes/No)");

  // Error checking for blank input
  while (bookCheckout === "") {
    alert("Please enter \"Yes or No\" ");
    bookCheckout = prompt("Check-out book? (Yes/No)");
  }

  // Processing book checkout
  if (bookCheckout === "Yes" || bookCheckout === "YES" || bookCheckout === "yes") {
    bookISBN = prompt("Enter book ISBN for rental", "Enter 123 or 456");

  // Error checking for book ISBN not being a number
    while (isNaN(bookISBN) || bookISBN === "") {
      alert("Please enter valid ISBN");
      bookISBN = prompt("Enter book ISBN for rental", "Enter 123 or 456");
    }
    var lookupResult = lookupByISBN(bookISBN);
    alert(lookupResult);
  }
    else {
      alert("Great, let's check-in a book");
    }

  // Input for book checkin
  bookCheckin = prompt("Would you like to check-in a book? (yes/no)");

  // Error Checking for blank input
  while (bookCheckin === "") {
    alert("Please enter \"Yes or No\" ");
    bookCheckin = prompt("Check-in book? (Yes/No)");
  }

  // Processing book checkin
  if (bookCheckin === "Yes" || bookCheckin === "YES" || bookCheckin === "yes") {
    bookISBN = prompt("Enter book ISBN for check in");

  // Error checking for book ISBN
    while (isNaN(bookISBN) || bookISBN === "" ) {
      alert("Please enter valid ISBN");
      bookISBN = prompt("Enter book ISBN for rental", "Enter 123 or 456");
    }
    lookupResult = checkinBook(bookISBN);
    alert(lookupResult); 
  }

  output = ("Thank you, " + "<br>" + " Please come again!");

  // Output to end system
  document.write(output);

}


main();
