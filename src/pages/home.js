import React, { useMemo } from "react";
import { useCurrentUser } from "@/Context/Context";
import { ShowContact } from "@/pages/api/contact";
import { Activities } from "@/pages/api/contact";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Breadcrumbs from "@/components/layouts/Breadcrumbs";
import DashboardCard from "@/components/DashboardComponents/DashboardCard";
import DashboardTable from "@/components/Tables/DashboardTable";
import Loader from "@/components/layouts/Loader";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

const HomePage = () => {
  const { currentUser: userRole } = useCurrentUser();

  const { data: activeData } = useQuery({
    queryKey: ["activities"],
    queryFn: Activities,
    enabled: userRole.role === "Owner" || userRole.role === "Admin",
  });

  const { data: Contact, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: ShowContact,
  });

  const counts = useMemo(() => {
    if (!Contact) return { Active: 0, Inactive: 0, email: 0, emailTwo: 0 };
    return Contact.reduce(
      (acc, item) => {
        if (item.status === "Active") {
          acc.Active += 1;
        } else if (item.status === "Inactive") {
          acc.Inactive += 1;
        }
        if (item.email) {
          acc.email += 1;
        }
        if (item.emailTwo) {
          acc.emailTwo += 1;
        }
        return acc;
      },
      { Active: 0, Inactive: 0, email: 0, emailTwo: 0 }
    );
  }, [Contact]);

  const cardData = [
    {
      bgColor: "#1ABC9C",
      imageSrc: "/homePageIcons/arrow-down-circle-fill.svg",
      text: "Active",
      count: counts.Active,
    },
    {
      bgColor: "#FC766A",
      imageSrc: "/homePageIcons/arrow-down-circle-fill.svg",
      text: "Inactive",
      count: counts.Inactive,
    },
    {
      bgColor: "#2C3E50",
      imageSrc: "/homePageIcons/email.svg",
      text: "With email",
      count: counts.email,
    },
    {
      bgColor: "#5B84B1",
      imageSrc: "/homePageIcons/x-circle-fill.svg",
      text: "Without email",
      count: counts.emailTwo,
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Container maxWidth="xl">
        <Breadcrumbs path="Statistical Dashboard" />
        <Grid
          mt="50px"
          container
          direction={{ xs: "column", md: "row" }}
          size={12}
          columnSpacing={9}
        >
          <Grid
            container
            size={{ xs: 12, md: userRole.role === "User" ? 12 : 6 }}
            direction={{ xs: "column", md: "row" }}
            columnSpacing="72px"
            rowSpacing="68px"
          >
            {cardData.map((card, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}>
                <DashboardCard
                  bgColor={card.bgColor}
                  imageSrc={card.imageSrc}
                  text={card.text}
                  count={card.count}
                />
              </Grid>
            ))}
          </Grid>
          {userRole.role !== "User" && (
            <>
              <Grid
                item="true"
                size={{ xs: 12, md: 6 }}
                mt={{ xs: "40px", md: 0 }}
              >
                <DashboardTable data={activeData} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
