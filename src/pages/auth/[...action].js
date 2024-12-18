import React from "react";
import { useRouter } from "next/router";
import AuthAction from "@/components/Actions/AuthAction";

const DynamicUserPage = () => {
  const router = useRouter();
  const { action } = router.query;
  const [mode, id] = Array.isArray(action) ? action : [];

  return <AuthAction mode={mode} id={id} />;
};

export default DynamicUserPage;
