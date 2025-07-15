import { useState } from "react";
import { TextField, Button, Grid, Box, Alert } from "@mui/material";
import axios from "axios";
import { logger } from "../loggerInstance";

function UrlForm({ onSuccess }) {
  const [inputs, setInputs] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = inputs.map((input) => ({
      url: input.url.trim(),
      validity: input.validity ? parseInt(input.validity) : 30,
      shortcode: input.shortcode.trim() || undefined,
    }));
    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        urls: payload,
      });
      onSuccess(res.data);
      logger("frontend", "info", "api", "URLs created successfully");
    } catch (err) {
      setError("Error creating URLs");
      logger("frontend", "error", "api", "Failed to create URLs");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {inputs.map((input, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Original URL"
                variant="outlined"
                value={input.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                required
              />
              <TextField
                label="Validity (minutes)"
                variant="outlined"
                value={input.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
                type="number"
              />
              <TextField
                label="Custom Shortcode"
                variant="outlined"
                value={input.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={addField}
          disabled={inputs.length >= 5}
        >
          Add Another URL
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Shorten URLs
        </Button>
      </Box>
    </Box>
  );
}

export default UrlForm;
