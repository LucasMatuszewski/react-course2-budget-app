const person = {
    // name: '',
    age: 35,
    location: {
        city: 'Lodz',
        temp: 32
    }
};

console.log( `${person.name} is ${person.age}` );

//manual way to avoid "person":
//const name = person.name;
//const age = person.age;
//but its inefficient

//DESTRUCTURING an OBJECT:
const {name, age} = person; //in object say which values from "person" object you want to destruct

// WITH DESTRUCTOR WE CAN USE values without using "person" every time:
console.log( `${name} is ${age}` );


// MORE COMPLEX EXAMPLE:

if(person.location.city && person.location.temp) {
    console.log( `It's ${person.location.temp} in ${person.location.city}.`);
}

// With Destructuring we can make it more readable and shorter:
const {temp, city} = person.location;

if (city && temp) {
    console.log(`It's ${temp} in ${city}.`);
}

// We can also rename values, to use own names, more convenient for us:
const {temp: temperature, city: location} = person.location;

if (city && temp) {
    console.log(`It's ${temperature} in ${location}.`);
}

// Default values if there is no value in object:
const { name: firstName = 'This person', age: years } = person; //we can mix default and renaming
console.log(`${firstName} is ${years}`);

//without default, we would get 'undefined'


///////////////////////////
// ARRAY DESTRUCTURING: //

const address = ['1200 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

console.log(`You are in ${address[1]}, ${address[2]} `);

// we use square brackets for destructuring array
// const [ street, town, state, zip ] = address; // Match by position

// We can destructure only values we need:
const [, town, state ] = address; // comas separation for position
console.log(`You are in ${town}, ${state} `);

const [, , , zip] = address; // comas separation for position
console.log(`Your ZIP is ${zip}`);

// We cant rename array values, there are no names in array. We can use names we wont.

// But we can set some defaults if there is no value in array on that position :)
const [, , , , country = 'USA'] = address; // comas separation for position
console.log(`You are in ${country}`);

