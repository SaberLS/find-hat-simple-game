const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]){
        this.field = field;
        this.position = this.findStart();
    }

    print(){
        for (const iterator of this.field) {
            console.log(iterator.join(''));
        }
    }

    findStart(){
        for (const i = 0; i < this.field.length ; i++) {
            if(this.field[i].indexOf('*') !== -1){
                return [i, this.field[i].indexOf('*')];
            }
        }
    }

    move(){
        this.checkMove();

        this.field[this.position[0]][this.position[1]]=pathCharacter;
        console.log(this.position);
        this.play();
    }

    checkMove(){
        if(this.position[0] < 0 || this.position[1] < 0 || this.position[0] > this.field.length-1 || this.position[1] > this.field[1].length-1){
            throw Error('You fall of the field');
        }else if(this.field[this.position[0]][this.position[1]] === hole){
            throw Error('You fall into hole');
        }else if(this.field[this.position[0]][this.position[1]] === hat){
            throw Error('You win EZ');
        }
    }

    play(){
        this.print();
        let direction = prompt('What is your move?');

        switch (direction){
            case 'w':
                this.position[0]+=1;
                this.move();
            case 's':
                this.position[0]-=1;
                this.move();
            case 'd':
                this.position[1]+=1;
                this.move();
            case 'a':
                this.position[1]-=1;
                this.move();          
            }
    }
}


const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

const generateField = (height,width,holespercentage=0.1) => {
    var field = [];

    // Generate empty field
    for(let i = 0; i < height; i++){
        field[i] = [];
        for(let j = 0; j < width; j++){
            field[i][j] = fieldCharacter;
        }
    }

    console.log(field);

    // Generate holes holes
    const fieldOfField = height * width;
    const amountHoles = Math.round(holespercentage*fieldOfField);

    randomField = () =>{
        let randomHeight = Math.floor(Math.random() * (height-1));
        let randomWidth = Math.floor(Math.random() * (width-1));
        if(isFieldEmpty(randomHeight,randomWidth)){
            return [randomHeight, randomWidth];
        }
    }

    isFieldEmpty = (randomHeight,randomWidth) =>{
        if(field[randomHeight][randomWidth]===fieldCharacter){
            return true;
        }randomField();
    }

    let emptyField;
    for(let i = 0; i < amountHoles; i++){
        emptyField = randomField();
        console.log(emptyField);
        field[emptyField[0]][emptyField[1]] = hole;
    };

    return field;
}

  console.log(generateField(4,6,0.15));
  console.log(myField.field[1].length);
  console.log(myField.field.length);

myField.play();
