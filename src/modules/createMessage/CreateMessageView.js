import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { getNames } from '../../services/mcServices'
/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class CreateMessageView extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      background: 'red',
      currentMessage: this.props.navigation.state.params,
      Bcc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc,
      Cc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc,
      From: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From,
      Subject: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Subject,
      MessageBody: '',
      To: [this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From],
      ToNames: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From.PersonName,
      BccNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc),
      CcNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc),
      profileDataSource: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.AttachedProfiles &&
        this.props.navigation.state.params.Message.AttachedProfiles.length > 0 ?
        ds.cloneWithRows(this.props.navigation.state.params.Message.AttachedProfiles)
        : ds.cloneWithRows([])
    };
    this.data = [];
    this.ds = ds;
  }
  static displayName = 'MessageDetailView';

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

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.contactData !== this.props.contactData) {
        switch (nextProps.boxType) {
          case 'ToNames':
            this.setState({
              To: nextProps.contactData,
              ToNames: getNames(nextProps.contactData)
            })
            break;
          case 'CcNames':
            this.setState({
              Cc: nextProps.contactData,
              CcNames: getNames(nextProps.contactData)
            })
            break;
          case 'BccNames':
            this.setState({
              Bcc: nextProps.contactData,
              BccNames: getNames(nextProps.contactData)
            })
            break;
          default:
            return
        }
      }
      if (nextProps.selectedProfiles != this.props.selectedProfiles) {
        if (nextProps.selectedProfiles.length > 0) {
          this.data[0] = nextProps.selectedProfiles[0];
          this.setState({
            profileDataSource: this.ds.cloneWithRows(this.data),
          });
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  send() {
    let formData = new FormData();
    let message = {}
    message.Bcc = this.state.Bcc;
    message.Cc = this.state.Cc;
    message.To = this.state.To;
    message.Subject = this.state.Subject;
    message.MessageBody = this.state.MessageBody;
    message.From = { PersonName: 'Xiang Zhang', Id: 'Xiang Zhang' };
    formData.append('message', JSON.stringify(message))

    fetch('http://172.16.40.117/MessageCenter/MessageCenter.IISHost.Messages/api/Messages/SendMessage', {
      method: "POST",
      headers: {},
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        Alert.alert('Message success send')
      })
      .catch(function (error) {
        console.log('request failed: ', error)
      })
    this.props.InboxStateActions.getMessages('Xiang Zhang', 'Inbox');
    this.props.navigation.goBack(null);

  }

  selectName(nameType) {
    this.props.CreateMessageStateActions.selectNames(nameType);
    this.props.navigate({ routeName: 'ContactStack' });
  }

  addProfile() {
    this.props.navigate({ routeName: 'AddProfileStack' });
  }

  removeProfile(profile) {
    var indexOfItem = this.data.findIndex((item) => item.Id === profile.Id);
    this.data.splice(indexOfItem, 1);
    this.setState({
      profileDataSource: this.ds.cloneWithRows(this.data),
    });
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', height: 40, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center', backgroundColor: '#39babd' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ flex: 1 }}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={{ flex: 5, textAlign: 'center' }}>reply</Text>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.send()}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>To:</Text>
            <TextInput value={this.state.ToNames} onChangeText={(PersonName) => {
              this.setState({
                'To': {
                  'PersonName': PersonName,
                  'Id': PersonName
                }
              })
            }}
              style={{ flex: 1 }}>
            </TextInput>
            <TouchableOpacity onPress={() => this.selectName('ToNames')}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Cc:</Text>
            <TextInput value={this.state.CcNames} onChangeText={(text) => {
              this.setState({
                'Cc': {
                  'PersonName': text,
                  'Id': text
                }
              })
            }}
              style={{ flex: 1 }}>
            </TextInput>
            <TouchableOpacity onPress={() => this.selectName('CcNames')} >
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Bcc:</Text>
            <TextInput value={this.state.BccNames} style={{ flex: 1 }}></TextInput>
            <TouchableOpacity onPress={() => this.selectName('BccNames')}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Subject:</Text>
            <TextInput value={this.state.Subject} onChangeText={(Subject) => { this.setState({ Subject }) }} style={{ flex: 1 }}></TextInput>
          </View>
          <View>
            {this.state.profileDataSource.getRowCount > 0 ? null
              : <Button
                onPress={() => this.addProfile()}
                title="Add Profile"
                color="#841584"
                accessibilityLabel="Add Profile"
              />
            }
          </View>
          <TextInput style={{ borderColor: 'gray', minHeight: 230, borderWidth: 1 }} onChangeText={(text) => this.setState({ 'MessageBody': text })} value={this.state.MessageBody} multiline={true} />
          <View>
            <ListView style={{ paddingTop: 10 }}
              dataSource={this.state.profileDataSource}
              renderRow={(rowData) =>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }}>
                  <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.FirstName}</Text>
                  <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.LastName}</Text>
                  <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Id}</Text>
                  <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Ssn}</Text>
                  <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Medicaid}</Text>
                  <Button onPress={() => this.removeProfile(rowData)} accessibilityLabel='Remove' title='Remove'></Button>
                </TouchableOpacity>
              } 
              enableEmptySections={true}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CreateMessageView;
