import { faker } from "@faker-js/faker";
import { createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk('users/add', async () =>{
    const response = await axios.post('http://localhost:3005/users', {
        name : faker.name.fullName()
    })

    await pause(2000)
    
    return response.data
})

const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
};

export { addUser }


