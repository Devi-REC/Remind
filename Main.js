import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import HomeScreen from './HomeScreen';
import AlertScreen from './AlertScreen';
import AboutScreen from './AboutScreen';
import ProfileScreen from './ProfileScreen'; // Import the Profile screen

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Health':
              iconName = 'health-and-safety';
              break;
            case 'About':
              iconName = 'info';
              break;
            case 'Profile': // Add a profile icon for Profile screen
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E3F2FD',  // Active icon color (light blue)
        tabBarInactiveTintColor: '#0056b3', // Inactive icon color (light gray)
        tabBarStyle: { backgroundColor: '#73CECB' }, // Background color of the tab bar (blue)
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./Remind.png')}
              style={{ width: 95, height: 100, resizeMode: 'contain', marginTop: '10%' }}
            />
          ),
          headerStyle: { backgroundColor: '#73CECB' },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Health"
        component={AlertScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./Remind.png')}
              style={{ width: 95, height: 100, resizeMode: 'contain', marginTop: '10%' }}
            />
          ),
          headerStyle: { backgroundColor: '#73CECB' },
          headerTintColor: '#fff',
        }}
      />
      
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./Remind.png')}
              style={{ width: 95, height: 100, resizeMode: 'contain', marginTop: '10%' }}
            />
          ),
          headerStyle: { backgroundColor: '#73CECB' },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Profile" // Add Profile screen to the tab
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image 
              source={require('./Remind.png')}
              style={{ width: 95, height: 100, resizeMode: 'contain', marginTop: '10%' }}
            />
          ),
          headerStyle: { backgroundColor: '#73CECB' },
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}
