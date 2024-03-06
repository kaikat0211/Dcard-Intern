import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialUser = {
    name : '',
    photo: '',
    repoInfo: {},
    login: false,
}
interface UserData {
    userInfo: UserInfo,
    repoInfo: RepoInfo
}
interface UserInfo {
    login: string;
    avatar_url: string;
  }

interface RepoInfo {
    [repoName: string]: {
      getIssueUrl: string;
    };
  }

export const fetchUser = createAsyncThunk(
    'Users/fetchUser',
    async (data : UserData) => {
        return data
    }
);
const userSlice = createSlice({
    name: 'User',
    initialState: initialUser,
    reducers:{
        setUser(state, action: PayloadAction<UserData>){
            const { userInfo, repoInfo } = action.payload
            return {
                ...state,
                name: userInfo.login,
                photo: userInfo.avatar_url,
                repoInfo: repoInfo,
                login: true
            };
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchUser.pending, (state, action) => {
        })
        .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
            const { userInfo, repoInfo } = action.payload;
            state.name = userInfo.login
            state.photo = userInfo.avatar_url
            state.repoInfo = repoInfo
            state.login = true 
        })
    },
})



export const { setUser } = userSlice.actions
export default userSlice.reducer