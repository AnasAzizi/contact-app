import React from "react";
import { useRouter } from "next/router";
import ContactAction from "@/components/Actions/ContactAction";

const DynamicContactPage = () => {
  const router = useRouter();
  const { action } = router.query;
  const [mode, id] = Array.isArray(action) ? action : [];

  return <ContactAction mode={mode} id={id} />;
};

export default DynamicContactPage;
