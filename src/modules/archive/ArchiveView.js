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
import {combineCriteria} from '../../services/mcServices';
import FilterFooterView from '../../components/FilterFooter';
import styles from './../../styles/ArchiveView';
class ArchiveView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const data = [
    ]
    this.state = {
      dataSource: ds.cloneWithRows(data),
      criteria: '',
      userId: '',
      type: 'Archive',
      startIndex: 0,
      pageSize: 10,
      isread : '',
      mark : '',
      filterType:'All'
    };
    this.ds = ds;
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.transformMessage = this.transformMessage.bind(this);
  }
  static displayName = 'SentView';

  static navigationOptions = {
    header: {
      style: { height: 0 }
    }
  }

  static propTypes = {
  };

  transformMessage = (currentMessage) => {
    let messageSearchCriteria = combineCriteria(this);
    this.props.navigate({ routeName: 'MessageDetailStack', params: {currentMessage,messageSearchCriteria}});
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
    this.props.ArchiveStateActions.getMessages(this.props.userInfo.Id, 'Archive');
  }

  closeDrawer() {
    this.refs['DRAWER'].closeDrawer();
  }

  openDrawer() {
    this.refs['DRAWER'].openDrawer();
  }

  deleteMessage(data) {
    let messageSearchCriteria = combineCriteria(this);
    this.props.ArchiveStateActions.deleteMessage(data.UserMessage,messageSearchCriteria);
  }

  searchMessage() {
    let messageSearchCriteria = combineCriteria(this);
    this.props.ArchiveStateActions.searchMessage(messageSearchCriteria);
  }

  loadMore() {
    let messageLoadMore = {};
    messageLoadMore.UserId = this.props.userInfo.Id;
    messageLoadMore.Type = this.state.type;
    messageLoadMore.Start = 0 || (this.props.value && this.props.value.length);
    messageLoadMore.PageSize = this.state.pageSize;
    messageLoadMore.SearchText = this.state.criteria;
    messageLoadMore.Mark=this.state.mark;
    messageLoadMore.IsRead=this.state.isread;
    this.props.ArchiveStateActions.loadMoreMessages(messageLoadMore);
  }

  createMessage() {
    let messageSearchCriteria = combineCriteria(this);
    let currentMessage = {};
    this.props.navigate({ routeName: 'CreateMessageStack', params: {currentMessage,messageSearchCriteria} });
  }

  markMessage(currentMessage){
    let messageSearchCriteria = combineCriteria(this);
    this.props.ArchiveStateActions.markMessage(currentMessage.UserMessage,messageSearchCriteria);
  }

  reloadData(){
    this.props.ArchiveStateActions.getMessages(this.props.userInfo.Id,'Archive');
  }

  searchMessageByCriteriaAndFilterType(filterType){
    this.state.filterType=filterType;
    switch (filterType) {
      case "All":
          this.state.isread = '';
          this.state.mark = '';
          break;
      case "IsRead":
          this.state.isread = false;
          this.state.mark = "";
          break;
      case "Marked":
          this.state.isread = "";
          this.state.mark = "Marked";
          break;
      default: break;
    }
    let messageSearchCriteria = combineCriteria(this);
    this.props.ArchiveStateActions.searchMessage(messageSearchCriteria);
  }

  render() {
    let navigationView = (
      <DrawerView closeDrawer={this.closeDrawer} navigate={this.props.navigate} />
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER'}
        style={styles.drawerAndroid}
      >
        <View style={styles.title}>
          <TouchableOpacity onPress={() => { this.openDrawer() }}>
            <Image style={styles.image} source={require('./../../../images/headbar.png')}></Image>
          </TouchableOpacity>
          <View style={styles.archive}>
            <Text style={styles.archiveText}>Archive</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.iconPlus} onPress={() => { this.createMessage() }}>
              <Icon name='plus' size={20} color={'#33373D'}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchView}>
          <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center', justifyContent: 'center', }}>
            <TextInput placeholder='Search' style={styles.searchTextInput} underlineColorAndroid="transparent" value={this.state.criteria}
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
          <SwipeListView style={styles.swipeListViewContainer}
            dataSource={this.state.dataSource}
            renderRow={(rowData, secId, rowId, rowMap) =>
              <MessageView messageData={rowData} secId={secId} rowId={rowId} rowMap={rowMap} transformMessage={this.transformMessage} />
            }
            renderHiddenRow={
              (rowData, secId, rowId, rowMap) => (
                <View style={styles.rowBack}>
                  <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <TouchableOpacity onPress={() => { this.markMessage(rowData); rowMap[`${secId}${rowId}`].closeRow() }}>
                       {(rowData.UserMessage && rowData.UserMessage.Mark === 'Marked') ? <Icon name='star' size={20} color={'orange'} /> : <Icon name='star-outlined' size={20} color={'#ccc'} />}
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
          <TouchableOpacity style={styles.loadMoreContainer} onPress={() => this.loadMore()}>
            {this.props.loadMore ? <Text style={styles.loadMoreText}>Load more </Text> : <Text style={styles.noMoreMessage}>No More Message </Text>}
          </TouchableOpacity>
        </ScrollView>
        <FilterFooterView filterType={this.state.filterType}  searchMessageByCriteriaAndFilterType={(filterType)=>this.searchMessageByCriteriaAndFilterType(filterType)} />
      </DrawerLayoutAndroid>

    );
  }
}



export default ArchiveView;