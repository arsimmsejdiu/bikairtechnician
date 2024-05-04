import {View} from "react-native";
import {bikeListStyles} from "@styles/ScreenStyles";
import {ImageAtom} from "@components/Atom/ImageAtom";
import {Check, Experiment, Warning} from "@assets/index";
import {BIKE_TAGS} from "@bikairproject/shared";
import React from "react";
import {Bike} from "@models/dto/MarkerData";

interface BikeReportCheckIconsOrganismsProps {
    item: Bike
}

export const BikeReportCheckIconsOrganisms = ({item}: BikeReportCheckIconsOrganismsProps) => {
    return (
        <View style={bikeListStyles.check}>
            {item.reported ? (
                <ImageAtom
                    source={Check}
                    resizeMode={"contain"}
                    style={{width: 30, height: 30, marginLeft: 10, marginRight: 40}}
                />
            ) : null}
            {item.tags.includes(BIKE_TAGS.PRIORITY) ? (
                <ImageAtom
                    source={Warning}
                    resizeMode={"contain"}
                    style={{width: 30, height: 30, marginLeft: 5, marginRight: 40}}
                />
            ) : null
            }
            {item.tags.includes(BIKE_TAGS.EXPERIMENTATION) ? (
                <ImageAtom
                    source={Experiment}
                    resizeMode={"contain"}
                    style={{width: 25, height: 25, marginLeft: 5, marginRight: 5}}
                />
            ) : null}
        </View>
    );
};
