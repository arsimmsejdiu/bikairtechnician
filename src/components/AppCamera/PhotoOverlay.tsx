import {COLORS, FeatherIcon} from "@assets/index";
import {photoOverlay} from "@styles/AppCameraStyles";
import React from "react";
import {Image, View, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {PhotoFile} from "react-native-vision-camera";

interface Props extends ViewProps {
    media: PhotoFile | null,
    onValidate?: (media: PhotoFile) => void,
    onCancel?: () => void,
}

export const PhotoOverlay: React.FC<Props> = ({
    media,
    onValidate,
    onCancel,
}): React.ReactElement | null => {


    const handleValidation = () => {
        if (typeof onValidate !== "undefined" && typeof media !== "undefined" && media !== null) {
            onValidate(media);
        }
    };

    const handleCancellation = () => {
        if (typeof onCancel !== "undefined") {
            onCancel();
        }
    };


    if (typeof media !== "undefined" && !media) return null;

    return (
        <View style={photoOverlay.container}>
            <Image
                source={{
                    uri: `file://${media.path}`,
                }}
                style={photoOverlay.image}
            />
            <View style={photoOverlay.buttonsContainer}>
                <TouchableOpacity style={photoOverlay.buttonBackground}
                    onPress={handleCancellation}
                >
                    <FeatherIcon
                        style={photoOverlay.submitButton}
                        name={"x"}
                        color={COLORS.red}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={photoOverlay.buttonBackground}
                    onPress={handleValidation}
                >
                    <FeatherIcon
                        style={photoOverlay.submitButton}
                        name={"save"}
                        color={COLORS.green}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

