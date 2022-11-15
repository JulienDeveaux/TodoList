import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useState} from "react";

// npm run android

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

let todoListItems: Todo[] = fakeData;

function MainScreen({navigation, route}: any) {
    let params = route.params
    const [data, setTodo] = useState<Todo[]>(todoListItems);
    if(params && params.todo) {
        todoListItems = Array.from(params.todo)
        params.todo = undefined
    }

    function changeStatus(item: Todo) {
        const _todos = [...todoListItems];
        const index = _todos.indexOf(item);
        if(index > -1) {
            _todos[index].status = !_todos[index].status;
        }
        setTodo(_todos);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todos</Text>
            <Pressable style={{...styles.button, ...styles.blueColor}} onPress={() => navigation.navigate('Add Todo')}>
                <Text>Add Todo</Text>
            </Pressable>
            <Pressable style={{...styles.button, ...styles.redColor}} onPress={() => navigation.navigate('Remove Todo')}>
                <Text>Remove Todo</Text>
            </Pressable>
            
            <Text style={styles.title}>Pending List</Text>
            <FlatList contentContainerStyle={styles.blueColor}
                      data={todoListItems.filter((item) => !item.status)}
                      renderItem={({item}) =>
                          <Text delayLongPress={2000} onLongPress={() => changeStatus(item)} onPress={() => navigation.navigate('Details', {item: item})} style={styles.flatListText}>{item.title}</Text>}
            />

            <Text style={styles.title}>Done List</Text>
            <FlatList contentContainerStyle={styles.greenColor}
                      data={todoListItems.filter((item) => item.status)}
                      renderItem={({item}) =>
                          <Text delayLongPress={2000} onLongPress={() => changeStatus(item)} onPress={() => navigation.navigate('Details', {item: item})} style={styles.flatListText}>{item.title}</Text>}
            />

            <StatusBar style="auto"/>
        </View>
    );
}

function AddTodo({navigation}: any) {
    const [data, setTodo] = useState<Todo[]>(todoListItems);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const addTodo = () => {
        const _todos = [...data];

        _todos.push({
            title: title,
            description: description,
            status: false
        });
        setTodo(_todos);

        navigation.navigate('Todo Main Menu', {todo: _todos});
    }
    return (
        <View style={styles.container}>
            <Text>Add Todo</Text>
            <TextInput style={styles.input}
                       onChangeText={(text) => setTitle(text)}
                       placeholder="Title"/>
            <TextInput style={styles.input}
                       onChangeText={(text) => setDescription(text)}
                       placeholder="Description"/>
            <Button title="Add Todo" onPress={addTodo}/>
            <Button title="Back" onPress={() => navigation.goBack()}/>
            <StatusBar style="auto"/>
        </View>
    );
}

function RemoveTodo({navigation}: any) {
    const [data, setTodo] = useState<Todo[]>(todoListItems);
    function removeItem(item: Todo) {
        const _todos = [...data];
        const index = _todos.indexOf(item);
        if(index > -1) {
            _todos.splice(index, 1);
        }
        setTodo(_todos);
        navigation.navigate('Todo Main Menu', {todo: _todos});
    }

    return (
        <View style={styles.container}>
            <Text>Remove Todo</Text>
            <FlatList data={todoListItems}
                      renderItem={({item}) =>
                          <Text onPress={() => removeItem(item)} style={item.status ? {...styles.flatListText, ...styles.greenColor}
                                                                                    : {...styles.flatListText, ...styles.blueColor}}>{item.title}</Text>}
            />
            <Button title="Back" onPress={() => navigation.goBack()}/>
            <StatusBar style="auto"/>
        </View>
    );
}

function Details({navigation, route}: any) {
    let params = route.params
    let item: Todo = {
        title: '',
        description: '',
        status: false
    }
    if(params && params.item) {
        item = params.item
        params.item = undefined
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Name : </Text>
            <Text>{item.title}</Text>
            <Text style={styles.title}>Description : </Text>
            <Text>{item.description}</Text>
            <Text style={styles.title}>Status : </Text>
            <Text>{item.status ? 'Done' : 'Not Done'}</Text>
            <Button title="Back" onPress={() => navigation.goBack()}/>
            <StatusBar style="auto"/>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Todo Main Menu" component={MainScreen}></Stack.Screen>
                <Stack.Screen name="Add Todo" component={AddTodo}></Stack.Screen>
                <Stack.Screen name="Remove Todo" component={RemoveTodo}></Stack.Screen>
                <Stack.Screen name="Details" component={Details}></Stack.Screen>
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
    input: {
        width: 200,
        borderWidth: 1,
        padding: 0,
        textAlign: 'center'
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
