// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Animated, Dimensions } from 'react-native';
// import Color from '../../styles/Colors';

// const menuWidth = 200;

// const ComponentMenuRight = (props) => {
//     const { toggleRightMenu } = props;

//     const INITIAL_MENU_HEIGHT = Dimensions.get('window').height * 2;
//     const INITIAL_MENU_POSITION = -(INITIAL_MENU_HEIGHT / 4);

//     const xPosHidden = menuWidth + menuWidth / 2;
//     const xPosNotHidden = menuWidth - menuWidth / 2;

//     const [boxScale, setBoxScale] = useState(new Animated.Value(0.5));
//     const [bounceValue, setBounceValue] = useState(
//         new Animated.Value(xPosHidden)
//     );
//     const [menuDimensions, setMenuDimensions] = useState({
//         height: INITIAL_MENU_HEIGHT,
//         yPosition: INITIAL_MENU_POSITION,
//     });

//     const onOrientationChange = () => {
//         const newHeight = Dimensions.get('window').height * 2;
//         const newYPos = -newHeight / 4;
//         setMenuDimensions({ height: newHeight, yPosition: newYPos });

//         // Event Listener Cleanup
//         Dimensions.removeEventListener('change', onOrientationChange);
//     };

//     // Event Listener for orientation changes
//     Dimensions.addEventListener('change', onOrientationChange);

//     useEffect(() => {
//         toggleView();
//     }, [toggleRightMenu]);

//     const toggleView = () => {
//         if (toggleRightMenu) {
//             Animated.spring(bounceValue, {
//                 toValue: xPosNotHidden,
//                 bounciness: 2,
//                 useNativeDriver: true,
//             }).start();
//         } else {
//             Animated.spring(bounceValue, {
//                 toValue: xPosHidden,
//                 tension: 1,
//                 friction: 5,
//                 useNativeDriver: true,
//             }).start();
//         }
//     };

//     return (
//         <Animated.View
//             style={[
//                 styles.animatedView,
//                 {
//                     transform: [
//                         { scale: boxScale },
//                         { translateX: bounceValue },
//                     ],
//                     top: menuDimensions.yPosition,
//                     height: menuDimensions.height,
//                 },
//             ]}>
//             <View style={styles.menuContent}></View>
//         </Animated.View>
//     );
// };

// const styles = StyleSheet.create({
//     animatedView: {
//         position: 'absolute',
//         alignItems: 'center',
//         right: 0,
//         width: menuWidth,
//         backgroundColor: 'transparent',
//         zIndex: 1,
//     },
//     menuContent: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: Color.bottomDrawerBg,
//         borderWidth: 3,
//         borderColor: Color.borderColor,
//         elevation: 10,
//     },
// });

// export default ComponentMenuRight;
