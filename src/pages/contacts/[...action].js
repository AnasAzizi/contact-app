import React from "react";
import { useRouter } from "next/router";
import ContactAction from "@/components/ContactAction";

const DynamicContactPage = () => {
  const router = useRouter();
  const { action } = router.query;

  if (!action) {
    return <p>Loading...</p>;
  }

  const [mode, id] = Array.isArray(action) ? action : [];

  if (!["view", "edit"].includes(mode)) {
    return <p>Invalid mode specified.</p>;
  }

  if (!id) {
    return <p>No contact ID specified.</p>;
  }

  return <ContactAction mode={mode} id={id} />;
};

export default DynamicContactPage;
