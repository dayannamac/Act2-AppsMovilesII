import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../../../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { FormBooks } from './NewBookComponent';
import { Text } from 'react-native-paper';

interface Props {
    book: FormBooks;
}

export const BookCardComponent = ({ book }: Props) => {
    //hook navegacion
    const navigation = useNavigation();

    return (
        <View style={styles.rootBook}>
            <View style={styles.contentContainer}>
                <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{book.title}</Text>
                <Image
                    source={{ uri: book.image }}
                    style={styles.bookImage}
                />
                <Text variant='bodyLarge'
                    style={styles.linkDetail}
                    onPress={() =>
                        navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { book } }))}
                >Más información del libro</Text>
            </View>
        </View>
    );
};
