import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './../styles/Modal';

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
                        <Text style={styles.textSave}>Save As Draft</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.modalCancel} onPress={()=>this.props.hideModal()}>
                        <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
        )
    }
}

export default ModalComponent