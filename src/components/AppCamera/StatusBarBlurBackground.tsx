import {statusBarBlurBackground} from "@styles/AppCameraStyles";
import React from "react";
import {Platform, ViewProps} from "react-native";
import {BlurView} from "rn-id-blurview";

const FALLBACK_COLOR = "rgba(140, 140, 140, 0.3)";

type Props = ViewProps

export const StatusBarBlurBackground: React.FC<Props> = React.memo<Props>(({
    style,
    ...props
}): React.ReactElement | null => {

    if (Platform.OS !== "ios") return null;

    return (
        <BlurView
            style={[statusBarBlurBackground.statusBarBackground, style]}
            blurAmount={25}
            blurType="light"
            blurRadius={0}
            reducedTransparencyFallbackColor={FALLBACK_COLOR}
            {...props}
        />
    );
});
