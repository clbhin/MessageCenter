import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import styles from './../styles/LoadMoreFooter';

class LoadMoreFooter extends Component {

    static propTypes = {
        isLoadAll: PropTypes.bool
    }

    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                {this.props.isLoadAll ?  
                    <View style={styles.LoadMoreFooterView}>
                        <Text style={styles.LoadMoreFooterText}>Have No More Message</Text>
                    </View>:
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' style={styles.centering}/>
                         <Text style={styles.loadingText}>Loading</Text>
                    </View>                             
                    }               
            </View>
        )
    }
}

export default LoadMoreFooter