import {ReportButton} from "@components/Button";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {questionStep} from "@styles/ReportStyles";
import React from "react";
import {Text, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    config: ReportPageConfig
    loading: boolean,
    onYes: () => void,
    onNo: () => void,
}

export const QuestionStep: React.FC<Props> = ({
    config,
    loading,
    onYes,
    onNo,
}): React.ReactElement => {

    return (
        <View style={questionStep.container}>
            <View>
                <Text style={questionStep.text}>{config.text}</Text>
            </View>
            <View style={questionStep.footer}>
                <View style={questionStep.yesButton}>
                    <ReportButton
                        style={{marginRight: 2}}
                        value={config.yes.label}
                        onClick={() => onYes()}
                        inProgress={loading}
                    />
                </View>
                {config.no ?
                    <View style={questionStep.noButton}>
                        <ReportButton
                            style={{marginLeft: 2}}
                            value={config.no.label}
                            onClick={() => onNo()}
                            inProgress={loading}
                        />
                    </View>
                    : null}
            </View>
        </View>
    );
};
