import React from "react";
import { useRouter } from "next/router";
import UserAction from "@/components/Actions/UserAction";

const DynamicUserPage = () => {
  const router = useRouter();
  const { action } = router.query;
  const [mode, id] = Array.isArray(action) ? action : [];

  return <UserAction mode={mode} id={id} />;
};

export default DynamicUserPage;
