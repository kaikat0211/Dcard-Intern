import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialProfile = {
    name : '',
    photo: '',
    repoUrl: '',
    login: false,
}
interface ProfileData {
    login: string;
    avatar_url: string;
    repos_url: string;
}


export const fetchProfile = createAsyncThunk(
    'profiles/fetchProfile',
    async (data : ProfileData) => {
        return data
    }
);
const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfile,
    reducers:{
        setProfile(state, action: PayloadAction<ProfileData>){
            const { login, avatar_url, repos_url } = action.payload
            return {
                ...state,
                name: login,
                photo: avatar_url,
                repoUrl: repos_url,
                login: true
            };
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchProfile.pending, (state, action) => {
            console.log('fetchProfile.pending');
            
        })
        .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
            state.name = action.payload.login
            state.photo = action.payload.avatar_url
            state.repoUrl = action.payload.repos_url
            state.login = true 
        })
    },
})



export const { setProfile } = profileSlice.actions
export default profileSlice.reducer