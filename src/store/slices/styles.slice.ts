import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StyleState {
  fontStyle: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  textAlign: string;
  readerWidth: string;
  backgroundColor: string;
  textColor: string;
}

const initialState: StyleState = {
  fontStyle: "normal",
  fontSize: 16,
  lineHeight: 2.5,
  fontFamily: "Arial",
  textAlign: "left",
  readerWidth: "100",
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setFontStyle: (state, action: PayloadAction<string>) => {
      state.fontStyle = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setLineHeight: (state, action: PayloadAction<number>) => {
      state.lineHeight = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setTextAlign: (state, action: PayloadAction<string>) => {
      state.textAlign = action.payload;
    },
    setReaderWidth: (state, action: PayloadAction<string>) => {
      state.readerWidth = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.textColor = action.payload;
    },
    resetStyles: () => initialState,
  },
});

export const {
  setFontStyle,
  setFontSize,
  setLineHeight,
  setFontFamily,
  setTextAlign,
  setReaderWidth,
  setBackgroundColor,
  setTextColor,
  resetStyles,
} = styleSlice.actions;

export default styleSlice.reducer;
