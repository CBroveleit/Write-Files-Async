const fs = require('fs');
const util = require('util');
var path = require('path');


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
        }, 500)
    });
}

async function taskOne(x, location){
    console.log('** Starting task task One **')
    for(var i = 1; i <= x; i++) {
        let name = `taskOne_${i}`;
        await writeFileAsync(location,name)
        .then( () => console.log(`Finished Writing file ${name}`))
    }
    console.log('** Finished with task One **')
}

async function taskTwo(x, location){
    console.log('** Starting task Two **')
    const filesToWrite = []
    for(var i = 1; i <= x; i++){
        let name = `taskTwo_${i}`
        filesToWrite.push(writeFileAsync(location, name).then( () => console.log(`Finished Writing file taskTwo_${name}`)))
    }
    await Promise.all(filesToWrite)
    console.log(`** Finished with task Two **`)
}

async function taskThree(x, location){
    console.log('** Starting task Three **')
    const randomlyDelayedIndex = Math.floor(Math.random()*Math.floor(x+1)+1);
    const badPath = path.join(__dirname,`/notHome`);
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
    console.log(`** Finished with task Three **`)
}

async function taskFour(x, location){
    const badPath = path.join(__dirname,`/notHome`);
    const randomlyDelayedIndex = Math.floor(Math.random()*Math.floor(x+1)+1);

    console.log(`** Starting task Four **`)
    const filesToWrite = []
    for(var i = 1; i <= x; i++){
        let name = `taskFour_${i}`
        let directionIsGood = isItGoodOrBad();
        if(directionIsGood){
            if(i === randomlyDelayedIndex){
                filesToWrite.push(delayFiveSec().then( () => {
                    return writeFileAsync(location,name)
                })
                .then( () => console.log(`Finished delay Writing file ${name}`)))
            } else{
                filesToWrite.push(writeFileAsync(location, name).then( () => console.log(`Finished Writing file ${name}`)))
            }
        } else {
            if(i === randomlyDelayedIndex){
                filesToWrite.push(delayFiveSec().then( () => {
                    return writeFileAsync(badPath,name)
                })
                .then( () => console.log(`Finished delayed Writing file ${name}`))
                .catch( (err) => console.log(`Failed to write ${name}`)))
            } else{
                filesToWrite.push(writeFileAsync(badPath, name)
                    .then( () => console.log(`Finished Writing file ${name}`))
                    .catch( (err) => console.log(`Failed to write ${name}`)  )
                    )
            }
        }
    }
    await Promise.all(filesToWrite)
    console.log(`** Finished with taskFour **`)
}


async function taskFive(x,location){
    console.log('** Starting task Five **')
    const randomlyDelayedIndex = Math.floor(Math.random()*Math.floor(x+1)+1);
    const badPath = path.join(__dirname,`/notHome`);
    for(var i = 1; i <= x; i++){
        let name = `taskFive_${i}`;
        let directionIsGood = isItGoodOrBad();
        if(i === randomlyDelayedIndex){

            await delayFiveSec()
            if(directionIsGood){
                await writeFileAsync(location,name)
                console.log(`Finished Writing file ${name}`)
            }
            else {
                try {
                    await writeFileAsync(badPath, name)
                    console.log(`Finished Writing file ${name}`)
                }
                catch(e){
                    console.log(`Failed to write file ${name}`)
                    break;
                }
            }
            
        }else{
            if(directionIsGood){
                await writeFileAsync(location,name)
                console.log(`Finished Writing file ${name}`)
            } else {
                try {
                    await writeFileAsync(badPath, name)
                    console.log(`Finished Writing file ${name}`)

                }
                catch(e){
                    console.log(`Failed to write file ${name}`)
                    break;
                }   
            }
        }
    }
    console.log(`** Finished with task Five **`)
}


async function main(){
    const folderName = String(Date.now());
    const x = Number(folderName.slice(-1));
    const location = path.join(__dirname,folderName);
    fs.mkdir(location, ()=> {});

    taskOne(7, location)
    .then(() => taskTwo(7,location))
    .then(() => taskThree(7,location))
    .then( () => taskFour(7, location))
    .then( () => taskFive(7,location))
    .catch(console.error)
}


main();