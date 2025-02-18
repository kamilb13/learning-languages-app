import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ExtraLessons = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert('Kod QR zeskanowany!', `Otwieranie linku: ${data}`, [
            {
                text: 'Otwórz',
                onPress: () => Linking.openURL(data).catch((err) => Alert.alert('Błąd', 'Nie można otworzyć linku.')),
            },
            { text: 'Anuluj', onPress: () => setScanned(false), style: 'cancel' },
        ]);
    };

    if (hasPermission === null) {
        return <Text>Proszę o pozwolenie na dostęp do kamery...</Text>;
    }

    if (hasPermission === false) {
        return <Text>Brak dostępu do kamery.</Text>;
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skanuj kod QR, aby rozpocząć lekcję!</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title="Zeskanuj ponownie" onPress={() => setScanned(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ExtraLessons;