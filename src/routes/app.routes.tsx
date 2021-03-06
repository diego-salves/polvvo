import React from "react";
import { Platform } from 'react-native'
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { Development } from "../screens/Development";

export function AppRoutes(){
    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary.main,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 70,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen 
                name="Metas"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name="Nova meta"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons 
                            name="create-new-folder"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name="Calendário"
                component={Development}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons 
                            name="calendar-today"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    )
 }