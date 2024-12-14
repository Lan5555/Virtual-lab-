import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  EdgeChange,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { element, label } from 'three/webgpu';

interface Props {
  itemName?: string;
  onSuccess?: () => void;
  top?: (value: number) => void;
  left?: (value: number) => void;
  right?: (value: number) => void;
  bottom?: (value: number) => void;
  height?: (value: number) => void;
  width?: (value: number) => void;
  callbackName? : (value: string) => void;
}

const NodeEditor: React.FC<Props> = ({ itemName, onSuccess, top, bottom, left, right, height, width, callbackName }) => {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      position: { x: 250, y: 0 },
      data: { label: 'Parameters', Top: '', Bottom: '', Left: '', Right: '', Height:'', Width:'' },
      style: {
        backgroundColor: 'grey',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: 'auto',
        boxShadow: '0px 2px 4px darkred',
      },
    },
    {
      id: '2',
      position: { x: 100, y: 100 },
      data: { label: itemName ?? 'Item name' },
      style: {
        backgroundColor: 'grey',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: 'auto',
        boxShadow: '0px 2px 4px darkred',
      },
    },
    {
      id: '3',
      position: { x: 400, y: 100 },
      data: { label: 'Call back', name:''},
      style: {
        backgroundColor: 'grey',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: 'auto',
        boxShadow: '0px 2px 4px darkred',
      },
    },
  ];

  const initialEdges: Edge[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [actionMessage, setActionMessage] = useState('');
  const [num, setNum] = useState<number>(0);
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [num3, setNum3] = useState<number>(0);
  const [widthValue,setWidth] = useState<number>(0);
  const [heightValue,setHeight] = useState<number>(0);
  const [callback, setCallBack] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string, field: string) => {
    const value = event.target.value;
    const numValue = parseInt(value);
    switch (field) {
      case 'Top':
        setNum(numValue);
        break;
      case 'Bottom':
        setNum1(numValue);
        break;
      case 'Left':
        setNum2(numValue);
        break;
      case 'Right':
        setNum3(numValue);
        break;
      case 'height':
        setHeight(numValue);
      case 'width':
        setWidth(numValue);
      default:
        break;
    }
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [field]: value,
                label: `Top:${node.data.Top} | Bottom:${node.data.Bottom} | Left:${node.data.Left} | Right:${node.data.Right}`,
              },
            }
          : node
      )
    );
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      setActionMessage(`Connected node ${connection.source} to ${connection.target}`);
      if (connection.source === '1' && connection.target === '3') {
        if(callbackName) callbackName(callback);
      } else if (connection.source === '1' && connection.target === '2') {
        if (top) top(num);
        if (bottom) bottom(num1);
        if (left) left(num2);
        if (right) right(num3);
        if(height) height(heightValue);
        if(width) width(widthValue);
        
      }
    },
    
    [bottom, callback, callbackName, height, heightValue, left, num, num1, num2, num3, right, setEdges, top, width, widthValue]
  );
  const handleDisconnect = useCallback(
    (changes:EdgeChange[]) => {
      setEdges((eds) => 
      applyEdgeChanges(changes,eds)
      );
      const removeEdge = changes.find((change) => change.type === 'remove');
      if(removeEdge){
        setActionMessage(`Disconnected edge between ${removeEdge.id}`);
      }
    },[setEdges]);
  
  const [view, toggleView] = useState(true);
  useEffect(()=>{
    toggleView(true);
  }, []);
  const runFunction = (nodeId: string, index: number, element: string) => {
    setCallBack(element);
    setNodes((nds)=>
      nds.map((node)=> 
      node.id === nodeId ? {
        ...node, data: {
          ...node.data, label: `${element}`
        }
      } : node
      )
    )
  }
  return (
    view && <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background gap={16} size={0.5} />
        <Controls />
       
      </ReactFlow>

      {nodes.map((node) => {
        if (node.id === '1') {
          return (
            <div
      key={node.id}
      className="absolute top-[180px] left-[30px] w-[200px] h-[350px] bg-gradient-to-br from-[#111827] to-[#1F2937] p-4 rounded-3xl shadow-2xl border-4 border-transparent hover:border-cyan-400 transform hover:scale-105 hover:rotate-3 transition-all duration-300"
      >
  {/* Title */}
  <div className="mb-4 text-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
    {node.data.label}
  </div>

  {/* Form Fields */}
  <div className="flex flex-col justify-center gap-3">
    {['Top', 'Bottom', 'Left', 'Right', 'height', 'width'].map((field) => (
      <div key={field} className="relative group">
        <input
          type="number"
          value={node.data[field as keyof typeof node.data] || ''}
          onChange={(event) => handleInputChange(event, node.id, field)}
          className=" p-2 bg-transparent text-white border-2  focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md"
        />
        {/* Label for the input */}
        <label
          htmlFor={field}
          className="absolute top-0 left-0 p-1 text-xs text-white opacity-50 pointer-events-none transform group-focus-within:scale-75 group-focus-within:translate-y-[-1.5rem] transition-all duration-200 origin-left"
        >
          {field}
        </label>
      </div>
    ))}
  </div>
</div>
          );
        }else if(node.id === '3'){
          return (
            <div
            key={node.id}
            className="absolute bottom-[20px] right-[50px] w-[150px] h-[200px] bg-gradient-to-br from-[#111827] to-[#1F2937] p-4 rounded-3xl shadow-2xl border-4 border-transparent hover:border-cyan-400 transform hover:scale-105 hover:rotate-3 transition-all duration-300"
            >
        {/* Title */}
        <div className="mb-4 text-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          {node.data.label}
        </div>
          {['Spin','Rotate','Transform','Scale','Hello world'].map((element,index) =>
            <div
              key={element}
              className='w-auto h-auto rounded shadow-2xl cursor-pointer bg-gradient-to-tr from-slate-900 to-blue-600'
              onClick={()=> runFunction(node.id,index, element)}
              >
                <ul className='list-none relative -left-3'>
                  <li className='text-white'>{element}</li>
                </ul>
              </div> 
          )}
        </div>
          )
        }
        return null;
      })}

      <div className="p-3 fixed top-2 right-4 text-center bg-slate-600 rounded shadow">
        <h3>Action Log</h3>
        <p>{actionMessage || 'No actions yet'}</p>
        <button className='rounded p-1 bg-black text-white' onClick={()=>{
          toggleView(false);
        }}>Close</button>
      </div>
    </div>
  );
};

export default NodeEditor;
