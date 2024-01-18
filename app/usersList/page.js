import { redirect } from "next/dist/server/api-utils";
import AddUser from "../addUser/page";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function UsersList() {
  const session = await getServerSession(options);

  // if (!session) {
  //   res.redirect("/api/auth/signin?callbackUrl=/usersList");
  //   return;
  // }

  return (
    <>
      {" "}
      {session ? (
        <AddUser user={session?.user} pageType={"Home"}></AddUser>
      ) : (
        <p>hello</p>
      )}
    </>
  );
}
