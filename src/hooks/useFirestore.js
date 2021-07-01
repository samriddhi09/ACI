import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = projectFirestore.collection('Orders')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    let docData = doc.data();
                    docData.Date_on_which_the_order_was_placed = docData.Date_on_which_the_order_was_placed.toDate().toDateString();
                    docData.Dispatched_date = docData.Dispatched_date.toDate().toDateString();      
                    documents.push({ ...docData, id: doc.id })
                    
                });
                setDocs(documents);
            });

        return () => unsub();

    }, [collection])

    return { docs };
}

export default useFirestore;