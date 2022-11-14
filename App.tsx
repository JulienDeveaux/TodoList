import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

type Todo = {
    title: string;
    description: string;
    status: boolean;
}

const fakeData: Todo[] = [
    {
        title: 'Todo 1 not done',
        description: 'Description 1',
        status: false       // false: not done, true: done
    },
    {
        title: 'Todo 2 done',
        description: 'Description 2',
        status: true
    },
    {
        title: 'Todo 3 not done',
        description: 'Description 3',
        status: false
    },
    {
        title: 'Todo 4 done',
        description: 'Description 4',
        status: true
    }
];

function MainScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos</Text>
            <Pressable style={{...styles.button, ...styles.blueColor}} onPress={() => navigation.navigate('AddTodo')}>
                <Text>Add Todo</Text>
            </Pressable>
            <Pressable style={{...styles.button, ...styles.redColor}} onPress={() => navigation.navigate('removeTodo')}>
                <Text>Remove Todo</Text>
            </Pressable>
            
            <Text style={styles.title}>Pending List</Text>
            <FlatList data={fakeData.filter((item) => !item.status)}
                      renderItem={({item}) =>
                          <Text style={styles.flatListText}>{item.title}</Text>}
            />

            <Text style={styles.title}>Done List</Text>
            <FlatList contentContainerStyle={styles.greenColor}
                      data={fakeData.filter((item) => item.status)}
                      renderItem={({item}) =>
                          <Text style={styles.flatListText}>{item.title}</Text>}/>

            <StatusBar style="auto"/>
        </View>
    );
}

function AddTodo({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text>Add Todo</Text>
            <Button title="Back" onPress={() => navigation.goBack()}/>
            <StatusBar style="auto"/>
        </View>
    );
}

function RemoveTodo({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text>Remove Todo</Text>
            <Button title="Back" onPress={() => navigation.goBack()}/>
            <StatusBar style="auto"/>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="mainPanel" component={MainScreen}></Stack.Screen>
                <Stack.Screen name="AddTodo" component={AddTodo}></Stack.Screen>
                <Stack.Screen name="removeTodo" component={RemoveTodo}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 200
    },
    flatListText: {
        textAlign: 'center',
        borderWidth: 1,
        width: 200
    },
    blueColor: {
        backgroundColor:"#0aebfe"
    },
    redColor: {
        backgroundColor:"#ff494c"
    },
    greenColor: {
        backgroundColor:"#00ff00"
    }
});
