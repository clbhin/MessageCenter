import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView,
  TextInput,
  Picker,
  DrawerLayoutAndroid,
  RefreshControl,
  ScrollView
} from 'react-native';
import DrawerView from './../drawer/DrawerView';
import MessageView from './../../components/Message';
import { GetMessages } from './../../services/messageCenterServices';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Entypo';

class DraftView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const data = [];
    this.state = {
      dataSource: ds.cloneWithRows(data),
      criteria: '',
      userId: '',
      type: 'Draft',
      startIndex: 0,
      pageSize: 10,
    };
    this.ds = ds;
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.transformMessage = this.transformMessage.bind(this);
  }
  static displayName = 'DraftView';

  static navigationOptions = {
    header: {
      style: { height: 0 }
    }
  }

  static propTypes = {
  };

  transformMessage = (currentMessage) => {
    this.props.DraftStateActions.readMessage(currentMessage.UserMessage);
    this.props.navigate({ routeName: 'CreateMessageStack', params: currentMessage });
  };

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.value !== this.props.value && nextProps.value) {
        this.setState({
          dataSource: this.ds.cloneWithRows(nextProps.value),
          userId: nextProps.userId,
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentWillMount() {
    this.props.DraftStateActions.getMessages(this.props.userInfo.Id, 'Draft');
  }

  closeDrawer() {
    this.refs['DRAWER'].closeDrawer();
  }

  openDrawer() {
    this.refs['DRAWER'].openDrawer();
  }

  deleteMessage(data) {
    this.props.DraftStateActions.deleteMessage(data.UserMessage);
  }

  searchMessage() {
    let messageSearchCriteria = {};
    messageSearchCriteria.SearchText = this.state.criteria;
    messageSearchCriteria.Type = this.state.type;
    messageSearchCriteria.UserId = this.state.userId;
    messageSearchCriteria.PageSize = this.state.pageSize;
    messageSearchCriteria.Start = this.state.startIndex;
    if (messageSearchCriteria.SearchText == '') {
      this.props.DraftStateActions.getMessages(this.props.userInfo.Id, 'Draft');
    } else {
      this.props.DraftStateActions.searchMessage(messageSearchCriteria);
    }
  }

  loadMore() {
    let messageLoadMore = {};
    messageLoadMore.UserId = this.props.userInfo.Id;
    messageLoadMore.Type = this.state.type;
    messageLoadMore.Start = 0 || (this.props.value && this.props.value.length);
    messageLoadMore.PageSize = this.state.pageSize;
    messageLoadMore.SearchText = this.state.criteria;
    this.props.DraftStateActions.loadMoreMessages(messageLoadMore);
  }

  createMessage() {
    let data = {};
    this.props.navigate({ routeName: 'CreateMessageStack', params: data });
  }

  markMessage(currentMessage){
    this.props.DraftStateActions.markMessage(currentMessage.UserMessage);
  }

  reloadData(){
    this.props.DraftStateActions.getMessages(this.props.userInfo.Id, 'Draft');
  }  

  render() {
    let navigationView = (
      <DrawerView closeDrawer={this.closeDrawer} navigation={this.props.navigation} navigate={this.props.navigate} />
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER'}
      >
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <TouchableOpacity onPress={() => { this.openDrawer() }}>
            <Image style={{ width: 30, height: 40 }} source={require('./../../../images/headbar.png')}></Image>
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 20, alignItems: 'flex-start', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'black' }}>Draft</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 7, width: 30 }} onPress={() => { this.createMessage() }}>
              <Icon name='plus' size={20} color={'#33373D'}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#ccc', height: 24, borderRadius: 12, marginLeft: 10, marginRight: 10, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <TextInput placeholder='Search' style={{ flex: 10, padding: 0, paddingLeft: 10, color: 'black' }} underlineColorAndroid="transparent" value={this.state.criteria}
              onChangeText={(criteria) => this.setState({ criteria })} />
            <TouchableOpacity onPress={() => { this.searchMessage() }}>
              <Icon name='magnifying-glass' size={24}></Icon>
            </TouchableOpacity>
          </View>

        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => { this.reloadData() }}
            />}>
          <SwipeListView style={{ paddingTop: 10, flex: 1 }}
            dataSource={this.state.dataSource}
            renderRow={(rowData, secId, rowId, rowMap) =>
              <MessageView messageData={rowData} secId={secId} rowId={rowId} rowMap={rowMap} transformMessage={this.transformMessage} />
            }
            renderHiddenRow={
              (rowData, secId, rowId, rowMap) => (
                <View style={styles.rowBack}>
                  <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <TouchableOpacity onPress={() => { this.markMessage(rowData); rowMap[`${secId}${rowId}`].closeRow() }}>
                      <Icon name='star' size={20} color={'#33373D'} />
                      <Text style={styles.backRightBtnRightMark}>Mark</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <TouchableOpacity onPress={() => { this.deleteMessage(rowData); rowMap[`${secId}${rowId}`].closeRow() }}>
                      <Icon name='trash' size={20} color={'#EE3B3B'} />
                      <Text style={styles.backRightBtnRightDelete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
            rightOpenValue={-150}
            disableRightSwipe
            enableEmptySections={true}
            closeOnRowPress={true}
            closeOnScroll={true}
          />
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.loadMore()}>
            {this.props.loadMore ? <Text>click more </Text> : <Text>No More Message </Text>}
          </TouchableOpacity>
        </ScrollView>
      </DrawerLayoutAndroid>

    );
  }
}

const circle = {
  borderWidth: 0,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: '#F5F5F5',
    right: 0
  },
  backRightBtnLeft: {
    backgroundColor: '#F5F5F5',
    right: 75
  },
  backTextWhite: {
    color: '#FFF'
  },
  loadMessage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backRightBtnRightDelete: {
    color: '#EE3B3B',
    marginTop: 5,
    fontSize: 12
  },
  backRightBtnRightMark: {
    marginTop: 5,
    fontSize: 12,
    color: '#33373D'
  }
});

export default DraftView;
