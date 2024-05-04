import {COLORS} from "@assets/constant";
import {Calendar, Charging, Comment, Distance, Holder, PickUp, User} from "@assets/index";
import {ImageAtom} from "@components/Atom/ImageAtom";
import {TextAtom} from "@components/Atom/TextAtom";
import SkeletonLoader from "@components/SkeletonLoader";
import {bikeStyles} from "@styles/ScreenStyles";
import {renderDateLastReportReview} from "@utils/DateLastReportReview";
import React from "react";
import {useTranslation} from "react-i18next";
import {View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import {GetReportHistoryOutput} from "@bikairproject/shared";

interface BikeReportProp {
    loadingHistoryBike: boolean,
    report: GetReportHistoryOutput | null
}

export const BikeReport = ({report, loadingHistoryBike}: BikeReportProp) => {
    const {t} = useTranslation();

    return (
        <View style={{
            paddingHorizontal: 10,
        }}>
            {loadingHistoryBike ? (
                <SkeletonLoader/>
            ) : (
                <View style={{
                    backgroundColor: COLORS.lightGrey,
                    marginBottom: 20,
                    borderRadius: 10,
                    padding: 10,
                }}>
                    <TextAtom style={{textAlign: "center", fontSize: 18, marginTop: 10, color: "black"}}>
                        {t("bike_info_screen.control_information")}
                    </TextAtom>
                    {report ? (
                        <View style={{
                            paddingHorizontal: 5,
                            paddingVertical: 10
                        }}>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                accessibilityElementsHidden={true}
                                scrollEventThrottle={30000}
                                alwaysBounceHorizontal
                                focusable
                                snapToAlignment={"center"}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {report?.map((bh) => {
                                    return (
                                        <View
                                            key={bh?.id}
                                            style={{
                                                flexDirection: "column",
                                                backgroundColor: COLORS.white,
                                                paddingHorizontal: 5,
                                                marginRight: 10,
                                                borderRadius: 20,
                                                flexWrap: "wrap",
                                                width: 330
                                            }}>
                                            <View style={bikeStyles.content}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={Calendar}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom
                                                            style={[bikeStyles.text, {color: "grey"}]}>{t("bike_info_screen.date_of_last_inspection")}</TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {renderDateLastReportReview(bh?.created_at, t("bike_info_screen.no_control"))}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={bikeStyles.content}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={User}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom
                                                            style={{color: "grey"}}>{t("bike_info_screen.technician")}
                                                        </TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {`${bh?.lastname} ${bh?.firstname}`}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={bikeStyles.content}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={Distance}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom
                                                            style={{color: "grey"}}>{t("bike_info_screen.last_move")}
                                                        </TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {bh?.spot_name ? bh?.spot_name : "Aucune deplacement"}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={bikeStyles.content}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={Charging}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom
                                                            style={{color: "grey"}}>{t("bike_info_screen.battery_changed")}
                                                        </TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {bh?.battery_changed ? t("bike_info_screen.yes") : t("bike_info_screen.no")}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={bikeStyles.content}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={PickUp}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom
                                                            style={{color: "grey"}}>{t("bike_info_screen.picked_up")}
                                                        </TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {bh?.pick_up ? t("bike_info_screen.yes") : t("bike_info_screen.no")}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={bikeStyles.container}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={Holder}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10, flexWrap: "wrap", width: 270}}>
                                                        <View>
                                                            <TextAtom style={{
                                                                ...bikeStyles.text,
                                                                color: "grey"
                                                            }}>{t("bike_info_screen.damaged_missing_parts")}</TextAtom>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            flexWrap: "wrap"
                                                        }}>
                                                            {
                                                                bh?.incidents ?
                                                                    bh.incidents.map((x: any, i: number) => {
                                                                        return (
                                                                            <TextAtom
                                                                                key={i}
                                                                                style={{
                                                                                    ...bikeStyles.text,
                                                                                    marginRight: 10,
                                                                                    color: "black"
                                                                                }}>&#8226; {x}
                                                                            </TextAtom>
                                                                        );
                                                                    })
                                                                    : (
                                                                        <TextAtom style={{color: "black"}}>
                                                                            {t("bike_info_screen.no_data_last_report")}
                                                                        </TextAtom>
                                                                    )
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[bikeStyles.container, {flexWrap: "wrap"}]}>
                                                <View style={{
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}>
                                                    <ImageAtom
                                                        source={Comment}
                                                        style={{width: 30, height: 30}}
                                                        resizeMode={"contain"}
                                                    />
                                                    <View style={{marginLeft: 10}}>
                                                        <TextAtom style={[bikeStyles.text]}>
                                                            <TextAtom
                                                                style={{color: "grey"}}>{t("bike_info_screen.comment")} : </TextAtom>
                                                        </TextAtom>
                                                        <TextAtom style={bikeStyles.text}>
                                                            {bh?.comment || "Aucune observations"}
                                                        </TextAtom>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    ) : (
                        <TextAtom style={{alignSelf: "center", padding: 20}}>
                            Aucun rapport.
                        </TextAtom>
                    )}
                </View>
            )}
        </View>
    );
};
