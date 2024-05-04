import {ReportButton} from "@components/Button";
import {ReportPageButtonsConfig} from "@models/dto/ReportPageButtonsConfig";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {buttonsStep} from "@styles/ReportStyles";
import React from "react";
import {Text, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    config: ReportPageConfig
    loading: boolean,
    onYes: (el: any) => void,
}

export const ButtonsStep: React.FC<Props> = ({config, loading, onYes}): React.ReactElement => {

    const handleStep = (element: ReportPageButtonsConfig) => {
        onYes(element);
    };

    return (
        <View style={buttonsStep.container}>
            <Text style={buttonsStep.text}>{config.text}</Text>
            {config.buttons ?
                config.buttons.map((element: ReportPageButtonsConfig, i: number) => {
                    return <ReportButton
                        key={i}
                        style={{marginRight: 2, marginBottom: 25, width: "80%", borderRadius: 30}}
                        value={element.yes.label}
                        onClick={() => handleStep(element)}
                        inProgress={loading}
                    />;
                }) : null
            }
        </View>
    );
};
