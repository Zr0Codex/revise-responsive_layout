import React, { useState, useEffect, useContext } from 'react';
import { Input } from 'antd';

// import { useFormateMessage } from './constants/templateMessage';
import wording from './constants/translate/wording';

const ViewportContext = React.createContext({});

const ViewportPorvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const handleWindowsResize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowsResize);
    return () => window.removeEventListener('resize', handleWindowsResize);
  }, []);

  return <ViewportContext.Provider value={{ width, height }}>{children}</ViewportContext.Provider>;
};

const useViewport = () => {
  const { width, height } = useContext(ViewportContext);
  return { width, height };
};

const LaptopComponent = () => <p>{wording.isLaptop}</p>;

const DesktopComponent = () => <p>{wording.isDesktop}</p>;

const MainLayout = () => {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <LaptopComponent /> : <DesktopComponent />;
};

export default function App() {
  return (
    <ViewportPorvider>
      <MainLayout />
    </ViewportPorvider>
  );
}
