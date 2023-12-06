const {initializeApp}  = require('firebase/app');
const { getStorage, ref, deleteObject} = require('firebase/storage');

/* DADOS DE ACESSO AO FIREBASE */
const firebaseConfig = {
    apiKey: "AIzaSyAmA1vhCuYw-tWEY-0Pf6LbU2T7KdhD83c",
    authDomain: "upload-nodejs-d709e.firebaseapp.com",
    projectId: "upload-nodejs-d709e",
    storageBucket: "upload-nodejs-d709e.appspot.com",
    messagingSenderId: "208090475096",
    appId: "1:208090475096:web:a0f40e3954af73c7acb82d",
    measurementId: "G-XS6298SD7G"
};

/* INICIALIZAÇÃO DO FIREBASE */
const firebaseApp = initializeApp(firebaseConfig);

/* INICIALIZAÇÃO DO STORAGE DO FIREBASE */
const storage = getStorage(firebaseApp);

const deleteImage = (imagem)=>{

    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
    .then(()=>{
        console.log('IMAGEM EXCLUÍDA COM SUCESSO!');
    })
    .catch((error)=>{
        console.log('ERRO AO EXCLUIR IMAGEM!');
    });

}

module.exports = deleteImage;