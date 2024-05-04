// Group all global variable for theme
import { Dimensions, Platform } from "react-native";
import {Region} from "react-native-maps";


// Constant
const { width, height } = Dimensions.get("window");
export const NB_TUTO_DISPLAY = 8;

// Themes
export const COLORS = {
    darkBlue: "#277CC2",
    lightBlue: "#47B2FF",
    yellow: "#FDC556",
    darkYellow: "#cd994f",
    darkGrey: "#A4AAB3",
    lightGrey: "#F7F7F7",
    black: "#4A4A4A",
    red: "#EC4B4B",
    orange: "#ec7b4b",
    green: "#1BCE8A",
    darkGreen: "#006c0f",
    white: "#FFFFFF",
    inputGrey: "#DCDCDC",
    brown: "#7C655E",
    purple: "#9a4dca",
    greenSpot: "#6EFF33"
};

export const STATUS_COLORS = {
    PAYMENT_SUCCESS : COLORS.green,
    FREE_TRIP : COLORS.green,
    OPEN : COLORS.green,
    CLOSED : COLORS.darkGrey,
    FAILED : COLORS.red,
    PAYMENT_FAILED : COLORS.red,
    PAYMENT_IN_PROGRESS : COLORS.darkYellow,
};

export const SIZES = {
    // global sizes
    sm: 4,
    sml: 6,
    base: 8,
    font: 14,
    radius: 12,
    radiusL: 18,
    padding: 24,
    xl: 30,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10,

    // app dimensions
    width,
    height
};

export const FONTS = {
    main: "AvenirNext-Regular",
    text: "Roboto-Regular",
    label: "AvenirNext-Bold",
    sizeText: 17,
    h5: {fontFamily: "Poppins-SemiBold", fontSize: SIZES.h5, lineHeight: 22},
};

export const BASE = {
    margin: 20,
    window: {
        width,
        height,
    },
    padding: {
        main: 15,
        small: 5,
    },
    header: {
        height: 64,
    },
    drawer: {
        width: 270,
    },
    radius: {
        main: 6,
        rounded: 50,
        medium: 20
    },
    elevation: {
        medium: 5,
        small: 2
    },
    inputHeight: Platform.OS === "ios" ? 50 : 50
};

export const SHADOW = {
    main: {
        shadowColor: "#A4AAB3",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    }
};

export const DEFAULT_COORDS: Region = {
    latitude: 48.85341,
    longitude: 2.3488,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003 * (width / height)
};

// Price per minute in cent
export const INIT_AMOUNT = 15;
export const MAX_PERIMETER = 3000;
