export const obtenerData = (firebase, paginaSize, negocioInicial, texto) => {
    return new Promise(async (resolve, eject)=>{
        let negocios = firebase.db
            .collection("Business")
            .orderBy("direccion")
            .limit(paginaSize);

        if(negocioInicial !== null){
            negocios = firebase.db
                .collection("Business")
                .orderBy("direccion")
                .startAfter(negocioInicial)
                .limit(paginaSize);

            if(texto.trim() !== ""){
                negocios = firebase.db
                    .collection("Business")
                    .orderBy("direccion")
                    .where("keywords", "array-contains", texto.toLowerCase())
                    .startAfter(negocioInicial)
                    .limit(paginaSize);
            }
        }

        const snapshot = await negocios.get();

        const arrayNegocios = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const inicialValor = snapshot.docs[0];
        const finalValor = snapshot.docs[snapshot.docs.length -1];

        const returnValue = {
            arrayNegocios,
            inicialValor,
            finalValor
        }

        resolve(returnValue);

    })

}


export const obtenerDataAnterior = (firebase, paginaSize, negocioInicial, texto) => {
    return new Promise(async (resolve, eject)=>{
        let negocios = firebase.db
            .collection("Business")
            .orderBy("direccion")
            .limit(paginaSize);

        if(negocioInicial !== null){
            negocios = firebase.db
                .collection("Business")
                .orderBy("direccion")
                .startAt(negocioInicial)
                .limit(paginaSize);

            if(texto.trim() !== ""){
                negocios = firebase.db
                    .collection("Business")
                    .orderBy("direccion")
                    .where("keywords", "array-contains", texto.toLowerCase())
                    .startAt(negocioInicial)
                    .limit(paginaSize);
            }
        }

        const snapshot = await negocios.get();

        const arrayNegocios = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const inicialValor = snapshot.docs[0];
        const finalValor = snapshot.docs[snapshot.docs.length -1];

        const returnValue = {
            arrayNegocios,
            inicialValor,
            finalValor
        }

        resolve(returnValue);

    })

}