import { StyleSheet, Text, View, Image, Pressable, Platform, Modal } from 'react-native';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Button, Icon } from '@ui-kitten/components';
import { Camera } from 'expo-camera';

export const CameraPage = ({ navigation }) => {
    let cameraRef = useRef();
    //Check if camera page is still in focus, if not unmount camera.
    const isFocused = useIsFocused();
    //Array and objects for imitating ai.
    const statuses = ['good', 'bad', 'ugly'];
    const assessText = { good: "Healthy", bad: "Unhealthy", ugly: "Seek dental care" };
    const assessColor = { good: "green", bad: "red", ugly: "yellow" };
    //Modal states.
    const [modalVisible, setModalVisible] = useState(false);
    const [modalColor, setModalColor] = useState();
    const [modalText, setModalText] = useState();
    //Camera states.
    const [imageUri, setImageUri] = useState();
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState();
    const [previewRatio, setPreviewRatio] = useState(0);
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [photo, setPhoto] = useState();
    //Request for camera permission.
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();

            if (cameraPermission === 'denied') await Linking.openSettings();
            setCameraPermissionStatus(cameraPermission);
        })();
    }, []);

    if (cameraPermissionStatus === undefined) {
        return <Text>Requesting permissions</Text>
    }
    else if (!cameraPermissionStatus) {
        return <Text>Access to camera permission denied. Change permission in settings.</Text>
    }

    //Find closest aspect ratio smaller than or equals to 16:9 for camera.
    const setRatio = async () => {
        let outputRatio = "16:9";
        if (Platform.OS === 'android') {
            const aspectRatios = await cameraRef.current.getSupportedRatiosAsync();
            const desiredRatio = 16 / 9;
            let minDiff = Number.MAX_VALUE;
            for (const ratio of aspectRatios) {
                const parts = ratio.split(':');
                const currRatio = parseInt(parts[0]) / parseInt(parts[1]);
                const diff = desiredRatio - currRatio;
                if (diff >= 0 && diff < minDiff) {
                    outputRatio = ratio;
                    minDiff = diff;
                }
            }
        }
        setPreviewRatio(outputRatio);
        setIsRatioSet(true);
    };
    //Changes the default camera aspect ratio.
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await setRatio();
        }
    };
    //Takes photo and set photo state.
    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            skipProcessing: true
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };
    //A dummy function that imitates the ai functionality.
    const assess = () => {
        const status = statuses[[Math.floor(Math.random() * 3)]]
        setModalVisible(true);
        setModalColor(assessColor[status]);
        setModalText(assessText[status]);
    };

    const arrowBack = (props) => (
        <Icon name='arrow-ios-back-outline' {...props} />
    );

    if (photo) {
        setImageUri(photo.uri);
        setPhoto(undefined);
        assess();
    };

    return (
        <View style={styles.cameraContainer}>
            {isFocused ? (
                <Camera style={[styles.camera]} ref={cameraRef} onCameraReady={setCameraReady} ratio={previewRatio}>
                    <Button style={styles.backButton} accessoryLeft={arrowBack} onPress={() => navigation.navigate("Assessment")}></Button>
                    <Pressable style={[styles.cameraTouch]} onPress={takePic}></Pressable>
                    <Modal animationType='slide' transparent={true} visible={modalVisible}>
                        <View style={[styles.modalView, { borderColor: modalColor }]}>
                            <Image style={styles.modalImage} source={{ uri: imageUri }} />
                            <Pressable style={[styles.modalButton, { borderColor: modalColor }]} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.buttText}>Dismiss</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </Camera>) : <View />}
        </View>
    )
};

export default CameraPage;

const styles = StyleSheet.create({
    camera: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cameraTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        borderWidth: 4,
        marginTop: '14.5%',
        marginBottom: '18%',
        marginHorizontal: '2%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    modalButton: {
        borderWidth: 2,
        position: 'absolute',
        bottom: 5,
        alignItems: 'center',
        width: 100,
        backgroundColor: 'rgb(255, 242, 229)',
        borderRadius: 15,
        padding: 10,
        elevation: 5
    },
    modalImage: {
        borderRadius: 5,
        alignSelf: 'stretch',
        flex: 1,
    },
    buttText: {
        fontSize: 22,
        fontFamily: 'futura-medium-bt',
        color: 'black',
    },
    bodyText: {
        fontSize: 16,
    },
    backButton: {
        width: 20,
        height: 20,
        backgroundColor: 'rgb(128, 57, 69)',
        borderWidth: 0,
        borderRadius: 20,
        position: 'absolute',
        top: '1%',
        left: '2%',
    }
});
