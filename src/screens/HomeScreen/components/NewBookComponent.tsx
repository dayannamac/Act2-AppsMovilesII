import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { dbRealTime } from '../../../configs/fireBaseConfig';
import { push, ref, set } from 'firebase/database';

//interface -  Props: propiedades
interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

export interface FormBooks {
    title: string;
    author: string;
    year: number;
    image: string;
}

export const NewBookComponent = ({ showModalMessage, setShowModalMessage }: Props) => {

    //hook useState: manipulacion de la data del formulario
    const [formBooks, setFormBooks] = useState<FormBooks>({
        title: '',
        author: '',
        year: 0,
        image: ''
    });

    //funcion que cambie los valores del formMesssage
    const handlerSetValues = (key: string, value: string) => {
        setFormBooks({ ...formBooks, [key]: value })
    }

    //funcion guardar el mensaje
    const handlerSaveBook = async () => {
        if (!formBooks.title || !formBooks.author || !formBooks.year || !formBooks.image) {
            return;
        }
        //Guardar los datos en la BDD
        //1. Referencia de la BDD y creacion de la tabla
        const dbRef = ref(dbRealTime, 'books');
        //2. Crear una coleaccion 
        const saveBook = push(dbRef);
        //3. almacenar en la BDD
        try {
            await set(saveBook, formBooks);
            //4. Limpiar el formulario
            setFormBooks({
                title: '',
                author: '',
                year: 0,
                image: ''
            })
        } catch (ex) {
            console.log(ex);
        }
        setShowModalMessage(false);
    }

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Agregar libros</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="close-circle-outline"
                            size={28}
                            onPress={() => setShowModalMessage(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Titulo'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('title', value)}
                />
                <TextInput
                    label='Autor'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('author', value)}
                />
                <TextInput
                    label='Año publicacion'
                    mode='outlined'
                    keyboardType='number-pad'
                    onChangeText={(value) => handlerSetValues('year', value)}
                />
                <TextInput
                    label='Url Imagen'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('image', value)}
                />
                <Button mode='contained'
                    style={styles.buttonModal}
                    onPress={handlerSaveBook}>Enviar</Button>
            </Modal>
        </Portal>
    )
}
