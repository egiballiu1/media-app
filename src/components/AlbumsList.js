import { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from "../store";
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { TiDeleteOutline } from "react-icons/ti"
import PhotosList from "./PhotosList";


function AlbumsList({ user }){
    const { data, isError, isFetching } = useFetchAlbumsQuery(user)
    const [ addAlbum, results ] = useAddAlbumMutation()
    const [deleteAlbum, removeAlbumsResults] = useDeleteAlbumMutation();

    console.log(useDeleteAlbumMutation())
    const handleAddingAlbum = () => {
        addAlbum(user)
    }

    const handleDeleteAlbum = (id) => {
        deleteAlbum(id)
    }

    let content;
    if (isFetching) {
      content = <Skeleton className='w-full h-10' times={3} />;
    } else if (isError) {
      content = <div>Error loading albums.</div>;
    } else {
      content = data.map((album) => {
        const header = <div className="flex flex-row items-center justify-between">
            <Button className='mr-2' onClick={() => handleDeleteAlbum(album.id)}>
                <TiDeleteOutline/>
            </Button>
            {album.title}
        </div>;
  
        return (
          <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album}/>
          </ExpandablePanel>
        );
      });
    }

    return(
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums for {user.name}</h3>
            <Button loading={results.isLoading} onClick={handleAddingAlbum}>
                + Add Album
            </Button>
            </div>
            <div>{content}</div>
      </div>
    )
}

export default AlbumsList;