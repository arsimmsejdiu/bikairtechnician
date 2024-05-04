import React from "react";
import {StyleSheet, Text, View, ViewProps} from "react-native";
import SuperCluster from "react-native-clusterer/lib/typescript/types";

interface Props extends ViewProps {
    element: SuperCluster.ClusterFeatureClusterer<SuperCluster.AnyProps>,
}

const MarkerCluster: React.FC<Props> = ({
    element,
}): React.ReactElement | null => {

    const getColor = () => {
        return {backgroundColor: "#8eb3ed"};
    };

    if (!element) return null;

    return (
        <View style={{
            ...styles.clusterMarker,
            ...getColor()
        }}>
            <Text style={styles.clusterMarkerText}>
                {element.properties.point_count}
            </Text>
        </View>
    );
};

export default MarkerCluster;

const styles = StyleSheet.create({
    clusterMarker: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8eb3ed",
        justifyContent: "center",
        alignItems: "center",
    },
    clusterMarkerText: {
        color: "#fff",
        fontSize: 16,
    },
});
