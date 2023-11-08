import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Button from "./Button"
import Skeleton from "./Skeleton"
import PhotosListItem from "./PhotosListItem"

function PhotosList({album}){
    useFetchPhotosQuery(album)
    const [addPhoto, addPhotoResults] = useAddPhotoMutation()
    const { data, isError, isFetching } = useFetchPhotosQuery(album)

    let content;
    if (isFetching) {
      content = <Skeleton className='w-full h-10' times={3} />;
    } else if (isError) {
      content = <div>Error loading photos.</div>;
    } else {
      content = data.map((photo) => {
        return (
          <PhotosListItem key={photo.id} photo={photo} />
        );
      });
    }

    const handleAddPhoto = () =>{
        addPhoto(album)
    }
     
    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold"> Photos in {album.title}</h3>
            <Button onClick={handleAddPhoto} loading={addPhotoResults.isLoading}>
                Add Photo
            </Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
}  

export default PhotosList