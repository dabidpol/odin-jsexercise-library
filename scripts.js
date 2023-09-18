function Book(title, author, pages, hasread) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasread = hasread
    this.info = function() {
        const x = title + " by " + author + ", " + pages + "," + hasread + "."
        return x
    }
  }
  
  const theHobbit = new Book("The Hobbit", "JRR Tolkien", "295 pages", " has not read yet");
  console.log(theHobbit.info());