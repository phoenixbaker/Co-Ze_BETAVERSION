import React from 'react';
import { Text } from 'react-native';

import Card from '../components/Card';
import Screen from "../components/Screen"
import AppText from '../config/AppText';

function DashboardScreen({navigation}) {
    return (
        <Screen>
            <Card title="Fridge">
                <AppText>
                    NOTES AND CHECKLIST
                </AppText>
            </Card>
            <Card
            title="Family Members"
            onPress={() => navigation.navigate("Location")}
            >
                <AppText>
                    PHOTO - NAME - Last Active *2 mins*
                </AppText>
            </Card>
            <Card title="Upcoming Events">
                <AppText>
                    CALENDER COMPONENT
                </AppText>
            </Card>
            <Card title="Expenses">
                <AppText>
                    Chart of Expenses
                </AppText>
            </Card>
        </Screen>
    );
}

export default DashboardScreen;