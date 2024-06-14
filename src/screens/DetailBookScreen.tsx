import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { FormBooks } from './HomeScreen/HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../configs/fireBaseConfig';


export const DetailBookScreen = () => {

    //hook para tomar propiedades de la ruta
    const route = useRoute();
    //@ts-ignore
    const { book } = route.params;
    console.log(book);

    //hook navegacion
    const navigation = useNavigation();

    //hook useState: manipulando el formulario Detail Message
    const [editFormBook, setEditFormBook] = useState<FormBooks>({
        title: '',
        author: '',
        year: 0,
        image: ''
    });

    //hook useEffect: mostrar la informacion del mensaje
    useEffect(() => {
        setEditFormBook(book)
    }, [])

    //funcion para cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setEditFormBook({ ...editFormBook, [key]: value })
    }

    //funcion para actualizar el libro
    const handlerUpdateBook = async () => {
        const dbRef = ref(dbRealTime, `books/${book.id}`)
        await update(dbRef, {
            title: editFormBook.title,
            author: editFormBook.author,
            year: editFormBook.year,
            image: editFormBook.image
        })
        navigation.goBack();
    }

    //funcion para eliminar la data del mensaje
    const handlerDeleteBook = async ()=> {
        const dbRef = ref(dbRealTime, `books/${book.id}`)
        await remove(dbRef)
        navigation.goBack();
    }

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/fotos-premium/vacie-sobremesa-madera-estantes-falta-definicion-fondo-libreria_7188-619.jpg' }}
            style={styles.backgroundImage}
        >
            <View style={styles.root}>
                <View>
                    <Image
                        source={{ uri: book.image }}
                        style={styles.bookImageDetail}
                    />
                    <Divider />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        value={editFormBook.image}
                        label={'Url de la imagen:'}
                        onChangeText={(value) => { handlerSetValues('image', value); }}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        value={editFormBook.title}
                        label={'Título:'}
                        onChangeText={(value) => { handlerSetValues('title', value); }}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        value={editFormBook.author}
                        label={'Autor:'}
                        onChangeText={(value) => { handlerSetValues('author', value); }}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        value={editFormBook.year.toString()}
                        label={'Año de publicación:'}
                        onChangeText={(value) => { handlerSetValues('year', value); }}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                </View>

                <Button
                    mode="contained"
                    icon="update"
                    onPress={handlerUpdateBook}
                    style={styles.button}
                >Actualizar</Button>

                <Button
                    mode="contained"
                    icon="delete"
                    onPress={handlerDeleteBook}
                    style={styles.button}
                >Eliminar</Button>

                <Text variant='bodyLarge'
                    style={styles.linkHome}
                    onPress={() =>
                        navigation.dispatch(CommonActions.navigate({ name: 'Home', params: { book } }))}
                >Volver al inicio</Text>
            </View>
        </ImageBackground>
    );
}
