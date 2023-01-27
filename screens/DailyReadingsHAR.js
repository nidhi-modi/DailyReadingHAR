import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  BackHandler,
  Alert,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DOWN_ARROW = require('../assets/down_arrow.png');
const UP_ARROW = require('../assets/up_arrow.png');

export default class DailyReadingsHAR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //SAMPLE
      FlatListItems: {},
      isItConnected: '',

      sample: [],
      filteredSampleData: {},

      //
      showRealApp: false,
      selected: '',
      visibility: false,
      expandedH1: false,
      expandedH2: false,
      expandedH3: false,
      expandedH4: false,
      expandedH5: false,
      expandedH6: false,
      isLoading: false,

      onClickName: '',
      expand: false,
      currentDate: '',

      //VARIABLES
      bore1hours: '',
      bore1m3: '',
      bore2hours: '',
      bore2m3: '',
      currentdate: '',
      dateyesterday: '',
      har1northdripec: '',
      har1northdrainph: '',
      har1northdrainmls: '',
      har1northdrainec: '',
      gas: '',
      electricityfrontbore: '',
      electricityfront: '',
      electricityback: '',
      draindischarge: '',
      dayyesterday: '',
      har1northdripmls: '',
      har1northdripph: '',
      har1southdrainec: '',
      har1southdrainmls: '',
      har1southdrainph: '',
      har1southdripec: '',
      har1southdripmls: '',
      har1southdripph: '',
      har2northdrainec: '',
      har2northdrainmls: '',
      har2northdrainph: '',
      har2northdripec: '',
      har2northdripmls: '',
      har2northdripph: '',
      har2southdrainec: '',
      har2southdrainmls: '',
      har2southdrainph: '',
      har2southdripec: '',
      har2southdripmls: '',
      har2southdripph: '',
      har6southdripph: '',
      har6southdripmls: '',
      har6southdripec: '',
      har6southdrainph: '',
      har6southdrainmls: '',
      har6southdrainec: '',
      har6northdripph: '',
      har6northdripmls: '',
      har6northdripec: '',
      har6northdrainph: '',
      har6northdrainmls: '',
      har6northdrainec: '',
      har5southdripph: '',
      har5southdripmls: '',
      har5southdripec: '',
      har5southdrainph: '',
      har5southdrainmls: '',
      har5southdrainec: '',
      har5northdripph: '',
      har5northdripmls: '',
      har5northdripec: '',
      har5northdrainph: '',
      har5northdrainmls: '',
      har5northdrainec: '',
      har4southdripph: '',
      har4southdripmls: '',
      har4southdripec: '',
      har4southdrainph: '',
      har4southdrainmls: '',
      har4southdrainec: '',
      har4northdripph: '',
      har4northdripmls: '',
      har4northdripec: '',
      har4northdrainph: '',
      har4northdrainmls: '',
      har4northdrainec: '',
      har3southdripph: '',
      har3southdripmls: '',
      har3southdripec: '',
      har3southdrainph: '',
      har3southdrainmls: '',
      har3southdrainec: '',
      har3northdripph: '',
      har3northdripmls: '',
      har3northdripec: '',
      har3northdrainph: '',
      har3northdrainmls: '',
      har3northdrainec: '',

      siteName: 'HAR',
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  //CHECKING CONNECTION

  handleConnectivityChange = state => {
    if (state.isConnected) {
      this.setState({isItConnected: 'Online'});
    } else {
      this.setState({isItConnected: 'Offline'});
    }
  };

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          this.setState({isItConnected: 'Online'});
        } else {
          this.setState({isItConnected: 'Offline'});
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      this.setState({isItConnected: 'Offline'});
    } else {
      this.setState({isItConnected: 'Online'});
    }
  };

  //END
  //TESTING ON CLICK (ONLY ONE OPEN AT A TIME CODE)

  h1ChangeLayout = () => {
    this.setState({onClickName: 'h1'});

    this.manageOnClick();
  };

  h2ChangeLayout = () => {
    this.setState({onClickName: 'h2'});

    this.manageOnClick();
  };

  h3ChangeLayout = () => {
    this.setState({onClickName: 'h3'});

    this.manageOnClick();
  };

  h4ChangeLayout = () => {
    this.setState({onClickName: 'h4'});

    this.manageOnClick();
  };

  h5ChangeLayout = () => {
    this.setState({onClickName: 'h5'});

    this.manageOnClick();
  };

  h6ChangeLayout = () => {
    this.setState({onClickName: 'h6'});

    this.manageOnClick();
  };

  manageOnClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (this.state.onClickName === 'h1') {
      this.setState({
        expandedH1: true,
        expandedH2: false,
        expandedH3: false,
        expandedH4: false,
        expandedH5: false,
        expandedH6: false,
      });
    } else if (this.state.onClickName === 'h2') {
      this.setState({
        expandedH1: false,
        expandedH2: true,
        expandedH3: false,
        expandedH4: false,
        expandedH5: false,
        expandedH6: false,
      });
    } else if (this.state.onClickName === 'h3') {
      this.setState({
        expandedH1: false,
        expandedH2: false,
        expandedH3: true,
        expandedH4: false,
        expandedH5: false,
        expandedH6: false,
      });
    } else if (this.state.onClickName === 'h4') {
      this.setState({
        expandedH1: false,
        expandedH2: false,
        expandedH3: false,
        expandedH4: true,
        expandedH5: false,
        expandedH6: false,
      });
    } else if (this.state.onClickName === 'h5') {
      this.setState({
        expandedH1: false,
        expandedH2: false,
        expandedH3: false,
        expandedH4: false,
        expandedH5: true,
        expandedH6: false,
      });
    } else if (this.state.onClickName === 'h6') {
      this.setState({
        expandedH1: false,
        expandedH2: false,
        expandedH3: false,
        expandedH4: false,
        expandedH5: false,
        expandedH6: true,
      });
    }
  };

  //END

  //COLLAPSE VIEW ANIMATION CODE (CODE THAT COLLAPSES ALL THE VIEW)

  changeLayout1 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      expandedH1: !this.state.expandedH1,
      expandedH2: this.state.expandedH2,
      expandedH3: this.state.expandedH3,
      expandedH4: this.state.expandedH4,
      expandedH5: this.state.expandedH5,
      expandedH6: this.state.expandedH6,
    });
  };

  changeLayout2 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      expandedH1: this.state.expandedH1,
      expandedH2: !this.state.expandedH2,
      expandedH3: this.state.expandedH3,
      expandedH4: this.state.expandedH4,
      expandedH5: this.state.expandedH5,
      expandedH6: this.state.expandedH6,
    });
  };

  changeLayout3 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedH1: this.state.expandedH1,
      expandedH2: this.state.expandedH2,
      expandedH3: !this.state.expandedH3,
      expandedH4: this.state.expandedH4,
      expandedH5: this.state.expandedH5,
      expandedH6: this.state.expandedH6,
    });
  };

  changeLayout4 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedH1: this.state.expandedH1,
      expandedH2: this.state.expandedH2,
      expandedH3: this.state.expandedH3,
      expandedH4: !this.state.expandedH4,
      expandedH5: this.state.expandedH5,
      expandedH6: this.state.expandedH6,
    });
  };

  changeLayout5 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedH1: this.state.expandedH1,
      expandedH2: this.state.expandedH2,
      expandedH3: this.state.expandedH3,
      expandedH4: this.state.expandedH4,
      expandedH5: !this.state.expandedH5,
      expandedH6: this.state.expandedH6,
    });
  };

  changeLayout6 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedH1: this.state.expandedH1,
      expandedH2: this.state.expandedH2,
      expandedH3: this.state.expandedH3,
      expandedH4: this.state.expandedH4,
      expandedH5: this.state.expandedH5,
      expandedH6: !this.state.expandedH6,
    });
  };

  //

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  //ASYNC METHOD

  async setItem(myKey, value) {
    try {
      this.setState({
        isDataSend: false,
      });
      abc = '0';

      return await AsyncStorage.setItem(myKey, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }

  //

  //DATE PICKER

  hideDatePicker = () => {
    this.setState({visibility: false});
  };

  handleConfirm = date => {
    this.setState({dateyesterday: moment(date).format('DD/MM/YYYY')});
    const dateFormat = moment(date).format('YYYY-MM-DD');
    this.hideDatePicker();
    const dayBasedOnDate = this.getDayOfWeek(dateFormat);
    this.setState({dayyesterday: dayBasedOnDate});
    this.setItem('dayyesterday', moment(date).format('DD/MM/YYYY'));
    this.setItem('dayyesterday', dayBasedOnDate);
  };

  onPressCancel = () => {
    this.setState({visibility: false});
  };

  onPressButton = () => {
    this.setState({visibility: true});
  };

  clearText = () => {
    this.setState({visibility: true, dateyesterday: ''});
  };
  //

  //GET DAY BASED ON DATE SELECTED
  getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  }
  //

  //UPDATE TEXTINPUT
  updateTextInput = (text, field) => {
    this.setItem(field, text);
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  //

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentDidMount() {
    //CALLING GET ASYNC VALUES METHOD

    this.retriveAsyncData();

    var currentDate1 = moment().format('DD/MM/YYYY');

    this.setState({currentDate: currentDate1});

    console.log('CURRENT WEEK NUMBER : ' + currentDate1);

    //GET DATA FROM AWS

    this.getDailyReadingsData();

    //

    //CHECK INTERNET

    NetInfo.addEventListener(this.handleConnectivityChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  //GET AWS

  getDailyReadingsData = () => {
    try {
      AsyncStorage.getItem('@MySuperStore:readingsHarKey')
        .then(rawData => {
          const allRawData = JSON.parse(rawData);

          this.setState({sample: allRawData});

          if (rawData !== null) {
            this.renderEntryDate();
          }
        })
        .done();
    } catch (error) {}
  };

  //

  renderEntryDate = () => {
    const currentDate2 = moment().subtract(1, 'days').format('DD/MM/YYYY');

    console.log("Yesterday's date : " + currentDate2);

    const entryData = this.state.sample;

    const yesterdaysDate = d => d.currentdate === currentDate2;

    const filteredData = entryData.daily_readings.filter(yesterdaysDate);

    console.log(JSON.stringify(filteredData));

    this.setState({filteredSampleData: filteredData});

    //END
  };

  getTotal() {}

  //METHOD FOR GETTING ASYNC VALUES

  retriveAsyncData = async () => {
    try {
      const data1 = await AsyncStorage.getItem('bore1hours');

      if (data1 !== null) {
        this.setState({bore1hours: JSON.parse(data1)});
      }
    } catch (e) {}

    try {
      const data2 = await AsyncStorage.getItem('bore1m3');

      if (data2 !== null) {
        this.setState({bore1m3: JSON.parse(data2)});
      }
    } catch (e) {}

    try {
      const data3 = await AsyncStorage.getItem('bore2hours');

      if (data3 !== null) {
        this.setState({bore2hours: JSON.parse(data3)});
      }
    } catch (e) {}

    try {
      const data4 = await AsyncStorage.getItem('bore2m3');

      if (data4 !== null) {
        this.setState({bore2m3: JSON.parse(data4)});
      }
    } catch (e) {}

    try {
      const data5 = await AsyncStorage.getItem('currentdate');

      if (data5 !== null) {
        this.setState({currentDate: JSON.parse(data5)});
      }
    } catch (e) {}

    //G1 ASYNC getItem
    try {
      const data6 = await AsyncStorage.getItem('dateyesterday');

      if (data6 !== null) {
        this.setState({dateyesterday: JSON.parse(data6)});
      }
    } catch (e) {}

    try {
      const data7 = await AsyncStorage.getItem('har1northdripec');

      if (data7 !== null) {
        this.setState({har1northdripec: JSON.parse(data7)});
      }
    } catch (error) {}

    try {
      const data8 = await AsyncStorage.getItem('har1northdrainph');

      if (data8 !== null) {
        this.setState({har1northdrainph: JSON.parse(data8)});
      }
    } catch (error) {}

    try {
      const data9 = await AsyncStorage.getItem('har1northdrainmls');

      if (data9 !== null) {
        this.setState({har1northdrainmls: JSON.parse(data9)});
      }
    } catch (error) {}

    try {
      const data10 = await AsyncStorage.getItem('har1northdrainec');

      if (data10 !== null) {
        this.setState({har1northdrainec: JSON.parse(data10)});
      }
    } catch (error) {}

    try {
      const data11 = await AsyncStorage.getItem('gas');
      if (data11 !== null) {
        this.setState({gas: JSON.parse(data11)});
      }
    } catch (error) {}

    try {
      const data12 = await AsyncStorage.getItem('electricityfrontbore');

      if (data12 !== null) {
        this.setState({electricityfrontbore: JSON.parse(data12)});
      }
    } catch (error) {}

    try {
      const data13 = await AsyncStorage.getItem('electricityfront');

      if (data13 !== null) {
        this.setState({electricityfront: JSON.parse(data13)});
      }
    } catch (error) {}

    try {
      const data14 = await AsyncStorage.getItem('electricityback');

      if (data14 !== null) {
        this.setState({electricityback: JSON.parse(data14)});
      }
    } catch (error) {}

    try {
      const data15 = await AsyncStorage.getItem('draindischarge');

      if (data15 !== null) {
        this.setState({draindischarge: JSON.parse(data15)});
      }
    } catch (error) {}

    try {
      const data16 = await AsyncStorage.getItem('dayyesterday');
      if (data16 !== null) {
        this.setState({dayyesterday: JSON.parse(data16)});
      }
    } catch (error) {}

    try {
      const data17 = await AsyncStorage.getItem('har1northdripmls');
      if (data17 !== null) {
        this.setState({har1northdripmls: JSON.parse(data17)});
      }
    } catch (error) {}

    try {
      const data18 = await AsyncStorage.getItem('har1northdripph');
      if (data18 !== null) {
        this.setState({har1northdripph: JSON.parse(data18)});
      }
    } catch (error) {}

    try {
      const data19 = await AsyncStorage.getItem('har1southdrainec');
      if (data19 !== null) {
        this.setState({har1southdrainec: JSON.parse(data19)});
      }
    } catch (error) {}

    try {
      const data20 = await AsyncStorage.getItem('har1southdrainmls');
      if (data20 !== null) {
        this.setState({har1southdrainmls: JSON.parse(data20)});
      }
    } catch (error) {}

    try {
      const data21 = await AsyncStorage.getItem('har1southdrainph');
      if (data21 !== null) {
        this.setState({har1southdrainph: JSON.parse(data21)});
      }
    } catch (error) {}

    try {
      const data22 = await AsyncStorage.getItem('har1southdripec');
      if (data22 !== null) {
        this.setState({har1southdripec: JSON.parse(data22)});
      }
    } catch (error) {}

    try {
      const data23 = await AsyncStorage.getItem('har1southdripmls');
      if (data23 !== null) {
        this.setState({har1southdripmls: JSON.parse(data23)});
      }
    } catch (error) {}

    try {
      const data24 = await AsyncStorage.getItem('har1southdripph');
      if (data24 !== null) {
        this.setState({har1southdripph: JSON.parse(data24)});
      }
    } catch (error) {}

    try {
      const data25 = await AsyncStorage.getItem('har2northdrainec');
      if (data25 !== null) {
        this.setState({har2northdrainec: JSON.parse(data25)});
      }
    } catch (error) {}

    try {
      const data26 = await AsyncStorage.getItem('har2northdrainmls');
      if (data26 !== null) {
        this.setState({har2northdrainmls: JSON.parse(data26)});
      }
    } catch (error) {}

    try {
      const data27 = await AsyncStorage.getItem('har2northdrainph');
      if (data27 !== null) {
        this.setState({har2northdrainph: JSON.parse(data27)});
      }
    } catch (error) {}

    try {
      const data28 = await AsyncStorage.getItem('har2northdripec');
      if (data28 !== null) {
        this.setState({har2northdripec: JSON.parse(data28)});
      }
    } catch (error) {}

    try {
      const data29 = await AsyncStorage.getItem('har2northdripmls');
      if (data29 !== null) {
        this.setState({har2northdripmls: JSON.parse(data29)});
      }
    } catch (error) {}

    try {
      const data30 = await AsyncStorage.getItem('har2northdripph');
      if (data30 !== null) {
        this.setState({har2northdripph: JSON.parse(data30)});
      }
    } catch (error) {}

    try {
      const data31 = await AsyncStorage.getItem('har2southdrainec');
      if (data31 !== null) {
        this.setState({har2southdrainec: JSON.parse(data31)});
      }
    } catch (error) {}

    try {
      const data32 = await AsyncStorage.getItem('har2southdrainmls');
      if (data32 !== null) {
        this.setState({har2southdrainmls: JSON.parse(data32)});
      }
    } catch (error) {}

    try {
      const data33 = await AsyncStorage.getItem('har2southdrainph');
      if (data33 !== null) {
        this.setState({har2southdrainph: JSON.parse(data33)});
      }
    } catch (error) {}

    try {
      const data34 = await AsyncStorage.getItem('har2southdripec');
      if (data34 !== null) {
        this.setState({har2southdripec: JSON.parse(data34)});
      }
    } catch (error) {}

    try {
      const data35 = await AsyncStorage.getItem('har2southdripmls');
      if (data35 !== null) {
        this.setState({har2southdripmls: JSON.parse(data35)});
      }
    } catch (error) {}

    try {
      const data36 = await AsyncStorage.getItem('har2southdripph');
      if (data36 !== null) {
        this.setState({har2southdripph: JSON.parse(data36)});
      }
    } catch (error) {}

    try {
      const data37 = await AsyncStorage.getItem('har6southdripph');
      if (data37 !== null) {
        this.setState({har6southdripph: JSON.parse(data37)});
      }
    } catch (error) {}

    try {
      const data38 = await AsyncStorage.getItem('har6southdripmls');
      if (data38 !== null) {
        this.setState({har6southdripmls: JSON.parse(data38)});
      }
    } catch (error) {}

    try {
      const data39 = await AsyncStorage.getItem('har6southdripec');
      if (data39 !== null) {
        this.setState({har6southdripec: JSON.parse(data39)});
        9;
      }
    } catch (error) {}

    try {
      const data381 = await AsyncStorage.getItem('har6southdrainph');
      if (data381 !== null) {
        this.setState({har6southdrainph: JSON.parse(data381)});
      }
    } catch (error) {}

    try {
      const data391 = await AsyncStorage.getItem('har6southdrainmls');
      if (data391 !== null) {
        this.setState({har6southdrainmls: JSON.parse(data391)});
      }
    } catch (error) {}

    try {
      const data40 = await AsyncStorage.getItem('har6southdrainec');
      if (data40 !== null) {
        this.setState({har6southdrainec: JSON.parse(data40)});
      }
    } catch (error) {}

    try {
      const data41 = await AsyncStorage.getItem('har6northdripph');
      if (data41 !== null) {
        this.setState({har6northdripph: JSON.parse(data41)});
      }
    } catch (error) {}

    try {
      const data42 = await AsyncStorage.getItem('har6northdripmls');
      if (data42 !== null) {
        this.setState({har6northdripmls: JSON.parse(data42)});
      }
    } catch (error) {}

    try {
      const data43 = await AsyncStorage.getItem('har6northdripec');
      if (data43 !== null) {
        this.setState({har6northdripec: JSON.parse(data43)});
      }
    } catch (error) {}

    try {
      const data44 = await AsyncStorage.getItem('har6northdrainph');
      if (data44 !== null) {
        this.setState({har6northdrainph: JSON.parse(data44)});
      }
    } catch (error) {}

    try {
      const data45 = await AsyncStorage.getItem('har6northdrainmls');
      if (data45 !== null) {
        this.setState({har6northdrainmls: JSON.parse(data45)});
      }
    } catch (error) {}

    try {
      const data46 = await AsyncStorage.getItem('har6northdrainec');
      if (data46 !== null) {
        this.setState({har6northdrainec: JSON.parse(data46)});
      }
    } catch (error) {}

    try {
      const data47 = await AsyncStorage.getItem('har5southdripph');
      if (data47 !== null) {
        this.setState({har5southdripph: JSON.parse(data47)});
      }
    } catch (error) {}

    try {
      const data48 = await AsyncStorage.getItem('har5southdripmls');
      if (data48 !== null) {
        this.setState({har5southdripmls: JSON.parse(data48)});
      }
    } catch (error) {}

    try {
      const data49 = await AsyncStorage.getItem('har5southdripec');
      if (data49 !== null) {
        this.setState({har5southdripec: JSON.parse(data49)});
      }
    } catch (error) {}

    try {
      const data50 = await AsyncStorage.getItem('har5southdrainph');
      if (data50 !== null) {
        this.setState({har5southdrainph: JSON.parse(data50)});
      }
    } catch (error) {}

    try {
      const data51 = await AsyncStorage.getItem('har5southdrainmls');
      if (data51 !== null) {
        this.setState({har5southdrainmls: JSON.parse(data51)});
      }
    } catch (error) {}

    try {
      const data52 = await AsyncStorage.getItem('har5southdrainec');
      if (data52 !== null) {
        this.setState({har5southdrainec: JSON.parse(data52)});
      }
    } catch (error) {}

    try {
      const data53 = await AsyncStorage.getItem('har5northdripph');
      if (data53 !== null) {
        this.setState({har5northdripph: JSON.parse(data53)});
      }
    } catch (error) {}

    try {
      const data54 = await AsyncStorage.getItem('har5northdripmls');
      if (data54 !== null) {
        this.setState({har5northdripmls: JSON.parse(data54)});
      }
    } catch (error) {}

    try {
      const data55 = await AsyncStorage.getItem('har5northdripec');
      if (data55 !== null) {
        this.setState({har5northdripec: JSON.parse(data55)});
      }
    } catch (error) {}

    try {
      const data56 = await AsyncStorage.getItem('har5northdrainph');
      if (data56 !== null) {
        this.setState({har5northdrainph: JSON.parse(data56)});
      }
    } catch (error) {}

    try {
      const data57 = await AsyncStorage.getItem('har5northdrainmls');
      if (data57 !== null) {
        this.setState({har5northdrainmls: JSON.parse(data57)});
      }
    } catch (error) {}

    try {
      const data58 = await AsyncStorage.getItem('har5northdrainec');
      if (data58 !== null) {
        this.setState({har5northdrainec: JSON.parse(data58)});
      }
    } catch (error) {}

    try {
      const data59 = await AsyncStorage.getItem('har4southdripph');
      if (data59 !== null) {
        this.setState({har4southdripph: JSON.parse(data59)});
      }
    } catch (error) {}
    //END

    //G4 ASYNC getItem
    try {
      const data60 = await AsyncStorage.getItem('har4southdripmls');
      if (data60 !== null) {
        this.setState({har4southdripmls: JSON.parse(data60)});
      }
    } catch (error) {}

    try {
      const data61 = await AsyncStorage.getItem('har4southdripec');
      if (data61 !== null) {
        this.setState({har4southdripec: JSON.parse(data61)});
      }
    } catch (error) {}

    try {
      const data62 = await AsyncStorage.getItem('har4southdrainph');
      if (data62 !== null) {
        this.setState({har4southdrainph: JSON.parse(data62)});
      }
    } catch (error) {}

    try {
      const data63 = await AsyncStorage.getItem('har4southdrainmls');
      if (data63 !== null) {
        this.setState({har4southdrainmls: JSON.parse(data63)});
      }
    } catch (error) {}

    try {
      const data64 = await AsyncStorage.getItem('har4southdrainec');
      if (data64 !== null) {
        this.setState({har4southdrainec: JSON.parse(data64)});
      }
    } catch (error) {}

    try {
      const data65 = await AsyncStorage.getItem('har4northdripph');
      if (data65 !== null) {
        this.setState({har4northdripph: JSON.parse(data65)});
      }
    } catch (error) {}

    try {
      const data66 = await AsyncStorage.getItem('har4northdripmls');
      if (data66 !== null) {
        this.setState({har4northdripmls: JSON.parse(data66)});
      }
    } catch (error) {}

    try {
      const data67 = await AsyncStorage.getItem('har4northdripec');
      if (data67 !== null) {
        this.setState({har4northdripec: JSON.parse(data67)});
      }
    } catch (error) {}

    try {
      const data68 = await AsyncStorage.getItem('har4northdrainph');
      if (data68 !== null) {
        this.setState({har4northdrainph: JSON.parse(data68)});
      }
    } catch (error) {}

    try {
      const data69 = await AsyncStorage.getItem('har4northdrainmls');
      if (data69 !== null) {
        this.setState({har4northdrainmls: JSON.parse(data69)});
      }
    } catch (error) {}

    try {
      const data70 = await AsyncStorage.getItem('har4northdrainec');
      if (data70 !== null) {
        this.setState({har4northdrainec: JSON.parse(data70)});
      }
    } catch (error) {}

    try {
      const data71 = await AsyncStorage.getItem('har3southdripph');
      if (data71 !== null) {
        this.setState({har3southdripph: JSON.parse(data71)});
      }
    } catch (error) {}

    try {
      const data72 = await AsyncStorage.getItem('har3southdripmls');
      if (data72 !== null) {
        this.setState({har3southdripmls: JSON.parse(data72)});
      }
    } catch (error) {}

    try {
      const data73 = await AsyncStorage.getItem('har3southdripec');
      if (data73 !== null) {
        this.setState({har3southdripec: JSON.parse(data73)});
      }
    } catch (error) {}

    try {
      const data74 = await AsyncStorage.getItem('har3southdrainph');
      if (data74 !== null) {
        this.setState({har3southdrainph: JSON.parse(data74)});
      }
    } catch (error) {}

    try {
      const data75 = await AsyncStorage.getItem('har3southdrainmls');
      if (data75 !== null) {
        this.setState({har3southdrainmls: JSON.parse(data75)});
      }
    } catch (error) {}

    try {
      const data76 = await AsyncStorage.getItem('har3southdrainec');
      if (data76 !== null) {
        this.setState({har3southdrainec: JSON.parse(data76)});
      }
    } catch (error) {}

    try {
      const data77 = await AsyncStorage.getItem('har3northdripph');
      if (data77 !== null) {
        this.setState({har3northdripph: JSON.parse(data77)});
      }
    } catch (error) {}

    try {
      const data78 = await AsyncStorage.getItem('har3northdripmls');
      if (data78 !== null) {
        this.setState({har3northdripmls: JSON.parse(data78)});
      }
    } catch (error) {}

    try {
      const data79 = await AsyncStorage.getItem('har3northdripec');
      if (data79 !== null) {
        this.setState({har3northdripec: JSON.parse(data79)});
      }
    } catch (error) {}

    try {
      const data80 = await AsyncStorage.getItem('har3northdrainph');
      if (data80 !== null) {
        this.setState({har3northdrainph: JSON.parse(data80)});
      }
    } catch (error) {}

    try {
      const data81 = await AsyncStorage.getItem('har3northdrainmls');
      if (data81 !== null) {
        this.setState({har3northdrainmls: JSON.parse(data81)});
      }
    } catch (error) {}

    try {
      const data82 = await AsyncStorage.getItem('har3northdrainec');
      if (data82 !== null) {
        this.setState({har3northdrainec: JSON.parse(data82)});
      }
    } catch (error) {}
  };

  //END

  //SEND DATA BUTTON METHOD
  sendData = () => {
    //SEND DATA TO AWS
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});

    if (this.state.isItConnected === 'Online') {
      if (this.state.bore1hours === '') {
        this.setState({bore1hours: '0'});
      }

      if (this.state.bore1m3 === '') {
        this.setState({bore1m3: '0'});
      }

      if (this.state.bore2hours === '') {
        this.setState({bore2hours: '0'});
      }

      if (this.state.bore2m3 === '') {
        this.setState({bore2m3: '0'});
      }

      if (this.state.har1northdripec === '') {
        this.setState({har1northdripec: '0'});
      }

      if (this.state.har1northdrainph === '') {
        this.setState({har1northdrainph: '0'});
      }

      if (this.state.har1northdrainmls === '') {
        this.setState({har1northdrainmls: '0'});
      }

      if (this.state.har1northdrainec === '') {
        this.setState({har1northdrainec: '0'});
      }

      if (this.state.gas === '') {
        this.setState({gas: '0'});
      }

      if (this.state.electricityfrontbore === '') {
        this.setState({electricityfrontbore: '0'});
      }

      if (this.state.electricityfront === '') {
        this.setState({electricityfront: '0'});
      }

      if (this.state.electricityback === '') {
        this.setState({electricityback: '0'});
      }

      if (this.state.draindischarge === '') {
        this.setState({draindischarge: '0'});
      }

      if (this.state.har1northdripmls === '') {
        this.setState({har1northdripmls: '0'});
      }

      if (this.state.har1northdripph === '') {
        this.setState({har1northdripph: '0'});
      }

      if (this.state.har1southdrainec === '') {
        this.setState({har1southdrainec: '0'});
      }

      if (this.state.har1southdrainmls === '') {
        this.setState({har1southdrainmls: '0'});
      }

      if (this.state.har1southdrainph === '') {
        this.setState({har1southdrainph: '0'});
      }

      if (this.state.har1southdripec === '') {
        this.setState({har1southdripec: '0'});
      }

      if (this.state.har1southdripmls === '') {
        this.setState({har1southdripmls: '0'});
      }

      if (this.state.har1southdripph === '') {
        this.setState({har1southdripph: '0'});
      }

      if (this.state.har2northdrainec === '') {
        this.setState({har2northdrainec: '0'});
      }

      if (this.state.har2northdrainmls === '') {
        this.setState({har2northdrainmls: '0'});
      }

      if (this.state.har2northdrainph === '') {
        this.setState({har2northdrainph: '0'});
      }

      if (this.state.har2northdripec === '') {
        this.setState({har2northdripec: '0'});
      }

      if (this.state.har2northdripmls === '') {
        this.setState({har2northdripmls: '0'});
      }

      if (this.state.har2northdripph === '') {
        this.setState({har2northdripph: '0'});
      }

      if (this.state.har2southdrainec === '') {
        this.setState({har2southdrainec: '0'});
      }

      if (this.state.har2southdrainmls === '') {
        this.setState({har2southdrainmls: '0'});
      }

      if (this.state.har2southdrainph === '') {
        this.setState({har2southdrainph: '0'});
      }

      if (this.state.har2southdripec === '') {
        this.setState({har2southdripec: '0'});
      }

      if (this.state.har2southdripmls === '') {
        this.setState({har2southdripmls: '0'});
      }

      if (this.state.har2southdripph === '') {
        this.setState({har2southdripph: '0'});
      }

      if (this.state.har6southdripph === '') {
        this.setState({har6southdripph: '0'});
      }

      if (this.state.har6southdripmls === '') {
        this.setState({har6southdripmls: '0'});
      }

      if (this.state.har6southdripec === '') {
        this.setState({har6southdripec: '0'});
      }

      if (this.state.har6southdrainph === '') {
        this.setState({har6southdrainph: '0'});
      }

      if (this.state.har6southdrainmls === '') {
        this.setState({har6southdrainmls: '0'});
      }

      if (this.state.har6southdrainec === '') {
        this.setState({har6southdrainec: '0'});
      }

      if (this.state.har6northdripph === '') {
        this.setState({har6northdripph: '0'});
      }

      if (this.state.har6northdripmls === '') {
        this.setState({har6northdripmls: '0'});
      }

      if (this.state.har6northdripec === '') {
        this.setState({har6northdripec: '0'});
      }

      if (this.state.har6northdrainph === '') {
        this.setState({har6northdrainph: '0'});
      }

      if (this.state.har6northdrainmls === '') {
        this.setState({har6northdrainmls: '0'});
      }

      if (this.state.har6northdrainec === '') {
        this.setState({har6northdrainec: '0'});
      }

      if (this.state.har5southdripph === '') {
        this.setState({har5southdripph: '0'});
      }

      if (this.state.har5southdripmls === '') {
        this.setState({har5southdripmls: '0'});
      }

      if (this.state.har5southdripec === '') {
        this.setState({har5southdripec: '0'});
      }

      if (this.state.har5southdrainph === '') {
        this.setState({har5southdrainph: '0'});
      }

      if (this.state.har5southdrainmls === '') {
        this.setState({har5southdrainmls: '0'});
      }

      if (this.state.har5southdrainec === '') {
        this.setState({har5southdrainec: '0'});
      }

      if (this.state.har5northdripph === '') {
        this.setState({har5northdripph: '0'});
      }

      if (this.state.har5northdripmls === '') {
        this.setState({har5northdripmls: '0'});
      }

      if (this.state.har5northdripec === '') {
        this.setState({har5northdripec: '0'});
      }

      if (this.state.har5northdrainph === '') {
        this.setState({har5northdrainph: '0'});
      }

      if (this.state.har5northdrainmls === '') {
        this.setState({har5northdrainmls: '0'});
      }

      if (this.state.har5northdrainec === '') {
        this.setState({har5northdrainec: '0'});
      }

      if (this.state.har4southdripph === '') {
        this.setState({har4southdripph: '0'});
      }

      if (this.state.har4southdripmls === '') {
        this.setState({har4southdripmls: '0'});
      }

      if (this.state.har4southdripec === '') {
        this.setState({har4southdripec: '0'});
      }

      if (this.state.har4southdrainph === '') {
        this.setState({har4southdrainph: '0'});
      }

      if (this.state.har4southdrainmls === '') {
        this.setState({har4southdrainmls: '0'});
      }

      if (this.state.har4southdrainec === '') {
        this.setState({har4southdrainec: '0'});
      }

      if (this.state.har4northdripph === '') {
        this.setState({har4northdripph: '0'});
      }

      if (this.state.har4northdripmls === '') {
        this.setState({har4northdripmls: '0'});
      }

      if (this.state.har4northdripec === '') {
        this.setState({har4northdripec: '0'});
      }

      if (this.state.har4northdrainph === '') {
        this.setState({har4northdrainph: '0'});
      }

      if (this.state.har4northdrainmls === '') {
        this.setState({har4northdrainmls: '0'});
      }

      if (this.state.har4northdrainec === '') {
        this.setState({har4northdrainec: '0'});
      }

      if (this.state.har3southdripph === '') {
        this.setState({har3southdripph: '0'});
      }

      if (this.state.har3southdripmls === '') {
        this.setState({har3southdripmls: '0'});
      }

      if (this.state.har3southdripec === '') {
        this.setState({har3southdripec: '0'});
      }

      if (this.state.har3southdrainph === '') {
        this.setState({har3southdrainph: '0'});
      }

      if (this.state.har3southdrainmls === '') {
        this.setState({har3southdrainmls: '0'});
      }

      if (this.state.har3southdrainec === '') {
        this.setState({har3southdrainec: '0'});
      }

      if (this.state.har3northdripph === '') {
        this.setState({har3northdripph: '0'});
      }

      if (this.state.har3northdripmls === '') {
        this.setState({har3northdripmls: '0'});
      }

      if (this.state.har3northdripec === '') {
        this.setState({har3northdripec: '0'});
      }

      if (this.state.har3northdrainph === '') {
        this.setState({har3northdrainph: '0'});
      }

      if (this.state.har3northdrainmls === '') {
        this.setState({har3northdrainmls: '0'});
      }

      if (this.state.har3northdrainec === '') {
        this.setState({har3northdrainec: '0'});
      }

      const sendData = {
        site_name: this.state.siteName.toString(),
        currentdate: this.state.currentDate.toString(),
        dateyesterday: this.state.dateyesterday.toString(),
        dayyesterday: this.state.dayyesterday.toString(),
        gas: this.state.gas.length === 0 ? '0' : parseInt(this.state.gas),
        bore1hours:
          this.state.bore1hours.length === 0
            ? '0'
            : parseFloat(this.state.bore1hours),
        bore1m3:
          this.state.bore1m3.length === 0
            ? '0'
            : parseFloat(this.state.bore1m3),
        bore2hours:
          this.state.bore2hours.length === 0
            ? '0'
            : parseFloat(this.state.bore2hours),
        bore2m3:
          this.state.bore2m3.length === 0
            ? '0'
            : parseFloat(this.state.bore2m3),
        har1northdripec:
          this.state.har1northdripec.length === 0
            ? '0'
            : parseFloat(this.state.har1northdripec),
        har1northdrainph:
          this.state.har1northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har1northdrainph),
        har1northdrainmls:
          this.state.har1northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har1northdrainmls),
        har1northdrainec:
          this.state.har1northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har1northdrainec),
        electricityfrontbore:
          this.state.electricityfrontbore.length === 0
            ? '0'
            : parseFloat(this.state.electricityfrontbore),
        electricityfront:
          this.state.electricityfront.length === 0
            ? '0'
            : parseFloat(this.state.electricityfront),
        electricityback:
          this.state.electricityback.length === 0
            ? '0'
            : parseFloat(this.state.electricityback),
        draindischarge:
          this.state.draindischarge.length === 0
            ? '0'
            : parseFloat(this.state.draindischarge),
        har1northdripmls:
          this.state.har1northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har1northdripmls),
        har1northdripph:
          this.state.har1northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har1northdripph),
        har1southdrainec:
          this.state.har1southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har1southdrainec),
        har1southdrainmls:
          this.state.har1southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har1southdrainmls),
        har1southdrainph:
          this.state.har1southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har1southdrainph),
        har1southdripec:
          this.state.har1southdripec.length === 0
            ? '0'
            : parseFloat(this.state.har1southdripec),
        har1southdripmls:
          this.state.har1southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har1southdripmls),
        har1southdripph:
          this.state.har1southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har1southdripph),
        har2northdrainec:
          this.state.har2northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har2northdrainec),
        har2northdrainmls:
          this.state.har2northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har2northdrainmls),
        har2northdrainph:
          this.state.har2northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har2northdrainph),
        har2northdripec:
          this.state.har2northdripec.length === 0
            ? '0'
            : parseFloat(this.state.har2northdripec),
        har2northdripmls:
          this.state.har2northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har2northdripmls),
        har2northdripph:
          this.state.har2northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har2northdripph),
        har2southdrainec:
          this.state.har2southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har2southdrainec),
        har2southdrainmls:
          this.state.har2southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har2southdrainmls),
        har2southdrainph:
          this.state.har2southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har2southdrainph),
        har2southdripec:
          this.state.har2southdripec.length === 0
            ? '0'
            : parseFloat(this.state.har2southdripec),
        har2southdripmls:
          this.state.har2southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har2southdripmls),
        har2southdripph:
          this.state.har2southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har2southdripph),
        har6southdripph:
          this.state.har6southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har6southdripph),
        har6southdripmls:
          this.state.har6southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har6southdripmls),
        har6southdripec:
          this.state.har6southdripec.length === 0
            ? '0'
            : parseFloat(this.state.har6southdripec),
        har6southdrainph:
          this.state.har6southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har6southdrainph),
        har6southdrainmls:
          this.state.har6southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har6southdrainmls),
        har6southdrainec:
          this.state.har6southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har6southdrainec),
        har6northdripph:
          this.state.har6northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har6northdripph),
        har6northdripmls:
          this.state.har6northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har6northdripmls),
        har6northdripec:
          this.state.har6northdripec.length === 0
            ? '0'
            : parseFloat(this.state.har6northdripec),
        har6northdrainph:
          this.state.har6northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har6northdrainph),
        har6northdrainmls:
          this.state.har6northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har6northdrainmls),
        har6northdrainec:
          this.state.har6northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har6northdrainec),
        har5southdripph:
          this.state.har5southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har5southdripph),
        har5southdripmls:
          this.state.har5southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har5southdripmls),
        har5southdripec:
          this.state.har5southdripec.length === 0
            ? '0'
            : parseFloat(this.state.har5southdripec),
        har5southdrainph:
          this.state.har5southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har5southdrainph),
        har5southdrainmls:
          this.state.har5southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har5southdrainmls),
        har5southdrainec:
          this.state.har5southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har5southdrainec),
        har5northdripph:
          this.state.har5northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har5northdripph),
        har5northdripmls:
          this.state.har5northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har5northdripmls),
        har5northdripec:
          this.state.har5northdripec.length === 0
            ? '0'
            : this.state.har5northdripec,
        har5northdrainph:
          this.state.har5northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har5northdrainph),
        har5northdrainmls:
          this.state.har5northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har5northdrainmls),
        har5northdrainec:
          this.state.har5northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har5northdrainec),
        har4southdripph:
          this.state.har4southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har4southdripph),
        har4southdripmls:
          this.state.har4southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har4southdripmls),
        har4southdripec:
          this.state.har4southdripec.length === 0
            ? '0'
            : parseFloat(this.state.har4southdripec),
        har4southdrainph:
          this.state.har4southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har4southdrainph),
        har4southdrainmls:
          this.state.har4southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har4southdrainmls),
        har4southdrainec:
          this.state.har4southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har4southdrainec),
        har4northdripph:
          this.state.har4northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har4northdripph),
        har4northdripmls:
          this.state.har4northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har4northdripmls),
        har4northdripec:
          this.state.har4northdripec.length === 0
            ? '0'
            : parseFloat(this.state.har4northdripec),
        har4northdrainph:
          this.state.har4northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har4northdrainph),
        har4northdrainmls:
          this.state.har4northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har4northdrainmls),
        har4northdrainec:
          this.state.har4northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har4northdrainec),
        har3southdripph:
          this.state.har3southdripph.length === 0
            ? '0'
            : parseFloat(this.state.har3southdripph),
        har3southdripmls:
          this.state.har3southdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har3southdripmls),
        har3southdripec:
          this.state.har3southdripec.length === 0
            ? '0'
            : this.state.har3southdripec,
        har3southdrainph:
          this.state.har3southdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har3southdrainph),
        har3southdrainmls:
          this.state.har3southdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har3southdrainmls),
        har3southdrainec:
          this.state.har3southdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har3southdrainec),
        har3northdripph:
          this.state.har3northdripph.length === 0
            ? '0'
            : parseFloat(this.state.har3northdripph),
        har3northdripmls:
          this.state.har3northdripmls.length === 0
            ? '0'
            : parseFloat(this.state.har3northdripmls),
        har3northdripec:
          this.state.har3northdripec.length === 0
            ? '0'
            : parseFloat(this.state.har3northdripec),
        har3northdrainph:
          this.state.har3northdrainph.length === 0
            ? '0'
            : parseFloat(this.state.har3northdrainph),
        har3northdrainmls:
          this.state.har3northdrainmls.length === 0
            ? '0'
            : parseFloat(this.state.har3northdrainmls),
        har3northdrainec:
          this.state.har3northdrainec.length === 0
            ? '0'
            : parseFloat(this.state.har3northdrainec),
      };

      //CLEAR ASYNC
      AsyncStorage.clear();
      AsyncStorage.removeItem('bore1hours');
      AsyncStorage.removeItem('bore1m3');
      AsyncStorage.removeItem('bore2hours');
      AsyncStorage.removeItem('bore2m3');
      AsyncStorage.removeItem('currentDate');
      AsyncStorage.removeItem('dateyesterday');
      AsyncStorage.removeItem('har1northdripec');
      AsyncStorage.removeItem('har1northdrainph');
      AsyncStorage.removeItem('har1northdrainmls');
      AsyncStorage.removeItem('har1northdrainec');
      AsyncStorage.removeItem('gas');
      AsyncStorage.removeItem('electricityfrontbore');
      AsyncStorage.removeItem('electricityfront');
      AsyncStorage.removeItem('electricityback');
      AsyncStorage.removeItem('draindischarge');
      AsyncStorage.removeItem('dayyesterday');
      AsyncStorage.removeItem('har1northdripmls');
      AsyncStorage.removeItem('har1northdripph');
      AsyncStorage.removeItem('har1southdrainec');
      AsyncStorage.removeItem('har1southdrainmls');
      AsyncStorage.removeItem('har1southdrainph');
      AsyncStorage.removeItem('har1southdripec');
      AsyncStorage.removeItem('har1southdripmls');
      AsyncStorage.removeItem('har1southdripph');
      AsyncStorage.removeItem('har2northdrainec');
      AsyncStorage.removeItem('har2northdrainmls');
      AsyncStorage.removeItem('har2northdrainph');
      AsyncStorage.removeItem('har2northdripec');
      AsyncStorage.removeItem('har2northdripmls');
      AsyncStorage.removeItem('har2northdripph');
      AsyncStorage.removeItem('har2southdrainec');
      AsyncStorage.removeItem('har2southdrainmls');
      AsyncStorage.removeItem('har2southdrainph');
      AsyncStorage.removeItem('har2southdripec');
      AsyncStorage.removeItem('har2southdripmls');
      AsyncStorage.removeItem('har2southdripph');
      AsyncStorage.removeItem('har6southdripph');
      AsyncStorage.removeItem('har6southdripmls');
      AsyncStorage.removeItem('har6southdripec');
      AsyncStorage.removeItem('har6southdrainph');
      AsyncStorage.removeItem('har6southdrainmls');
      AsyncStorage.removeItem('har6southdrainec');
      AsyncStorage.removeItem('har6northdripph');
      AsyncStorage.removeItem('har6northdripmls');
      AsyncStorage.removeItem('har6northdripec');
      AsyncStorage.removeItem('har6northdrainph');
      AsyncStorage.removeItem('har6northdrainmls');
      AsyncStorage.removeItem('har6northdrainec');
      AsyncStorage.removeItem('har5southdripph');
      AsyncStorage.removeItem('har5southdripmls');
      AsyncStorage.removeItem('har5southdripec');
      AsyncStorage.removeItem('har5southdrainph');
      AsyncStorage.removeItem('har5southdrainmls');
      AsyncStorage.removeItem('har5southdrainec');
      AsyncStorage.removeItem('har5northdripph');
      AsyncStorage.removeItem('har5northdripmls');
      AsyncStorage.removeItem('har5northdripec');
      AsyncStorage.removeItem('har5northdrainph');
      AsyncStorage.removeItem('har5northdrainmls');
      AsyncStorage.removeItem('har5northdrainec');
      AsyncStorage.removeItem('har4southdripph');
      AsyncStorage.removeItem('har4southdripmls');
      AsyncStorage.removeItem('har4southdripec');
      AsyncStorage.removeItem('har4southdrainph');
      AsyncStorage.removeItem('har4southdrainmls');
      AsyncStorage.removeItem('har4southdrainec');
      AsyncStorage.removeItem('har4northdripph');
      AsyncStorage.removeItem('har4northdripmls');
      AsyncStorage.removeItem('har4northdripec');
      AsyncStorage.removeItem('har4northdrainph');
      AsyncStorage.removeItem('har4northdrainmls');
      AsyncStorage.removeItem('har4northdrainec');
      AsyncStorage.removeItem('har3southdripph');
      AsyncStorage.removeItem('har3southdripmls');
      AsyncStorage.removeItem('har3southdripec');
      AsyncStorage.removeItem('har3southdrainph');
      AsyncStorage.removeItem('har3southdrainmls');
      AsyncStorage.removeItem('har3southdrainec');
      AsyncStorage.removeItem('har3northdripph');
      AsyncStorage.removeItem('har3northdripmls');
      AsyncStorage.removeItem('har3northdripec');
      AsyncStorage.removeItem('har3northdrainph');
      AsyncStorage.removeItem('har3northdrainmls');
      AsyncStorage.removeItem('har3northdrainec');

      //END

      //CLEAR STATE
      this.setState({
        bore1hours: '',
        bore1m3: '',
        bore2hours: '',
        bore2m3: '',
        currentdate: '',
        dateyesterday: '',
        har1northdripec: '',
        har1northdrainph: '',
        har1northdrainmls: '',
        har1northdrainec: '',
        gas: '',
        electricityfrontbore: '',
        electricityfront: '',
        electricityback: '',
        draindischarge: '',
        dayyesterday: '',
        har1northdripmls: '',
        har1northdripph: '',
        har1southdrainec: '',
        har1southdrainmls: '',
        har1southdrainph: '',
        har1southdripec: '',
        har1southdripmls: '',
        har1southdripph: '',
        har2northdrainec: '',
        har2northdrainmls: '',
        har2northdrainph: '',
        har2northdripec: '',
        har2northdripmls: '',
        har2northdripph: '',
        har2southdrainec: '',
        har2southdrainmls: '',
        har2southdrainph: '',
        har2southdripec: '',
        har2southdripmls: '',
        har2southdripph: '',
        har6southdripph: '',
        har6southdripmls: '',
        har6southdripec: '',
        har6southdrainph: '',
        har6southdrainmls: '',
        har6southdrainec: '',
        har6northdripph: '',
        har6northdripmls: '',
        har6northdripec: '',
        har6northdrainph: '',
        har6northdrainmls: '',
        har6northdrainec: '',
        har5southdripph: '',
        har5southdripmls: '',
        har5southdripec: '',
        har5southdrainph: '',
        har5southdrainmls: '',
        har5southdrainec: '',
        har5northdripph: '',
        har5northdripmls: '',
        har5northdripec: '',
        har5northdrainph: '',
        har5northdrainmls: '',
        har5northdrainec: '',
        har4southdripph: '',
        har4southdripmls: '',
        har4southdripec: '',
        har4southdrainph: '',
        har4southdrainmls: '',
        har4southdrainec: '',
        har4northdripph: '',
        har4northdripmls: '',
        har4northdripec: '',
        har4northdrainph: '',
        har4northdrainmls: '',
        har4northdrainec: '',
        har3southdripph: '',
        har3southdripmls: '',
        har3southdripec: '',
        har3southdrainph: '',
        har3southdrainmls: '',
        har3southdrainec: '',
        har3northdripph: '',
        har3northdripmls: '',
        har3northdripec: '',
        har3northdrainph: '',
        har3northdrainmls: '',
        har3northdrainec: '',
      });

      //

      this.props.navigation.navigate('SendDataToAws', {
        data: sendData,
      });
    } else {
      Alert.alert(
        //title
        'No Internet Connection',
        //body
        'Please connect to internet before sending data to the server',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }

    //END
  };
  //

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <Text style={styles.btnText}>Loading Please Wait...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.formContainer}
          ref={ref => {
            this.scrollView = ref;
          }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.marginDimension}></View>

          <View style={styles.marginDimension}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Yesterday's Date</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].dateyesterday}
              </Text>
            ) : null}
          </View>

          {this.state.dateyesterday == '' ? null : (
            <Text
              style={styles.titleHeadingChangeText}
              onPress={() => this.setState({visibility: true})}>
              Change Date
            </Text>
          )}

          <DateTimePickerModal
            isVisible={this.state.visibility}
            onConfirm={this.handleConfirm}
            onCancel={this.onPressCancel}
            mode="date"
            is24Hour={false}
          />

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={this.onPressButton}
              onPress={this.onPressButton}
              showSoftInputOnFocus={false}
              value={this.state.dateyesterday}
              onFocus={this.onPressButton}
              onSubmitEditing={() => {
                this.refsamp.focus();
              }}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Yesterday's Day</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].dayyesterday}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              showSoftInputOnFocus={false}
              onChangeText={this.onPressButton}
              value={this.state.dayyesterday}
              onSubmitEditing={() => {
                this.refsamp.focus();
              }}
              disabled={true}
              selectTextOnFocus={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <Text style={styles.headerText}>Compartment Readings</Text>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              onPress={this.h1ChangeLayout}
              activeOpacity={0.6}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 1</Text>

                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={this.state.expandedH1 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH1 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drip (mls)
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdripmls')
                  }
                  value={this.state.har1southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdripph')
                  }
                  value={this.state.har1southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>
              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdripec')
                  }
                  value={this.state.har1southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdrainmls')
                  }
                  value={this.state.har1southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdrainec')
                  }
                  value={this.state.har1southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 South - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1southdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1southdrainph')
                  }
                  value={this.state.har1southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdripmls')
                  }
                  value={this.state.har1northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdripph')
                  }
                  value={this.state.har1northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdripec')
                  }
                  value={this.state.har1northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdrainmls')
                  }
                  value={this.state.har1northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdrainec')
                  }
                  value={this.state.har1northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har1northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 1 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har1northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har1northdrainph')
                  }
                  value={this.state.har1northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har1northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.h2ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 2</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={this.state.expandedH2 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH2 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdripmls')
                  }
                  value={this.state.har2southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drip pH
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdripph')
                  }
                  value={this.state.har2southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drip Ec
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdripec')
                  }
                  value={this.state.har2southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drain (mls)
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdrainmls')
                  }
                  value={this.state.har2southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drain Ec
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdrainec')
                  }
                  value={this.state.har2southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 South - Drain pH
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2southdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2southdrainph')
                  }
                  value={this.state.har2southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drip (mls)
                </Text>

                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdripmls')
                  }
                  value={this.state.har2northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdripph')
                  }
                  value={this.state.har2northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdripec')
                  }
                  value={this.state.har2northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdrainmls')
                  }
                  value={this.state.har2northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdrainec')
                  }
                  value={this.state.har2northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har2northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 2 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har2northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har2northdrainph')
                  }
                  value={this.state.har2northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har2northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.h3ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 3</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={this.state.expandedH3 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH3 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdripmls')
                  }
                  value={this.state.har3southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdripph')
                  }
                  value={this.state.har3southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdripec')
                  }
                  value={this.state.har3southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdrainmls')
                  }
                  value={this.state.har3southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdrainec')
                  }
                  value={this.state.har3southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 South - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3southdrainph}
                  </Text>
                ) : null}
              </View>
              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3southdrainph')
                  }
                  value={this.state.har3southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdripmls')
                  }
                  value={this.state.har3northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdripph')
                  }
                  value={this.state.har3northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdripec')
                  }
                  value={this.state.har3northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdrainmls')
                  }
                  value={this.state.har3northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdrainec')
                  }
                  value={this.state.har3northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har3northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 3 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har3northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har3northdrainph')
                  }
                  value={this.state.har3northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har3northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.h4ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 4</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={this.state.expandedH4 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH4 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdripmls')
                  }
                  value={this.state.har4southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdripph')
                  }
                  value={this.state.har4southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdripec')
                  }
                  value={this.state.har4southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdrainmls')
                  }
                  value={this.state.har4southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdrainec')
                  }
                  value={this.state.har4southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 South - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4southdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4southdrainph')
                  }
                  value={this.state.har4southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdripmls')
                  }
                  value={this.state.har4northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdripph')
                  }
                  value={this.state.har4northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdripec')
                  }
                  value={this.state.har4northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdrainmls')
                  }
                  value={this.state.har4northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdrainec')
                  }
                  value={this.state.har4northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har4northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 4 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har4northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har4northdrainph')
                  }
                  value={this.state.har4northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har4northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.h5ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 5</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={this.state.expandedH5 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH5 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdripmls')
                  }
                  value={this.state.har5southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdripph')
                  }
                  value={this.state.har5southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdripec')
                  }
                  value={this.state.har5southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdrainmls')
                  }
                  value={this.state.har5southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdrainec')
                  }
                  value={this.state.har5southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 South - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5southdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5southdrainph')
                  }
                  value={this.state.har5southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdripmls')
                  }
                  value={this.state.har5northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdripph')
                  }
                  value={this.state.har5northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdripec')
                  }
                  value={this.state.har5northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdrainmls')
                  }
                  value={this.state.har5northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdrainec')
                  }
                  value={this.state.har5northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har5northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 5 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har5northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har5northdrainph')
                  }
                  value={this.state.har5northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har5northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.h6ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>HAR 6</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 6,
                  }}
                  source={this.state.expandedH6 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expandedH6 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdripmls')
                  }
                  value={this.state.har6southdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6southdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdripph')
                  }
                  value={this.state.har6southdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6southdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdripec')
                  }
                  value={this.state.har6southdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6southdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdrainmls')
                  }
                  value={this.state.har6southdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6southdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdrainec')
                  }
                  value={this.state.har6southdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6southdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 South - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6southdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6southdrainph')
                  }
                  value={this.state.har6southdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6southdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdripmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drip (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdripmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdripmls')
                  }
                  value={this.state.har6northdripmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdripmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdripph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drip pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdripph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdripph')
                  }
                  value={this.state.har6northdripph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdripph = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdripec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drip Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdripec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdripec')
                  }
                  value={this.state.har6northdripec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdripec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdrainmls.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drain (mls)
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdrainmls}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdrainmls')
                  }
                  value={this.state.har6northdrainmls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdrainmls = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdrainec.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drain Ec
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdrainec}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdrainec')
                  }
                  value={this.state.har6northdrainec}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdrainec = input;
                  }}
                  onSubmitEditing={() => {
                    this.har6northdrainph.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>
                  HAR 6 North - Drain pH
                </Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].har6northdrainph}
                  </Text>
                ) : null}
              </View>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'har6northdrainph')
                  }
                  value={this.state.har6northdrainph}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={input => {
                    this.har6northdrainph = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <Text style={styles.headerText}>Bore Readings</Text>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Gas (m3)</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].gas}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.updateTextInput(text, 'gas')}
              value={this.state.gas}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={input => {
                this.gas = input;
              }}
              onSubmitEditing={() => {
                this.bore1hours.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Bore 1 (Hours)</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].bore1hours}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.updateTextInput(text, 'bore1hours')}
              value={this.state.bore1hours}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={input => {
                this.bore1hours = input;
              }}
              onSubmitEditing={() => {
                this.bore1m3.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Bore 1 (m3)</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].bore1m3}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.updateTextInput(text, 'bore1m3')}
              value={this.state.bore1m3}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={input => {
                this.bore1m3 = input;
              }}
              onSubmitEditing={() => {
                this.bore2hours.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Bore 2 (Hours)</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].bore2hours}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.updateTextInput(text, 'bore2hours')}
              value={this.state.bore2hours}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={input => {
                this.bore2hours = input;
              }}
              onSubmitEditing={() => {
                this.bore2m3.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Bore 2 (m3)</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].bore2m3}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.updateTextInput(text, 'bore2m3')}
              value={this.state.bore2m3}
              editable={true}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              ref={input => {
                this.bore2m3 = input;
              }}
              onSubmitEditing={() => {
                this.draindischarge.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Drain Discharge</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].draindischarge}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text =>
                this.updateTextInput(text, 'draindischarge')
              }
              value={this.state.draindischarge}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={input => {
                this.draindischarge = input;
              }}
              onSubmitEditing={() => {
                this.electricityfront.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Electricity - Front</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].electricityfront}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text =>
                this.updateTextInput(text, 'electricityfront')
              }
              value={this.state.electricityfront}
              editable={true}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              ref={input => {
                this.electricityfront = input;
              }}
              onSubmitEditing={() => {
                this.electricityfrontbore.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>
              Electricity - Front Bore
            </Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].electricityfrontbore}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text =>
                this.updateTextInput(text, 'electricityfrontbore')
              }
              value={this.state.electricityfrontbore}
              editable={true}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              ref={input => {
                this.electricityfrontbore = input;
              }}
              onSubmitEditing={() => {
                this.electricityback.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Electricity - Back</Text>
            {this.state.filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {this.state.filteredSampleData[0].electricityback}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text =>
                this.updateTextInput(text, 'electricityback')
              }
              value={this.state.electricityback}
              editable={true}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              ref={input => {
                this.electricityback = input;
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.sendData()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnText: {
    color: '#ffffff',
    fontSize: 21,
    fontStyle: 'italic',
  },
  btnText2: {
    color: '#000000',
    marginRight: 5,
  },

  alignTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  marginDimension: {
    marginTop: 5,
  },

  marginDimensionTop: {
    marginTop: 22,
  },
  Btn: {
    padding: 12,
    marginRight: 16,
    backgroundColor: '#2C903D',
    borderRadius: 5,
    elevation: 0.5,
  },

  borderEdit: {
    marginTop: 8,
    marginRight: 16,
  },
  formContainer: {
    //backgroundColor: 'rgba(192,192,192,0.55)',
    //borderRadius: 5,
    padding: 5,
    margin: 10,
    height: '100%',
    width: '100%',
  },

  titleHeadingText: {
    color: '#2C903D',
    fontSize: 18,
    fontWeight: 'bold',
  },

  titleHeadingChangeText: {
    color: '#FF6302',
    fontSize: 15,
    marginTop: 5,
  },

  titleHeadingTextRed: {
    color: '#ff0000',
    fontSize: 16,
  },

  buttonContainer1: {
    //backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    backgroundColor: '#2C903D',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',
  },

  buttonText: {
    fontSize: 23,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textInputStyle: {
    fontSize: 15,
    marginRight: 10,
    marginBottom: 1,
    height: 50,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 8,
    paddingLeft: 12,
  },

  viewBack: {
    flex: 1,
    backgroundColor: '#9FA8DA', // Set your own custom Color
  },

  row: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 25,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
