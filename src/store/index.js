import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { albumsApi, useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from './apis/albumsApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { photosApi, useAddPhotoMutation, useFetchPhotosQuery, useDeletePhotoMutation } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath] : albumsApi.reducer,
    [photosApi.reducerPath] : photosApi.reducer
  },
  middleware : (getDeffaultMiddleware) => {
    return getDeffaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  }
});

setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUsers';
export * from './thunks/deleteUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation }
export { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation }
