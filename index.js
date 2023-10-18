//Node Modules
const yargs = require('yargs');
const fs = require('fs-extra');





//Variable
const path = './data/list.json';
const dir  = path.slice(0, path.lastIndexOf('/')+1);





//StartUp
if(fs.pathExistsSync(path) === false){
    createFile();
};





//Yargs
const argv = yargs 
    .command(['add', 'a'], 'Menulis Data Ke List', (yargs) => {
        yargs
            .options('data', {
                describe:'Write Data To List',
                type:'string',
                alias:'dt'
            })
    })

    .command(['del', 'd'], 'Menghapus Data Di Index / Semuanya', (yargs) => {
        yargs
            .options('index', {
                describe:'Delete Data On The Index / All',
                type:'number',
                alias:'id'
            })
    })

    .command(['see', 's'], 'Melihat Data Di Index', (yargs) => {
        yargs
            .options('index', {
                describe:'See Data On The Index / All',
                type:'number',
                alias:'id'
            })
    })

    .argv





//Algorithm
switch(argv._[0]){

    case 'add':
        addData(argv.data);
        break;

    case 'del':
        delData(argv.index);
        break;

    case 'see':
        seeData(argv.index);
        break;
}





//Function
function createFile(info){
    const data = [
        {
            data : [info]
        }
    ] || []

    fs.mkdirSync(dir, { recursive : true });
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Berhasil Membuat File Configurasi !')
}


function addData(info){
    const pureData = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(pureData);

    const newData = {
        data : [info]
    };

    data.push(newData);

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Berhasil Menyimpan : "${info}" Ke File !`)

}


function delData(index){
    const pureData = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(pureData);

    if(index !== undefined){
        
        if(index <0 || index > data.length + 1){
            console.log('Index tidak valid');
        }

        else{
            const deletedItem = data[index-1];

            data.splice(index-1, 1); // Menghapus item dari array
            
            console.log(`Data: "${deletedItem.data}" Berhasil Dihapus`);
            fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
        }

    } else {
        data.length = 0;
        console.log('Berhasil Menghapus Seluruh Data');
        fs.writeFileSync(path, '[]', 'utf-8');
    }

}


function seeData(index){
    const pureData = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(pureData);

    if(index !== undefined) {
        
        if(index < 0|| index > data.length + 1){
            console.log('Index Tidak Valid');
        }
    
        else{
            const seeData = data[index-1];
    
            console.log(`Data ${index} : "${seeData.data}"`)
        }

    }

    else {

        let no = 0;

        data.forEach(element => {
            no++;
            console.log(`Data ${no} : "${element.data}"`);
        });

    }

}