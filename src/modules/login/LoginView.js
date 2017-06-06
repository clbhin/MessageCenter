import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ListView,
    Button
} from 'react-native';

class LoginView extends Component {
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource,
        }
        this.data = [];
    }

    static propTypes = {
        navigate: PropTypes.func.isRequired
    };
    static navigationOptions = {
        header: {
            style: { height: 0 }
        }
    }

    componentWillMount() {
        this.props.LoginStateActions.searchUsers({Start:1,PageSize:10});
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.users !== this.props.users ) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(nextProps.users),
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    loginIn(userId) {
        this.props.LoginStateActions.loginIn(userId);
        this.props.navigate({ routeName: 'InboxStack' });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loginText}>Select an user to login</Text>
                <ListView style={{ paddingTop: 10 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={() => this.loginIn(rowData.FullName)}>
                            <Text style={styles.loginText}>{rowData.FullName}</Text>
                        </TouchableOpacity>
                    } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    userContainer: {
        justifyContent: 'center',
        alignItems: 'center'
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
    loginText: {
        fontSize: 20,
        backgroundColor: '#eee'
    }
});

export default LoginView;