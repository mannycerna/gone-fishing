const prompt = require('prompt-sync')({sigint: true});

/* Global variables */

let caughtFish = [];
let i = 0;
// let fish = '';
// console.log(getTotalValue());

//-----testing of function---------
// let fish1 = generateRandomFish();
// let fish2 = generateRandomFish();

// caughtFish.push(fish1, fish2);


console.log("You've gone fishing! Try to maximize the value of your caught fish. \nYou can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")

for(i = 6; i < 13; i++){ 

    if(i === 12){
        console.log('\n==============================================\n')
        console.log(`****The time is ${i}:00pm. Times up!****\n`);
        console.log(`You caught ${caughtFish.length} fish\n`)
        console.table(caughtFish);
        console.table(`   Total:  ${getTotalWeight().toPrecision(3)} lbs, $${getTotalValue().toPrecision(3)}\n`)
    
    } else { 

    console.log('==========================================\n');

        console.log(`The time is ${i}:00am.  So far you've caught:\n
        ${caughtFish.length} fish, ${getTotalWeight().toPrecision(3)} lbs, $${getTotalValue().toPrecision(3)}\n`);
    
    let fish = generateRandomFish();
    // caughtFish.push(fish);
    // console.log(caughtFish);
  
    console.log(`You caught a ${fish.name} weighing ${fish.weight} lbs and valued at $${fish.value}\n`);

    //--check if weight > 10 lbs, if so - auto release, make them press enter.  Make sure they are not prompted to catch or release.

    let currentTotalWeight = getTotalWeight();

    if(currentTotalWeight + fish.weight > 10){

        console.log(`\nYo, if you keep ${fish.name} it would put you over 10 lbs, so please release!\n`);
        console.log('Press any key to continue');
        prompt('> ');
    
        continue; //stop going thru loop and jumps back to the top of loop.
    }

    console.log("\nYour action: [c]atch or [r]elease?");

        let action = prompt('>');
            //catch -- 
            // -- 1) push value into array 
            //    2) console out message 
            //    3) check that lbs not above 10 per requirement 
            //    4) error check (if input blank, not c and/or r)
            
            while(action !== 'c' && action !== 'r') {
                console.log('Please enter [c] or [r]:');
                action = prompt('>');
        
            }
             if(action === 'c'){
                caughtFish.push(fish);
                console.log('You chose to keep the fish.\n');
            } else if(action === 'r'){
                console.log('You chose to release the fish.\n');
                
            }
        }
    }   

// console.log(caughtFish);

    //1. right now current fish list - keep track of fish and print list
        //1.1 # of fish = .length of caughtFish
        //1.2 weight/value - function to calculate total weight and total value of fish in caughtFish array

    //2.  logging out our random fish -> generateRandomFish()

    //3.  catch or release - need a user prompt in order for user to make that choice.

//generateRandomWeight
//parameters: none

//return weight (number)


function generateRandomWeight(){
    let weight = Number((Math.random() * 5).toPrecision(3));

    while(weight < 1) {
        weight = Number((Math.random() * 5).toPrecision(3));
    }
    return weight;

}

function generateRandomValue(){
    let value = Number((Math.random() * 5).toPrecision(3));

    while(value < 0.1) {
        value = Number((Math.random() * 5).toPrecision(3));
    }

    if(value < 1) {
        value = Number(value.toPrecision(2));
    }
    return value;
}

function generateRandomName(){
    let adjs = ['Shiny', 'Red','Dull', 'Blue', 'Slimy', 'Green', 'Dry', 'Yellow', 'Vibrant', 'Purple', 'Floppy', 'Orange', 'Silly', 'Silver', 'Confused'];

    let types = ['Salmon', 'Bass', 'Trout', 'Flounder', 'Perch', 'Snapper', 'Cod', 'Catfish', 'Grouper', 'Tuna', 'Blowfish', 'Piranha'];

    //index - Math.floor(Math.random()) * arrayName.length)

    let adj1 = adjs[Math.floor(Math.random() * adjs.length)];
    let adj2 = adjs[Math.floor(Math.random() * adjs.length)];
        while(adj1 === adj2){
            adj2 = adjs[Math.floor(Math.random() * adjs.length)];
        }
    let type = types[Math.floor(Math.random() * types.length)];
    return adj1 + ' ' + adj2 + ' ' + type;
}

function generateRandomFish(){

    let fish = {};

    fish.name = generateRandomName();
    fish.weight = generateRandomWeight();
    fish.value = generateRandomValue();

    return fish;
}

/* total the weight of all caughtFish */
function getTotalWeight(){
    let totalWeight = 0;
    for(let i = 0; i < caughtFish.length; i++){
        let currentFish = caughtFish[i];
        totalWeight += currentFish.weight;
       
    }
    return Number(totalWeight.toPrecision(3));
}

function getTotalValue(){
    let totalValue = 0;
    // for(let i = 0; i < caughtFish.length; i++){
    //     let currentFish = caughtFish[i];
    //     totalValue += currentFish.value;
        
    // }
        
        for(let fish of caughtFish){
            //fish.value - gets us value property of each fish in our caughtFish array 1 at a time.
            totalValue = totalValue + fish.value;
        }
    return Number(totalValue.toPrecision(3));
}


/* Generate Fish Name, Fish Value, Fish Weight

fish (building properties of fish)
    -weight:  number
    -name (2 descriptors + type): string
    -value: number
// Use an object for fish:
    fish = {
        name: string
        weight: number
        value: number
    }

Weight:
    Math.random
    weigth 1-5 (this is adjustable)
    console.log(Math.random() * 5).toPrecision(3));

    Showcase below on random weight:
        console.log((Math.random() * 5).toPrecision(3));
        let rand = Math.random() * 5;
        console.log(rand);
        console.log(Number(rand.toPrecision(3))); //Number caste because toPrecision returns String

Value:
    Math.random() * 5).toPrecision(3)

Name:  
    name = 2 descriptors + 1 type
    adjective array ['enourmous', 'red', 'scaly',.....]
    //if result of random adj is "red red salmon" then add check to make sure adj1 !== adj2 -> if so, re-randomize.

    type = ['salmon', 'bass', 'trout',.....]

    Math.floor(Math.random()) * type.length) //Multiplying random and array.  Using Math floor to get access to 0 index in array

*/