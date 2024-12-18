import React from "react";
import { useRouter } from "next/router";
import CompanyAction from "@/components/Actions/CompanyAction";

const DynamicCompanyPage = () => {
  const router = useRouter();
  const { action } = router.query;
  const [mode, id] = Array.isArray(action) ? action : [];

  return <CompanyAction mode={mode} id={id} />;
};

export default DynamicCompanyPage;
