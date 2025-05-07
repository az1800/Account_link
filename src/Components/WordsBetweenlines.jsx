function WordsBetweenlines({ text, style }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          marginTop: "16px",
          marginBottom: "-9px",
        }}
      >
        <hr
          style={{
            flex: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#000000",
          }}
        />
        <span
          style={{
            whiteSpace: "nowrap",
            color: "#555",
          }}
        >
          {text}
        </span>
        <hr
          style={{
            flex: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#000000",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
        }}
      ></div>
    </>
  );
}

export default WordsBetweenlines;
