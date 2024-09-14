import { createSlice } from "@reduxjs/toolkit";
import { TOOL } from "../constant";
import { COLOURS } from "../constant";

const initialState = {
    [TOOL.PENCILE]: {
        color: COLOURS.BLACK,
        size: 3
    },
    [TOOL.ERASER]: {
        color: COLOURS.WHITE,
        size: 3
    },
    [TOOL.UNDO]: {},
    [TOOL.REDO]: {},
    [TOOL.DOWNLOAD]: {}
}

export const toolkit = createSlice({
    name: "toolkit",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size;
        }
    }
});

export const { changeColor, changeBrushSize } = toolkit.actions;

export default toolkit.reducer;