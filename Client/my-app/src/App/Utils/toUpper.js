export const toUpper =(str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((Word) =>{
            return Word[0].toUpperCase() + Word.substr(1);
        })
        .join(' ');
     }
