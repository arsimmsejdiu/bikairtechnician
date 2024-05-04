import {BottomTabNavigationProp, BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams} from "@react-navigation/native";
import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";

import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

//Auth types
export type AuthStackParamList = {
    Login: undefined
    Update: undefined
}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<AuthStackParamList, T>
export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>


//BottomTabs types
export type BottomTabsParamList = {
    Home: undefined
    BikeStack: NavigatorScreenParams<BikeStackParamList>
    BikeConfigStack: NavigatorScreenParams<BikeCreateStackParamList>
    Logout: undefined
}

export type BottomTabsScreenProps<T extends keyof BottomTabsParamList> = BottomTabScreenProps<BottomTabsParamList, T>
export type BottomTabsNavigationProps = BottomTabNavigationProp<BottomTabsParamList>


//Bike types
export type BikeStackParamList = {
    BikeList: undefined
    Bike: undefined,
    Status: {
        bikeId: number | string
        status: BikeStatusType
        city_id: number | null
        tags: BikeTagType[]
    },
    BikeScanner: {
        bikeId: number
        bikeName: string
        bikeStatus: BikeStatusType
        issue?: string[] | null
    },
    ReportSelect: {
        bikeId: number
        bikeName: string
        issue?: string[] | null
    },
    ReportBtn: {
        bikeId: number
        bikeName: string
    },
    Report: {
        bikeId: number
        bikeName: string
        role?: string
        issue?: string[] | null
    }
}

export type BikeStackScreenProps<T extends keyof BikeStackParamList> = CompositeScreenProps<StackScreenProps<BikeStackParamList, T>, BottomTabsScreenProps<keyof BottomTabsParamList>>
export type BikeNavigationProps = CompositeNavigationProp<StackNavigationProp<BikeStackParamList>, BottomTabsNavigationProps>


//Bike types
export type BikeCreateStackParamList = {
    AddBike: undefined,
    AddLock: {
        context?: "create" | "update",
        bikeId?: number
        lockUid?: string,
        lockClaimCode?: string,
    } | undefined,
    AddTracker: {
        context?: "create" | "update",
        bikeId?: number
        trackerImei?: string,
        trackerMac?: string
    } | undefined,
    Validate: undefined,
    QrReader: { type: string },
}

export type BikeCreateStackScreenProps<T extends keyof BikeCreateStackParamList> = CompositeScreenProps<StackScreenProps<BikeCreateStackParamList, T>, BottomTabsScreenProps<keyof BottomTabsParamList>>
export type BikeCreateNavigationProps = CompositeNavigationProp<StackNavigationProp<BikeCreateStackParamList>, BottomTabsNavigationProps>
