import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ListView,
  Image,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';
import lodash from 'lodash';
import styles from './../../styles/RecipientView';

class RecipientView extends Component {
  static displayName = 'RecipientView';
  constructor(props) {
    super(props);
    const data =[];
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
      recipients: [],
      criteria:'',
    };
    this.ds=ds;
  }
  static navigationOptions = {
    header: {
      style: {
        height: 0
      }
    }
  }
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  selectRecipient = (rowData) => {
    rowData.checked = !rowData.checked;
  }

  addRecipients = () => {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].checked) {
        this.state.recipients.push(this.data[i])
      }
    }
    this.props.RecipientStateActions.addRecipients(this.state.recipients);
    this.props.navigation.goBack(null);
  }

  searchUsers=()=>{
    this.props.RecipientStateActions.searchUsers({
        Start: 0,
        PageSize: 10,
        StaffName: this.state.criteria
    })
  }

  componentWillMount() {
    if(lodash.isEmpty(this.props.navigation.state.params)){this.data = [];}
    else if(this.props.navigation.state.params[0]===undefined){this.data = [];}
    else if(this.props.navigation.state.params[0].Id === ''){this.data = [];}
    else{
      this.data = this.props.navigation.state.params;
      this.data.map((item,i)=>{this.data[i].checked = true})
    }
    this.setState({
          dataSource: this.ds.cloneWithRows(this.data),
        });
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (this.props.userInfos !==  nextProps.userInfos) {
        let dataCopy = []; 
        let userChecked = []; 
        if(!lodash.isEmpty(this.data)){
          this.data.map((item,i)=>{if(item.checked){userChecked.push(item)}})
        }
        this.data=(!lodash.isEmpty(this.data))? userChecked.concat(nextProps.userInfos) : nextProps.userInfos;     
        dataCopy = lodash.uniqBy(this.data,'Id')
        this.setState({
          dataSource: this.ds.cloneWithRows(dataCopy),
        }); 
      }     
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <View style={styles.RecipientView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='cross' size={30}></Icon>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>Add Recipients</Text>
          <TouchableOpacity onPress={() => this.addRecipients()}>
            <Icon name='check' size={30}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <TextInput placeholder='Search' style={styles.searchTextInput}  underlineColorAndroid="transparent" value={this.state.criteria}
              onChangeText={(criteria) => this.setState({ criteria })} />
            <TouchableOpacity onPress={() => { this.searchUsers() }}>
              <Icon name='magnifying-glass' size={24}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <ListView style={{ paddingTop: 10 }}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(rowData) =>{
            return <View style={styles.recipientData}>
              <Image style={styles.image} source={require('../../../images/headportrait.png')}></Image>
              <Text style={styles.recipientName}>{rowData.PersonName}</Text>
              <CheckBox style={styles.selectRecipient} onClick={() => this.selectRecipient(rowData)} isChecked={rowData.checked} />
            </View>;
          }
          } />
      </View>
    );
  }
}


export default RecipientView;
