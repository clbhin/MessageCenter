import React, {PropTypes, Component} from 'react';
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


class ContactView extends Component {
  static displayName = 'ContactView';
  constructor(props) {
    super(props);
    const data=[{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},{Id:'Yanliang Sun',PersonName:'Yanliang Sun'},{ "Id": "Willian Simth", "PersonName": "Willian Simth" },{ "Id": "Simon Simth", "PersonName": "Simon Simth" }];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data),
      contactData:[]
    };
    this.data=data;
  } 
  static navigationOptions = {
    header: {
      style: {
        height:0
      }
    }
  }
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

selectContact=(rowData) =>{
  rowData.checked = !rowData.checked;
}

addContactName=() =>{
  for(var i=0;i<this.data.length;i++){
    if(this.data[i].checked){
      this.state.contactData.push(this.data[i])
    }
  }
  this.props.ContactStateActions.addContactName(this.state.contactData);
  this.props.navigation.goBack(null);
}

  render() {
    console.log(this);
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1, borderBottomColor:'#ccc',marginTop:10,paddingBottom:4}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='cross' size={30}></Icon>
          </TouchableOpacity>
          <Text style={{fontSize:18,textAlign:'center'}}>Contacts</Text>
          <TouchableOpacity onPress={()=>this.addContactName()}>
            <Icon name='check' size={30}></Icon>
          </TouchableOpacity>
        </View>
        <TextInput placeholder='serch contact' style={{height:30,borderRadius:15,marginLeft:10,marginTop:10,marginRight:10,backgroundColor:'#ccc',fontSize:14,padding:0}} underlineColorAndroid="transparent"></TextInput>
        <ListView style={{paddingTop:10}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
          <TouchableOpacity style={{flexDirection:'row',marginLeft:10}}>
            <Image style={{width: 40,height: 40,borderRadius: 20}}source={require('../../../images/headportrait.png')}></Image>
            <Text style={{flex:2,marginLeft:10,marginTop:1,alignSelf:'center',textAlign:'center'}}>{rowData.PersonName}</Text>
            <CheckBox style={{flex:1,padding: 0,alignSelf:'center'}} onClick={()=>this.selectContact(rowData)} isChecked={rowData.checked}  />
          </TouchableOpacity>
        }/>
      </View>
    );
  }
}


export default ContactView;
