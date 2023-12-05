import React, { useRef, useState } from "react";
import { ReactEpubViewer, EpubViewer } from "react-epub-viewer";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { useParams } from "react-router-dom";
import Topbar from "../../components/Topbar/Topbar";
import { BASE_URL } from "../../constants/URL";

const ReadPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };
  const ownStyles = {
    ...ReactReaderStyle,

    arrow: {
      ...ReactReaderStyle.arrow,
      color: "var(--primary)",
      background: "var(--secondary-500)",
    },
  };
  return (
    <div>
      <Topbar />

      <div style={{ height: "calc(100vh - 56px)" }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={`${BASE_URL}/files/${id}`}
          readerStyles={ownStyles}
          getRendition={(rendition) => (renditionRef.current = rendition)}
          tocChanged={(toc) => (tocRef.current = toc)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          left: "1rem",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {page}
      </div>
    </div>
  );
};

export default ReadPage;
