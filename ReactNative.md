# React Native

React Native es un marco de desarrollo de aplicaciones móviles de código abierto creado por Facebook. Permite a los desarrolladores crear aplicaciones móviles nativas para iOS y Android utilizando JavaScript y React, una biblioteca para construir interfaces de usuario. 

Con React Native, se puede escribir gran parte del código una vez y ejecutarlo en múltiples plataformas, lo que reduce significativamente el tiempo y esfuerzo de desarrollo. Además, ofrece un rendimiento cercano al nativo y acceso a las funcionalidades del dispositivo, proporcionando una experiencia de usuario altamente fluida y receptiva.


## Crear proyecto (Versión Antigua)

Para usar React Native lo recomendable es hacerlo a travez de una plataforma intermedia, como lo que haremos aqui, con [Expo](https://expo.dev), la cual es una de las mejores plataformas para desarrollar con React Native. Incluso los ejemplos en la pagina oficial de React Native estan hechos en Expo.

Basicamente lo que hace es dar una serie de facilidades y herramientas para inicializar y configurar un proyecto, ademas de dar la posibilidad de visualizar los cambios mediante la web, un emulador de Android o de iOS. (Aqui lo haremos con Android).

Antes de comenzar la instalacion, es importante tener instalado `Node.js` y `npm`.

Ahora, para instalar el cliente de expo con los comandos necesarios para usarlo en conjunto con React Native, se usa este comando:
```bash
npm install -g expo-cli
```
Una vez se haya instalado, ahora lo que tenemos que hacer es ir a la carpeta en donde queremos inicializar la aplicacion de React Native, ponemos este comando:
```bash
expo init [NombreDeLaCarpeta]
```


## Crear proyecto (Versión Actual)

Para crear el proyecto de Reac Natieve usaremos Expo, una plataforma que nos permitira gestionar los archivos y conectarlo con emuladores de iOS, Android o en la misma Web. Ademas permite hacer Deploy del proyecto de una forma mas sensilla.

Para crear el proyecto tenemos que usar el siguiente comando:
```
npx create-expo-app@latest
```

Ahora, para crear un proyecto sin ninguna modificacion, totalmente vacio (lo mas recomendable), usamos `--template blank`, de esta manera:
```
npx create-expo-app@latest --template blank
```

Ahora, una vez creado el proyecto, dentro de dicho archivo, usamos el siguiente comando:
```
npx expo start
```
Esto es para iniciar el proyecto y que te abra un menu, con el cual puedes abrir la visualizacion de proyecto en el emulador, o en la web, incluso en el celular con la App.

[Instricciones de la pagina del React Native](https://reactnative.dev/docs/environment-setup)

[Instricciones de la pagina del Expo](https://docs.expo.dev/get-started/create-a-project/)


## Android Studio para React Native

Para usar el Emulador de Android con React Native, tenemos que descargar Android Studio, y generar ahi el emulador que deceemos. Mas infomracion [aqui](https://docs.expo.dev/workflow/android-studio-emulator/).


## Diferencia principal de React y React Native y componentes basicos

En principio, la principal diferencia es los componentes que exiten por defecto en React Native son diferentes a los que existen en React. Ademas, estos componentes los tenemos que importar de esta manera: 
```jsx
import { Text, View } from 'react-native'
```
Aqui estamos importando dos componentes muy importantes y aqui los veremos:

### Text
```jsx
<Text></Text>
```
Este es el unico componente al que le podemos colocar texto, a diferencia de React, donde pondemos poner el texto donde querramos, y no necesitamos importar componentes para renderizar texto, en React Native si. Es el unico componente que permite texto. (no se pude usar ni `<p></p>`, ni ninguno de los Hs)

### View
```jsx
<View></View>
```
Es el componente basico para crear cualquier interfaz en React Native. Es parecido a un `<div></div>`, pero se comporta como un contenedor con Flex Box.

Tambien a diferencia de React, donde puedes poner el `onClick`, en cuelquier elemento, en React Native existen componentes muy especificas para ello las cuales son los *touchales*, que se importan de la misma manera que lo vimos antes:
```jsx
import { Text, View, TouchableNativeFeedback } from 'react-native'
```
La forma de usar esto es la siguiente:
```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableNativeFeedback, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => Alert.alert("World!")}>
        <Text>Hello</Text>
      </TouchableNativeFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```
Aqui vemos mucha informacion, pero solo consentremonos en el return de la funcion app. Aqui vemos como se usa el View, el Text y el TouchableNativeFeedback (Como este hay varios Touchables diferentes). El elementos que queremos que sea "tocable", lo envolvemos en `<TouchableNativeFeedback></TouchableNativeFeedback>`, ademas usamos el `onPress`, el cual es un atributo que si o si tenemos que llamar para indicarle a React Native que tiene que hacer. Dentro de este atributo creamos una Arroy Function, la cual tiene una alerta (la cual tambien tenemos que importar).

Basicamente estos son los componentes mas importantes que usaremos en todos los proyectos que hagamos que React Native.


## Que hay en el archivo principal App.js

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableNativeFeedback, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => Alert.alert("World!")}>
        <Text style={styles.text}>Hello</Text>
      </TouchableNativeFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '50px',
  },
});
  
```
Las primeras 2 lineas lo que hace es importar las dependencias y los componentes nativos necearios para el funcionamiento de la app. Si bajamos un poco, veremos la tipica estrucura de un componente de React, la cual es una funcion que retorna el elemento que queremos crear. Ya explicamos para que funcionan cada uno de los elementos que llamamos.

Por ultimo, abajo del todo tenemos la seccion de estilos, a diferencia de React, aqui estilamos de esta manera, con un objeto llamado: `StyleSheet`, el cual tambien importamos de React Native (No se puede estilar con CSS). Esto nos permite pasar los estilos como objetos a los elementos que queremos que los tenga. por ejemplo, si queremos estilar el texto, tenemos que ir al componente de `<Text></Text>` y dentro de este colocar `style={styles.text}`, en este caso, para seleccionar la seccion de estilos del texto. Tambien se pueden poner estilos en linea, colocando simplemente: `style={ fontSize: '50px' }`, aunque esta forma no es la recomendada.


## Estructura de carpetas y .jsx

En principio, como sabemos, en React solemos escribir codigo en los tipos de archivo `.jsx`, y eso mimso haremos aqui.

Como ven, nuestro archivo App, tiene extencion `.js`, y nosotro no queremos trabajar directamente sobre el archivo app. Por lo que se suele hacer es crear una carpeta llamada `/src`, y dentro colocar los componentes en otra sub carpeta, de esta manera:

```
proyecto-ReactNative
    |
    | --- /node_modules
    | --- /assets
    | --- /src
    |       | --- /components
    |                   | --- main.jsx
    |
    | --- App.js
    | --- app.json
    | --- babel.config.js
    | --- package-lock.json
    | --- package.json
```

De esta manera creamos un archivo `main.jsx`, en el cual vamos a tener las llamadas a los principales componentes de la app, y el archivo `App.js` lo dejamos libre, y solo va a renderizar el `main.jsx`, asi:

El archivo `App.js`:
```js
import { Main } from './src/components/main'; 

export default function App() {
  return (
    <Main />
  );
}
```

El archivo `mian.jsx`:
```jsx
import { Text, View } from 'react-native';

export function Main() {
  return (
    <View>
      <Text>Rate Repository App</Text>
    </View>
  );
}

```

## Bibliografia

* Video de [Midudev](https://www.youtube.com/watch?v=qi87b6VcIHY&t=894s) **->** *Para aprender.*
* Video de 10 horas de [pryectos React Native](https://www.youtube.com/watch?v=Dl8x8EWXq8s&t=3646s) **->** *Para mejorar.*
* Video en [ingles](https://www.youtube.com/watch?v=ZBCUegTZF7M&t=6598s) **->** *Para conceptos y nuevas cosas.*