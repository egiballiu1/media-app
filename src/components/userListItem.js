import Button from "./Button"
import { TiDeleteOutline } from "react-icons/ti"
import { deleteUser } from "../store"
import { useThunk } from "../hooks/useThunk"
import ExpandablePanel from "./ExpandablePanel"
import AlbumsList from "./AlbumsList"


function UserListItem({user}){

   
  const [doDeleteUser, isDeletingUser, errorDeletingUser] = useThunk(deleteUser)

  const handleDeleteUser = () => {
    console.log(user.id)
    doDeleteUser(user)
  };

  const header = (
    <>
      <Button className='mr-2' onClick={handleDeleteUser}>
        <TiDeleteOutline/>
      </Button>
      {errorDeletingUser && <div>Error deleting user</div>}
      {user.name}
    </>
  );
        
  return(
    <ExpandablePanel header={header}>
      <AlbumsList user={user}/>
    </ExpandablePanel>
  )
}

export default UserListItem