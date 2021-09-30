function getYear() {
  let today = new Date();
  return today.getFullYear();
}

function Footer() {
  return (
    <footer className="footer">
      © {getYear()} © Copyright. All rights Reserved.
    </footer>
  );
}

export default Footer;
