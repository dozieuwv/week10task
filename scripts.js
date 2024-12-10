class Bookrental {
    constructor() {
      this.books = {};
      this.lendedbooks = {};
      this.income = 0;  
    }
  
    addbook(title, quantity, price) {
      if (this.books[title]) {
        this.books[title].quantity += quantity;
      } else {
        this.books[title] = { quantity: quantity, price: price };
      }
  
      console.log(`add ${quantity} copies of ${title} at $${price}`);
    }
  
    lendbook(title, lendername) {
      const book = this.books[title];
      if (!book) {
        console.log(`"${title}" is not in store at the moment`);
        return;
      }
      if (book.quantity === 0) {
        console.log(`"${title}" is out of stock, check back another time.`);
        return;
      }
  
      book.quantity -= 1;
      this.income += book.price;
  
      if (!this.lendedbooks[title]) {
        this.lendedbooks[title] = [];
      }
  
      this.lendedbooks[title].push(lendername);
  
      console.log(
        `${lendername} rented "${title}" at $${book.price}. remaining copies: ${book.quantity}`
      );
    }
  
    returnbook(title, lendername) {
      if (!this.books[title]) {
        console.log(`"${title}" is not available in the store.`);
        return;
      }
  
      if (!this.lendedbooks[title] || !this.lendedbooks[title].includes(lendername)) {
        console.log(`${lendername} did not rent "${title}". available copies: ${this.books[title].quantity}`);
        return;
      }
  
      this.books[title].quantity += 1;
      const index = this.lendedbooks[title].indexOf(lendername); 
      this.lendedbooks[title].splice(index, 1);
  
      console.log(`${lendername} returned "${title}". available copies: ${this.books[title].quantity}`);
    }
  
    checkAvailability(title) {
      if (!this.books[title]) {
        console.log(`"${title}" is not available in our store.`);
      } else if (this.books[title].quantity > 0) {
        console.log(`"${title}" is available for rental. Copies in stock: ${this.books[title].quantity}`);
      } else {
        console.log(`"${title}" is currently out of stock.`);
      }
    }
  
    checkIncome() {
      console.log(`Total rental income: $${this.income}`);
    }
  }
  
  const store = new Bookrental();
  
  store.addbook("snow white", 5, 10);
  store.addbook("My Love from Another Star", 7, 15);
  store.addbook("Excess", 3, 5);
  store.addbook("God", 5, 500);
  store.addbook("The Godfather", 3, 700);
  
  store.returnbook("Inception", "Anike");  
  store.lendbook("The Godfather", "John");
  store.lendbook("Inception", "Jane");  
  
  store.returnbook("Inception", "Anike");  
  store.checkAvailability("Inception");  
  store.checkIncome();
  