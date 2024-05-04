import {COLORS, FeatherIcon} from "@assets/index";
import {LoadingModal} from "@components/LoadingModal";
import {ButtonsStep} from "@components/report/ButtonsStep";
import {CommentStep} from "@components/report/CommentStep";
import {IncidentStep} from "@components/report/IncidentStep";
import {PhotoStep} from "@components/report/PhotoStep";
import {QuestionStep} from "@components/report/QuestionStep";
import {RepairedStep} from "@components/report/RepairedStep";
import {SpotStep} from "@components/report/SpotStep";
import {useAppDispatch} from "@hooks/index";
import {BikeUpdate} from "@models/dto/BikeUpdate";
import {ReportConfig} from "@models/dto/ReportConfig";
import {ReportPageButonActionConfig} from "@models/dto/ReportPageButonActionConfig";
import {ReportPageButonConfig} from "@models/dto/ReportPageButonConfig";
import {ReportPageConditionConfig} from "@models/dto/ReportPageConditionConfig";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {ReportPageConfigHistory} from "@models/dto/ReportPageConfigHistory";
import {ReportUpdate} from "@models/dto/ReportUpdate";
import Transcript from "@models/dto/Transcript";
import remoteConfig from "@react-native-firebase/remote-config";
import {
    addTranscript,
    initialReportState,
    resetReport,
    setBike,
    setReport,
    setReportBikeId,
    setReportBikeName,
    setReportPosition,
    setReviewIssue,
    updateReportValue,
} from "@redux/reducers/report";
import {store} from "@redux/store";
import {loadData, storeData} from "@services/asyncStorage";
import {retryPostReport} from "@services/reportService";
import {BikeStackScreenProps} from "@stacks/types";
import {reportStyles} from "@styles/ScreenStyles";
import {getPosition} from "@utils/helpers";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {StatusBar, View, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import {TEST_ENV} from "../../env";

interface Props extends ViewProps, BikeStackScreenProps<"Report"> {
}

export const ReportScreen: React.FC<Props> = (
    {
        navigation,
        route,
    }): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const [reportConfig, setReportConfig] = useState<ReportConfig | null>(null);
    const [steps, setSteps] = useState<{ [key: string]: ReportPageConfig }>({});
    const [reportState, setReportState] = useState<ReportUpdate>({});
    const [bikeState, setBikeState] = useState<BikeUpdate>({});
    const [history, setHistory] = useState<ReportPageConfigHistory[]>([]);
    const [currentStep, setCurrentStep] = useState<ReportPageConfig | null>(null);

    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState<string | null>(null);

    const resetState = () => {
        dispatch(resetReport());
        if (reportConfig !== null) {
            setHistory([]);
            setCurrentStep(steps[reportConfig.root]);
        }
    };

    const testField = (field: any, test: string) => {
        if (typeof field === "undefined" || field === null) {
            console.log("Testing undefined on", test);
            return test === "null";
        }
        if (Array.isArray(field)) {
            console.log("Testing array on", test);
            return (field as any[]).filter(e => e + "" === test).length > 0;
        }
        if (typeof field === "boolean") {
            console.log("Testing boolean on", test);
            return field === (test === "true");
        }
        if (typeof field === "number") {
            console.log("Testing number on", test);
            return field === parseInt(test);
        }
        console.log("Testing default (string) on", test);
        return field === test;
    };

    const testCondition = (condition: ReportPageConditionConfig) => {
        switch (condition.model) {
            case "report":
                return testField(store.getState().report.report[condition.field], condition.value);
            case "bike":
                return testField(store.getState().report.bike[condition.field], condition.value);
            case "review":
                return testField(store.getState().report.review[condition.field], condition.value);
            default:
                throw `Erreur dans la configuration du rapport. ${condition.model} n'est pas un model valide.`;
        }
    };

    const handleNextstep = async (next: string | undefined, transcript: Transcript) => {
        console.log(`Next : ${next}`);
        if (next) {
            const nextStep = steps[next];
            const newHistory = Array.from(history);
            console.log(nextStep.condition);
            if (!!nextStep.condition && !testCondition(nextStep.condition)) {
                console.log("There is test condition but it failed");
                await handleNextstep(nextStep.condition.fallback, transcript);
                return;
            } else {
                console.log("There is no test condition or it succeeded");
            }
            if (currentStep !== null) {
                console.log("Adding to history");
                newHistory.push({
                    reportPageConfig: currentStep,
                    report: reportState,
                    bike: bikeState,
                });
            }
            console.log(`Setting current step to ${next}`);
            dispatch(addTranscript(transcript));
            setHistory(newHistory);
            setReportState(Object.assign({}, store.getState().report.report));
            setBikeState(Object.assign({}, store.getState().report.bike));

            setCurrentStep(nextStep);
        } else {
            try {
                setLoading(true);
                setModalText(`${t("report_screen.send_report")}`);
                const position: any = await getPosition();
                dispatch(setReportPosition(position.coords));
                dispatch(addTranscript(transcript));
                console.log("Store the report for later save");
                const storedReports = await loadData("@storeReports");
                const toJson: initialReportState[] = storedReports ? JSON.parse(storedReports) : [];
                toJson.push(store.getState().report);
                console.log("reports = ", toJson);
                await storeData("@storeReports", JSON.stringify(toJson));

                await retryPostReport();
                setModalText(`${t("report_screen.report_saved")}`);
                setTimeout(() => {
                    setModalText(null);
                    setLoading(false);
                    navigation.navigate("Home");
                }, 1000);
            } catch (error) {
                console.log("Error while saving report.");
                console.log(error);
            }
        }
    };

    const handleActions = (actions: ReportPageButonActionConfig[] | undefined) => {
        if (actions) {
            for (const action of actions) {
                dispatch(updateReportValue(action.model, action.field, action.value));
            }
        }
    };

    const createTranscript = (button: ReportPageButonConfig | undefined): Transcript => {
        return {
            question: currentStep?.text ?? "NONE",
            response: button?.label ?? "NONE"
        };
    };

    const handleYesAction = async (step = null) => {
        const _usedStep = step || currentStep;
        console.log("click yes", _usedStep);
        const transcript = createTranscript(_usedStep?.yes);
        handleActions(_usedStep?.yes.actions);
        await handleNextstep(_usedStep?.yes.next, transcript);
    };

    const handleNoAction = async () => {
        console.log("click no");
        const transcript = createTranscript(currentStep?.yes);
        handleActions(currentStep?.no?.actions);
        await handleNextstep(currentStep?.no?.next, transcript);
    };

    useEffect(() => {
        console.log("Send on hold report");
        retryPostReport().then(() => console.log("Report saved"));
    }, []);

    useEffect(() => {
        console.log("init Report screen");
        if (route.params.role) {
            setReportConfig(JSON.parse(remoteConfig().getString(`report_${route.params.role.toLowerCase()}${TEST_ENV ? "_test" : ""}`)));
        } else {
            console.log("no role found for report ", route.params.role);
        }
        dispatch(setReportBikeId(route.params.bikeId));
        dispatch(setReportBikeName(route.params.bikeName));
        dispatch(setReviewIssue(route.params.issue));
        return () => {
            console.log("destroy Report screen");
            resetState();
        };
    }, []);

    useEffect(() => {
        console.log("init Report Config");
        if (reportConfig?.steps) {
            const newSteps: { [key: string]: ReportPageConfig } = {};
            for (const page of reportConfig.steps) {
                newSteps[page.name] = page;
            }
            console.log("newSteps", newSteps);
            setReportState(Object.assign({}, store.getState().report.report));
            setBikeState(Object.assign({}, store.getState().report.bike));
            setSteps(newSteps);
            setCurrentStep(newSteps[reportConfig.root]);
            console.log("set current step to ", currentStep);
        } else {
            setSteps({});
            setCurrentStep(null);
        }
    }, [reportConfig]);

    const handleBackAction = () => {
        console.log("Back Pressed");
        if (history.length === 0) {
            resetState();
            navigation.navigate("Bike");
        } else {
            const newHistory = Array.from(history);
            const previous = newHistory.pop() ?? null;
            setHistory(newHistory);
            console.log("previous", previous);
            dispatch(setReport(previous?.report));
            dispatch(setBike(previous?.bike));
            setCurrentStep(previous?.reportPageConfig || null);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: reportConfig?.name ?? "Report",
            headerLeft: () => (
                <TouchableOpacity onPress={handleBackAction}>
                    <FeatherIcon
                        style={{marginLeft: 10}}
                        name={"arrow-left"}
                        size={25}
                        color={"black"}
                    />
                </TouchableOpacity>
            ),
        });
    });

    const renderStep = () => {
        console.log(`Name: ${currentStep?.screen}`);
        switch (currentStep?.screen) {
            case "Question":
                console.log("Question case");
                return <QuestionStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                    onNo={handleNoAction}
                />;
            case "Spot":
                console.log("Spot case");
                return <SpotStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            case "Incident":
                console.log("Incident case");
                return <IncidentStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            case "Repaired":
                console.log("Repaired case");
                return <RepairedStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            case "Photo":
                console.log("Photo case");
                return <PhotoStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            case "Buttons":
                console.log("Buttons case");
                return <ButtonsStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            case "Comment":
                console.log("Comment case");
                return <CommentStep
                    config={currentStep}
                    loading={loading}
                    onYes={handleYesAction}
                />;
            default:
                console.log("Default case");
                return null;
        }
    };

    return (
        <View style={reportStyles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"}/>
            <LoadingModal text={modalText}/>
            {renderStep()}
        </View>
    );
};

export default ReportScreen;
