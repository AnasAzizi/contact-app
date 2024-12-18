import React from "react";
import { Breadcrumbs, Divider, Typography, Link } from "@mui/material";

const Breadcrumb = ({ path, name }) => {
  const pathSegments = path
    .split("/")
    .filter(
      (segment) => segment && !["view", "edit", "[...action]","[id]"].includes(segment)
    );

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mt={6} mb={1}>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const capitalizedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          if (isLast && name) {
            return (
              <Link
                key={index}
                href={`/${pathSegments}`}
                variant="h5"
                color="inherit"
                underline="none"
              >
                {`${capitalizedSegment}/${name}`}
              </Link>
            );
          }

          return isLast ? (
            <Typography key={index} variant="h5">
              {capitalizedSegment}
            </Typography>
          ) : (
            <Link
              key={index}
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              variant="h5"
              color="inherit"
              underline="none"
            >
              {capitalizedSegment}
            </Link>
          );
        })}
      </Breadcrumbs>
      <Divider sx={{ mb: "31px" }} />
    </>
  );
};

export default React.memo(Breadcrumb);