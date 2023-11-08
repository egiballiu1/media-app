import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser = createAsyncThunk('users/delete', async (user) => {
    const response = await axios.delete(`http://localhost:3005/users/${user.id}`)

    return user
})

export { deleteUser }