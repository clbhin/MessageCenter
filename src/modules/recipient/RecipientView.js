import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ListView,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';


class RecipientView extends Component {
  static displayName = 'RecipientView';
  constructor(props) {
    super(props);
    const data =[];
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data),
      recipients: [],
      criteria:''
    };
    this.data = data;
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

  componentWillReceiveProps(nextProps) {
    try {
      if (this.props.userInfos !==  nextProps.userInfos) {
        this.data=nextProps.userInfos;
        this.setState({
          dataSource: this.ds.cloneWithRows(this.data),
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, paddingBottom: 4 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='cross' size={30}></Icon>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>Add Recipients</Text>
          <TouchableOpacity onPress={() => this.addRecipients()}>
            <Icon name='check' size={30}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#ccc', height: 24, borderRadius: 12, marginLeft: 10, marginRight: 10, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <TextInput placeholder='Search' style={{ flex: 10, padding: 0, paddingLeft: 10, color: 'black' }} underlineColorAndroid="transparent" value={this.state.criteria}
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
            return <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../../../images/headportrait.png')}></Image>
              <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.PersonName}</Text>
              <CheckBox style={{ flex: 1, padding: 0, alignSelf: 'center' }} onClick={() => this.selectRecipient(rowData)} isChecked={rowData.checked} />
            </TouchableOpacity>;
          }
          } />
      </View>
    );
  }
}


export default RecipientView;
