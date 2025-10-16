import React from "react";
import { useAuth } from "../contexts/AuthContext";
import UserProfileCard from "../components/UserProfileCard";

function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Nenhum usuário autenticado.</p>;

  return <UserProfileCard email={user.email} />;
}

export default Profile;
