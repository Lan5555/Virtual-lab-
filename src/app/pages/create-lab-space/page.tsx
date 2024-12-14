/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect, useRef, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { faBars, faClose, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import HoverBar from '@/app/components/hover-bar'; 
import HoverSideBar from '@/app/components/hover-side-bar'; 
import Walkthrough from '@/app/components/guider'; 
import Toast from "@/app/components/toast"; 
import NodeEditor from "@/app/components/nodes"; 
import CreateImage from '@/app/components/create-image';
import { element } from 'three/webgpu';
import Plane from '@/app/components/plane';
import { useRouter } from 'next/navigation';

interface ModelData {
  Name: string;
  top2: number;
  bottom2: number;
  left2: number;
  right2: number;
  height2: number;
  width2: number;
}

const CreateLab: React.FC = () => {
  const [isTime, setTime] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isShown, setShown] = useState(false);
  const [display, setDisplay] = useState(true);
  const [bgName, setBgName] = useState('empty-room');
  const [labName, setLabName] = useState('empty-room');
  const [modelName, setModelName] = useState('');
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [itemValues, setItemValues] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  const [createdImages, setCreatedImages] = useState<any[]>([]);
  const [callback, setCallBackName] = useState<any>('');

  const [visible, setVisible] = useState(false); // visibility state for components
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setLabName(bgName === 'Lab 1' ? 'empty-room' : 
                bgName === 'Lab 2' ? 'empty-2' : 
                bgName === 'Lab 3' ? 'empty-3' : 
                bgName === 'Lab 4' ? '' : 'empty-room');
  }, [bgName]);

  const handleItemChange = (name: string, value: number) => {
  setItemValues((prev) => ({ ...prev, [name]: value }));

  // Update the createdImages state with the new values
  setCreatedImages((prevImages) => {
    return prevImages.map((element) => {
      // Return a new object with the updated property for the specific element
      return {
        ...element,
        [name]: value,  // Dynamically update the property (top, left, etc.)
      };
    });
  });
};


  const modelSources: { [key: string]: string } = {
    'Table 1': 'table-rec',
    'Empty Beaker': 'beaker',
    'Table 2': 'table-v',
    'Retort Stand': 'retort-stand',
    'Iodine': 'iodine',
    'Skeleton': 'skeleton-1',
  };
  const handleModelChange = (name: string) => {
    setModelName(name);
    
  };


  const ShowMesh = () => {
    const ref = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
        ref.current.rotation.z += 0.01;
      }
    });
    
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <mesh
          ref={ref}
          position={[0, 0, 0]} 
          rotation={[Math.PI / 10, -Math.PI / 10, 0]}
          scale={[0.5, 0.5, 0.5]} 
          castShadow
          onClick={() => setShown((prev) => !prev)}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="darkred" />
        </mesh>
      </>
    );
  };

  const displayNode = () => {
    return <NodeEditor
      itemName={modelName}
      onSuccess={() => alert('hello world')}
      top={handleItemChange.bind(null, 'top')}
      bottom={handleItemChange.bind(null, 'bottom')}
      left={handleItemChange.bind(null, 'left')}
      right={handleItemChange.bind(null, 'right')}
      height={setHeight}
      width={setWidth}
      callbackName={handleCallBack}
    />;
  };
  const handleCallBack = (name: string) => {
    setCallBackName(name);
  }
  const Save = (Name: string, top2: number, bottom2: number, left2: number, right2: number, height2: number, width2: number) => {
    const newItem:ModelData = { Name, top2, bottom2, left2, right2, height2, width2 };
    const savedData = localStorage.getItem('modelData');
    const data = savedData ? JSON.parse(savedData) : [];
    data.push(newItem); // Push new item into the array
    localStorage.setItem('modelData', JSON.stringify(data)); // Save it back to localStorage
  };
  
  const [modelData, setModelData] = useState<(ModelData)[]>([]); // state to hold the model data

  useEffect(() => {
    const data = getSavedModel();
    if (data) {
      setModelData(data);
    }
  }, []);
  
  const getSavedModel = () => {
    const savedData = localStorage.getItem('modelData');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      console.log("No saved data found.");
      return [];
    }
  };
  const router = useRouter();
  const menu = (
    <div className="flex flex-col">
        <ul className="list-none relative -left-5">
            <li onClick={()=> {
                router.push('/pages/dashboard');
            }}>Create Lab Space</li>
        </ul>
    </div>
)
  return (
    <div>
      {isTime && <Toast text="Welcome" />}
      <div
        className="w-100 h-screen fixed top-0 bottom-0 left-0 right-0 p-1 flex justify-center items-center"
        style={{
          backgroundImage: `url(/misc/competition/images/${labName}.jpg)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Canvas className="absolute">
          <Suspense fallback={<span>Loading...</span>}>
            <perspectiveCamera position={[0, 0, 6]} />
            {display && <ShowMesh />}
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
        
        {isOpen && <HoverSideBar sendLabName={setBgName} model={handleModelChange} />}
        
        <HoverBar
          items={[!isOpen ? faBars : faClose, faSignOutAlt]}
          runFunc1={() => setOpen((prev) => !prev)}
          iconClass="text-white cursor-pointer z-20"
          runFunc2={() => {}}
        />
        
        {isShown && (
          <Walkthrough
            type="list"
            list={['Dispose']}
            className="bg-black animate-pulse w-auto h-auto p-2 mr-5 rounded"
            onListItemClick={() => { setDisplay(false); setShown(false); }}
          />
        )}
        {modelName && <CreateImage source={modelSources[modelName]} 
           top1={itemValues.top} bottom1={itemValues.bottom}
            left1={itemValues.left} right1={itemValues.right} height={height} width={width}
            onclick={()=> setVisible(prev => !prev)}
            callBack={callback}/>}
           {visible && <div className='fixed bottom-10 flex justify-center'>
           {visible && <button className='bg-black rounded animate-pulse p-2 text-white' onClick={()=> {
              Save(modelName, itemValues.top, itemValues.bottom, itemValues.left, itemValues.right, height,width);
              setVisible(prev => !prev);
            }}>Save</button> }
            </div> }
      </div>
      {visible && displayNode()} 
      {modelData.map((item, index) => (
          <CreateImage
            key={index}
            source={modelSources[item.Name]}  // Access the image source
            top1={item.top2}
            bottom1={item.bottom2}
            left1={item.left2}
            right1={item.right2}
            height={item.height2}  // Use the saved height and width
            width={item.width2}
          />
        ))}

    </div>
  );
};

export default CreateLab;
