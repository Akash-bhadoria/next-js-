import { redirect } from "next/dist/server/api-utils";
import AddUser from "../addUser/page";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function UsersList() {
  const session = await getServerSession(options);
  console.log(session?.user.username);

  return (
    <div>
      {session?.user ? <AddUser></AddUser> : <div> </div>}

      <p>{session?.user.username}</p>
    </div>
  );
}
