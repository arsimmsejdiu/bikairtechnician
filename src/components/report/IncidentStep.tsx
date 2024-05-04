import {COLORS} from "@assets/constant";
import {BikePartList} from "@components/BikePartList";
import {ReportButton} from "@components/Button";
import {useAppDispatch} from "@hooks/index";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {addReportComment, setReportIncidents} from "@redux/reducers/report";
import {incidentStep} from "@styles/ReportStyles";
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    config: ReportPageConfig
    loading: boolean,
    onYes: () => void,
}

interface FormData {
    incidents: string[],
    comments: string,
}


export const IncidentStep: React.FC<Props> = ({
    config,
    loading,
    onYes,
}): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState("");
    const {t} = useTranslation();

    const {control, handleSubmit, formState: {errors}, watch} = useForm<FormData>({
        defaultValues: {
            incidents: [],
            comments: "",
        }
    });


    const handleValidate = () => {
        dispatch(addReportComment(comment));
        onYes();
    };

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            console.log(value, name, type);
            switch (name) {
                case "incidents":
                    dispatch(setReportIncidents(value.incidents));
                    break;
                case "comments":
                    setComment(value.comments ?? "");
                    break;
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <View style={incidentStep.wrapper}>
            <ScrollView style={incidentStep.container} contentContainerStyle={{marginBottom: 20}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={incidentStep.content}>
                        <Text style={incidentStep.text}>{config.text}</Text>
                        <View>
                            <Controller control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field: {onChange, value}}) => (
                                    <BikePartList onChange={onChange} value={value}/>
                                )}
                                name={"incidents"}
                            />
                        </View>
                        <View style={incidentStep.formWrapper}>
                            {config.comment ? (

                                <Controller
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={incidentStep.input}
                                            onBlur={onBlur}
                                            multiline={true}
                                            numberOfLines={5}
                                            placeholder={t("question_flow.incident_step.comment_placeholder") ?? "Ajouter un commentaire"}
                                            placeholderTextColor={COLORS.darkGrey}
                                            onChangeText={onChange}
                                            value={value}

                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />
                                    )}
                                    name="comments"
                                />
                            )
                                : null
                            }
                            {errors.comments && <Text>This is required.</Text>}
                            <View style={incidentStep.footer}>
                                <ReportButton style={incidentStep.yesButton}
                                    value={config.yes.label}
                                    onClick={handleSubmit(handleValidate)}
                                    inProgress={loading}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    );
};
