// import connection class and generateAPIString method 
import Connection, {generateAPIString} from './connection.js'

// import a key variable define in key.js file 
// Warning: While pushing git repo, do not include key.js file by ignore in 
// Below is simple code snippet from key.js file
// ---------------------------------------------
// let key;
// export default key = "YOUR_APT_KEY";
// ---------------------------------------------
import key from './key.js' 

// Create an object of type Connection 
const myConnection = new Connection(key);

// Calling generateAPIString method 
console.log(generateAPIString(myConnection)); 



 
