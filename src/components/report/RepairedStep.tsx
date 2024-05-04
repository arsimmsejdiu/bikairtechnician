import {BikePartList} from "@components/BikePartList";
import {ReportButton} from "@components/Button";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import CheckBox from "@react-native-community/checkbox";
import {setReportFullRepair, setReportPartRepaired} from "@redux/reducers/report";
import {repairedStepsStyles} from "@styles/ReportStyles";
import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Text, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    config: ReportPageConfig
    loading: boolean,
    onYes: () => void,
}

interface FormData {
    selectAll: boolean,
    repaired: string[],
}


export const RepairedStep: React.FC<Props> = ({
    config,
    loading,
    onYes,
}): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const incidents = useAppSelector(state => state.report.report.incidents);
    const full_repair = useAppSelector(state => state.report.report.full_repair);

    const {control, handleSubmit, watch, setValue} = useForm<FormData>({
        defaultValues: {
            selectAll: !!full_repair,
            repaired: full_repair ? incidents ?? [] : [],
        }
    });

    const handleValidate = (data: FormData) => {
        console.log(data);
        onYes();
    };

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            if (type === "change") {
                console.log(value, name, type);
                const _incidents = incidents ?? [];
                switch (name) {
                    case "selectAll":
                        if (value.selectAll) {
                            setValue("repaired", _incidents);
                            dispatch(setReportPartRepaired(_incidents));
                        } else {
                            setValue("repaired", []);
                            dispatch(setReportPartRepaired([]));
                        }
                        dispatch(setReportFullRepair(value.selectAll));
                        break;
                    case "repaired":
                        if (value.repaired?.length === _incidents.length && !value.selectAll) {
                            setValue("selectAll", true);
                            dispatch(setReportFullRepair(true));
                        } else if (value.repaired?.length !== _incidents.length && value.selectAll) {
                            setValue("selectAll", false);
                            dispatch(setReportFullRepair(false));
                        }
                        dispatch(setReportPartRepaired(value.repaired));
                        break;
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <View style={repairedStepsStyles.content}>
            <View>
                <View><Text style={repairedStepsStyles.text}>{config.text}</Text></View>

                <View style={repairedStepsStyles.checkbox}>
                    <Controller control={control}
                        render={({field: {onChange, value}}) => (
                            <CheckBox
                                disabled={false}
                                value={value}
                                onValueChange={onChange}
                            />
                        )}
                        name={"selectAll"}
                    />
                    <Text style={repairedStepsStyles.checkboxText}>{t("question_flow.repaired_step.select_all")} </Text>
                </View>
                <Controller control={control}
                    render={({field: {onChange, value}}) => (
                        <BikePartList selection={incidents ?? []} onChange={onChange} value={value}/>
                    )}
                    name={"repaired"}
                />
            </View>
            <View style={repairedStepsStyles.footer}>
                <ReportButton style={repairedStepsStyles.yesButton}
                    value={config.yes.label}
                    onClick={handleSubmit(handleValidate)}
                    inProgress={loading}
                />
            </View>
        </View>
    );
};
