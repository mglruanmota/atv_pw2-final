const { initializeApp } = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');

/* DADOS DE ACESSO AO FIREBASE */
const firebaseConfig = {
    apiKey: "AIzaSyAgdCVVEDj1UDsNLlwfDUXPwke5SQUrbjw",
    authDomain: "livrariapw.firebaseapp.com",
    projectId: "livrariapw",
    storageBucket: "livrariapw.appspot.com",
    messagingSenderId: "1051302776965",
    appId: "1:1051302776965:web:ed82968443a4a293bb99ec",
    measurementId: "G-VSJYT72DB6"
};

/* INICIALIZAÇÃO DO FIREBASE */
const firebaseApp = initializeApp(firebaseConfig);

/* INICIALIZAÇÃO DO STORAGE DO FIREBASE */
const storage = getStorage(firebaseApp);

const deleteImage = (imagem) => {

    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
        .then(() => {
            console.log('IMAGEM EXCLUÍDA COM SUCESSO!');
        })
        .catch((error) => {
            console.log('ERRO AO EXCLUIR IMAGEM!');
        });

}

module.exports = deleteImage;