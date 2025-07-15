import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box, Typography } from "@mui/material";
import { logger } from "../loggerInstance";

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resolve/${shortcode}`);
        window.location.href = res.data.url;
        logger("frontend", "info", "api", `Redirected shortcode ${shortcode}`);
      } catch {
        logger("frontend", "error", "api", `Invalid shortcode ${shortcode}`);
        navigate("/");
      }
    };
    fetchAndRedirect();
  }, [shortcode, navigate]);

  return (
    <Box mt={4} textAlign="center">
      <CircularProgress />
      <Typography variant="body1" mt={2}>
        Redirecting...
      </Typography>
    </Box>
  );
}

export default RedirectHandler;
