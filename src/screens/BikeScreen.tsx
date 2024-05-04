import {COLORS} from "@assets/index";
import {GoBackActionButton} from "@components/Atom/GoBackActionButton";
import {BikeInfo} from "@components/BikeInfo";
import {BikeLastImage} from "@components/BikeLastImage";
import {BikeLastPosition} from "@components/BikeLastPosition";
import {BikeLastTrackerPosition} from "@components/BikeLastTrackerPosition";
import {BikeReport} from "@components/BikeReport";
import {BikeReview} from "@components/BikeReview";
import {ControlButton} from "@components/ControlButton";
import {OpenCloseButton} from "@components/OpenCloseButton";
import {UpdateBikePartButton} from "@components/UpdateBikePartButton";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {Review} from "@models/data";
import {Bike} from "@models/dto/MarkerData";
import {Coordinates} from "@models/dto/Trips";
import {useFocusEffect} from "@react-navigation/native";
import {selectBike, setBikeDetails, updateBikeCache} from "@redux/reducers/bike";
import {getBike} from "@services/bikesService";
import {getBikeDetails, getHistoryBikeReport, getLastReview, getTripEndCoordsData} from "@services/reportService";
import {BikeStackScreenProps} from "@stacks/types";
import {bikeStyles} from "@styles/ScreenStyles";
import {END_TRIP_PHOTO} from "@utils/endPoints";
import {statusColor} from "@utils/StatusColor";
import React, {lazy, memo, Suspense, useCallback, useLayoutEffect, useState} from "react";
import {StatusBar, View, ViewProps} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import {ACCESS_RIGHTS, BikeStatusType, BikeTagType, GetReportHistoryOutput} from "@bikairproject/shared";

const MyModal = lazy(() => import("@components/MyModal"));

interface Props extends ViewProps, BikeStackScreenProps<"Bike"> {
}

const BikeScreen: React.FC<Props> = ({navigation, route}): React.ReactElement => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.me);
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingReview, setLoadingReview] = useState(false);
    const [loadingHistoryBike, setLoadingHistoryBike] = useState(false);
    const [loadingLastImage, setLoadingLastImage] = useState<boolean>(false);
    const [loadingEndCoords, setLoadingEndCoords] = useState<boolean>(false);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [lockAction, setLockAction] = useState("open");
    const [report, setReport] = useState<GetReportHistoryOutput | null>(null);
    const [review, setReview] = useState<Review | null>(null);
    const bike = useAppSelector(state => state.bike.currentBike);
    const bikeDetails = useAppSelector(state => state.bike.bikeDetails);
    const [endCoords, setEndCoords] = useState<Coordinates[]>([]);

    const fetchLastReport = async () => {
        try {
            if (bike) {
                getBike(bike.id).then(bikeDetails => {
                    if (!bikeDetails) {
                        dispatch(selectBike(null));
                        navigation.navigate("Home");
                    } else {
                        const convertBike: Bike = {
                            ...bike,
                            ...bikeDetails,
                            status: bikeDetails.status as BikeStatusType,
                            tags: bikeDetails.tags as BikeTagType[],
                            marker_type: "BIKE"
                        };
                        dispatch(updateBikeCache(convertBike));
                        dispatch(selectBike(convertBike.uuid));
                        dispatch(setBikeDetails(bikeDetails));
                    }
                });

                setLoadingHistoryBike(true);
                getHistoryBikeReport(bike.id).then(response => {
                    if (!response) {
                        setReport(null);
                    } else {
                        if (user?.access_rights.includes(ACCESS_RIGHTS.BIKE_REPORT_HISTORY)) {
                            setReport(response);
                        } else {
                            setReport([response[0]]);
                        }
                    }
                }).finally(() => setLoadingHistoryBike(false));

                setLoadingReview(true);
                getLastReview(bike.id).then(response => {
                    if (!response) {
                        setReview(null);
                    } else {
                        setReview(response);
                    }
                }).finally(() => setLoadingReview(false));
                if (bikeDetails) {
                    setLoadingLastImage(true);
                    getBikeDetails(bikeDetails.id).then(_trip => {
                        setPhotoUrl(_trip?.end_photo ? `${END_TRIP_PHOTO}${_trip.end_photo}` : null);
                    }).finally(() => setLoadingLastImage(false));
                }
            } else {
                navigation.navigate("Home");
            }
        } catch (e) {
            setLoadingReview(false);
        }
    };

    const getTripEndCoords = async (withLoading = false) => {
        if (withLoading) {
            setLoadingEndCoords(true);
        }
        try {
            const endCoords = await getTripEndCoordsData();
            setEndCoords(endCoords);
        } catch (error: any) {
            setEndCoords([]);
            console.log(`Error while fetching end coordinates: ${error.message}`);
        } finally {
            if (withLoading) {
                setLoadingEndCoords(false);
            }
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <GoBackActionButton navigation={navigation} route={route}/>
            ),
        });
    });

    useFocusEffect(
        useCallback(() => {
            fetchLastReport().then(() => console.log(""));
            getTripEndCoords(true).then(() => console.log(""));
        }, [bike?.id]));

    const renderElement = () => {
        return (
            <ScrollView style={bikeStyles.root}>
                {bike !== null ?
                    (
                        <StatusBar backgroundColor={statusColor(bike?.status)} barStyle={"dark-content"}/>
                    )
                    :
                    (
                        <StatusBar backgroundColor={COLORS.inputGrey}/>
                    )
                }
                <BikeInfo navigation={navigation} route={route} bike={bike}/>
                <BikeReport loadingHistoryBike={loadingHistoryBike} report={report}/>
                <BikeReview loadingReview={loadingReview} review={review}/>
                <BikeLastImage loadingLastImage={loadingLastImage} photoUrl={photoUrl}/>
                <BikeLastPosition loadingLastPosition={loadingEndCoords} bikeHistory={endCoords}/>
                <BikeLastTrackerPosition
                    loadingLastPosition={loadingEndCoords}
                    trackerCoordinates={bikeDetails?.tracker_coords?.coordinates}
                />
                <OpenCloseButton setLockAction={setLockAction} setModalVisible={setModalVisible}/>
                <ControlButton review={review} navigation={navigation} route={route}/>
                <UpdateBikePartButton navigation={navigation} route={route}/>
                <Suspense fallback={<View></View>}>
                    <MyModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        action={lockAction}
                    />
                </Suspense>
            </ScrollView>
        );
    };
    return renderElement();
};

export default (memo(BikeScreen));
