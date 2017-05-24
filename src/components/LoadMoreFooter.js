import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

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
                    <View style={{alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{alignItems: 'center',justifyContent: 'center', fontSize: 13, color: '#434343'}}>Have No More Message</Text>
                    </View>:
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' style={styles.centering}/>
                         <Text style={{color: '#EF4A4A'}}>Loading</Text>
                    </View>                             
                    }               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },    
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',    
    }
})
export default LoadMoreFooter