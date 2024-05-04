import {AppCamera} from "@components/AppCamera/AppCamera";
import {ReportButton} from "@components/Button";
import {PhotoPreviewList} from "@components/PhotoPreviewList";
import {useAppDispatch} from "@hooks/index";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {useFocusEffect} from "@react-navigation/native";
import {setReportPhotoUris} from "@redux/reducers/report";
import {photoStep} from "@styles/ReportStyles";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Platform, StyleSheet, Text, View, ViewProps} from "react-native";
import {check, PERMISSIONS, request} from "react-native-permissions";
import {PhotoFile} from "react-native-vision-camera";

interface Props extends ViewProps {
    config: ReportPageConfig
    loading: boolean,
    onYes: () => void,
}

export const PhotoStep: React.FC<Props> = ({
    config,
    loading,
    onYes,
}): React.ReactElement => {
    const dispatch = useAppDispatch();

    const [photoUris, setPhotoUris] = useState<string[]>([]);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraPerm, setCameraPerm] = useState(false);
    const {t} = useTranslation();

    useFocusEffect(
        useCallback(() => {
            const permissionName = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
            check(permissionName).then(perm => {
                if (perm === "denied") {
                    request(permissionName).then(perm => {
                        if (perm === "blocked" || perm === "denied") {
                            Alert.alert(t("question_flow.photo_step.authorize_camera"));
                        } else if (perm === "granted") {
                            setCameraPerm(true);
                        }
                    });
                } else if (perm === "blocked") {
                    Alert.alert(t("question_flow.photo_step.authorize_camera"));
                } else if (perm === "granted") {
                    setCameraPerm(true);
                }
            });
        }, [t]),
    );

    const handleMediaCaptured = (photo: PhotoFile) => {
        setShowCamera(false);
        setPhotoUris(photoUris => {
            const newArray = photoUris.slice();
            newArray.push(`file://${photo.path}`);
            return newArray;
        });
    };

    const handleDeleteListPhoto = (index: number) => {
        setPhotoUris(photoUris => {
            const newArray = photoUris.slice();
            newArray.splice(index, 1);
            return newArray;
        });
    };

    const handleConfirm = () => {
        dispatch(setReportPhotoUris(photoUris));
        onYes();
    };

    const handleTakePhoto = () => {
        setShowCamera(true);
    };

    const renderPhotoSelect = () => {
        if (!showCamera) {
            return (
                <View>
                    <Text style={photoStep.text}>{config.text}</Text>
                    <PhotoPreviewList uriList={photoUris} onDelete={handleDeleteListPhoto}/>
                    <ReportButton
                        style={{margin: 10}}
                        value={t("question_flow.photo_step.take_photo") ?? "Prendre une photo"}
                        onClick={handleTakePhoto}
                        inProgress={loading}
                    />
                    {photoUris.length > 0 ? (
                        <ReportButton
                            style={{margin: 10}}
                            value={config.yes.label}
                            onClick={handleConfirm}
                            inProgress={loading}
                        />
                    ) : <Text style={photoStep.textValid}>Veuillez prendre au moins une photo.</Text>}
                </View>
            );
        } else {
            return null;
        }
    };

    const renderCamera = () => {
        if (cameraPerm && showCamera) {
            return (
                <AppCamera
                    type={"photo"}
                    captureEnabled={true}
                    onMediaCaptured={handleMediaCaptured}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            {renderPhotoSelect()}
            {renderCamera()}
        </View>
    );
};
