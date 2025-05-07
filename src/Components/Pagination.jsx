import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
function Pagination({ pagenumbers, currentPage, setPageNumber }) {
  const { language } = useContext(LanguageContext);
  const paginatedNumbers =
    language === "En" ? pagenumbers : [...pagenumbers].reverse();
  return (
    <nav aria-label="Page navigation example">
      <MDBPagination center className="mb-0">
        <MDBPaginationItem>
          {/* Prev */}
          {language === "En" ? (
            <MDBPaginationLink
              onClick={() => {
                if (currentPage - 1 > 0) setPageNumber(currentPage - 1);
                console.log(currentPage);
              }}
            >
              Previous
            </MDBPaginationLink>
          ) : (
            <MDBPaginationLink
              aria-disabled={currentPage + 1 === pagenumbers.length} // Dynamically sets aria-disabled
              disabled={currentPage + 1 === pagenumbers.length} // Dynamically disables the link
              onClick={() => {
                if (currentPage + 1 <= pagenumbers.length)
                  setPageNumber(currentPage + 1);
              }}
            >
              التالي
            </MDBPaginationLink>
          )}
        </MDBPaginationItem>
        {paginatedNumbers?.map((index) => (
          <MDBPaginationItem key={index}>
            <MDBPaginationLink onClick={() => setPageNumber(index)}>
              {index}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem>
          {/* Next */}
          {language === "En" ? (
            <MDBPaginationLink
              aria-disabled={currentPage + 1 === pagenumbers.length} // Dynamically sets aria-disabled
              disabled={currentPage + 1 === pagenumbers.length} // Dynamically disables the link
              onClick={() => {
                if (currentPage + 1 <= pagenumbers.length)
                  setPageNumber(currentPage + 1);
              }}
            >
              Next
            </MDBPaginationLink>
          ) : (
            <MDBPaginationLink
              onClick={() => {
                if (currentPage - 1 > 0) setPageNumber(currentPage - 1);
                console.log(currentPage);
              }}
            >
              السابق
            </MDBPaginationLink>
          )}
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
}

export default Pagination;
