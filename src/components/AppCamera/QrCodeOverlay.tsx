import {absoluteFillObject, qrCodeOverlay} from "@styles/AppCameraStyles";
import React from "react";
import {Text, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    visible?: boolean,
    label?: string
}

const QrCodeOverlayImpl: React.FC<Props> = ({
    visible,
    label,
}): React.ReactElement | null => {

    if (typeof visible !== "undefined" && !visible) return null;

    return (
        <View style={absoluteFillObject}>
            <View style={qrCodeOverlay.header}>
                <View>
                    <Text style={qrCodeOverlay.title}>{label}</Text>
                </View>
            </View>
            <View style={qrCodeOverlay.targetContainer}>
                <View style={qrCodeOverlay.targetWrapper}>
                    <View style={qrCodeOverlay.sideTarget}/>
                    <View style={qrCodeOverlay.target}>
                        <View
                            style={[
                                qrCodeOverlay.corner,
                                qrCodeOverlay.cornerTopLeft,
                            ]}
                        />
                        <View
                            style={[
                                qrCodeOverlay.corner,
                                qrCodeOverlay.cornerBottomLeft,
                            ]}
                        />
                        <View
                            style={[
                                qrCodeOverlay.corner,
                                qrCodeOverlay.cornerTopRight,
                            ]}
                        />
                        <View
                            style={[
                                qrCodeOverlay.corner,
                                qrCodeOverlay.cornerBottomRight,
                            ]}
                        />
                    </View>
                    <View style={qrCodeOverlay.sideTarget}/>
                </View>
            </View>
            <View style={qrCodeOverlay.header}/>
        </View>
    );
};

export const QrCodeOverlay = React.memo(QrCodeOverlayImpl);
