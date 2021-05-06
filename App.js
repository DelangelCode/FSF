//importacion de los componentes
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import {Text,View,TouchableOpacity,StatusBar,ScrollView,Image,Linking} from 'react-native';
import * as Animatable from 'react-native-animatable'
import {LinearGradient} from 'expo-linear-gradient';
import styles, { colores } from './src/styles/index.style';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  useTheme 
} from 'react-native-paper';
import { DrawerContent } from './src/screens/DrawerContent';
import { AuthContext } from "./src/screens/context";
import { SignIn, CreateAccount, Busqueda, Detalles, Profile, servicios, fragHomes, fragSucursales, Splash, 
  categorias, promociones, promociondetalle, localizacion,
} from "./src/screens/Screens";

//navegacion del modulo de usuarios (login,registro)
const AuthStack = createStackNavigator();
const AuthStackScreen =() => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}/>
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{headerShown: false}}/>
  </AuthStack.Navigator>
);


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SucursalesStack = createStackNavigator();
const ProfileStack = createStackNavigator();

//navegacion del modulo de inicio (busuqeda,categoria,servicios,detalles)
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={fragHomes}  options={{headerShown: false}}/>
    <HomeStack.Screen
      name="Busqueda"
      component={Busqueda}
      options={{headerShown: false}}/>
     <HomeStack.Screen
      name="Detalles"
      component={Detalles}
      options={{headerShown: false}}/>
    <HomeStack.Screen
      name="categorias"
      component={categorias}
      options={{headerShown: false}}/>
    <HomeStack.Screen
      name="servicios"
      component={servicios}
      options={{headerShown: false}}/>
  </HomeStack.Navigator>
);

//navegacion del modulo de secursales (promociones,promociones detalle,localizacion)
const SucursalesStackScreen = () => (
  <SucursalesStack.Navigator>
    <SucursalesStack.Screen name="Sucursales" component={fragSucursales}  options={{headerShown: false}}/>
    <HomeStack.Screen
      name="promociones"
      component={promociones}
      options={{headerShown: false}}/>
     <HomeStack.Screen
      name="promociondetalle"
      component={promociondetalle}
      options={{headerShown: false}}/>
    <SucursalesStack.Screen
      name="localizacion"
      component={localizacion}
      options={{headerShown: false}}/>  
  </SucursalesStack.Navigator>
);

//navegacion del modulo de perfil
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
  </ProfileStack.Navigator>
);

//navegacion del modulo de Inicio (Sucursales,inicio,perfil)
const TabsScreen = () => {
  const {colors} = useTheme();
  return(
  <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.selec2,
        activeBackgroundColor: colors.selec,
        inactiveTintColor: "#00bcd4",
        inactiveBackgroundColor: colors.background,}}
    > 
      <Tab.Screen
        name="Sucursales"
        component={SucursalesStackScreen}
        options={{
          title: "Sucursales",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          )
        }}
      />
       <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={ProfileStackScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <TabsScreen/>
  );
}

export function QSScreen({ navigation }) {
  const {colors} = useTheme();
  const handleCallPress = async () => {
    await Linking.openURL("tel:7898960495");
  };

  const handleSMSPress = async () => {
    await Linking.openURL("sms:7717012555?body=Farmacia San Francisco, ");
  };

  const handleEmailPress = async () => {
    await Linking.openURL("mailto:delangel.videos@gmail.com?subject=Quejas y/o Sugerencias&body=Farmacia San Francisco, ");
  };

  const handleWhatsAppPress = async () => {
    await Linking.openURL("https://wa.me/+527717012555?text=Farmacia San Francisco, ");
  };

  return (
    <Animatable.View animation="bounceIn" style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={colors.selec}
        barStyle={'light-content'}
      />
      <LinearGradient
        colors={[colores.background1, colores.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <ScrollView>
        <Text style={styles.subs}/>
        <Text style={styles.subs}/>
        <Animatable.Text animation="bounceIn" 
          style={styles.title}
          >Quejas y Sugerencias
        </Animatable.Text>
        <Text style={styles.subs}/>
        <TouchableOpacity style={{backgroundColor:colors.selec,
          marginHorizontal:35,
          alignItems:"center",
          justifyContent:"center",
          marginTop:15,
          paddingVertical:10,
          borderRadius:23}}
          onPress={handleCallPress}>
          <Ionicons name="call-outline" size={26} color={colors.background} />
          <Text style={{
              color:"white",
            }}>Llamar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:35,
          alignItems:"center",
          justifyContent:"center",
          marginTop:15,
          paddingVertical:10,
          borderRadius:23}}
          onPress={handleSMSPress}>
          <Ionicons name="chatbox-outline"  size={26} color={colors.background} />
          <Text style={{
              color:"white",
            }}>SMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:colors.selec,
          marginHorizontal:35,
          alignItems:"center",
          justifyContent:"center",
          marginTop:15,
          paddingVertical:10,
          borderRadius:23}}
          onPress={handleEmailPress}>
          <Ionicons name="mail" size={26} color={colors.background} />
          <Text style={{
              color:"white",
            }}>Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:35,
          alignItems:"center",
          justifyContent:"center",
          marginTop:15,
          paddingVertical:10,
          borderRadius:23}}
          onPress={handleWhatsAppPress}>
          <Ionicons name="logo-whatsapp"  size={26} color={colors.background} />
          <Text style={{
              color:"white",
            }}>WhatsApp
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Animatable.View>
  );
}

export function AcercadeScreen({ navigation }) {

  const {colors} = useTheme();
  const handleCallPress = async () => {
    await Linking.openURL("tel:7717012555");
  };

  const handleSMSPress = async () => {
    await Linking.openURL("sms:7717012555?body=Javier Del Angel, ");
  };

  const handleEmailPress = async () => {
    await Linking.openURL("mailto:delangel.videos@gmail.com?subject=Contacto&body=Javier Del Angel, ");
  };

  const handleWhatsAppPress = async () => {
    await Linking.openURL("https://wa.me/+527717012555?text=Javier Del Angel, ");
  };
  return (
    <Animatable.View animation="bounceIn" style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={colors.selec}
        barStyle={'light-content'}
      />
      <LinearGradient
        colors={[colores.background1, colores.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Image source ={require('./src/images/Logo-Farmacia-San-Francisco.png')}
          style={{width:"100%",height:"38%", marginTop:25}}
      /> 

      <Text style={styles.titulos}>
        Farmacia San Francisco
      </Text>
      <Text style={styles.subtitle2}>
        Cuenta con varias sucursales, las cuales cuentan con diferentes categorias en sus medicamentos y productos.
        Cuenta con servicios que atienden en un horario establecido.

        Esta aplicacion es un proyecto de estadia, es cual es para fines cientificos y tecnologicos el cual puede ser utlizado para beneficio de la Farmacia San Francisco.
      </Text>
      <Text style={styles.subs}/>
      <Text style={styles.subtitle2}>
        Desarrollador: Javier Del Angel Hernández
      </Text>
      <Text style={styles.subtitle2}>
        Version: 1.0.0
      </Text>
      <Text style={styles.subs}/>
      <Text style={styles.subs}/>
      <Animatable.Text animation="bounceIn" 
        style={styles.subtitle2}
        >Contactame:
      </Animatable.Text>
      <Text style={styles.subs}/>
      <View style={{flexDirection:'row', alignSelf:'center'}}>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:15,
          alignItems:"center",
          justifyContent:"center",
          marginTop:5,
          paddingHorizontal:10,
          borderRadius:10}}
          onPress={handleCallPress}>
          <Ionicons name="call-outline" size={13} color={colors.background} />
          <Text style={{
              color:"white",
            }}>Llamar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:15,
          alignItems:"center",
          justifyContent:"center",
          marginTop:5,
          paddingHorizontal:10,
          borderRadius:10}}
          onPress={handleSMSPress}>
          <Ionicons name="chatbox-outline"  size={13} color={colors.background} />
          <Text style={{
              color:"white",
            }}>SMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:15,
          alignItems:"center",
          justifyContent:"center",
          marginTop:5,
          paddingHorizontal:10,
          borderRadius:10}}
          onPress={handleEmailPress}>
          <Ionicons name="mail" size={13} color={colors.background} />
          <Text style={{
              color:"white",
            }}>Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor:colors.selec,marginHorizontal:15,
          alignItems:"center",
          justifyContent:"center",
          marginTop:5,
          paddingHorizontal:10,
          borderRadius:10}}
          onPress={handleWhatsAppPress}>
          <Ionicons name="logo-whatsapp"  size={13} color={colors.background} />
          <Text style={{
              color:"white",
            }}>WhatsApp
          </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

//navegacion del menu (inicio,quejas y sugerencias,acerca de)
const Drawer = createDrawerNavigator();
const App = () => (
  <Drawer.Navigator drawerContent={props =><DrawerContent{... props} />}>
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="QSScreen" component={QSScreen} />
    <Drawer.Screen name="AcercadeScreen" component={AcercadeScreen} />
  </Drawer.Navigator>
);

//navegacion de la aplicacion (modulo de usuarios (login,registro), modulo de inicio (toda la aplicacion))
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={App}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

//interfaz de la aplicacion (guarado del usuario y configuracion del tema de toda la aplicacion)
//En esta parte se componen de todas las navegaciones y componentes a utilizar
export default () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState('')

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      selec: '#1687a7',
      selec2: '#f9f3f3',
      text: '#1e212d'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#1e212d',
      selec: '#00bcd4',
      selec2: '#f9f3f3',
      text: '#ffffff'
    }
  }
 
  let login;
    
  const obtenerUsuario = async() => {
    const id = await AsyncStorage.getItem('id');
    login = id; 
    setUserToken(id);
  }

  const guardarUsuario = async() => {
    await AsyncStorage.setItem('id',login);
  }

  const CerrarSesion = async() => {
  await AsyncStorage.clear();
  }
  const authContext = React.useMemo(() => {
    
    return {
      signIn: (id) => {
        setIsLoading(false);
        setUserToken(id);
        login = id;   
        guardarUsuario();
      },
      signUp: (id) => {
        setIsLoading(false);
        setUserToken(id);
        login = id;   
        guardarUsuario();
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        login = null;
        CerrarSesion();
      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      obtenerUsuario();
    }, 3000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer  theme={theme}>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
};
