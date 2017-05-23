import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { post } from './../../utils/api';
// Initial state
const initialState = Map({ profiles: [] });

// Actions
const ADDPROFILESTATE_ADDPROFILES = 'ADDPROFILESTATE/ADDPROFILES';
const ADDPROFILESTATE_SEARCH_REQUEST = 'ADDPROFILESTATE/SEARCH/REQUEST';
const ADDPROFILESTATE_SEARCH_RESPONSE = 'ADDPROFILESTATE/SEARCH/RESPONSE';

// Action creators
export function addProfile(profiles) {
    return {
        type: ADDPROFILESTATE_ADDPROFILES,
        payload: profiles
    }
}

export function search(search) {
    return {
        type: ADDPROFILESTATE_SEARCH_REQUEST,
        payload: search
    }
}

export async function requestSearch(searchCriteria) {
    try {
        const result =
            await post('Messages/SearchClientProfiles', searchCriteria);        
        return {
            type: ADDPROFILESTATE_SEARCH_RESPONSE,
            payload: result.ModelObject
        }
    } catch (err) {
        return {
            type: ADDPROFILESTATE_SEARCH_RESPONSE,
            payload: []
        }
    }
}

export default function AddProfileStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADDPROFILESTATE_SEARCH_REQUEST:
            return loop(state, Effects.promise(requestSearch, action.payload));

        case ADDPROFILESTATE_SEARCH_RESPONSE:
            return state.set('profiles', [...action.payload]);

        case ADDPROFILESTATE_ADDPROFILES:
            return state.set('selectedProfiles', [...action.payload]);
        default:
            return state;
    }
}
