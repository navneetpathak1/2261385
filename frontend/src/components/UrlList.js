import { Box, Paper, Typography, Link } from "@mui/material";

function UrlList({ urls }) {
  return (
    <Box mt={3}>
      {urls.map((item, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1">
            Original URL:{" "}
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              {item.url}
            </Link>
          </Typography>
          <Typography variant="body2">
            Short URL:{" "}
            <Link href={`/${item.shortcode}`}>
              {window.location.origin}/{item.shortcode}
            </Link>
          </Typography>
          <Typography variant="body2">
            Expires At: {new Date(item.expiry).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default UrlList;
