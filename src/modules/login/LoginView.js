import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ListView,
    Button,
    Dimensions,
    Picker
} from 'react-native';
const {height,width} = Dimensions.get('window'); 
import lodash from 'lodash';

class LoginView extends Component {
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource,
            user:{}, 
            users: []          
        }
        this.data = [];
        this.loginIn = this.loginIn.bind(this);
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
        this.props.LoginStateActions.searchUsers({Start:0,PageSize:10});
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.users !== this.props.users ) {
                this.setState({
                    users: nextProps.users
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    loginIn(loginUserInfo) {
        this.props.LoginStateActions.loginIn(loginUserInfo);
        this.props.navigate({ routeName: 'InboxStack' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image style={styles.logoImage} source={require('./../../../images/feisystemslogo.png')} />
                </View>            
                <View style={styles.wrap}>                  
                    <Picker  style={{width: 240,marginBottom: 5,}} mode="dropdown" selectedValue={this.state.user} 
                    onValueChange={(value)=>this.setState({user: value})} >
                    
                        {[<Picker.Item  label={'Please select user'} value={{}} key={1}  />, ...this.props.users&&this.props.users.map((user)=> 
                            (<Picker.Item label={user.PersonName} style={{width: '150%'}} value={user} key={user.Id}/> )
                        )]}
                                               
                    </Picker>
                    {lodash.isEmpty(this.state.user) ?
                        <Button  title='login' disabled onPress={()=>this.loginIn(this.state.user)}>LOGIN</Button>:
                        <Button  title='login'  onPress={()=>this.loginIn(this.state.user)}>LOGIN</Button>
                    }
                        
         
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:height
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
    },
    logo :{
        position: 'absolute',
        top: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 200,
        height: 80
    },
    wrap: {
        position: 'absolute',
        top: '50%',
        left: '20%',
        backgroundColor: '#fff'
    }
});

export default LoginView;