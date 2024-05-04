import {COLORS} from "@assets/constant";
import {ReportButton} from "@components/Button";
import {useAppDispatch} from "@hooks/index";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {addReportComment} from "@redux/reducers/report";
import {commentStep} from "@styles/ReportStyles";
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


export const CommentStep: React.FC<Props> = (
    {
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
                case "comments":
                    setComment(value.comments ?? "");
                    break;
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <View style={commentStep.wrapper}>
            <ScrollView style={commentStep.container} contentContainerStyle={{marginBottom: 20}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={commentStep.content}>
                        <Text style={commentStep.text}>{config.text}</Text>
                        <View style={commentStep.formWrapper}>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={commentStep.input}
                                        onBlur={onBlur}
                                        multiline={true}
                                        numberOfLines={5}
                                        placeholder={t("question_flow.comment_step.comment_placeholder") ?? "Ajouter un commentaire"}
                                        placeholderTextColor={COLORS.darkGrey}
                                        onChangeText={onChange}
                                        value={value}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                    />
                                )}
                                name="comments"
                            />
                            {errors.comments && <Text>This is required.</Text>}
                            <View style={commentStep.footer}>
                                <ReportButton
                                    style={commentStep.yesButton}
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
