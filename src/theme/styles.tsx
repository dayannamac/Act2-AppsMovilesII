import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    root: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    iconEnd: {
        alignItems: 'flex-end',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        gap: 10
    },
    fabBook: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        backgroundColor: '#7cfc00'
    },
    buttonModal: {
        backgroundColor: '#7cfc00',
        color: '#000',
        marginTop: 20
    },
    rootBook: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        gap: 8
    },
    bookImage: {
        width: 200,
        height: 245,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    linkDetail: {
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    inputContainer: {
        marginBottom: 20,
        width: '90%',
    },
    input: {
        backgroundColor: 'white',
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '70%',
        backgroundColor: '#000',
    },
    linkHome: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 50
    },
    bookImageDetail: {
        width: 220,
        height: 280,
        resizeMode: 'cover',
        marginBottom: 10,
        marginTop: 45
    },
    librarySign: {
        width: 300,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 0
    }

})