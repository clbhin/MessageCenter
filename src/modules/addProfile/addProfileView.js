import React, { PropTypes, Component } from 'react';
import {
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ListView,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';

class addProfileView extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource,
            profiles: []
        };
        this.data = [];
    };

    static displayName = "";
    static navigationOptions = {
        header: {
            style: {
                height: 0
            }
        }
    };
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    searchProfile = () => {
        this.props.AddProfileStateActions.search({
            PersonId: this.state.personId,
            LastName: this.state.lastName,
            FirstName: this.state.firstName,
            Ssn: this.state.sSN,
            MedicaidNumber: this.state.medicaidId
        });
    };

    selectProfile = (profile) => {
        profile.checked = !profile.checked
    };

    addProfile = () => {
        var selectedProfiles = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].checked) {
                selectedProfiles.push(this.data[i])
            }
        }
        this.props.AddProfileStateActions.addProfile(selectedProfiles);
        this.props.navigation.goBack(null);
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.profiles !== this.props.profiles) {
                this.data = nextProps.profiles
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data)
                });
            }
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, paddingBottom: 4 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name='cross' size={30}></Icon>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Profiles</Text>
                    <TouchableOpacity onPress={() => this.addProfile()}>
                        <Icon name='check' size={30}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Person ID:</Text>
                        <TextInput value={this.state.personId} onChangeText={(personId) =>
                            this.setState({ personId })}
                            style={{ flex: 1 }}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Last Name:</Text>
                        <TextInput value={this.state.lastName} onChangeText={(lastName) =>
                            this.setState({ lastName })}
                            style={{ flex: 1 }}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>First Name:</Text>
                        <TextInput value={this.state.firstName} onChangeText={(firstName) =>
                            this.setState({ firstName })} style={{ flex: 1 }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>SSN:</Text>
                        <TextInput value={this.state.sSN} onChangeText={(sSN) => { this.setState({ sSN }) }} style={{ flex: 1 }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Medicaid #:</Text>
                        <TextInput value={this.state.medicaidId} onChangeText={(medicaidId) => { this.setState({ medicaidId }) }}
                            style={{ flex: 1 }}></TextInput>
                    </View>
                    <View>
                        <Button
                            onPress={() => this.searchProfile()}
                            title="Search"
                            color="#841584"
                            accessibilityLabel="Search"
                        />
                    </View>
                </View>
                <View>
                    <ListView style={{ paddingTop: 10 }}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.FirstName}</Text>
                                <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.LastName}</Text>
                                <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Id}</Text>
                                <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Ssn}</Text>
                                <Text style={{ flex: 2, marginLeft: 10, marginTop: 1, alignSelf: 'center', textAlign: 'center' }}>{rowData.Medicaid}</Text>
                                <CheckBox style={{ flex: 1, padding: 0, alignSelf: 'center' }} onClick={() => this.selectProfile(rowData)} isChecked={rowData.checked} />
                            </TouchableOpacity>
                        } />
                </View>
            </View>
        );
    }
}


export default addProfileView;