import {BASE, COLORS} from "@assets/index";
import {EngageButton} from "@components/Button";
import {BikeStackScreenProps} from "@stacks/types";
import {reportSelectStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View, ViewProps} from "react-native";

import {ROLES} from "@bikairproject/shared";


interface Props extends ViewProps, BikeStackScreenProps<"ReportSelect"> {
}

export const ReportSelectScreen: React.FC<Props> = ({navigation, route}): React.ReactElement => {
    const {t} = useTranslation();

    const handleSelection = (role: ROLES) => {
        navigation.navigate("Report", {
            bikeId: route.params.bikeId,
            bikeName: route.params.bikeName,
            role: role,
            issue: route.params.issue
        });
    };

    const renderRoleButton = () => {
        const roles = [ROLES.COLLECTOR, ROLES.CONTROLLER, ROLES.TECHNICIAN];
        return roles.map((role, i) => {
            return <EngageButton
                key={i}
                style={{width: 300, marginBottom: BASE.margin, borderRadius: 30}}
                value={t(`roles.${role}`) ?? "Role"}
                inProgress={false}
                onClick={() => handleSelection(role)}>
            </EngageButton>;
        });
    };

    return (<View style={reportSelectStyles.container}>
        <Text style={reportSelectStyles.title}>{t("report_select_screen.role_type_select")} :</Text>
        {renderRoleButton()}
        <Text style={reportSelectStyles.textSeparator}>OU</Text>
        <EngageButton
            style={{width: 300, backgroundColor: COLORS.darkBlue}}
            value={t("report_select_screen.return_bike_list") ?? "Retour"}
            inProgress={false}
            onClick={() => navigation.navigate("BikeList")}>
        </EngageButton>
    </View>
    );
};

export default ReportSelectScreen;
