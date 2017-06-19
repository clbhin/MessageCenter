import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class FilterFooterView extends Component{
  constructor(props) {
  super(props);
  
  }
  static propTypes = {
  };
  
render() {
  return <View style={{flexDirection:'row',height:50}}>
          {
            this.props.filterType === 'All'
              ? <TouchableOpacity style={{flex: 1,alignItems: 'center',backgroundColor: '#FFF'}} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('All')}}>
                  <Icon name='home' size={20} color={'#43B1CC'}></Icon>
                  <Text style={{color: '#43B1CC',fontSize: 16}}>All</Text>
                </TouchableOpacity>
              : <TouchableOpacity
                  style={{flex: 1,alignItems: 'center',backgroundColor:'#43B1CC'}}
                  onPress={() => {this.props.searchMessageByCriteriaAndFilterType('All')}}>
                  <Icon name='home' size={20} color={'#FFF'}></Icon>
                  <Text style={{color: '#FFF',fontSize: 16}}>All</Text>
                </TouchableOpacity>
          }
          {
            this.props.filterType==='IsRead'
            ? <TouchableOpacity style={{flex: 1,alignItems: 'center',backgroundColor: '#FFF'}} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('IsRead')}}>
                <Icon name='unread' size={20} color={'#43B1CC'}></Icon>
                <Text style={{color: '#43B1CC'}}>Unread</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={{flex: 1,alignItems: 'center',backgroundColor: '#43B1CC'}}onPress={() => {this.props.searchMessageByCriteriaAndFilterType('IsRead')}}>
                <Icon name='unread' size={20} color={'#FFF'}></Icon>
                <Text style={{color: '#FFF'}}>Unread</Text>
              </TouchableOpacity>
          }
          {
            this.props.filterType==='Marked'
            ? <TouchableOpacity style={{flex: 1,alignItems: 'center',backgroundColor: '#FFF'}} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('Marked')}}>
                <Icon name='star' size={20} color={'#43B1CC'}></Icon>
                <Text style={{color: '#43B1CC'}}>Flagged</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={{flex: 1,alignItems: 'center',backgroundColor: '#43B1CC'}}onPress={() => {this.props.searchMessageByCriteriaAndFilterType('Marked')}}>
                <Icon name='star' size={20} color={'#FFF'}></Icon>
                <Text style={{color: '#FFF'}}>Flagged</Text>
              </TouchableOpacity>
          }
        </View>
  }
}



const styles = StyleSheet.create({
  rowFront: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderBottomColor: 'black',		
		justifyContent: 'center'		
	}
});



export default FilterFooterView;
