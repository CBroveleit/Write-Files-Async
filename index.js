const fs = require('fs');
const util = require('util');
var path = require('path');

function logCompletion(name){
    console.log(`Finished Writing file ${name}`)
}

const isItGoodOrBad = () => { 
    let chance =  Math.floor(Math.random()*Math.floor(10)+1) 
    return chance < 7 ? true : false
}

function writeFileAsync(directory, file){
    return new Promise( (resolve,reject) => {
        console.log(`Writing File ${file}`)
        fs.writeFile(path.join(directory,file), 'this is a file', (err) => {
            if(err){
                reject(err)
            } else{
                resolve()
            }
        })
    })
}

function delayFiveSec(){
    return new Promise(resolve => {
        console.log(`Starting 5s delay at ${Date.now()}`);
        setTimeout(() => {
            console.log(`Ending 5s delay at ${Date.now()}`)
            resolve()
        }, 5000)
    });
}

async function taskOne(x, location){
    console.log('** Starting task taskOne **')
    for(var i = 1; i <= x; i++) {
        let name = `taskOne_${i}`;
        await writeFileAsync(location,name)
        .then( () => console.log(`Finished Writing file ${name}`))
    }
    console.log('** Finished with taskOne **')
}

async function taskTwo(x, location){
    console.log('** Starting task taskTwo **')
    const filesToWrite = []
    for(var i = 1; i <= x; i++){
        let name = `taskTwo_${i}`
        filesToWrite.push(writeFileAsync(location, name).then( () => console.log(`Finished Writing file taskTwo_${name}`)))
    }
    await Promise.all(filesToWrite)
    console.log(`** Finished with taskTwo **`)
}

async function taskThree(x, location){
    console.log('** Starting task taskThree **')
    const badPath = path.join(__dirname,`/notHome`);
    const randomlyDelayedIndex = Math.floor(Math.random()*Math.floor(x+1)+1);
    for(var i = 1; i <= x; i++){
        let name = `taskThree_${i}`;
        let directionIsGood = isItGoodOrBad();
        if(i === randomlyDelayedIndex){
            await delayFiveSec().then( async () => {
                if(directionIsGood){
                    await writeFileAsync(location,name)
                    .then( () => console.log(`Finished Writing file ${name}`) )
                } else{
                    await writeFileAsync(badPath, name)
                    .then( () => console.log(`Finished Writing file ${name}`) )
                    .catch( (err) => console.log(`Failed to write ${name}`) )
                }               
            })
        }
        if(directionIsGood){
            await writeFileAsync(location,name)
            .then( () => console.log(`Finished Writing file ${name}`) )
        } else{
            await writeFileAsync(badPath, name)
            .then( () => console.log(`Finished Writing file ${name}`) )
            .catch( (err) => console.log(`Failed to write ${name}`) )
        }
    }
    console.log(`** Finished with taskThree **`)
}

async function main(){
    const folderName = String(Date.now());
    const x = Number(folderName.slice(-1));
    const location = path.join(__dirname,folderName);
    fs.mkdir(location, ()=> {});

    taskOne(7, location)
    .then(() => taskTwo(7,location))
    .then(() => taskThree(7,location))
    .catch(console.error)

}


main();