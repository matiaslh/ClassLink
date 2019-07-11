import React from "react";

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function FooterPage() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                {new Date().getFullYear()} &copy; Matias Levy-Hara | Daniel Mil
            </div>
        </div>
    )
}

export default FooterPage;