// Drawing API for figure configs. Rendering to files lives in `@llm-systems/viz/build`.
export {C,FONT_FAMILY,MONO_FAMILY,markerDefs,markerId,markerUrl,type Tone} from './theme';
export {esc,svgText,tr,units,wrap,type Label,type Locale} from './text';
export {Panel} from './panel';
export {FRAME,compose,layoutBoxes,type FigureSpec,type FigureLayout,type Screen} from './frame';
export {cells,curve,grid,timeline,type Bar,type Lane} from './primitives';
export {matrix,port,connector,type Bounds,type Side,type Point,type MatrixValue,type MatrixOptions} from './diagram';
export {axis,tensor,transpose,product,multiply,matmul,operation,link,type Axis,type TensorSpec,type TensorDrawing} from './tensor';
export {cacheBank} from './tensor';

export {matrixPlane} from "./matrix-plane";

export {symbolicPlane,type SymbolicPlaneOptions} from './symbolic';
export {FLOW,fanOut,flowWire,math,nameGap,flowMatrix,junction,flowStep,badge,type FlowSizes,type FlowMatrix,type FlowSide,type FanTap} from './flow';
export {route,connect,type Wire,type Dir} from './route';
