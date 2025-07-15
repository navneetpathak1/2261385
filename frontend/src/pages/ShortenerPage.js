import { useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { logger } from "../loggerInstance";

function ShortenerPage() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleUrlsCreated = (newUrls) => {
    setShortenedUrls(newUrls);
    logger("frontend", "info", "component", "URLs shortened successfully");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          URL Shortener
        </Typography>

        <UrlForm onSuccess={handleUrlsCreated} />

        {shortenedUrls.length > 0 && (
          <Box mt={4}>
            <UrlList urls={shortenedUrls} />
          </Box>
        )}

        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" size="large" href="/stats">
            View Statistics
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ShortenerPage;
