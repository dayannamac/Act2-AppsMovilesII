import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { NewBookComponent } from './components/NewBookComponent';
import { FlatList } from 'react-native-gesture-handler';
import { BookCardComponent } from './components/BookCardComponent';
import { dbRealTime } from '../../configs/fireBaseConfig';
import { onValue, ref } from 'firebase/database';

export interface FormBooks {
    title: string;
    author: string;
    year: number;
    image: string;
}

export const HomeScreen = () => {

    //hook useState: contener lista de libros
    const [books, setBooks] = useState<FormBooks[]>([]);

    //Hook useState: manipular el modal
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false)

    useEffect(() => {
        getAllBooks();
    }, [])

    //funcion para consultar la data desde firebase
    const getAllBooks = () => {
        //1.Referencia a la BDD
        const dbRef = ref(dbRealTime, 'books');
        //consultar data
        onValue(dbRef, (snapshot) => {
            //3. Capturar data
            const data = snapshot.val();
            //Verficacion de la data
            if (!data) return;
            //4.obtener keys data
            const getKeys = Object.keys(data);
            //5. Crear arreglo lista de libros
            const listBooks: FormBooks[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listBooks.push(value);
            })
            setBooks(listBooks);
        })
    }

    return (
        <>
            <ImageBackground
                source={{ uri: 'https://img.freepik.com/fotos-premium/vacie-sobremesa-madera-estantes-falta-definicion-fondo-libreria_7188-619.jpg' }}
                style={styles.backgroundImage}
            >
                <View style={styles.root}>
                <Image
                        source={{ uri: 'https://www.zarla.com/images/zarla-entre-hojas-1x1-2400x2400-20220518-qkw8cbyjtjvyqyt3j6p6.png?crop=1:1,smart&width=250&dpr=2' }}
                        style={styles.librarySign}
                    />
                </View>

                <View>
                    <FlatList
                        data={books}
                        renderItem={({ item }) =>
                            <BookCardComponent book={item} />}
                        keyExtractor={item => item.title}
                    />
                </View>
            </ImageBackground>

            {/* Abrir modal para agregar libros */}
            <FAB
                icon="plus"
                style={styles.fabBook}
                onPress={() => setShowModalMessage(true)}
            />
            <NewBookComponent showModalMessage={showModalMessage} setShowModalMessage={setShowModalMessage} />
        </>
    );
};