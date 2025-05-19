import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    await new Promise((resolve)=> setTimeout(resolve,1000));
    const data = await response.json();
   const modifiedData = data.map(user => {
    const shouldfail=Math.random()<0.2;
      if (shouldfail) {
        return {
          id: user.id,
          hasError: true,
          errorMessage: "Error ...Failed to load"
        };
      }
      return user;
    });

    return modifiedData;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
