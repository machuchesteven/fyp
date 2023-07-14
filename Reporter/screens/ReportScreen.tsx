import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
type SectionProps = PropsWithChildren<{
    title: string;
    onPress(): void;
}>;
function ReportScreen({ route, navigation }: any): JSX.Element {
    navigation = useNavigation();
    return (
        <SafeAreaView >
            <View>
                <Text style={{color: '#222', fontSize: 12, marginVertical: 12}}>ReportScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default ReportScreen;