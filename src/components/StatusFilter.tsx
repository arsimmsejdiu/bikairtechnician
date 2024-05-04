import {COLORS, FeatherIcon} from "@assets/index";
import {useAppSelector} from "@hooks/index";
import React, {FC, memo} from "react";
import {useTranslation} from "react-i18next";
import {Modal, StyleSheet, Text, TouchableOpacity, View, ViewProps} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {BikeStatusType} from "@bikairproject/shared";


interface Props extends ViewProps {
    filters: BikeStatusType[],
    onFilterChange: (filter: BikeStatusType) => void,
}

export const StatusFilter: FC<Props> = ({
    filters = [],
    onFilterChange,
}): React.ReactElement | null => {

    const [filterVisible, setFilterVisible] = React.useState(false);
    const status: BikeStatusType[] = useAppSelector(state => state.global.staticState?.status_available ?? []);
    const {t} = useTranslation();

    const filterOnPress = (item: any) => {
        return () => {
            onFilterChange(item);
        };
    };

    if(status.length === 0) {
        return null;
    }

    return (<View style={{marginBottom: 10}}>
        <TouchableOpacity onPress={() => setFilterVisible(true)} activeOpacity={0.8}>
            <View
                style={styles.control}>
                <FeatherIcon
                    name="filter"
                    size={30}
                    color="white"
                />
            </View>
        </TouchableOpacity>
        <Modal
            animationType="slide"
            transparent={true}
            visible={filterVisible}
            onRequestClose={() => {
                setFilterVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{position: "absolute", top: 10, right: 10}}
                        onPress={() => setFilterVisible(false)}
                        activeOpacity={0.8}>
                        <View
                        >
                            <FeatherIcon
                                name="x"
                                size={30}
                                color="red"
                            />
                        </View>

                    </TouchableOpacity>
                    <View style={{height: 5, marginTop: 30}}/>

                    {
                        ["ALL", ...status].map((item, i: number) => {
                            const isSelected = (i===0 && filters.length === 0) || filters.includes(item as BikeStatusType);
                            return <TouchableOpacity
                                key={i}
                                onPress={filterOnPress(item)}
                                style={styles.button}>
                                <View style={styles.selectWrapper}>
                                    {isSelected  ?
                                        <Icon
                                            name={"check"}
                                            size={10}
                                            color="green"/>
                                        : null
                                    }
                                    <Text style={{
                                        color: "black",
                                        fontWeight: isSelected ? "bold" : "normal",
                                        marginLeft: 10,
                                        textTransform: "capitalize"
                                    }}>{t(`bike.status.${item}`)}</Text>
                                </View>

                            </TouchableOpacity>;
                        })
                    }
                </View>
            </View>
        </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: "100%"
    },
    modalView: {
        position: "relative",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        // alignItems: "center",
        shadowColor: "#000",
        width: "70%",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    control: {
        backgroundColor: COLORS.yellow,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 25,
    },
    button: {
        color: "black",
        margin: 10
    },
    selectWrapper: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export default memo(StatusFilter);
