import {COLORS} from "@assets/constant";
import {TextAtom} from "@components/Atom/TextAtom";
import SkeletonLoader from "@components/SkeletonLoader";
import {Review} from "@models/data";
import {bikeStyles} from "@styles/ScreenStyles";
import {renderDateLastReportReview} from "@utils/DateLastReportReview";
import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";

interface BikeReviewProp {
    loadingReview: boolean,
    review: Review | null
}

export const BikeReview = ({loadingReview, review}: BikeReviewProp) => {
    const {t} = useTranslation();

    return (
        <View style={{
            paddingHorizontal: 10,
        }}>
            {loadingReview ? (
                <SkeletonLoader/>
            ) : (

                <View style={{
                    backgroundColor: COLORS.lightGrey,
                    marginBottom: 20,
                    borderRadius: 10,
                    padding: 15,
                }}>
                    <TextAtom style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 10,
                        color: "black"
                    }}>
                        {t("bike_info_screen.customer_feedback_information")}
                    </TextAtom>
                    {review?.created_at ? (
                        <View>
                            <View style={bikeStyles.container}>
                                <View>
                                    <TextAtom style={{
                                        ...bikeStyles.text,
                                        color: "grey"
                                    }}>
                                        {t("bike_info_screen.customer_feedback")}:
                                    </TextAtom>
                                </View>
                                <View>
                                    {
                                        review?.issue ?
                                            review.issue.map((x: any, i: number) => {
                                                return <TextAtom
                                                    key={i}
                                                    style={{
                                                        ...bikeStyles.text,
                                                        marginLeft: 30,
                                                        color: "red"
                                                    }}>
                                                    &#8226; {t(`trip_process.trip_review.issues.${x}`)}
                                                </TextAtom>;
                                            })
                                            :
                                            <TextAtom
                                                style={{color: "black"}}>{t("bike_info_screen.no_data_last_review")}
                                            </TextAtom>
                                    }
                                </View>
                            </View>
                            <View style={bikeStyles.content}>
                                <TextAtom style={bikeStyles.text}>
                                    <Text style={{color: "grey"}}>
                                        {t("bike_info_screen.date_of_last_review")} :
                                    </Text>
                                    {" "}{renderDateLastReportReview(review?.created_at, t("bike_info_screen.no_review"))}
                                </TextAtom>
                            </View>
                        </View>
                    ) : (
                        <TextAtom style={{alignSelf: "center", padding: 20}}>
                            Aucune remonté client.
                        </TextAtom>
                    )
                    }
                </View>
            )}
        </View>
    );
};
