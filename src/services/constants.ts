import {Platform} from "react-native";
import {EdgeInsets} from "react-native-safe-area-context";

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM = (edgeInset: EdgeInsets) => {
    return Platform.select({
        ios: edgeInset.bottom,
    }) ?? 0;
};

export const SAFE_AREA_PADDING = (edgeInset: EdgeInsets) => {
    return {
        paddingLeft: edgeInset.left + CONTENT_SPACING,
        paddingTop: edgeInset.top + CONTENT_SPACING,
        paddingRight: edgeInset.right + CONTENT_SPACING,
        paddingBottom: SAFE_BOTTOM(edgeInset) + CONTENT_SPACING,
    };
};
