import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Modal from 'react-native-modal';

class ModalComponent extends Component {   

    constructor(props){
        super(props);       
    }
    render(){
        return(
            <Modal isVisible={this.props.isModalVisible} style={styles.wrapModal}>
                <View>
                    <TouchableOpacity style={styles.modalDelete} onPress={()=>this.props.deleteModal()}>
                        <Text style={styles.textDelete}>Discard Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalSave} onPress={()=>this.props.save()}>
                        <Text style={styles.textSave}>Save</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.modalCancel} onPress={()=>this.props.hideModal()}>
                        <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
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
    wrapModal: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    modalDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },  
   textDelete: {
       fontSize: 16,
       color: '#FE483E'
   },
   modalSave: {
       
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
   },
   textSave: {
       fontSize: 16,
       color: '#1886FE'
   },
   modalCancel: {
       flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
   },
   textCancel: {
       fontSize: 16,
       color: '#077EFF',
       fontWeight: 'bold'
   },
})
export default ModalComponent