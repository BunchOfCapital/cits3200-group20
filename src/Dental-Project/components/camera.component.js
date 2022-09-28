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
    const [modalVisible, setModalVisible] = useState();
    const [modalColor, setModalColor] = useState("none");
    //Modal elements states.
    const [buttStyle, setButtStyle] = useState();
    const [viewStyle, setViewStyle] = useState();
    const [imageStyle, setImageStyle] = useState();
    const [introMsgStyle, setIntroMsgStyle] = useState();
    const [buttTextStyle, setButtTextStyle] = useState();
    const [buttTextMsg, setButtTextMsg] = useState();
    //Camera states.
    const [imageUri, setImageUri] = useState();
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState();
    const [previewRatio, setPreviewRatio] = useState(0);
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [photo, setPhoto] = useState();
    const [flash, setFlash] = useState();
    //Request for camera permission.
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();

            if (cameraPermission === 'denied') await Linking.openSettings();
            setCameraPermissionStatus(cameraPermission);
        })();
    }, []);
    //Load intro message when page is in focus.
    useEffect(() => {
        const pageReload = navigation.addListener('focus', () => {
            setModalVisible(true);
            setViewStyle(styles.introView);
            setButtStyle(styles.introBtn);
            setIntroMsgStyle(styles.introMsg);
            setImageStyle(styles.imgOff);
            setButtTextStyle(styles.introBtnMsg);
            setButtTextMsg("Let's Begin");
            setModalColor("white");
            setFlash(Camera.Constants.FlashMode.off);
        });

        return pageReload;
    }, [navigation]);

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
        setFlash(Camera.Constants.FlashMode.off);
        setModalColor(assessColor[status]);
    };
    //Set modal to preview image after closing.
    const closeModal = () => {
        setViewStyle(styles.previewView);
        setButtStyle(styles.previewButton);
        setImageStyle(styles.previewImage);
        setIntroMsgStyle(styles.introOff);
        setButtTextStyle(styles.previewButtText);
        setFlash(Camera.Constants.FlashMode.torch);
        setButtTextMsg("Dismiss");
        setModalVisible(false);
    }

    const navToAssess = () => {
        navigation.navigate("Assessment")
    }

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
                <Camera style={[styles.camera]} ref={cameraRef} onCameraReady={setCameraReady} ratio={previewRatio} flashMode={flash}>
                    <Button style={styles.backButton} accessoryLeft={arrowBack} onPress={navToAssess}></Button>
                    <Pressable style={[styles.cameraTouch]} onPress={takePic}></Pressable>
                    <Modal animationType='slide' transparent={true} visible={modalVisible}>
                        <View style={[viewStyle, { borderColor: modalColor }]}>
                            <Image style={imageStyle} source={{ uri: imageUri }} />
                            <Text style={introMsgStyle}>1. Find a mirror{'\n'}2. Open your mouth wide{'\n'}3. Look at the mirror and position your phone{'\n'}4. Make sure you can see your mouth clearly{'\n'}on screen{'\n'}5. Tap anywhere on screen to take an image!</Text>
                            <Pressable style={[buttStyle, { borderColor: modalColor }]} onPress={closeModal}>
                                <Text style={buttTextStyle}>{buttTextMsg}</Text>
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
    previewView: {
        flex: 1,
        borderWidth: 4,
        marginTop: '15%',
        marginBottom: '17.5%',
        marginHorizontal: '1%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewButton: {
        borderWidth: 2,
        position: 'absolute',
        bottom: "7.5%",
        left: "-5%",
        alignItems: 'center',
        width: 100,
        backgroundColor: 'rgb(255, 242, 229)',
        borderRadius: 15,
        padding: 7,
        elevation: 2,
        transform: [{rotate:'90deg'}],
    },
    previewImage: {
        borderRadius: 5,
        alignSelf: 'stretch',
        flex: 1,
    },
    previewButtText: {
        fontSize: 22,
        fontFamily: 'futura-medium-bt',
        color: 'black',
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
    },
    introView: {
        flex: 1,
        marginTop: '14%',
        marginBottom: '17.5%',
        marginHorizontal: '1%',
        borderRadius: 10,
    },
    introMsg: {
        flex: 1,
        width: '158%',
        height: '62%',
        backgroundColor: "rgb(255, 209, 220)",
        borderRadius: 10,
        padding: "3%",
        transform: [{rotate:'90deg'}],
        position: 'absolute',
        bottom: "18.5%",
        right: "-29%",
        fontFamily: 'futura-medium-bt',
        fontSize: 24,
    },
    introBtn: {
        backgroundColor: "rgb(255, 253, 217)",
        width: "50%",
        height: "7%",
        transform: [{rotate:'90deg'}],
        position: 'absolute',
        bottom: "15%",
        left: "-15%",
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
    },
    introBtnMsg: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'futura-medium-bt',
        color: "rgb(128, 57, 69)",
    },
    introOff: {
        display: "none",
    },
    imgOff: {
        display: "none",
    }
});
