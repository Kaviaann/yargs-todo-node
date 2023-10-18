# yargs-todo-node

Documentation 😋💜 :

    Node Modules : 
        yargs (npm i yargs)
        fs-extra (npm i fs-extra)

    
    yargs :
    


        Membuat Command :

            const argv = yargs
                .command(['add','a'], 'Menulis Data Ke List', (yargs) => {
                    yargs
                        .options('data', [
                            describe:'Write Data To List',
                            type:'string',
                            alias:'dt'
                        ])
                })

                .argv

            console.log(argv.data)



            Penjelasan :

                .command() //menambahkan perintah ke yargs
                    
                    // parameter pertamanya itu commandnya (gunakan array 
                    kyk diatas biar ada alias nya) contoh : a / add

                    // parameter kedua itu description nya
                    nanti di --help, contoh : 
                    add    Menulis Data Ke List    [aliases : a]

                    // parameter ketiga itu callback nya
                    
                
                .options() //menambahkan input buat perintah

                    // parameter pertama itu nama buat inputnya

                    // parameter kedua itu buat mengconfigurasinya

                        {
                            describe:'Write Data To List', 
                            // Description Buat Inputnya Nanti Di --help

                            type:'string', 
                            // Tipe Buat Inputnya

                            alias:'dt' 
                            // alias / nama pendeknya biar Bisa disingkat jadi --dt
                        }
                    

                console.log(argv.data) 
                //mengambil data dlm argv input data

        

        Membuat fungsi untuk argv : 

            switch(argv._[0])[

                case 'add' : 
                    console.log(`Data : "${argv.data}"`);
                    break;
            ]


            penjelasan : 

            argv._[0]

            // Mengecek Command Apa Yg Di Jalankan Pertama Kali


            case 'add' :
                console.log(`Data : "${argv.data}"`);
                break();
            
            // Menambahkan Case untuk mengecek apakah isi dari 'argv._[0]'
               itu 'add', kalau iya menjalankan console.log(`Data : "${argv.data}"`);
               lalu menghentikan loop : break();


            


    fs-extra : 


        const fs = require('fs-extra);

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



        Membuat file dan direktori kalau 
        direktori dan filenya ga ada :

            //diawal script

            const path = './dir/file.json'
            const dir = path.slice(0, path.lastIndexOf('/') + 1);

            if(fs.pathExistSync(path) === false){
                createFile();
            }


            //Function

            function createFile(){
                const data = [
                    {
                        data : [info]
                    }
                ] || []

                fs.mkdirSync(dir, { recursive : true });
                fs.writeFileSync(path, JSON.stringfy(data, null, 2), 'utf-8');
                console.log('Berhasil Membuat File Configurasi !');
            }


            penjelasan :

            //variable
            const path = './dir/file.json'
            // membuat variable untuk dimana filenya dibuat
               dir = foldernya
               file = nama filenya
               .json = jenis filenya

            const dir = path.slice(0, path.lastIndexOf('/') + 1);
            // mengambil ./dir/ dari variable const



            //startup
            if(fs.pathExistSync(path) === false){
                createFile();
            }
            // kalau fs.pathExistSync(path) === false jalankan function
               createFile();


            
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

            // bikin function createFile dengan parameter info
            

            // bikin variable data = [
                {
                    data : [data]
                }
            ] || []
            
            // pakai yg pertama variablenya kalau ga ada dimasukin
               nilai parameter info nilai variablenya jadi []

            fs.mkdirSync(dir, { recursive : true });
            // bikin foldernya

            fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
            // menulis file di direktory variable path ('./dir/file.json')
            // mengubah data menjadi stringify json dengan cara JSON.stringify
               // masukin parameter pertamanya apa yg di ubah jadi stringify
               // masukin parameter kedua null
               // masukin parameter ketiga 2
            // parameter tiganya 'utf-8' alias encoding
            
            console.log(`Berhasil Membuat File Configurasi !`)
            // memprint pesan Berhasil Membuat File Configurasi !
            
        

    bikin fungsi menambah data :

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


        penjelasan : 

            //membuat function addData dengan parameter info

            //membuat variable pureData dengan isi :
                fs.readFileSync(path, 'utf-8');
            //membuat variable data yaitu versi parsenya pureData :
                JSON.parse(pureData);
            //membuat variable newData :
                {
                    data : [info]
                }

                // membuat itu dengan menggunakan nilai dari parameter
                   info buat dijadikan value dari key data
            
            //memasukan newData ke data dengan cara data.push(newData);
              karna data itu array

            //menulis data ke path dengan cara :
                fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');

                //ubah dlu data ke stringify

            //mengirim pesan :
                Berhasil Menyimpan : "${info}" Ke File !

                // info itu parameternya jadi misalkan dimasukin
                   parameternya itu hi jadinya pesannya itu gini
                   "Berhasil Menyimpan : "hi" Ke File !"



    bikin function untuk menghapus data
    kalau ga ada dimasukin datanya dihapus
    semuanya : 

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


        penjelasan :

            //membuat function delData dengan parameter index

            //membuat variable pureData dengan isi :
                fs.readFileSync(path, 'utf-8');
            //membuat variable data yaitu versi parsenya pureData :
                JSON.parse(pureData);


            //bikin if statement di dalam function delData(index):
                if(index !== undefined) //mengecek apakah index itu undefined atau ga
                {

                    if(index < 0 || index > data.length + 1) //mengecek apakah index 
                                                             lebih besar dari panjang data atau kurang dari 0
                    {
                        console.log('Index Tidak Valid');
                    }

                    else // jalan ketika index valid
                    {
                        const deletedItem = data[index-1]; // memasukan data yg dihapus

                        data.splice(index-1,1); // memotong data menggunakan splice

                        console.log(`Data : "${deletedItem.data}" Berhasil Dihapus`);
                        // memberitahu data yg dihapus

                        fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
                        // menyimpan perubahan
                    }

                }

                else // jalan ketika ga ada nilai index
                {
                    data.length = 0;
                    // mengubah panjang dari data menjadi 0 alias ga ada data
                       dalam array data

                    console.log('Berhasil Menghapus Seluruh Data');
                    // memberitahu pengguna semua datanya sdh dihapus

                    fs.writeFileSync(path, '[]', 'utf-8');
                    // menyimpan ke filenya
                }
            
            

    membuat function seeData untuk
    melihat data di index atau semuanya :

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


        penjelasan : 

            //membuat function seeData dengan parameter index

            //membuat variable pureData dengan isi :
                fs.readFileSync(path, 'utf-8');
            //membuat variable data yaitu versi parsenya pureData :
                JSON.parse(pureData);


            //bikin if statement di dalam function delData(index):
            if(index !== undefined) //mengecek apakah index itu undefined atau ga
            {

                if(index < 0 || index > data.length + 1) //mengecek apakah index 
                                                            lebih besar dari panjang data atau kurang dari 0
                {
                    console.log('Index Tidak Valid');
                }

                else // jalan ketika index valid
                {
                    const seeData = data[index-1];
                    // menyimpan data yg akan dilihat 

                    console.log(`Data ${index} : "${seeData.data}"`)
                    // menampilkan Data ${index} : "${seeData.data}"
                }

            }

            else // jalan ketika ga ada nilai index
            {

            let no = 0; //bikin variable buat urutan

            data.forEach(element => {   // bikin forEach loop
                no++; // menambah nilai no

                console.log(`Data ${no} : "${element.data}"`);
                // menampilkan pesan Data ${no} : "${element.data}"
                // untuk setiap data

            });
            
            }

