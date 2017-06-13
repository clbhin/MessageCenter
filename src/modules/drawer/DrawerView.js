import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ListView,
    ScrollView,
    Dimensions
} from 'react-native';
import DrawerModel from './../../components/Drawer';
import Icon from 'react-native-vector-icons/Entypo';
const {height,width} = Dimensions.get('window'); 
class DrawerView extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = [
            'Inbox', 'Sent', 'Draft', 'Archive'
        ]
        this.state = {
            dataSource: ds.cloneWithRows(data),
            criteria: 'All',
            drawerNavigate: ''
        };
        this.ds = ds;
        this.transformMessage = this.transformMessage.bind(this); 
             
    }

    transformMessage = (currentMessage) => {
        if (currentMessage === 'Inbox') {
            this.props.navigate({ routeName: 'InboxStack' });
        } else if (currentMessage === 'Sent') {
            this.props.navigate({ routeName: 'SentStack' });
        } else if (currentMessage === 'Draft') {
            this.props.navigate({ routeName: 'DraftStack' });
        } else if (currentMessage === 'Archive') {
            this.props.navigate({ routeName: 'ArchiveStack' });
        } 
    };

    logOut(){
        this.props.navigate({ routeName: 'Home' });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.closeDrawer()} >
                    <Image style={{ width: 30, height: 40 }} source={require('./../../../images/headbar.png')} />
                </TouchableOpacity>

                <ListView style={{ paddingTop: 10 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <DrawerModel messageData={rowData} transformMessage={this.transformMessage} />
                    } />
                <TouchableOpacity style={{flex :1,position:'absolute',bottom: '14%',left: '5%',
                 flexDirection: 'row', alignItems: 'center'}} onPress={()=>this.logOut()}>                   
                        <Icon name='log-out' size={20} color={'#398CF3'} style={{marginRight: 5}}></Icon>
                        <Text style={{fontSize: 16, color: '#398CF3',fontWeight: 'bold'}}>Log Out</Text>                    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container: {
    paddingLeft: 5 ,
    height: height
  }, 
})

export default DrawerView;