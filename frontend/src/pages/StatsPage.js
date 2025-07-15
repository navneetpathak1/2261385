import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Link } from "@mui/material";
import axios from "axios";
import { logger } from "../loggerInstance";

function StatsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats");
        setData(res.data);
        logger("frontend", "info", "api", "Statistics fetched");
      } catch {
        setError("Error fetching statistics");
        logger("frontend", "error", "api", "Failed to fetch statistics");
      }
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          URL Statistics
        </Typography>
        {error && (
          <Box mt={2} color="error.main">
            {error}
          </Box>
        )}
        {data.map((item, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1">
              Short URL:{" "}
              <Link href={`/${item.shortcode}`}>
                {window.location.origin}/{item.shortcode}
              </Link>
            </Typography>
            <Typography variant="body2">
              Created At: {new Date(item.created).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Expires At: {new Date(item.expiry).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Clicks: {item.clicks.length}
            </Typography>
            {item.clicks.map((click, idx) => (
              <Box key={idx} ml={2} mt={1}>
                <Typography variant="body2">
                  Time: {new Date(click.timestamp).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Source: {click.source}
                </Typography>
                <Typography variant="body2">
                  Location: {click.location}
                </Typography>
              </Box>
            ))}
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default StatsPage;
