import app from './app.js'
import {connectDB} from './db.js' 

connectDB();
app.listen(4000)
console.log('Server on port', 4000)



//   nvm install 18 # O puedes usar nvm install 20 para la versión 20
//nvm use 18     # O nvm use 20