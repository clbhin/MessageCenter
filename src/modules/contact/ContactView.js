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

const color = () => Math.floor(255 * Math.random());

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class ContactView extends Component {
  static displayName = 'ContactView';
  constructor(props) {
    super(props);
    const contactData=[{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},{Id:'Yanliang Sun',PersonName:'Yanliang Sun'}];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(contactData)
    };
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

selectContact=() =>{

}


  render() {
    const data={};
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1, borderBottomColor:'#ccc',marginTop:10,paddingBottom:4}}>
          <TouchableOpacity>
            <Icon name='cross' size={30}></Icon>
          </TouchableOpacity>
          <Text style={{fontSize:18,textAlign:'center'}}>Contacts</Text>
          <TouchableOpacity>
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
           <CheckBox style={{flex:1,padding: 0,alignSelf:'center'}} onClick={()=>this.selectContact(data)} isChecked={true}  />
        </TouchableOpacity>
        }/>
      </View>
    );
  }
}


export default ContactView;
