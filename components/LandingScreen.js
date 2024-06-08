import React from 'react';
import { 
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LandingScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.titleText}> Music Player </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#f1f2ff'
  },
  view1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(6)
  },
  titleText: {
    fontSize: wp(10),
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: 'black'
  }
});

export default LandingScreen;