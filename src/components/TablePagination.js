import React from "react";
import { Pagination, Box, PaginationItem } from "@mui/material";

const TablePagination = ({ data, rowsPerPage, page, onPageChange }) => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
    >
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => onPageChange(value)}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: () => (
                <Box
                  sx={{
                    fontSize: "20px",
                    color: "#6C757D",
                    width: "118px",
                    height: "47px",
                    textAlign: "center",
                    lineHeight: "47px",
                    borderRadius: 0,
                    backgroundColor: "white",
                    border: "1px solid #DEE2E6",
                  }}
                >
                  Previous
                </Box>
              ),
              next: () => (
                <Box
                  sx={{
                    fontSize: "20px",
                    color: "#4E73DF",
                    width: "81px",
                    height: "47px",
                    textAlign: "center",
                    lineHeight: "47px",
                    borderRadius: 0,
                    backgroundColor: "white",
                    border: "1px solid #DEE2E6",
                  }}
                >
                  Next
                </Box>
              ),
            }}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            borderColor: "#DEE2E6",
            borderRadius: 0,
            color: "#4E73DF",
            height: "47px",
            minWidth: "51px",
            mx: "90px",
            fontSize: "20px",
          },
          "& .MuiPagination-ul": {
            backgroundColor: "#FFFFFF !important",
            color: "white",
            display: "flex",
            alignItems: "center",
          },
          "& .Mui-selected": {
            backgroundColor: "#4E73DF !important",
            color: "white",
          },
          "& .MuiButtonBase-root": {
            p: 0,
            m: 0,
          },
        }}
      />
    </Box>
  );
};

export default TablePagination;
