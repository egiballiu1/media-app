import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const albumsApi = createApi({
    reducerPath : 'albums',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:3005/'
    }),
    endpoints(builder){
        return {
            fetchAlbums : builder.query({
                providesTags : (results, error, user) =>{
                    const tags = results.map(album => {
                        return { type : 'Album', id:album.id}
                    })
                    tags.push({type : 'UsersAlbums', id:user.id})
                    return tags;
                },
                query : (user) => {
                    return{
                        url:'albums',
                        params:{
                            userId : user.id
                        },
                        method : 'GET'
                    }
                }
            }),
            addAlbum : builder.mutation({
                invalidatesTags : (results, error, user) =>{
                    return [{type : 'UsersAlbums', id: user.id}]
                },
                query : (user) => {
                    return{
                        url:'albums',
                        method:'POST',
                        body : {
                            userId : user.id,
                            title : faker.commerce.productName()
                        }
                    }
                }
            }),
            deleteAlbum : builder.mutation({
                invalidatesTags : (results, error, album) => {
                    return [{type:'Album', id: album.id}]
                },
                query : (albumId) => {
                    return{
                        url : `albums/${albumId}`,
                        method : 'DELETE',
                    }
                }
            })
        }
    }

})

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi
export {albumsApi}