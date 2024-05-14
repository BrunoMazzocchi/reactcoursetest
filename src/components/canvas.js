import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(10);
  const [mode, setMode] = useState("pen");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    context.lineCap = "round";
    saveToHistory();
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = mode === "pen" ? penSize : eraserSize;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = mode === "pen" ? penColor : "#FFFFFF";
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) saveToHistory();
    setIsDrawing(false);
  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
  };

  const handleColorChange = (event) => {
    setPenColor(event.target.value);
  };

  const handleSave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const drawingData = {
      title,
      content,
      description,
      drawing: dataUrl,
    };
    // Here you can handle the drawing save logic, like sending the data to a server
    console.log(drawingData);
    setOpen(false);
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setHistory([...history.slice(0, historyStep + 1), dataUrl]);
    setHistoryStep(historyStep + 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = history[historyStep - 1];
      img.onload = () => context.drawImage(img, 0, 0);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = history[historyStep + 1];
      img.onload = () => context.drawImage(img, 0, 0);
    }
  };

  return (
    <div>
      <Paper>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          style={{ border: "1px solid #000" }}
        />
      </Paper>
      <div style={{ marginTop: "10px" }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="pen or eraser"
        >
          <ToggleButton value="pen" aria-label="pen">
            Pen
          </ToggleButton>
          <ToggleButton value="eraser" aria-label="eraser">
            Eraser
          </ToggleButton>
        </ToggleButtonGroup>
        <input type="color" value={penColor} onChange={handleColorChange} />
        {mode === "pen" ? (
          <Slider
            value={penSize}
            onChange={(e, newValue) => setPenSize(newValue)}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            aria-labelledby="pen-size-slider"
            style={{ width: 200, margin: "10px" }}
          />
        ) : (
          <Slider
            value={eraserSize}
            onChange={(e, newValue) => setEraserSize(newValue)}
            min={1}
            max={50}
            valueLabelDisplay="auto"
            aria-labelledby="eraser-size-slider"
            style={{ width: 200, margin: "10px" }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={undo}>
          Undo
        </Button>
        <Button variant="contained" color="secondary" onClick={redo}>
          Redo
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Drawing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a title, content, and description for your drawing.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveDrawing} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Canvas;
