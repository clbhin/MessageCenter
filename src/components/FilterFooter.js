import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './../styles/FilterFooter';

class FilterFooterView extends Component{
  constructor(props) {
  super(props);
  
  }
  static propTypes = {
  };
  
render() {
  return <View style={styles.container}>
          {
            this.props.filterType === 'All'
              ? <TouchableOpacity style={styles.color} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('All')}}>
                  <Icon name='home' size={20} color={'#43B1CC'}></Icon>
                  <Text style={styles.focusTextAll}>All</Text>
                </TouchableOpacity>
              : <TouchableOpacity
                  style={styles.defaultColor}
                  onPress={() => {this.props.searchMessageByCriteriaAndFilterType('All')}}>
                  <Icon name='home' size={20} color={'#FFF'}></Icon>
                  <Text style={styles.defaultTextAll}>All</Text>
                </TouchableOpacity>
          }
          {
            this.props.filterType==='IsRead'
            ? <TouchableOpacity style={styles.color} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('IsRead')}}>
                <Icon name='unread' size={20} color={'#43B1CC'}></Icon>
                <Text style={styles.focusText}>Unread</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.defaultColor}onPress={() => {this.props.searchMessageByCriteriaAndFilterType('IsRead')}}>
                <Icon name='unread' size={20} color={'#FFF'}></Icon>
                <Text style={styles.defaultText}>Unread</Text>
              </TouchableOpacity>
          }
          {
            this.props.filterType==='Marked'
            ? <TouchableOpacity style={styles.color} onPress={() => {this.props.searchMessageByCriteriaAndFilterType('Marked')}}>
                <Icon name='star' size={20} color={'#43B1CC'}></Icon>
                <Text style={styles.focusText}>Flagged</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.defaultColor}onPress={() => {this.props.searchMessageByCriteriaAndFilterType('Marked')}}>
                <Icon name='star' size={20} color={'#FFF'}></Icon>
                <Text style={styles.defaultText}>Flagged</Text>
              </TouchableOpacity>
          }
        </View>
  }
}

export default FilterFooterView;
