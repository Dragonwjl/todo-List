import fs  from 'fs'
import path from 'path'

import { cwd } from 'process'

 fs.copyFile(path.resolve(cwd(),'./src/index.html'),path.resolve(cwd(),'./dist/index.html'),()=>{
     console.log('copy success')
 }) 
 
