import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

const AdminPage = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return <div>You are not admin</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
